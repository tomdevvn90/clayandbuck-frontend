export default function JoinEib245() {}

export async function getStaticProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/cnb-sign-up",
    },
  };
}
