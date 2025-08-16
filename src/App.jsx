import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SelectRole from "./component/SelectRole";
import DriveForm from "./component/DriverForm";
import CustomForm from "./component/CustomerForm";
import Signin from "./component/Signin";
import DriverProfile from "./component/DriverProfile";
import CustomerProfile from "./component/CustomerProfile";
import CustomerSignin from "./component/CustomerSignin";
import DeleteProfile from "./component/DeleteProfile";
import UpdateProfile from "./component/UpdateProfile";
import { UserProvider } from "./Context/UserContext";
import ShowAllDrivers from "./component/ShowAllDrivers";
import CustomerDetails from "./component/CustomerDetails";
import UpdateCustomer from "./component/UpdateCustomer";
import BookingList from "./component/BookingList";
import BookingPage from "./component/BookingPage";
import PaymentPage from "./component/PaymentPage";

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SelectRole />} />
            <Route path="/driverform" element={<DriveForm />}></Route>
            <Route path="customerform" element={<CustomForm />} />
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="customersignin" element={<CustomerSignin />}></Route>
            <Route path="/driverprofile/:id" element={<DriverProfile />} />
            <Route path="/updateprofile/:id" element={<UpdateProfile />} />
            <Route path="/deleteprofile" element={<DeleteProfile />} />
            <Route
              path="/customerprofile/:id"
              element={<CustomerProfile />}
            ></Route>
            <Route path="/alldrivers" element={<ShowAllDrivers />} />
            <Route
              path="/customerdetails/:id"
              element={<CustomerDetails />}
            ></Route>
            <Route
              path="/updatecustomer/:id"
              element={<UpdateCustomer />}
            ></Route>
            <Route path="/bookinglist" element={<BookingList />}></Route>
            <Route path="/bookingpage" element={<BookingPage />} />
            <Route path="/paymentpage" element={<PaymentPage />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
