import Login from "../components/Login/Login";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>LikeBook</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Head>
        <meta property="og:title" content="LikeBook" key="title" />
      </Head>
      <Login />
    </>
  );
}
