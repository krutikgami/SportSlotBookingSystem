import './App.css'
import VenueBooking from './components/VenueBooking'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Layout from './Layout'
import { Home } from './components/Home'
import { MyBooking } from './components/MyBooking'

function App() {
  return (
    // <div className="app">
    //   <Header />
    //   <main className="container">
    //     <VenueBooking />
    //   </main>
    //   <footer className="footer">
    //     <div className="container">
    //       <p>❤️ 2025 Sports Venue Booking</p>
    //     </div>
    //   </footer>
    // </div>
      <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<VenueBooking />} />
          <Route path="mybooking" element={<MyBooking />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App