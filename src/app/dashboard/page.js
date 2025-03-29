function page() {
  return <div>Dashboard</div>;
}

export default page;

// "use client";

// import { useAuth } from "@/lib/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Dashboard() {
//   const { user, signOut } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     }
//   }, [user, router]);

//   return (
//     user && (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={signOut}
//           className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     )
//   );
// }
