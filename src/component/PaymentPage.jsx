import { Paper, Typography, TextField, Button, alpha } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../Service/OrderService";

const PaymentPage = () => {
  let navigate = useNavigate();
  let { id, customerid } = useParams();
  let [payment, setpayment] = useState({
    CardNumber: "",
    PaymentDate: "",
    CVV: "",
  });
  console.log(id);
  console.log(customerid);
  let handlePayment = () => {
    const allFieldsFilled = Object.values(payment).every(
      (val) => String(val).trim() !== ""
    );
    if (!allFieldsFilled) {
      alert("fill the all field");
    } else {
      alert("payment sucessfully completed");
      // navigate(`/customerprofile/${id}`);
      let customerId = localStorage.getItem("customerid");
      navigate(`/customerprofile/${customerId}`);
    }
  };

  let handlechange = (e) => {
    let { name, value } = e.target;
    setpayment({
      ...payment,
      [name]: value,
    });
  };
  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    paddingLeft: "30px",
    paddingRight: "30px",
  };
  return (
    <Paper style={paperstyle} elevation={6}>
      <Paper
        elevation={3}
        style={{
          maxWidth: 400,
          margin: "40px auto",
          padding: "30px",
          textAlign: "center",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Make a Payment
        </Typography>

        <TextField
          fullWidth
          label="Card Number"
          variant="outlined"
          margin="normal"
          name="CardNumber"
          value={payment.CardNumber}
          onChange={handlechange}
        />
        <TextField
          fullWidth
          label="Expiry Date (MM/YY)"
          variant="outlined"
          margin="normal"
          name="PaymentDate"
          value={payment.PaymentDate}
          onChange={handlechange}
        />
        <TextField
          fullWidth
          label="CVV"
          variant="outlined"
          margin="normal"
          type="password"
          name="CVV"
          value={payment.CVV}
          onChange={handlechange}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={handlePayment}
        >
          Make Payment
        </Button>
      </Paper>
    </Paper>
  );
};
export default PaymentPage;
