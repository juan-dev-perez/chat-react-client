import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { login } from "../../api/api";
import { saveJWT, getJWT } from '../../common/auth-cookie';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
      if(getJWT()) navigate('/');
    },[]);

    const [user, setUser] = useState({
        email: '',
        password: '',
      });
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await login(user);
        saveJWT(data.token);
        navigate('/');
    }

  return (
    <Container sx={{
      display:'flex',
      justifyContent:'center',
      alignItems: 'center',
    }}>
      <Box 
        component="form"
        onSubmit={handleSubmit}
        bgcolor={'white'}
        sx={{
          padding:4,
          boxShadow:3,
          borderRadius:3,
          marginTop:20,
          maxWidth:450
        }}
      >
        <Typography variant='h4' sx={{
          marginTop:2,
          textAlign: 'center',
          color: 'text.secondary',
        }}>
          Chat App
        </Typography>

        <Typography variant='subtitle1' sx={{
          marginBottom:2,
          textAlign: 'center',
          color: 'text.secondary',
        }}>
          Log In
        </Typography>

        <TextField
          fullWidth
          variant='standard'
          type="email"
          name="email"
          label="Email"
          onChange={handleChange}
          sx={{marginY:1}}
        />

        <TextField 
          fullWidth 
          variant='standard' 
          type="password" 
          name="password" 
          label="Password" 
          onChange={handleChange} 
          sx={{marginY:1}}
        />

        <Button 
          type="submit" 
          variant="contained"
          sx={{
            marginTop:3,
            marginBottom:1
          }}
        >
          Log in
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate('/register')}
          sx={{
            marginTop:3,
            marginBottom:1,
            marginLeft:3
          }}
        >
          Create new account
        </Button>
      </Box>
    </Container>
  )
}