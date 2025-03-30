// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default async function Page() {
  // const cookieStore = await cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   redirect("/login");
  // }

  // Displayed only if user is authenticated
  return <div className="mx-6 md:mx-12 my-8">Dashboard</div>;
}
