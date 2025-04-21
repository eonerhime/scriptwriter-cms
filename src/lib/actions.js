"use server";

import bcrypt from "bcryptjs";
import { getSupabaseClient } from "./getSupabaseClient";

export async function createUser(slug, formDataObj) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  const { role, email, fullName, password, avatar_url } = formDataObj;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        role,
        email,
        fullName,
        password_hash: hashedPassword,
        avatar_url,
      },
    ])
    .select();

  if (error) {
    console.error("Insert error:", error);
    return null;
  }

  return data;
}

export async function updateContent(slug, formData) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  try {
    const { id, ...updatedFields } = formData;

    // Validate input parameters
    if (!slug) throw new Error("Slug is required");

    // Perform the update query
    const { data, error } = await supabase
      .from(slug)
      .update(updatedFields)
      .match({ id: Number(id) })
      .select();

    if (error) {
      console.error("Error updating content:", error);
      return { error };
    }

    if (!data) {
      console.warn("No matching row found to update.");
    }

    return data;
  } catch (err) {
    console.error("Error in updateContent:", err);
    throw err;
  }
}

export async function updateMultipleRowsContent(slug, formData) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  try {
    const imageBucketUrl = `https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/${slug}-images/`;

    // Extract all form entries
    const entries = Array.from(formData.entries());

    // Build a map of which indices correspond to which IDs
    const indexMap = {};
    entries.forEach(([key, value]) => {
      if (key.startsWith("_index_")) {
        const id = key.replace("_index_", "");
        indexMap[id] = value;
      }
    });

    // Group form fields by their index
    const itemsByIndex = {};

    // First pass: organize form data by index
    entries.forEach(([key, value]) => {
      if (key.startsWith("_index_")) return;

      // Match name pattern like "image_0", "id_0", "delete_0", "file_0", "currentImage_0"
      const matches = key.match(/(.+)_(\d+)$/);

      if (matches) {
        const fieldName = matches[1]; // Original column name
        const index = matches[2]; // Index in the form

        // Initialize this index if it doesn't exist
        if (!itemsByIndex[index]) {
          itemsByIndex[index] = {};
        }

        // Add the field with its original column name
        itemsByIndex[index][fieldName] = value;
      }
    });

    // Process each item and handle file uploads
    for (const [index, item] of Object.entries(itemsByIndex)) {
      // Check if we have a file to upload
      if (item.file && item.file.size > 0) {
        try {
          // Generate a unique filename to avoid conflicts
          const timestamp = Date.now();
          const originalName = item.file.name;
          const fileName = `${timestamp}-${originalName.replace(/\s+/g, "-")}`;

          // Upload file to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from("gallery-images")
            .upload(fileName, item.file, {
              upsert: true, // Overwrite if file exists
              cacheControl: "3600",
            });

          if (uploadError) {
            console.error("Upload error:", uploadError);
            throw new Error(`File upload failed: ${uploadError.message}`);
          }

          // Set the new image URL for database update
          item.image = `${imageBucketUrl}${fileName}`;
        } catch (error) {
          console.error("Error uploading file:", error);
          throw new Error(`File upload error: ${error.message}`);
        }
      } else if (item.currentImage) {
        // Use current image if no new file is uploaded
        item.image = item.currentImage;
      }

      // Clean up temporary fields that shouldn't go to the database
      delete item.file;
      delete item.currentImage;
    }

    // Process deletions and updates
    const promises = Object.values(itemsByIndex).map(async (item) => {
      const { id, delete: shouldDelete, ...fieldsToUpdate } = item;

      // Handle deletion if marked
      if (shouldDelete === "on") {
        console.log(`Deleting item with ID: ${id}`);
        return supabase.from(slug).delete().eq("id", id);
      }

      // Only update if we have an ID
      if (id) {
        return supabase.from(slug).update(fieldsToUpdate).eq("id", id);
      }

      // Handle new items if needed
      return null;
    });

    // Execute all operations
    await Promise.all(promises.filter((p) => p !== null));

    // Fetch and return updated data
    const { data, error } = await supabase
      .from(slug)
      .select("*")
      .order("id", { ascending: true });

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error("Error updating content:", error);
    throw new Error(error.message || "Failed to update content");
  }
}

export async function createContent(slug, newData) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  try {
    // Create a copy of newData to modify
    const newDataCopy = { ...newData };

    // Remove the ID and created_at from the newData if it exists
    const { id, created_at, ...blogData } = newDataCopy;

    // Insert the new blog data into the database
    const { data, error } = await supabase
      .from(slug)
      .insert([blogData])
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Insert error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error in createblog:", err);
    throw err;
  }
}

export async function resetPassword(email, password, passwordCopy) {}

// Test function
// async function setUser() {
//   const data = await createUser(
//     "super admin",
//     "emo.onerhime@gmail.com",
//     "asdf123*",
//     "Emo Onerhime",
//     "https://aavujdgrdxggljccomxv.supabase.co/storage/v1/object/public/users-images//emo.jpg"
//   );

//   console.log("FETCHED DATA", data);
// }

// setUser();
