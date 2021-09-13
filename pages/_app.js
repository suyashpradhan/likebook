import "tailwindcss/tailwind.css";
import { StateContextProvider } from "../context/context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </>
  );
}

export default MyApp;
