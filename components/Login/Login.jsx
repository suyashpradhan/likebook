import Link from "next/link";
import { useReducer } from "react";
import {
  authReducer,
  initialState,
} from "../../reducers/auth-reducer/auth-reducer.js";
import { loginUser } from "../../services/authentication.services";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth-context/context.js";

// LoginCard Component
export default function Login() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { authDispatch } = useAuth();
  const router = useRouter();

  // Function to get text inputs value
  const handleTextInputs = (e) => {
    dispatch({
      type: "HANDLE_INPUTS",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      userName: state.userName,
      password: state.password,
    });
    if (response.status === 201) {
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

      Cookies.set("isLoggedIn", true);
      Cookies.set("jwt", response.data.token);
      Cookies.set("userName", response.data.user.userName);
      Cookies.set("fullName", response.data.user.fullName);
      Cookies.set("userId", response.data.user._id);
      router.push("/user/feed");
    } else {
      authDispatch({
        type: "SET_ERRORS",
        payload: response.message,
      });
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen font-default p-4 bg-background lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <h2 className="my-3 text-4xl font-bold tracking-wider text-center">
              LikeBook
            </h2>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              With the power of K-WD, you can now focus only on functionaries
              for your digital products, while leaving the UI design on us!
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Dont have an account?</span>
              <Link href="/register">
                <a className="underline">Get Started</a>
              </Link>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <form
              onSubmit={handleFormSubmit}
              action="#"
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="userName"
                  className="text-sm font-semibold text-gray-500"
                >
                  Username
                </label>
                <input
                  type="userName"
                  name="userName"
                  value={state.userName}
                  onChange={handleTextInputs}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleTextInputs}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  autoComplete="true"
                />
              </div>
              <p>{state.errors}</p>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-lg uppercase font-bold  text-white  bg-primary rounded-md shadow focus:outline-none focus:ring-primary focus:ring-1 my-2"
                >
                  Log in
                </button>
                {/* <span className="flex justify-center my-2 color-text-primary ">
                  or
                </span>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-lg uppercase font-bold  text-white 
                  rounded-md focus:outline-none focus:ring-primary focus:ring-1 "
                >
                  Guest Login
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
