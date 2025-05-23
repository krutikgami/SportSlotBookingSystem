import {  Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div >
        <div className="header-content">
          <nav className="nav">
             <h1 style={{color: "black"}}>SportSpot</h1>
              <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to='/book' className="nav-link active">Book</Link>
                <Link to="/mybooking" className="nav-link">My Bookings</Link>
                </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;