import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlineDiversity1 } from "react-icons/md";
import { Button, Paper, TextField, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import "../index.css";
import { CgProfile } from "react-icons/cg";

import Swal from "sweetalert2";
import userContext from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../Service/CustomerService";

const CustomerProfile = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [form, setform] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    subject: "",
    message: "",
  });
  let handlesubmit = (e) => {
    e.preventDefault();
    if (
      (form.Firstname == "" && form.Lastname !== "" && form.email !== "",
      form.message !== "" && form.subject !== "")
    ) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      setform({
        Firstname: "",
        Lastname: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill The All Field!",
      });
    }
  };
  let handlechange = (e) => {
    let { name, value } = e.target;
    setform((form) => ({ ...form, [name]: value }));
    console.log({ ...form, [name]: value });
  };
  let { customers } = useContext(userContext);
  let paperstyle = {
    width: "100%",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "5px",
    paddingBottom: "40px",
  };
  let showdetails = () => {
    navigate(`/customerdetails/${id}`);
  };
  return (
    <>
      {" "}
      <Navbar
        fixed="top"
        expand="lg"
        className="bg-body-tertiary"
        style={{ height: "80px" }}
      >
        <Container fluid>
          <MdOutlineDiversity1 />
          <Navbar.Brand>RouteMate</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "200px", gap: "30px" }}
              navbarScroll
            >
              <CgProfile
                className="profileicon"
                size={30}
                onClick={showdetails}
              />
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link onClick={() => navigate("/bookinglist")}>
                Book Lists
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "500px", backgroundColor: "lightblue" }} id="home">
        <h1
          style={{ textAlign: "center", paddingTop: "150px", color: "white" }}
        >
          Book Now For Your Safety Ride
        </h1>
        <Button
          variant="contained"
          style={{
            height: "50px",
            marginLeft: "40%",
            marginTop: "40px",
            width: "250px",
          }}
          onClick={() => navigate("/alldrivers")}
        >
          BOOK NOW
        </Button>
      </div>
      <Paper style={paperstyle}>
        <Typography
          variant="h3"
          style={{ textAlign: "center", paddingTop: "50px" }}
        >
          Welcome to TrekMate!
        </Typography>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          Welcome, {customers.fullName} and Your id is {customers.id} ! We are
          thrilled to have you with us!
        </Typography>
      </Paper>
      <div id="about">
        <Typography
          style={{ textAlign: "center", marginTop: "80px" }}
          variant="h3"
        >
          About Us!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          style={{ marginTop: "40px", marginBottom: "60px" }}
        >
          At TrekMate, we provide premium travel experiences with an emphasis on
          safety, comfort, and adventure. Our team is dedicated to ensuring
          every trip is enjoyable and hassle-free, whether you're going on a
          long-distance journey or a local getaway. Explore the world with us!
        </Typography>
      </div>
      <div
        style={{ backgroundColor: "#f0f2f5", paddingBottom: "40px" }}
        id="services"
      >
        <Typography
          variant="h3"
          align="center"
          style={{ marginTop: "60px", paddingTop: "30px" }}
        >
          OUR SERVICES
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "30px",
          }}
        >
          <Paper style={paperstyle}>
            <Typography
              variant="h5"
              style={{ color: "blue", textAlign: "center", marginTop: "20px" }}
            >
              Personalized Travel
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "20px" }}
            >
              We offer personalized travel packages designed to cater to your
              needs, whether you want a calm, relaxing trip or an adventurous
              journey.
            </Typography>
          </Paper>
          <Paper style={paperstyle}>
            <Typography
              variant="h5"
              style={{ color: "blue", textAlign: "center", marginTop: "20px" }}
            >
              Safety and Comfort
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "20px" }}
            >
              We ensure the highest safety standards and provide luxurious and
              comfortable rides, so you can relax and enjoy your journey.
            </Typography>
          </Paper>
          <Paper style={paperstyle}>
            <Typography
              variant="h5"
              style={{ color: "blue", textAlign: "center", marginTop: "20px" }}
            >
              Expert Guides
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Our professional guides will help you navigate and make the most
              of your trip, providing insightful knowledge and tips along the
              way.
            </Typography>
          </Paper>
        </div>
      </div>
      <footer style={{ marginTop: "60px" }}>
        <div className="contact" id="contact">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "140px" }}
          >
            <div>
              <h2>CONTACT</h2>
              <p>Looking forward to hearing from you</p>
              <div>
                <h4>Phone</h4>
                <p>{customers.phNo}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>naveenkumarbg98@gmail.com</p>
              </div>
            </div>
            <div style={{ display: "grid", rowGap: "30px" }}>
              <div style={{ display: "flex", gap: "30px" }}>
                <div>
                  <label htmlFor="" style={{ marginBottom: "20px" }}>
                    FIRST NAME*
                  </label>
                  <br />
                  <input
                    type="text"
                    name="Firstname"
                    onChange={handlechange}
                    value={form.Firstname}
                  />
                </div>
                <div>
                  <label htmlFor="" style={{ marginBottom: "20px" }}>
                    LAST NAME*
                  </label>
                  <br />
                  <input
                    name="Lastname"
                    type="text"
                    onChange={handlechange}
                    value={form.Lastname}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "30px" }}>
                <div>
                  <label htmlFor="" style={{ marginBottom: "20px" }}>
                    {" "}
                    Email
                  </label>
                  <br />
                  <input
                    type="email"
                    onChange={handlechange}
                    value={form.email}
                    name="email"
                  />
                </div>
                <div>
                  <label htmlFor="" style={{ marginBottom: "20px" }}>
                    SUBJECT
                  </label>
                  <br />
                  <input
                    type="text"
                    onChange={handlechange}
                    name="subject"
                    value={form.subject}
                  />
                </div>
              </div>
              <div>
                <h5>Message</h5>
                <textarea
                  name="message"
                  value={form.message}
                  style={{ width: "32vw" }}
                  onChange={handlechange}
                ></textarea>
                <br />
                <Button
                  onClick={handlesubmit}
                  variant="contained"
                  style={{
                    width: "32vw",
                    marginTop: "10px",
                    height: "40px",
                    marginBottom: "30px",
                  }}
                >
                  submit
                </Button>
              </div>
            </div>
          </div>
          <footer
            className="footer"
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
            }}
          >
            <hr style={{ marginLeft: "20px", marginRight: "20px" }} />
            <div
              className="footeritems"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <h6>Phone</h6>
                <h6>{customers.phNo}</h6>
              </div>
              <div>
                <h6>Email</h6>
                <h6>naveenkumarbg@gmail</h6>
              </div>
              <div>
                <h6>Follwe Me</h6>
                <h6>{customers.PhNo}</h6>
              </div>
              <div>
                <h6>© 2025 TrekMate. All rights reserved..</h6>
                <h6>Powered and secured by Wix</h6>
              </div>
            </div>
          </footer>
        </div>
      </footer>
    </>
  );
};

export default CustomerProfile;
