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

export async function getAllBlogContent() {
  const { data, error } = await supabase.from("blog").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no blog posted");
  }

  return data;
}

export async function getAbout() {
  const { data, error } = await supabase.from("about").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no about content");
  }

  return data;
}

export async function getServices() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no about content");
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

export async function getImages() {
  const { data, error } = await supabase.from("gallery").select("*");

  if (error) {
    console.error(error);
    throw new Error("There are no blog posted");
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

export async function updateContent(slug, updatedData) {
  // Define the table where the content should be updated
  const tableMap = {
    home: "home_content",
    about: "about_content",
    blog: "blog_content",
    // Add more mappings as needed
  };

  const tableName = tableMap[slug];

  if (!tableName) {
    return { error: `Invalid slug: ${slug}` };
  }

  // Perform the update query
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedData)
    .match({ id: updatedData.id }); // Ensure the correct row is updated

  if (error) {
    console.error("Error updating content:", error);
    return { error };
  }

  console.log("RETURNED DATA", data);
  return { data };
}
