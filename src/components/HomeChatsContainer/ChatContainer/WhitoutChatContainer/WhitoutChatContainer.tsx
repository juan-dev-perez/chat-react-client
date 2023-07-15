import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WhitoutChatContainer() {
  return (
    <Box sx={{
      height:'100vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      gap:2
    }}>
      <Typography variant="h4">
        No chat selected
      </Typography>
      <Typography variant="h4">
        start a conversation
      </Typography>
    </Box>
  )
}
