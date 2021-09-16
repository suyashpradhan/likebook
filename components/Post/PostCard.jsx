import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useStateContext } from "../../context/state-context";
import { likePost, unlikePost } from "../../server/helpers/urls";
import { parseCookies } from "nookies";
import { getInitials } from "../../utils/getInitials.util";
import { useState } from "react";

// Post Card Component
export default function PostCard({ post }) {
  const [error, setError] = useState("");
  const { state, dispatch } = useStateContext();
  const { jwt } = parseCookies("jwt");

  // Function for toggling like button
  const handleToggleLike = async () => {
    try {
      const isPostLiked = post.likes.includes(state.userDetails.userId);
      const functionToBeCalled = isPostLiked ? unlikePost : likePost;
      const likedPost = await functionToBeCalled(post._id, jwt);
      const postIndex = state.posts.findIndex(
        (singlePost) => singlePost._id === likedPost.post._id
      );
      dispatch({
        type: "UPDATE_A_SINGLE_POST",
        payload: { postIndex, post: likedPost.post },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Getting initials of name for displaying it in UI
  const initials = getInitials(post.postedBy.fullName);

  return (
    <>
      <section className="flex items-center justify-center font-default sm:w-full px-4 mb-8 ">
        <div className="bg-background-light md:w-full sm:w-full lg:w-2/3 rounded-lg shadow-lg p-8">
          <div className="flex mb-8">
            <div>
              <div class="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-accent text-xl text-white uppercase">
                {initials}
              </div>
            </div>
            <div className="ml-3 flex flex-col w-full">
              <h1 className="text-text-primary font-semibold text-primary">
                {post.postedBy.fullName}
              </h1>
              <h2 className="text-secondary text-sm">
                @{post.postedBy.userName}
              </h2>
            </div>
          </div>
          <p className="text-primary tracking-normal text-md">{post.content}</p>
          <div className="mt-2">
            {post.likes.includes(state.userDetails.userId) ? (
              <button onClick={handleToggleLike}>
                <BsHeartFill className="mt-8 w-6 h-6 text-danger cursor-pointer " />
              </button>
            ) : (
              <button onClick={handleToggleLike}>
                <BsHeart className="mt-8 w-6 h-6 text-danger cursor-pointer " />
              </button>
            )}
            <p className="mt-2 text-secondary">{post.likes.length} Like(s)</p>
          </div>
        </div>
      </section>
    </>
  );
}
