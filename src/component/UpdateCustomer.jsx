import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import userContext from "../Context/UserContext";
import { FaEdit } from "react-icons/fa";
import CustomerService from "../Service/CustomerService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomer = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  console.log("error" + id);
  let { customers, setcustomers } = useContext(userContext);
  let [updatecustomer, setupdatecustomer] = useState({
    fullName: "",
    transportName: "",
    vehicleNo: "",
    phNo: "",
  });
  let handlechange = (e) => {
    let { name, value } = e.target;
    setupdatecustomer({
      ...updatecustomer,
      [name]: value,
    });
  };
  useEffect(() => {
    CustomerService.getcustomerbyid(id)
      .then((res) => {
        setupdatecustomer(res.data);
      })
      .catch((error) => {
        alert("Customer Not Found");
        console.log(error.message);
      });
  }, [id]);
  let handlesave = () => {
    CustomerService.updatecustomer(id, updatecustomer)
      .then((res) => {
        localStorage.setItem("customer", JSON.stringify(res.data));
        setcustomers(updatecustomer);
        alert("Customer updated successfully!");
        navigate(`/customerprofile/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const paperStyle = {
    width: "500px",
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
  return (
    <Paper style={paperStyle} elevation={7}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ marginTop: "30px" }}
      >
        Update Profile
      </Typography>
      <TextField
        fullWidth
        name="fullName"
        label="FullName"
        type="text"
        style={{ marginBottom: "20px" }}
        value={updatecustomer.fullName || ""}
        onChange={handlechange}
      ></TextField>
      <TextField
        fullWidth
        name="transportName"
        label="TransportName"
        type="text"
        style={{ marginBottom: "20px" }}
        value={updatecustomer.transportName || ""}
        onChange={handlechange}
      ></TextField>
      <TextField
        fullWidth
        name="phNo"
        label="PhNo"
        type="text"
        style={{ marginBottom: "20px" }}
        value={updatecustomer.phNo || ""}
        onChange={handlechange}
      ></TextField>
      <TextField
        fullWidth
        name="vehicleNo"
        label="VehicleNo"
        type="text"
        style={{ marginBottom: "20px" }}
        value={updatecustomer.vehicleNo || ""}
        onChange={handlechange}
      ></TextField>
      <Button
        variant="contained"
        fullWidth
        style={{ height: "50px", alignContent: "center" }}
        onClick={handlesave}
      >
        Save Customer
      </Button>
    </Paper>
  );
};

export default UpdateCustomer;
