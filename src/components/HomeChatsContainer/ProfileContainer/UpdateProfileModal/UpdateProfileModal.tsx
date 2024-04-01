import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useState } from "react";
import { useChat } from "../../../../context/useChat";
import { updateProfile, uploadUserPhoto } from "../../../../api/api";
import { getJWT } from "../../../../common/auth-cookie";
import Avatar from "@mui/material/Avatar";
import axios, { AxiosError } from "axios";

type close = () => void;

export default function UpdateProfileModal({ close }: { close: close }) {
  const { user, updateUser: userUpdate, renderNotification } = useChat();
  const [photo, setPhoto] = useState<FormData | null>(null);
  const [updateUser, setUpdateUser] = useState({
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    age: user.age,
    photo: user.photo,
  });

  const handleGetPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const photoValue = e.target.files;
    if (photoValue && photoValue.length > 0) {
      const formData = new FormData();
      formData.append("photo", photoValue[0]);
      setPhoto(formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const getUrlPhotoUser = async () => {
    if (photo) {
      try {
        const { data } = await uploadUserPhoto(photo, getJWT());
        return data;
      } catch (error) {
        return null;
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlPhoto = await getUrlPhotoUser();

    try {
      if (urlPhoto === null) throw new Error("Could not upload image");
      const { data } = await updateProfile(
        { ...updateUser, age: +updateUser.age, photo: urlPhoto },
        getJWT()
      );
      userUpdate(data);
      close();
      renderNotification(true, "Profile updated successfully");
    } catch (err) {
      let message = "Image format error or too large";
      if (axios.isAxiosError(err)) {
        const error: AxiosError = err;
        if (error.code === "ERR_NETWORK") message = "Server connection error";
      }
      close();
      renderNotification(false, message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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

      {/* TODO: Poner mas bonito el avatar y el boton de carga de imagen */}
      {/* TODO: Tambien poner un boton para eliminar la foto */}
      <Avatar
        alt="User's photo"
        src={user.photo}
        sx={{ width: 100, height: 100 }}
      />

      <TextField
        fullWidth
        variant="standard"
        type="file"
        name="photo"
        // label="Photo"
        onChange={handleGetPhoto}
        sx={{ marginY: 1 }}
      />

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
