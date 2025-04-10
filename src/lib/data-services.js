"use server";

import bcrypt from "bcryptjs";
import supabase from "./supabase";

export async function getUser({ email, password }) {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, role, email, fullName, password_hash, avatar_url")
      .eq("email", email)
      .single();

    if (error || !user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message);
    return { error };
  }
}

// Handles fetch query for all tables in supabase
export async function getContent(slug) {
  const { data, error } = await supabase
    .from(slug)
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error(
      `${
        slug.charAt(0).toUpperCase() + slug.slice(1)
      } page content could not be loaded`
    );
  }

  return data;
}

export async function addBlog({ post }) {
  const { data, error } = await supabase
    .from("blog")
    .insert([{ post }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not add blog");
  }

  return data;
}

// Test function
async function fetchData() {
  const data = await getContent("services");

  console.log("FETCHED DATA", data);
}

// fetchData();
