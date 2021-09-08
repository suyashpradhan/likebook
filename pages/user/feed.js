import FeedCard from "../../components/Feed/FeedCard";
import Header from "../../components/Header/Header";

export default function Feed() {
  return (
    <>
      <div className="h-screen bg-background">
        <Header />
        <FeedCard />
      </div>
    </>
  );
}
