export default function Optout() {}

export async function getStaticProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/your-california-privacy-rights",
    },
  };
}
