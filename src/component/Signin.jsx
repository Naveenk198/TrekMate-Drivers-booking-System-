import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import DriverService from "../Service/DriverService";

const Sigin = () => {
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
    DriverService.login(logindata)
      .then((res) => {
        setlogindata(res.data);
        alert("login sucessfully completed");
        navigate(`/driverprofile/${res.data.id}`);
      })
      .catch((error) => {
        console.log(error);
        alert("ID And FullName Doesnt Match");
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
          Enter Driver Info{" "}
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
          label="ID"
          style={{ marginBottom: "20px" }}
          value={logindata.id}
          onChange={handlechange}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          style={{ height: "40px", marginBottom: "15px", marginTop: "10px" }}
          onClick={handlesubmit}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default Sigin;
