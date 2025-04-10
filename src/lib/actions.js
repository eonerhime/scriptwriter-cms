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

  console.log("RETURNED DATA:", data);

  return data;
}

export async function updateMultipleContent(slug, formData) {
  const { ...updatedFields } = Object.fromEntries(formData.entries());

  // Validate input parameters
  if (!slug) throw new Error("Slug is required");

  // Perform the update query

  const { data, error } = await supabase
    .from(slug)
    .upsert(updatedFields)
    .select();

  if (error) {
    console.error("Error updating content:", error);
    return { error };
  }

  if (!data) {
    console.warn("No matching row found to update.");
  }

  console.log("RETURNED DATA:", data);

  return data;
}

export async function resetPassword(email, password, passwordCopy) {}
