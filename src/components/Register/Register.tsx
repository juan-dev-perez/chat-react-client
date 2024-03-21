import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { register } from "../../api/api";
import { saveJWT, getJWT } from "../../common/auth-cookie";


export default function Register() {

    const navigate = useNavigate();

    useEffect(() => {
      if(getJWT()) navigate('/');
    });

    const [newUser, setNewUser] = useState({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      age: 0
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value});
      }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { data } = await register({...newUser,age: +newUser.age});
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
          Sing In
        </Typography>

        <TextField
          fullWidth
          variant='standard'
          type="email"
          name="email"
          label="Email"
          onChange={handleChange}
          required
          sx={{marginY:1}}
        />

        <TextField 
          fullWidth 
          variant='standard' 
          type="password" 
          name="password" 
          label="Password" 
          onChange={handleChange} 
          required
          sx={{marginY:1}}
        />

        {/* TODO: HACER VALIDACION PARA QUE REPITA EL PASSWORD */}
        {/* <TextField 
          fullWidth 
          variant='standard' 
          type="password" 
          // name="password" 
          label="Password" 
          // onChange={handleChange} 
          required
          sx={{marginY:1}}
        /> */}

        <TextField 
          fullWidth 
          variant='standard' 
          type="text" 
          name="fullName" 
          label="Full Name" 
          onChange={handleChange} 
          required
          sx={{marginY:1}}
        />

        <TextField 
          fullWidth 
          variant='standard' 
          type="phone" 
          name="phone" 
          label="Phone Number" 
          onChange={handleChange} 
          required
          sx={{marginY:1}}
        />

        <TextField 
          fullWidth 
          variant='standard' 
          type="number" 
          name="age" 
          label="Age" 
          onChange={handleChange} 
          required
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
          Create account
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate('/login')}
          sx={{
            marginTop:3,
            marginBottom:1,
            marginLeft:3
          }}
        >
          Go to log in
        </Button>
      </Box>
    </Container>
  )
}