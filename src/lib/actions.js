"use server";

import bcrypt from "bcryptjs";
import supabase from "./supabase";

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
  } else {
    console.log("User created:", data);
    return data;
  }
}

export async function updateHome(slug, formData) {
  const { id, ...updatedFields } = Object.fromEntries(formData.entries());

  // Validate input parameters
  if (!slug) throw new Error("Slug is required");

  // Define the table where the content should be updated
  const tableMap = {
    home: "home",
    about: "about",
    blog: "blog",
    // Add more mappings as needed
  };

  const tableName = tableMap[slug];

  if (!tableName) {
    return { error: s`Invalid slug: ${slug}` };
  }

  // Perform the update query
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedFields)
    .match({ id: Number(id) })
    .select();

  console.log("MATCHING ROW:", data);

  if (error) {
    console.error("Error updating content:", error);
    return { error };
  }

  if (!data) {
    console.warn("No matching row found to update.");
  }
  return { data };
}
