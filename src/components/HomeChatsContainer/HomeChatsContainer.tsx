import Grid from "@mui/material/Grid";
import { ChatProvider } from "../../context/ChatContext";
import ChatContainer from "./ChatContainer/ChatContainer";
import ListChatsContainer from "./ListChatsContainer/ListChatsContainer";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import Divider from "@mui/material/Divider";

export default function HomeChatsContainer() {

  return (
    <ChatProvider>
      <Grid container
        bgcolor={'white'}
        display={'grid'}
        direction={'column'}
        sx={{
        width:'80%',
        margin:'auto',
        height:'95vh',
        marginY:3,
        boxShadow:3,
        borderRadius:3,
        gridTemplateRows: '60px 1fr',
        gridTemplateColumns: '1fr 1fr 1fr'
      }}>

        <Grid item sx={{
          gridColumn: '1 / 2',
          gridRow: '1',
          borderRight:1,
          borderColor:'divider'
        }}>
          <ProfileContainer />
        </Grid>

        <Grid item sx={{
          gridColumn: '1 / 2',
          gridRow: '2',
          borderRight:1,
          borderColor:'divider'
        }}>
          <ListChatsContainer/>
        </Grid>

        <Grid item sx={{
          gridColumn: '2 / 4',
          gridRow: '1 / 3'
        }}>
          <ChatContainer/>
        </Grid>

      </Grid>
    </ChatProvider>
  )
}