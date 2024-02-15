import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const App_Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default App_Layout;