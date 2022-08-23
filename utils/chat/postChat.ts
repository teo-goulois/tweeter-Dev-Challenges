import toast from "react-hot-toast";
import { Chat } from "../../types/typing";

export default async function postChat(body: Chat) {
  const response = await fetch(`/api/chat/postChat`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (response.status === 200) {
    await fetch(`/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    return toast.error(data.message);
  }
}
