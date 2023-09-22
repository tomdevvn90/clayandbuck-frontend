export default function OptoutPage() {}

export async function getServerSideProps() {
  const content = null;

  if (!content) {
    return {
      redirect: {
        permanent: true,
        destination: "/your-california-privacy-rights",
      },
    };
  }

  return {
    props: {},
  };
}
