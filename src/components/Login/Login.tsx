import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { login } from "../../api/api";
import { saveJWT, getJWT } from '../../common/auth-cookie';

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
      if(getJWT()) navigate('/');
    });

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
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl variant="standard">
          <Input type="email" name="email" placeholder="Email" onChange={handleChange}/>
        </FormControl>

        <FormControl variant="standard">
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </FormControl>

        <FormControl variant="standard">
          <Button type="submit" variant="contained">Log in</Button>
        </FormControl>
      </form>
    </Container>
  )
}