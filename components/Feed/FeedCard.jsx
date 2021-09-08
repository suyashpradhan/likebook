import { useState } from "react";
import { useAuth } from "../../context/auth-context/context";
import { addNewPost } from "../../services/posts.services";
import PostCard from "../Post/PostCard";

export default function FeedCard() {
  const { authState, authDispatch } = useAuth();
  const [content, setContent] = useState("");

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Post Data Here");
    /* const response = await addNewPost({
      userId: authState.userDetails.userId,
      content,
    });
    console.log(response); */
    /* if (response.status === 200 || response.status === 200) {
      authDispatch({
        type: "SET_LOGIN",
        payload: {
          userDetails: {
            userName: response.data.user.userName,
            fullName: response.data.user.fullName,
            userId: response.data.user._id,
          },
        },
      });
    } else {
      authDispatch({
        type: "SET_ERRORS",
        payload: response.message,
      });
    } */
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
                onChange={(e) => setContent(e.target.value)}
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
      </section>
      <PostCard />
    </>
  );
}
