import Login from "../components/Login/Login";
import { getAllPosts } from "../server/controllers/postController";

export default function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}
