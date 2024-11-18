import { useState, useEffect,CSSProperties } from 'react';
import  BarLoader from "react-spinners/ClipLoader";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
//import Loader from './components/Loader';
const override: CSSProperties = {
  display: "block",
  position: "fixed",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  
 
};

const App=()=>{
  const { isLoggedIn } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Simulate a 1-second delay
    };

    handleStart();
    handleComplete();
  }, []);
  return(
    <>
    {loading && <BarLoader
  
  //loading={true}
  // size={50}
  cssOverride={override}
  color="#25a1d3"
/>}
    <Router>
      <Routes>
      <Route
          path="/"
          element={
            <Layouts>
              <Home />
            </Layouts>
          }
        />

        
        
       <Route path="/register" element={<Layouts><Register /></Layouts>}/>
       <Route
          path="/sign-in"
          element={
            <Layouts>
              <SignIn />
            </Layouts>
          }
        />
        <Route
          path="/search"
          element={
            <Layouts>
              <Search />
            </Layouts>
          }
        />
          <Route
          path="/detail/:hotelId"
          element={
            <Layouts>
              <Detail />
            </Layouts>
          }
        />

         {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layouts>
                  <Booking />
                </Layouts>
              }
            />
             <Route
              path="/add-hotel"
              element={
                <Layouts>
                  <AddHotel />
                </Layouts>
              }
              />
              <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layouts>
                  <EditHotel />
                </Layouts>
              }
              />
               <Route
              path="/my-hotels"
              element={
                <Layouts>
                  <MyHotels />
                </Layouts>
              }
              />
                <Route
              path="/my-bookings"
              element={
                <Layouts>
                  <MyBookings />
                </Layouts>
              }
            />
              </>
            )}
         
         
       <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
    </>
    
  );
};
export default App;