"use server";

import bcrypt from "bcryptjs";
import { getSupabaseClient } from "./getSupabaseClient";

export async function getUser({ email, password }) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

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

export async function getUserByEmail(email) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      throw new Error("Email not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
}

// Handles fetch query for all tables in supabase
export async function getContent(slug, filter) {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(slug)
    .select("*")
    .order(filter.value, { ascending: filter.status });

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

export async function getRole() {
  // Ensure Supabase connection is valid
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Roles could not be loaded");
  }

  return data;
}

// Test function
async function fetchData() {
  const data = await getEmail("emo.onerhime@gmail.com");

  console.log("FETCHED DATA", data);
}

// fetchData();
