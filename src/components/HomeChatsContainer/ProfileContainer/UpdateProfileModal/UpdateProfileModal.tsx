import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useState } from "react";
import { useChat } from "../../../../context/useChat";

export default function UpdateProfileModal() {
  const { user } = useChat();

  const [updateUser, setUpdateUser] = useState({
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    age: user.age,
    photo: user.photo,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

// TODO: hacer la funcion para actualizar los datos 

  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const { data } = await register({ ...newUser, age: +newUser.age });
  //     saveJWT(data.token);
  //   };
//   console.log(updateUser);

  return (
    <Box
      component="form"
      // onSubmit={handleSubmit}
      bgcolor={"white"}
      sx={{
        padding: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginY: 2,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Update Profile
      </Typography>

      <TextField
        fullWidth
        variant="standard"
        type="email"
        name="email"
        label="Email"
        value={updateUser.email}
        disabled={true}
        required
        sx={{ marginY: 1 }}
      />

      <TextField
        fullWidth
        variant="standard"
        type="text"
        name="fullName"
        label="Full Name"
        onChange={handleChange}
        value={updateUser.fullName}
        required
        sx={{ marginY: 1 }}
      />

      <TextField
        fullWidth
        variant="standard"
        type="phone"
        name="phone"
        label="Phone Number"
        onChange={handleChange}
        value={updateUser.phone}
        required
        sx={{ marginY: 1 }}
      />

      <TextField
        fullWidth
        variant="standard"
        type="number"
        name="age"
        label="Age"
        onChange={handleChange}
        value={updateUser.age}
        required
        sx={{ marginY: 1 }}
      />

      {/* TODO: hacer el modulo para cargar imagenes en el servidor */}
      {/* <TextField
        fullWidth
        variant="standard"
        type="number"
        name="age"
        label="Age"
        //   onChange={handleChange}
        required
        sx={{ marginY: 1 }}
      /> */}

      <Button
        type="submit"
        variant="contained"
        color="inherit"
        fullWidth
        sx={{
          marginTop: 3,
          textTransform: "capitalize",
        }}
      >
        Update
      </Button>
    </Box>
  );
}
