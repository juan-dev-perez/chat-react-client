import Grid from "@mui/material/Grid";
import InputMessage from "./InputMessage/InputMessage";
import InfoOtherUser from "./InfoOtherUser/InfoOtherUser";
import MessagesContainer from "./MessagesContainer/MessagesContainer";

export default function WhitChatContainer() {
  
  return (
    <Grid container
      sx={{
        display:'grid',
        direction:'row',
        gridTemplateRows: '60px 1fr 60px',
        gridTemplateColumns: '1fr',
        height:'100%'
    }}>
      <InfoOtherUser/>
      <MessagesContainer/>
      <InputMessage/>
    </Grid>
  )
}