import "../index.css";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";

const SelectRole = () => {
  let navigate = useNavigate();
  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
  };
  return (
    <div className="role">
      <Paper elevation={6} style={paperstyle}>
        <div style={{ textAlign: "center" }}>
          <h1>Select Your role</h1>
        </div>
        <div className="content">
          <Button
            style={{ backgroundColor: "lightcoral", color: "white" }}
            onClick={() => navigate("driverform")}
          >
            Driver
          </Button>
          <Button variant="contained" onClick={() => navigate("/customerform")}>
            Customer
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default SelectRole;
