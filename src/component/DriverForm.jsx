import { Button, Paper, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import userContext from "../Context/UserContext";
import DriverService from "../Service/DriverService";

const DriveForm = () => {
  const { drivers, setdrivers } = useContext(userContext);
  let navigate = useNavigate();
  let { id } = useParams();
  let [newdriver, setnewdriver] = useState({
    fullName: "",
    address: "",
    licenseNumber: "",
    phNo: "",
    age: "",
    status: "",
    ratePerHour: "",
  });
  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    paddingLeft: "30px",
    paddingRight: "30px",
  };
  let handlesubmit = () => {
    const allFieldsFilled = Object.values(newdriver).every(
      (val) => String(val).trim() !== ""
    );
    if (!allFieldsFilled) {
      alert("fill the all field");
    } else {
      DriverService.SaveDriver(newdriver)
        .then((res) => {
          localStorage.setItem("driver", JSON.stringify(res.data));
          setdrivers(res.data);
          alert("Registeration sucessfully completed");
          navigate(`/driverprofile/${res.data.id}`);
          console.log(newdriver);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  let handlechange = (e) => {
    let { name, value } = e.target;
    setnewdriver({
      ...newdriver,
      [name]: value,
    });
    // }
  };
  return (
    <userContext.Provider value={drivers}>
      <div className="driverprofile">
        <Paper elevation={7} style={paperstyle} className="dprofileitems">
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
            Driver Login
          </h1>
          <TextField
            fullWidth
            name="fullName"
            label="FullName"
            type="text"
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.fullName || ""}
          ></TextField>
          <TextField
            fullWidth
            name="address"
            label="Address"
            type="text"
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.address}
          ></TextField>
          <TextField
            fullWidth
            name="licenseNumber"
            label="License Number"
            type="text"
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.licenseNumber}
          ></TextField>
          <TextField
            fullWidth
            name="phNo"
            label="Phno"
            type="text"
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.phNo}
          ></TextField>
          <TextField
            fullWidth
            name="age"
            label="Age"
            type="text"
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.age}
          ></TextField>

          <Select
            fullWidth
            name="status"
            label="Status"
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.status} // ← fallback to " " if undefined
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="UnAvailable">UnAvailable</MenuItem>
          </Select>
          <TextField
            fullWidth
            type="text"
            name="ratePerHour"
            label="Rate Per Hour "
            style={{ marginBottom: "20px" }}
            onChange={handlechange}
            value={newdriver.ratePerHour}
          ></TextField>
          <Button
            variant="contained"
            fullWidth
            style={{ height: "40px" }}
            onClick={handlesubmit}
          >
            Register
          </Button>
          <h4
            onClick={() => navigate("/signin")}
            style={{
              marginTop: "25px",
              textAlign: "center",
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Existing Driver
          </h4>
        </Paper>
      </div>
    </userContext.Provider>
  );
};

export default DriveForm;
