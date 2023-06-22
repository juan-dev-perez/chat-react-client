import { Chat } from "../../../../interfaces/context.interfaces";

interface Props {
    chat: Chat;
  }

export default function ChatItem({chat}:Props) {
  return (
    <div>
        {chat.messages[0].message}
    </div>
  )
}
