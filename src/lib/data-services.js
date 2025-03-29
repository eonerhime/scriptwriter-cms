import supabase from "./supabase";

export async function getHomepage() {
  const { data, error } = await supabase.from("homePage").select("*");

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
