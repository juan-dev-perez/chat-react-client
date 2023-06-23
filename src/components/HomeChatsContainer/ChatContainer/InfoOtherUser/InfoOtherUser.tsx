import { useChat } from "../../../../context/useChat";

export default function InfoOtherUser() {

  const { otherUser } = useChat();

  return (
    <div>
      {otherUser?.fullName}
    </div>
  )
}
