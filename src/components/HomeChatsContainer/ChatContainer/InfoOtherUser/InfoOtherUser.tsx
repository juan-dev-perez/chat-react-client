import Box from "@mui/material/Box";
import { useChat } from "../../../../context/useChat";

export default function InfoOtherUser() {

  const { otherUser } = useChat();

  return (
    <Box>
      {otherUser?.fullName}
    </Box>
  )
}
