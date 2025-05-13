import BackButton from "@/components/BackButton";

function Page() {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl text-red-600 font-bold">
        403 - You are not authorized to view this page
      </h1>
      <BackButton />
    </div>
  );
}

export default Page;
