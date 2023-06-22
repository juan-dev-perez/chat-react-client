import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import HomeChatsContainer from "../components/HomeChatsContainer/HomeChatsContainer";

const Router = () => {
    
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeChatsContainer/>}/>
                    <Route path="/*" element={<Navigate to='/'/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
        </BrowserRouter>
    )
}

export default Router;