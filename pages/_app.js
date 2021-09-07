// eslint-disable-next-line import/no-extraneous-dependencies
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
