import Link from "next/link";
import { registerUser } from "../../server/helpers/urls";
import { useStateContext } from "../../context/state-context";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const { dispatch } = useStateContext();
  const [formInputs, setFormInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const router = useRouter();

  // Function to get text inputs value
  const handleTextInputs = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  // Submit Handler for user signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser({
      fullName: formInputs.fullName,
      userName: formInputs.userName,
      password: formInputs.password,
    });

    if (response.status === 201) {
      return setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setErrors(response.message);
    }
  };

  return (
    <div className="flex items-center min-h-screen font-default p-4 bg-background lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-accent md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <h2 className="my-3 text-4xl font-bold tracking-wider text-center">
            LikeBook
          </h2>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            A Scable Like System like Facebook where multiple users can post
            their messages and like/unlike other users posts
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
        <div className="p-5 bg-background-light md:flex-1">
          <h3 className="mt-4 mb-8 text-2xl font-semibold text-primary">
            Create an account
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="fullName" className="text-sm  text-secondary">
                Fullname
              </label>
              <input
                type="text"
                name="fullName"
                className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                value={formInputs.fullName}
                onChange={handleTextInputs}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label for="userName" className="text-sm  text-secondary">
                Username
              </label>
              <input
                type="text"
                name="userName"
                className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                value={formInputs.userName}
                onChange={handleTextInputs}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label for="password" className="text-sm text-secondary">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                value={formInputs.password}
                onChange={handleTextInputs}
              />
            </div>

            <p className="text-secondary text-center my-4">{errors}</p>
            <div>
              <button
                type="submit"
                className="w-full px-2 py-3 text-lg uppercase   text-white  bg-accent rounded-md shadow focus:outline-none focus:ring-primary focus:ring-1 my-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
