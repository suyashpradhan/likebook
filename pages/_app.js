// eslint-disable-next-line import/no-extraneous-dependencies
import "tailwindcss/tailwind.css";
import { AuthContextProvider } from "../context/auth-context/context";

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
