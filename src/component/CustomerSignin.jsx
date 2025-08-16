import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button } from "@mui/material";
import CustomerService from "../Service/CustomerService";

const CustomerSignin = () => {
  let navigate = useNavigate();
  let [logindata, setlogindata] = useState({
    id: "",
    fullName: "",
  });
  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "60px",
  };
  let handlechange = (e) => {
    let { name, value } = e.target;
    setlogindata({
      ...logindata,
      [name]: value,
    });
  };
  let handlesubmit = () => {
    CustomerService.login(logindata)
      .then((res) => {
        alert("login sucessfully completed");
        setlogindata(res.data);
        navigate("/customerprofile");
      })
      .catch((error) => {
        console.log(error);
        alert("id and full doesnt match");
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={6} style={paperstyle} className="signinpaper">
        <h1
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Enter Customer Info{" "}
        </h1>
        <TextField
          fullWidth
          name="fullName"
          label="FullName"
          style={{ marginBottom: "30px" }}
          onChange={handlechange}
          value={logindata.fullName}
        ></TextField>
        <TextField
          fullWidth
          name="id"
          label="id"
          style={{ marginBottom: "20px" }}
          onChange={handlechange}
          value={logindata.id}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          style={{ height: "40px", marginBottom: "15px", marginTop: "10px" }}
          onClick={handlesubmit}
        >
          login
        </Button>
      </Paper>
    </div>
  );
};

export default CustomerSignin;
