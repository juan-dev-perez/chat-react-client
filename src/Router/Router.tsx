import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "../components/Register/Register";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;