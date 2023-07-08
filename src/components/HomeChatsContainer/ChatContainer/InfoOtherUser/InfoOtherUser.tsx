import Box from "@mui/material/Box";
import { useChat } from "../../../../context/useChat";

export default function InfoOtherUser() {

  const { otherUser } = useChat();

  return (
    <Box borderBottom={1}>
      {otherUser?.fullName}
    </Box>
  )
}
