import Link from "next/link";
import { registerUser } from "../../server/helpers/urls";
import { useStateContext } from "../../context/context";
import { useRouter } from "next/router";

export default function RegisterUserCard() {
  const { state, dispatch } = useStateContext();
  const router = useRouter();

  const handleTextInputs = (e) => {
    dispatch({
      type: "HANDLE_SIGNUP_INPUTS",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        fullName: state.fullName,
        userName: state.userName,
        password: state.password,
      });

      if (response) {
        return setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      dispatch({
        type: "SET_ERRORS",
        payload: response.message,
      });
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
        <div className="p-5 bg-background-light md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-primary">
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
                className="text-sm font-semibold text-secondary"
              >
                Fullname
              </label>
              <input
                type="text"
                name="fullName"
                className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                value={state.fullName}
                onChange={handleTextInputs}
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
                className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                value={state.userName}
                onChange={handleTextInputs}
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
                className="px-4 py-2 transition duration-300 bg-background rounded-md  focus:border-transparent focus:outline-none text-white focus:ring-1 focus:ring-accent-200"
                value={state.password}
                onChange={handleTextInputs}
              />
            </div>
            <p>{errors}</p>
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
