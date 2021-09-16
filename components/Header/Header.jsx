import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useStateContext } from "../../context/state-context";

export default function Header() {
  const { state, dispatch } = useStateContext();
  const router = useRouter();

  const logoutHandler = () => {
    Cookies.remove("jwt");
    Cookies.remove("userName");
    Cookies.remove("fullName");
    Cookies.remove("isLoggedIn");
    Cookies.remove("userId");
    dispatch({ type: "CLEAR_STATE_DATA", payload: [] });
    router.push("/");
  };

  return (
    <>
      <nav className="bg-background border-b-2 border-background-light dark:bg-gray-800 font-default shadow py-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl text-white flex items-center">
              <Link href="/feed">
                <a>LikeBook</a>
              </Link>
            </div>
            <div className="">
              <div className="ml-4 md:ml-6">
                <div className="ml-3 flex space-between items-center">
                  <h2 className="block text-white text-lg mr-4">
                    Welcome, {state.userDetails.fullName}
                  </h2>
                  <button
                    className="px-5 py-2 text-lg text-white border-danger border-2 rounded-md shadow focus:outline-none focus:ring-danger focus:ring-1 my-2"
                    onClick={logoutHandler}
                  >
                    {" "}
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
