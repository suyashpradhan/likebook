import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  const logoutHandler = () => {
    Cookies.remove("jwt");
    Cookies.remove("userName");
    Cookies.remove("fullName");
    Cookies.remove("isLoggedIn");
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 font-default shadow py-1 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link href="/feed">
                <a>LikeBook</a>
              </Link>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    <h2>Hello, {Cookies.get("fullName")}</h2>
                    <button
                      className="bg-primary py-2 px-8"
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
        </div>
      </nav>
    </>
  );
}
