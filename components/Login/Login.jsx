import Link from "next/link";
import { useStateContext } from "../../context/state-context";
import { loginUser } from "../../server/helpers/urls";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";

// Login Component
export default function Login() {
  const { dispatch } = useStateContext();
  const [formInputs, setFormInputs] = useState({
    userName: "",
    password: "",
  });
  const router = useRouter();

  // Function to get text inputs value
  const handleTextInputs = (e) => {
    return setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  // Submit Handler for user login
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      userName: formInputs.userName,
      password: formInputs.password,
    });
    if (response.status === 201) {
      dispatch({
        type: "SET_USER_LOGIN_DETAILS",
        payload: {
          userDetails: {
            userName: response.data.user.userName,
            fullName: response.data.user.fullName,
            userId: response.data.user._id,
          },
        },
      });
      router.push("/user/feed");

      // Setting State Values into Brower Cookie
      Cookies.set("isLoggedIn", true);
      Cookies.set("jwt", response.data.token);
      Cookies.set("userName", response.data.user.userName);
      Cookies.set("fullName", response.data.user.fullName);
      Cookies.set("userId", response.data.user._id);
    } else {
      /* dispatch({
        type: "SET_ERRORS",
        payload: data.message,
      }); */
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen font-default p-4 bg-background lg:justify-center">
        <div className="flex flex-col overflow-hidden  rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white border-accent bg-accent md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <h2 className="my-3 text-4xl font-bold tracking-wider text-center">
              LikeBook
            </h2>
            <p className="mt-6 font-normal text-center text-white md:mt-0">
              With the power of K-WD, you can now focus only on functionaries
              for your digital products, while leaving the UI design on us!
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Dont have an account?</span>
              <Link href="/register">
                <a className="underline text-white">Get Started</a>
              </Link>
            </p>
          </div>
          <div className="p-5 border-background-light bg-background-light md:flex-1">
            <h3 className="mt-2 mb-6 text-2xl font-semibold text-white">
              Account Login
            </h3>
            <form
              onSubmit={handleFormSubmit}
              action="#"
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor="userName" className="text-sm  text-secondary">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formInputs.userName}
                  onChange={handleTextInputs}
                  className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm  text-secondary">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formInputs.password}
                  onChange={handleTextInputs}
                  className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-lg uppercase font-bold  text-white  bg-accent rounded-md shadow focus:outline-none focus:ring-primary focus:ring-1 my-2"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
