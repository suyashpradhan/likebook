import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/context";
import { addNewPost, getAllPosts } from "../../server/helpers/urls";
import PostCard from "../Post/PostCard";
import { parseCookies } from "nookies";
import InfiniteScroll from "react-infinite-scroll-component";
import EndOfPage from "../EndOfPage/EndOfPage";

export default function FeedCard() {
  const { state, dispatch } = useStateContext();
  const [content, setContent] = useState("");
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMoreData, setHasMore] = useState(true);

  const postInputHandle = (e) => {
    setContent(e.target.value);
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    const postedBy = state.userDetails.userId;
    const { jwt } = parseCookies("jwt");
    const response = await addNewPost(postedBy, content, jwt);
    if (response.status === 200 || response.status === 200) {
      dispatch({ type: "ADD_POST", payload: response.data.post });
    } else {
      dispatch({
        type: "SET_ERRORS",
        payload: response.message,
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPosts(state.userDetails.userId, 1, 7);
        dispatch({ type: "SET_POSTS", payload: res.data.posts });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: res.message,
        });
        console.log(error);
      }
    })();
  }, []);

  const fetchData = async () => {
    const res = await getAllPosts(state.userDetails.userId, pageNumber, 7);
    dispatch({ type: "SET_POSTS", payload: res.data.posts });
    if (res.data.posts.length === 0) {
      setHasMore(false);
    }
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  console.log(state.posts);

  return (
    <>
      {state.posts.length < 0 ? (
        <p>nothing to show</p>
      ) : (
        <>
          <section className=" flex items-center font-default justify-center px-4 ">
            <div className="rounded-xl my-16 border-background-light border-2  w-full md:w-3/3 lg:w-2/3">
              <div className="flex p-4">
                <div>
                  <img
                    className="rounded-full w-14"
                    src="https://pbs.twimg.com/profile_images/1367267802940375042/H4JDd6aC_400x400.jpg"
                  />
                </div>

                <div className="ml-3 flex flex-col w-full">
                  <textarea
                    placeholder="What's the latest?"
                    className="w-full text-lg resize-none outline-none bg-background-light h-32 p-4 text-primary rounded-md"
                    onChange={postInputHandle}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between items-center border-background-light py-6 px-4 border-t">
                <h2 className="text-secondary">Total Characters : 0 / 280</h2>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-md  text-white  bg-accent rounded-md shadow focus:outline-none focus:ring-primary focus:ring-1 my-2"
                    onClick={postSubmitHandler}
                  >
                    Post Your Message
                  </button>
                </div>
              </div>
            </div>
          </section>
          <p className="text-lg text-white">{state.posts.length}</p>
          <InfiniteScroll
            dataLength={state.posts.length}
            next={fetchData}
            hasMore={hasMoreData}
            loader={
              <SkeletonTheme color="#202020" highlightColor="#444">
                <p>
                  <Skeleton count={3} />
                </p>
              </SkeletonTheme>
            }
            endMessage={<EndOfPage />}
          >
            {state.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        </>
      )}
    </>
  );
}
