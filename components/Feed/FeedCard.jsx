import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context/context";
import {
  addNewPost,
  getAllPosts,
  fetchAllUsers,
} from "../../server/helpers/urls";
import PostCard from "../Post/PostCard";
import { parseCookies } from "nookies";
import axios from "axios";

export default function FeedCard() {
  const { authState, authDispatch } = useAuth();
  const [content, setContent] = useState("");

  console.log("State", authState);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPosts(authState.userDetails.userId, 1, 3);
        console.log(res);
        const resUser = await fetchAllUsers();
        authDispatch({ type: "SET_POSTS", payload: res.data.posts });
      } catch (error) {
        /* authDispatch({
          type: "SET_ERROR",
          payload: response.message,
        }); */
        console.log(error);
      }

      return () => {
        axios.Cancel();
      };
    })();
  }, []);

  const postInputHandle = (e) => {
    setContent(e.target.value);
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    const postedBy = authState.userDetails.userId;
    const { jwt } = parseCookies("jwt");
    const response = await addNewPost(postedBy, content, jwt);
    if (response.status === 200 || response.status === 200) {
      authDispatch({ type: "ADD_POST", payload: response.data.post });
    } else {
      /* authDispatch({
        type: "SET_ERROR",
        payload: response.message,
      }); */
    }
  };

  return (
    <>
      <section className=" flex items-center font-default justify-center px-4 ">
        <div className="rounded-xl my-16 border-border border-2 bg-white w-full md:w-3/3 lg:w-2/3">
          <div className="flex p-4">
            <div>
              <img
                className="rounded-full w-14"
                src="https://pbs.twimg.com/profile_images/1367267802940375042/H4JDd6aC_400x400.jpg"
              />
            </div>

            <div className="ml-3 flex flex-col w-full">
              <textarea
                placeholder="Be Kind! And Say Something Sweet..."
                className="w-full text-lg resize-none outline-none h-32"
                onChange={postInputHandle}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between items-center text-white py-6 px-4 border-t">
            <h2 className="text-text-secondary">Total Characters : 0 / 280</h2>
            <div>
              <button
                type="submit"
                className="inline px-4 py-3  hover:shadow-lg  rounded-md text-white bg-primary cursor-pointer"
                onClick={postSubmitHandler}
              >
                Post Your Message
              </button>
            </div>
          </div>
        </div>
        <p className="text-lg">{authState.posts.length}</p>
      </section>
      {authState.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
}
