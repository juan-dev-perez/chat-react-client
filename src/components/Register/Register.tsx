import { ChangeEvent, FormEvent, useState } from "react";
import { register } from "../../api/api";
import { saveJWT, getJWT } from "../../common/auth-cookie";

export default function Register() {

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
      console.log(getJWT());
    }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="email" onChange={handleChange}/>
        <input type="password" name="password" placeholder="password" onChange={handleChange}/>
        <input type="text" name="fullName" placeholder="full name" onChange={handleChange}/>
        <input type="phone" name="phone" placeholder="phone" onChange={handleChange}/>
        <input type="number" name="age" placeholder="age" onChange={handleChange}/>
        <button>register</button>
      </form>
    </div>
  )
}