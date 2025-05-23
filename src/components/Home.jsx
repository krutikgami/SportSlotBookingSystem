import { Link } from 'react-router-dom';
import '../App.css'; // Import your CSS file for styling

export function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Sports Venue Booking</h1>
        <p>Book your favorite sports venues and track your bookings with ease!</p>
        <Link to="/book" className="btn-primary">Book Now</Link>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Instant Booking</h3>
            <p>Reserve your spot at top sports venues in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>Booking History</h3>
            <p>View and manage all your past and upcoming bookings.</p>
          </div>
          <div className="feature-card">
            <h3>User-Friendly</h3>
            <p>A clean, easy-to-use interface for hassle-free sports scheduling.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
