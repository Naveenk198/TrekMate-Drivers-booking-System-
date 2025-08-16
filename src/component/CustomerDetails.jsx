import React, { useContext, useEffect, useState } from "react";
import userContext from "../Context/UserContext";
import { Paper, Typography, Grid, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerService from "../Service/CustomerService";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const CustomerDetails = () => {
  let { customers, setcustomers } = useContext(userContext);
  let navigate = useNavigate();
  let [newcustomer, setnewcustomer] = useState({});
  let [localcustomer, setlocalcustomer] = useState(null);
  let { id } = useParams();
  const paperStyle = {
    width: "400px",
    margin: "30px auto",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    marginTop: "50px",
    paddingLeft: "40px",
  };
  const fieldStyle = {
    marginBottom: "15px",
  };
  useEffect(() => {
    if (!id) {
      console.warn("No ID in route params!");
      return;
    }
    const stored = localStorage.getItem("customer");
    if (stored) {
      setlocalcustomer(JSON.parse(stored));
      setcustomers(JSON.parse(stored));
    } else {
      CustomerService.getcustomerbyid(id)
        .then((res) => {
          setnewcustomer(res.data);
          setcustomers(res.data);
          setlocalcustomer(res.data);
          localStorage.setItem("customer", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Error fetching customer:", err);
        });
    }
  }, [id]);

  let deletedcustomer = (id) => {
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
        CustomerService.deletecustomer(id).then(() => {
          localStorage.removeItem("customer");
          setcustomers({
            fullName: "",
            transportName: "",
            vehicleNo: "",
            phNo: "",
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
  console.log(newcustomer);
  return (
    <div>
      <Paper style={paperStyle} elevation={6} className="driver">
        <FaArrowAltCircleLeft
          size={35}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customerprofile")}
        />
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{ marginTop: "30px" }}
        >
          Customer Profile
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Full Name:</strong> {customers.fullName}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>TransportName:</strong> {customers.transportName}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>VehicleNO:</strong> {customers.vehicleNo}
        </Typography>
        <Typography variant="h6" style={fieldStyle}>
          <strong>Phone Number:</strong> {customers.phNo}
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
            onClick={() => navigate(`/updatecustomer/${id}`)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            style={{
              height: "40px",
            }}
            onClick={() => deletedcustomer(customers.id)}
          >
            Delete
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default CustomerDetails;
