import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../../../../context/useChat";
import { ChangeEvent, FormEvent, useState } from "react";
import { newMessage } from "../../../../api/api";
import { getJWT } from "../../../../common/auth-cookie";
import { emitFromClient } from "../../../../websockets/socket";

interface PropsNewChatModal {
  open: boolean;
  close: () => void;
}

export default function NewChatModal(props: PropsNewChatModal) {
  const { allUsers } = useChat();
  const [message, setMessage] = useState<string>("");
  const [param, setParam] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMess = {
      receivingUser: selectedUserId,
      message,
    };
    const { data } = await newMessage(newMess, getJWT());
    if (data) {
      handleCloseModal();
      emitFromClient(data);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParam(e.target.value);
    setSelectedUserId("");
  };

  const handleCloseModal = () => {
    props.close();
    setTimeout(() => {
      setParam("");
      setSelectedUserId("");
      setMessage("");
    }, 500);
  };

  const users = !param
    ? allUsers
    : allUsers.filter((oneUser) =>
        oneUser.fullName.toLowerCase().includes(param.toLocaleLowerCase())
      );

  return (
    <Dialog open={props.open} onClose={handleCloseModal} scroll="paper">
      <DialogTitle sx={{ padding: "16px 20px" }}>
        <TextField
          autoFocus
          margin="none"
          name="findUser"
          placeholder="Find a user"
          type="text"
          fullWidth
          variant="standard"
          value={param}
          onChange={handleOnChange}
        />
      </DialogTitle>

      <DialogContent dividers={true} sx={{ padding: "0px", minWidth:'400px' }}>
        <List sx={{ padding: "0px" }}>
          {users.map((user) => (
            <ListItemButton
              key={user._id}
              onClick={() => setSelectedUserId(user._id)}
              selected={user._id === selectedUserId}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ marginRight: 1, width: 50, height: 50 }}
                  alt={user.fullName}
                  src={user.photo}
                />
              </ListItemAvatar>

              <ListItemText
                sx={{ marginLeft: 1 }}
                primary={user.fullName}
                secondary={user.email}
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>

      <DialogContent sx={{ padding: "16px 20px" }}>
        <Box component={"form"} onSubmit={handleSubmit}>
          <TextField
            InputProps={{
              endAdornment: (
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={message === "" || selectedUserId === ""}
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
            margin="none"
            name="message"
            placeholder="Send a message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
