import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/state-context";
import { addNewPost, getAllPosts } from "../../server/helpers/urls";
import PostCard from "../Post/PostCard";
import { parseCookies } from "nookies";
import InfiniteScroll from "react-infinite-scroll-component";
import EndOfPage from "../EndOfPage/EndOfPage";
import { getInitials } from "../../utils/getInitials.util";
import axios from "axios";

export default function FeedCard() {
  const { state, dispatch } = useStateContext();
  const [content, setContent] = useState("");
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMoreData, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const initials = getInitials(state.userDetails.fullName);

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    const postedBy = state.userDetails.userId;
    const { jwt } = parseCookies("jwt");
    const response = await axios.post(
      "/api/feed/post",
      {
        content,
      },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    if (response.status === 200 || response.status === 200) {
      dispatch({ type: "ADD_A_NEW_POST", payload: response.data.post });
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `/api/feed/post`,
          state.userDetails.userId,
          1,
          7
        );
        console.log(res);
        /* dispatch({ type: "FETCH_POSTS_FROM_API", payload: res.data.posts }); */
      } catch (error) {
        /* dispatch({
          type: "SET_ERROR_MESSAGES",
          payload: res.message,
        }); */
        console.log(error);
      }
    })();
  }, []);

  /* const fetchData = async () => {
    const res = await getAllPosts(state.userDetails.userId, pageNumber, 7);
    dispatch({ type: "FETCH_POSTS_FROM_API", payload: res.data.posts });
    if (res.data.posts.length === 0) {
      setHasMore(false);
    }
    setPageNumber((pageNumber) => pageNumber + 1);
  }; */

  return (
    <>
      {state.posts.length < 0 ? (
        <p className="text-white">nothing to show</p>
      ) : (
        <>
          <section className=" flex items-center font-default justify-center px-4 ">
            <div className="rounded-xl my-16 border-background-light border-2  w-full md:w-3/3 lg:w-2/3">
              <div className="flex p-4">
                <div>
                  <div class="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-accent text-xl text-white uppercase">
                    {initials}
                  </div>
                </div>

                <div className="ml-3 flex flex-col w-full">
                  <textarea
                    placeholder="What's the latest?"
                    className="w-full text-lg resize-none outline-none bg-background-light h-32 p-4 text-primary rounded-md"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end items-center border-background-light py-6 px-4 border-t">
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-md uppercase  text-white  bg-accent rounded-md shadow focus:outline-none focus:ring-primary focus:ring-1 my-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={postSubmitHandler}
                    disabled={content.length <= 0 ? true : false}
                  >
                    Post Your Message
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* <InfiniteScroll
            dataLength={state.posts.length}
            next={fetchData}
            hasMore={hasMoreData}
            endMessage={<EndOfPage />}
          >
            {state.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </InfiniteScroll> */}
          {state.posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </>
      )}
    </>
  );
}
