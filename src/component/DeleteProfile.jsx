import { Button, Grid, Paper, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../Context/UserContext";

const DeleteProfile = () => {
  let navigate = useNavigate();
  const { drivers, setdrivers } = useContext(userContext);
  const paperStyle = {
    width: "500px",
    padding: "30px ",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    marginTop: "80px",
    paddingLeft: "40px",
    marginRight: "50px",
  };
  let deletedriver = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Paper style={paperStyle} elevation={7}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            marginTop: "30px",
            color: "green",
          }}
        >
          THANK YOU!
        </h1>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          Thank you for being a dedicated driver! We truly appreciate your hard
          work and commitment.
        </h3>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          Your contribution has been invaluable, and we wish you all the best in
          your future endeavors.
        </h3>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
          Thank you for being a part of our community! We appreciate your time
          and effort.
        </h3>
        <Button
          fullWidth
          variant="contained"
          style={{ height: "50px", marginTop: "30px" }}
          onClick={deletedriver}
        >
          Go Back To Home
        </Button>
      </Paper>
    </div>
  );
};

export default DeleteProfile;
