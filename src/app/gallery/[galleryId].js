import { getImages } from "@/lib/data-services";

// Dynamically generated (SSR)
export async function getServerSideProps({ params }) {
  const cabin = await getImages(params?.imageId);

  return { props: { cabin } };
}
