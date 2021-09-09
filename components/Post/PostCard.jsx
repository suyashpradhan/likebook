import { BsHeart } from "react-icons/bs";

export default function PostCard({ post }) {
  return (
    <>
      <section className="flex items-center font-default justify-center px-4 mb-8 ">
        <div className="bg-white md:w-full sm:w-full lg:w-2/3 rounded-lg shadow-lg p-8">
          <div className="flex mb-8">
            <div>
              {/* <img
                className="rounded-full w-14"
                name={`${post.postedBy.fullName}`}
                src="https://bit.ly/broken-link"
              /> */}
              {/* <div className="border-primary border-2 bg-warning-light text-warning w-12 h-12 mr-8 rounded-full inline-flex items-center align-middle justify-center font-bold text-lg">
                {post.postedBy.fullName.split(" ").substr(0).join("")}
              </div> */}
            </div>

            <div className="ml-3 flex flex-col w-full">
              <h1 className="text-text-primary font-semibold">
                {post.postedBy.fullName}
              </h1>
              <h2 className="text-text-secondary">{post.postedBy.userName}</h2>
            </div>
          </div>
          <p className="text-secondary tracking-normal text-md">
            {post.content}
          </p>
          <div className="mt-2">
            <BsHeart className="mt-8 w-6 h-6 text-danger cursor-pointer " />
            <p className="mt-2 font-semibold text-secondary">0 Like(s)</p>
          </div>
        </div>
      </section>
    </>
  );
}
