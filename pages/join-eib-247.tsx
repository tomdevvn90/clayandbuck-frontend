export default function JoinEib245() {}

export async function getServerSideProps() {
  const content = null;

  if (!content) {
    return {
      redirect: {
        permanent: false,
        destination: "/cnb-sign-up",
      },
    };
  }

  return {
    props: {},
  };
}
