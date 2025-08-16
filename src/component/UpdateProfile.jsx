import {
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import userContext from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import DriverService from "../Service/DriverService";
import { FaArrowCircleLeft } from "react-icons/fa";
const UpdateProfile = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { drivers, setdrivers } = useContext(userContext);
  let [updatedriver, setupdatedriver] = useState({
    fullName: "",
    address: "",
    licenseNumber: "",
    phNo: "",
    age: "",
    status: "",
    ratePerHour: "",
  });
  const paperStyle = {
    width: "500px",
    margin: "30px auto",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    marginTop: "50px",
    paddingLeft: "60px",
    paddingRight: "60px",
  };

  useEffect(() => {
    DriverService.getDriverByid(id)
      .then((res) => {
        setupdatedriver(res.data);
      })
      .catch((err) => {
        console.error("Error fetching driver:", err);
        alert("Driver not found or internal error");
      });
  }, [id]);
  let handlechange = (e) => {
    let { name, value } = e.target;
    setupdatedriver({
      ...updatedriver,
      [name]: value,
    });
  };
  let handlesubmit = (e) => {
    e.preventDefault();
    DriverService.updatedriver(id, updatedriver)
      .then((res) => {
        localStorage.setItem("driver", JSON.stringify(res.data));
        setdrivers(updatedriver);
        alert("Driver updated successfully!");
        navigate(`/driverprofile/${id}`);
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating driver");
      });
  };
  return (
    <div className="driverprofile">
      <Paper style={paperStyle} elevation={6}>
        <FaArrowCircleLeft
          size={40}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/driverprofile/${id}`)}
        />
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Update Profile
        </Typography>

        <TextField
          fullWidth
          name="fullName"
          label="FullName"
          type="text"
          style={{ marginBottom: "20px" }}
          value={updatedriver.fullName}
          onChange={handlechange}
        ></TextField>
        <TextField
          fullWidth
          name="address"
          label="Address"
          type="text"
          style={{ marginBottom: "20px" }}
          value={updatedriver.address}
          onChange={handlechange}
        ></TextField>
        <TextField
          fullWidth
          name="licenseNumber"
          label="License Number"
          type="text"
          style={{ marginBottom: "20px" }}
          value={updatedriver.licenseNumber}
          onChange={handlechange}
        ></TextField>
        <TextField
          fullWidth
          name="phNo"
          label="Phno"
          type="text"
          style={{ marginBottom: "20px" }}
          value={updatedriver.phNo}
          onChange={handlechange}
        ></TextField>
        <TextField
          fullWidth
          name="age"
          label="Age"
          type="text"
          style={{ marginBottom: "20px" }}
          value={updatedriver.age}
          onChange={handlechange}
        ></TextField>
        <Select
          fullWidth
          name="status"
          label="Status"
          style={{ marginBottom: "20px" }}
          value={updatedriver.status || ""}
          onChange={handlechange}
        >
          <MenuItem value=" ">Select Status</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="UnAvailable">UnAvailable</MenuItem>
        </Select>

        <TextField
          fullWidth
          type="text"
          name="ratePerHour"
          label="Rate Per Hour "
          style={{ marginBottom: "20px" }}
          value={updatedriver.ratePerHour}
          onChange={handlechange}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          style={{ height: "40px" }}
          onClick={handlesubmit}
        >
          UpdateDriver
        </Button>
        <Typography
          variant="h4"
          onClick={() => navigate("/signin")}
          style={{
            marginTop: "25px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Existing Driver
        </Typography>
      </Paper>
    </div>
  );
};

export default UpdateProfile;
