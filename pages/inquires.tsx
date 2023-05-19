import { useEffect, useState } from "react";
import SessionReact from "supertokens-auth-react/recipe/session";
import SuperTokensReact from "supertokens-auth-react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { Input, Modal, Textarea } from "@mantine/core";

interface ILink {
  name: string;
  onClick: () => void;
  icon: string;
}

function ProtectedPage() {
  const session: any = useSessionContext();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<any>();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const [isOpened, setIsOpened] = useState(false);

  if (session.loading === true) {
    return null;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("session contenxt", session);

  async function logoutClicked() {
    await SessionReact.signOut();
    SuperTokensReact.redirectToAuth();
  }

  async function fetchPosts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/posts`
    );
    if (res.status === 200) {
      const json = await res.json();
      setPosts(json);
    }
  }

  const postData = {
    content: postContent,
    user_id: session.userId,
    title: postTitle,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  const onSubmit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/posts`,
      options
    );

    await fetchPosts();
  };

  function openLink(url: string) {
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen h-full bg-slate-900">
      <section className="flex justify-between p-5">
        <h1 className="text-3xl text-gray-300 font-medium">Med App</h1>
        <section className="flex space-x-4">
          <button
            className="bg-sky-700 rounded-lg px-4 py-2 text-slate-300"
            onClick={() => setIsOpened(true)}
          >
            Create Inquiry
          </button>
          <button
            className="bg-red-700 rounded-lg px-4 py-2 text-slate-300"
            onClick={logoutClicked}
          >
            Logout
          </button>
        </section>
      </section>

      {posts && posts.length > 0 ? (
        <section className="grid grid-cols-3 gap-10 mt-10 mx-10">
          {posts.map((item) => (
            <div className="bg-slate-800 p-4 rounded-md">
              <section className="flex justify-between">
                <h4 className="text-slate-300 text-lg font-medium capitalize">
                  {item.title}
                </h4>
                {/* <button className="text-red-800 text-xs">delete</button> */}
              </section>
              <p className="text-xs text-slate-300 mb-2">{item.owner_email}</p>
              <p className="text-slate-300">{item.content}</p>
            </div>
          ))}
        </section>
      ) : null}

      <Modal opened={isOpened} onClose={() => setIsOpened(false)}>
        <div className="flex flex-col space-y-4">
          <h3>Enter details of the Inquiry</h3>
          <Input
            title="Title"
            placeholder="Title"
            variant="filled"
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <Textarea
            title="Content"
            placeholder="Content"
            variant="filled"
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button
            className="bg-sky-600 rounded-lg px-4 py-2 text-slate-100 text-sm"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function Inquires(props) {
  return (
    <SessionReact.SessionAuth>
      <ProtectedPage />
    </SessionReact.SessionAuth>
  );
}
