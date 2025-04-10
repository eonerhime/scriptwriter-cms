"use server";

import bcrypt from "bcryptjs";
import supabase from "./supabase";
import { cookies } from "next/headers";

export async function createUser({ role, email, fullName, password, avatar }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from("users").insert([
    {
      role,
      email,
      fullName,
      password_hash: hashedPassword,
      avatar_url: avatar,
    },
  ]);

  if (error) {
    console.error("Insert error:", error);
    return null;
  } else return data;
}

export async function updateContent(slug, formData) {
  const { id, ...updatedFields } = Object.fromEntries(formData.entries());

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
}

export async function updateMultipleContent(slug, formData) {

  try {
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

    entries.forEach(([key, value]) => {
      if (key.startsWith("_index_")) return;

      // Match name pattern like "serviceOffer_0"
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

    // Convert to array of item objects
    const itemsArray = Object.values(itemsByIndex);

    // Process updates
    const updatePromises = itemsArray.map((item) => {
      return supabase
        .from(slug)
        .update({
          serviceOffer: item.serviceOffer,
          serviceDetails: item.serviceDetails,
          // Add other fields as needed
        })
        .eq("id", item.id);
    });

    // Execute all updates
    await Promise.all(updatePromises);

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

export async function resetPassword(email, password, passwordCopy) {}
