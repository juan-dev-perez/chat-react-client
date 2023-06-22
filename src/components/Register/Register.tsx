import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
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
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl variant="standard">
          <Input type="email" name="email" placeholder="Email" onChange={handleChange}/>
        </FormControl>

        <FormControl variant="standard">
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </FormControl>

        <FormControl variant="standard">
          <Input type="text" name="fullName" placeholder="Full name" onChange={handleChange} />
        </FormControl>

        <FormControl variant="standard">
          <Input type="phone" name="phone" placeholder="Phone" onChange={handleChange} />
        </FormControl>

        <FormControl variant="standard">
          <Input type="number" name="age" placeholder="Age" onChange={handleChange} />
        </FormControl>

        <FormControl variant="standard">
          <Button type="submit" variant="contained">Register</Button>
        </FormControl>
      </form>
    </Container>
  )
}