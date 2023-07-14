import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { useChat } from "../../../../../context/useChat";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

export default function InfoOtherUser() {

  const { otherUser, closeChat } = useChat();

  return (
    <List 
      sx={{ 
      padding:0,
      margin:0, 
      height:'100%', 
      bgcolor:'secondary', 
      backgroundColor:'#cacaca',
      borderRadius:'0 12px 0 0'
    }}>
      <ListItem sx={{ height:'100%' }} secondaryAction={
        <Tooltip title="Close chat" placement="left" TransitionComponent={Zoom}>
          <IconButton 
            onClick={ closeChat }
            sx={{ marginRight:1 }}>
              <CloseIcon />
          </IconButton>
        </Tooltip>
      }>

        <ListItemAvatar>
          <Avatar 
            sx={{ marginRight:1, width:70, height:70 }} 
            alt={otherUser.fullName} 
            src="/static/images/avatar/1.jpg"
            />
        </ListItemAvatar>

        <ListItemText 
          primary={otherUser.fullName} 
          secondary={'pendiente poner online o ultima conexion'}
          sx={{ marginLeft:2 }} 
        />

      </ListItem>
    </List>
  )
}
