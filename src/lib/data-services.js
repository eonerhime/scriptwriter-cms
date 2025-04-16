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
export async function getContent(slug, filter) {
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
// async function fetchData() {
//   const data = await getRole();

//   console.log("FETCHED DATA", data);
// }

// fetchData();
