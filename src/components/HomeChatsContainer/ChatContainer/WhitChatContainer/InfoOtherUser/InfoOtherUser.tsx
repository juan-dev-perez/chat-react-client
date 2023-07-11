import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { useChat } from "../../../../../context/useChat";

export default function InfoOtherUser() {

  const { otherUser } = useChat();

  return (
    <List sx={{ padding:0, margin:0, height:'100%', bgcolor:'secondary'}}>
      <ListItem sx={{ height:'100%' }}>

        <ListItemAvatar>
          <Avatar 
            sx={{ marginBottom:1, width:70, height:70 }} 
            alt={otherUser.fullName} 
            src="/static/images/avatar/1.jpg"
            />
        </ListItemAvatar>

        <ListItemText 
          primary={otherUser.fullName} 
          secondary={'online'}
          sx={{ marginLeft:2 }} 
        />

      </ListItem>
    </List>
  )
}
