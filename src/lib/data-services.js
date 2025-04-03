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

export async function getHomeContent() {
  const { data, error } = await supabase.from("home").select("*");

  if (error) {
    console.error(error);
    throw new Error("Home page content could not be loaded");
  }

  return data;
}

export async function getAllBlogs() {
  const { data, error } = await supabase.from("blog").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no blog posted");
  }

  return data;
}

export async function addBlog() {
  const { data, error } = await supabase
    .from("blog")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not add blog");
  }

  return data;
}

export async function getImages() {
  const { data, error } = await supabase.from("blog").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no blog posted");
  }

  return data;
}

export async function getImage() {
  const { data, error } = await supabase.from("blog").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no blog posted");
  }

  return data;
}

export async function addImage() {
  const { data, error } = await supabase
    .from("blog")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not add blog");
  }

  return data;
}

export async function getRoles() {
  const { data, error } = await supabase.from("roles").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not add blog");
  }

  return data;
}
