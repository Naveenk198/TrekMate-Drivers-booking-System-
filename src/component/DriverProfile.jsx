import { useContext, useEffect, useState } from "react";

import { Paper, Typography, Grid, Button } from "@mui/material";
import "sweetalert2/src/sweetalert2.scss";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import Swal from "sweetalert2";
import userContext from "../Context/UserContext";
import DriverService from "../Service/DriverService";
import { FaArrowCircleLeft } from "react-icons/fa";

const DriverProfile = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { drivers, setdrivers } = useContext(userContext);
  let [localcustomer, setlocalcustomer] = useState(null);
  const paperStyle = {
    width: "400px",
    margin: "30px auto",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    marginTop: "50px",
    paddingLeft: "60px",
  };
  const fieldStyle = {
    marginBottom: "15px",
  };
  useEffect(() => {
    if (!id) {
      console.warn("No ID in route params!");
      return;
    }
    const stored = localStorage.getItem("driver");
    if (stored) {
      setlocalcustomer(JSON.parse(stored));
      setdrivers(JSON.parse(stored));
    } else {
      CustomerService.getcustomerbyid(id)
        .then((res) => {
          setdrivers(res.data);
          setlocalcustomer(res.data);
          localStorage.setItem("customer", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Error fetching customer:", err);
        });
    }
  }, [id]);

  let deletedriver = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("driver");
        DriverService.Deletedriver(id).then(() => {
          setdrivers({
            fullName: "",
            address: "",
            licenseNumber: "",
            phNo: "",
            age: "",
            status: "",
            ratePerHour: "",
          });
          navigate("/deleteprofile");
          Swal.fire({
            title: "Deleted!",
            text: "Your Profile is deleted.",
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <div>
      <Paper style={paperStyle} elevation={6} className="driver">
        <FaArrowCircleLeft
          size={40}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{ marginTop: "30px" }}
        >
          Driver Profile
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Full Name:</strong> {drivers.fullName}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Age:</strong> {drivers.age}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Status:</strong> {drivers.status}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Phone Number:</strong> {drivers.phNo}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Rate Per Hour:</strong> ₹{drivers.ratePerHour}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Address:</strong> {drivers.address}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>License Number:</strong> {drivers.licenseNumber}
        </Typography>
        <Grid
          style={{
            display: "flex",
            justifyContent: "left",
            gap: "30px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          <Button
            variant="contained"
            style={{ height: "40px" }}
            onClick={(id) => navigate(`/updateprofile/${drivers.id}`)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            style={{
              height: "40px",
            }}
            onClick={(id) => deletedriver(drivers.id)}
          >
            Delete
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default DriverProfile;
