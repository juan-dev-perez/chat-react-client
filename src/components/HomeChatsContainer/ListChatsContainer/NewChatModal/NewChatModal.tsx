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

interface PropsNewChatModal {
  open: boolean;
  close: () => void;
}

export default function NewChatModal(props: PropsNewChatModal) {
  // const { otherUser } = useChat();
  // const [message, setMessage] = useState('');

  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // });

  //     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //         e.preventDefault();
  //         const newMess = {
  //           receivingUser: otherUser._id,
  //           message
  //         }
  //         const { data } = await newMessage(newMess, getJWT());
  //         if(data){
  //           setMessage('');
  //           emitFromClient(data);
  //         }
  //   }

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle sx={{ padding: "16px 20px" }}>
        <TextField
          margin="none"
          name="findUser"
          placeholder="Find a user"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogTitle>

      <DialogContent dividers={true} sx={{ padding: "0px" }}>
        <List sx={{ padding: "0px" }}>
          
        {[...new Array(5)].map( () => (
            <ListItemButton>
            <ListItemAvatar>
              <Avatar
                sx={{ marginRight: 1, width: 50, height: 50 }}
                alt={"receivingUser.fullName"}
                src={"receivingUser.photo"}
              />
            </ListItemAvatar>

            <ListItemText
              sx={{ marginLeft: 1 }}
              primary={"poner aqui el nombre"}
              secondary={"Poner aqui el email entre parentecis"}
            />
          </ListItemButton>
        ))}


        </List>
      </DialogContent>

      <DialogContent sx={{ padding: "16px 20px" }}>
        <Box
          component={"form"}
          //   onSubmit={handleSubmit}
        >
          <TextField
            // inputRef={inputRef}
            InputProps={{
              endAdornment: (
                <IconButton
                  type="submit"
                  color="primary"
                  //   disabled={message === ""}
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
            autoFocus
            margin="none"
            name="message"
            placeholder="Send a message"
            type="text"
            fullWidth
            variant="standard"
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
