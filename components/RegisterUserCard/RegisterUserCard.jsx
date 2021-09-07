import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function RegisterUserCard() {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        fullName: inputs.fullName,
        userName: inputs.fullName,
        password: inputs.password,
      });
      return res;
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="flex items-center min-h-screen font-default p-4 bg-background lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <h2 className="my-3 text-4xl font-bold tracking-wider text-center">
            LikeBook
          </h2>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            With the power of K-WD, you can now focus only on functionaries for
            your digital products, while leaving the UI design on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Already have an account?</span>
            <Link href="/">
              <a href="0" className="underline">
                Log in
              </a>
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Create an account
          </h3>
          <form
            onSubmit={handleSubmit}
            action="#"
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-500"
              >
                Fullname
              </label>
              <input
                type="text"
                name="fullName"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                for="userName"
                className="text-sm font-semibold text-gray-500"
              >
                Username
              </label>
              <input
                type="text"
                name="userName"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-lg uppercase font-bold  text-white  bg-primary rounded-md shadow focus:outline-none focus:ring-primary focus:ring-4 my-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
