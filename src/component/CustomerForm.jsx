import { Button, Paper, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../Context/UserContext";
import CustomerService from "../Service/CustomerService";

const CustomForm = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  // let [customers, setcustomers] = useState({
  //   FullName: "",
  //   TransportName: "",
  //   PhNo: "",
  //   VehicleNo: "",
  // });
  let { customers, setcustomers } = useContext(userContext);
  let [newcustomer, setnewcustomer] = useState({
    fullName: "",
    transportName: "",
    phNo: "",
    vehicleNo: "",
  });
  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    paddingLeft: "30px",
    paddingRight: "30px",
  };
  let handlesubmit = (e) => {
    e.preventDefault();
    let allFieldsFilled = Object.values(newcustomer).every(
      (val) => val.trim() !== ""
    );
    if (!allFieldsFilled) {
      alert("fill the all field");
    } else {
      CustomerService.savecustomer(newcustomer).then((res) => {
        setcustomers(res.data);
        alert("added sucessfully");
        navigate(`/customerprofile/${res.data.id}`);
      });

      //   e.target.reset(customers);
    }
  };

  let handlechange = (e) => {
    let { name, value } = e.target;
    setnewcustomer({
      ...newcustomer,
      [name]: value,
    });
  };
  return (
    <div>
      <Paper elevation={6} style={paperstyle}>
        <h1 style={{ marginTop: "30px", marginBottom: "30px" }}>
          Customer Registeration
        </h1>
        <TextField
          fullWidth
          style={{ marginBottom: "30px" }}
          label="Transport Name"
          onChange={handlechange}
          value={newcustomer.transportName}
          name="transportName"
        ></TextField>
        <TextField
          fullWidth
          style={{ marginBottom: "30px" }}
          label="FullName"
          onChange={handlechange}
          value={newcustomer.fullName}
          name="fullName"
        ></TextField>
        <TextField
          fullWidth
          style={{ marginBottom: "50px" }}
          label="PhNo"
          onChange={handlechange}
          value={newcustomer.phNo}
          name="phNo"
        ></TextField>{" "}
        <TextField
          fullWidth
          style={{ marginBottom: "30px" }}
          label="Vehicle No"
          onChange={handlechange}
          value={newcustomer.vehicleNo}
          name="vehicleNo"
        ></TextField>
        <Button
          fullWidth
          variant="contained"
          style={{ height: "40px", marginBottom: "30px" }}
          onClick={handlesubmit}
        >
          Submit
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            gap: "5px",
          }}
        >
          <p>Already a Customer/</p>
          <p
            typeof="button"
            onClick={() => navigate("/customersignin")}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Existing Customer
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default CustomForm;
