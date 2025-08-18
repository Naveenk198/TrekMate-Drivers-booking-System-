import React, { useContext, useEffect, useState } from "react";
import OrderService from "../Service/OrderService";
import userContext from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import DriverService from "../Service/DriverService";
const BookingList = () => {
  let { customers, setcustomers, setdrivers, drivers } =
    useContext(userContext);

  let navigate = useNavigate();
  let { id, orderId } = useParams();
  let [orders, setorders] = useState([]);
  useEffect(() => {
    OrderService.showallorder()
      .then((res) => {
        setorders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let handlecancel = (orderId, customerId) => {
    OrderService.deleteorderbyid(orderId)
      .then((res) => {
        setorders(orders.filter((order) => order.orderId !== orderId));
        DriverService.getavailabledriver().then((res) => setdrivers(res.data));
        navigate(`/customerprofile/${customerId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>All Drivers</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1px",
          justifyContent: "space-around",
        }}
      >
        {orders.map((order) => (
          <div
            key={order.orderId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "400px",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
              background: "#f9f9f9",
              paddingLeft: "40px",
              paddingBottom: "50px",
              display: "grid",
              rowGap: "14 px",
              marginTop: "20px",
              paddingTop: "30px",
            }}
          >
            <h5>Order ID:{order.orderId}</h5>
            <h5>
              <strong>CustomerId:</strong>
              {order.customerId}
            </h5>
            <h5>
              <strong>Driver ID:</strong> {order.driverId}
            </h5>
            <h5>
              <strong>Date:</strong> {order.date}
            </h5>
            <h5>
              <strong>hours:</strong> {order.hours}
            </h5>
            <h5>
              <strong>TotalAmount:</strong> {order.totalamount}
            </h5>
            <h5>
              <strong>BookingId:</strong> {order.bookingid}
            </h5>
            <h5>
              <strong>PickupLocation:</strong> {order.pickupLocation}
            </h5>
            <h5>
              <strong>DropLocation:</strong> {order.dropLocation}
            </h5>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              style={{
                height: "50px",
                marginTop: "20px",
              }}
              onClick={() => handlecancel(order.orderId, order.customerId)}
            >
              Cancel Booking
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
