import FeedCard from "../../components/Feed/FeedCard";
import Header from "../../components/Header/Header";
import { parseCookies } from "nookies";

export default function Feed() {
  return (
    <>
      <div className="h-full bg-background">
        <Header />
        <FeedCard />
      </div>
    </>
  );
}

// For Logging out and Redirecting to Login page
export const getServerSideProps = async (context) => {
  const { jwt } = parseCookies(context);
  if (!jwt) {
    const { res } = context;
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  return {
    props: {},
  };
};
