import { createContext, useState } from "react";


const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [drivers, setdrivers] = useState([
    {
      fullName: "",
      address: "",
      licenseNumber: "",
      phNo: "",
      age: "",
      status: "",
      ratePerHour: "",
    },
  ]);
  const [customers, setcustomers] = useState([
    {
      fullName: "",
      transportName: "",
      phNo: "",
      vehicleNo: "",
    },
  ]);

  return (
    <userContext.Provider
      value={{ drivers, setdrivers, customers, setcustomers }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
