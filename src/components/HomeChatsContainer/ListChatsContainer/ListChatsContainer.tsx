import { useState } from "react";
import List from "@mui/material/List";
import { useChat } from "../../../context/useChat";
import ChatItem from "./ChatItem/ChatItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import NewChatModal from "./NewChatModal/NewChatModal";

export default function ListChatsContainer() {
  const { chats } = useChat();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        display: "grid",
        direction: "row",
        gridTemplateRows: "1fr 70px",
        gridTemplateColumns: "1fr",
        height: "100%",
      }}
    >
      <List sx={{ padding: 0, margin: 0 }}>
        {chats.map((chat) => (
          <ChatItem chat={chat} key={chat._id} />
        ))}
      </List>
      <Button
        variant="contained"
        color="inherit"
        endIcon={<SendIcon />}
        sx={{ textTransform: "capitalize" }}
        onClick={handleClickOpen}
      >
        Start a new chat
      </Button>
      {/* Modal para comenzar un nuevo chat */}
      <NewChatModal open={open} close={handleClose}/>
    </Grid>
  );
}
