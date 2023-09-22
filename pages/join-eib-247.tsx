export default function JoinEib245Page() {}

export async function getServerSideProps() {
  const content = null;

  if (!content) {
    return {
      redirect: {
        permanent: true,
        destination: "/cnb-sign-up",
      },
    };
  }

  return {
    props: {},
  };
}
