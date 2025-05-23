import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout (){
    return (
        <>
        <Header />
        <div className="app">
        <Outlet />
         </div>
         
        <footer className="footer">
            <div className="container">
            <p>❤️ 2025 Sports Venue Booking</p>
            </div>
        </footer>
       </>
    );
}