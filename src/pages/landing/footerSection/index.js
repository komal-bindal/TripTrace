import React, { useState } from "react";
import footerBg from "../../../assets/footerBg.jpeg";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import newsletter from "../../../assets/newsletter.png";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import FormLabel from "@mui/material";

import axios from "axios";
function FooterSection() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  function isValidEmail(email, isSubmit) {
    if (email.length === 0 && !isSubmit) {
      return true;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(isValidEmail(e.target.value, false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidEmail(isValidEmail(email, true));
    if (!validEmail) {
      return;
    }
    setLoading(true);
    axios
      .post("/triptrace/rest/v1/newsletter", {
        email: email,
        status: "SUBSCRIBED",
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="footer-section">
      <div
        className="overlay"
        style={{
          backgroundImage: `url(${footerBg})`,
        }}
      />
      <div className="footer">
        <div className="feedback-form">
          <div className="title-section">
            <div className="hello-heading">Say Hello.</div>
            <div className="hello-subheading">
              <span>Feel free to drop us an email anytime</span>
              <span>We'd love to hear from you</span>
            </div>
          </div>
          <div className="feedback-name">
            <TextField
              // id="outlined-required"
              label="Name"
              fullWidth
              // sx={{ width: "100%" }}
              variant="filled"
              color="success"
              // defaultValue="Hello World"
            />
            {/* <TextField
              // id="standard-error-helper-text"
              sx={{ width: "100%" }}
              variant="standard"
              onChange={handleInputChange}
              required={true}
              placeholder="Name"
            /> */}
          </div>
          <Button
            variant="contained"
            className="newsletter-button"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>

        <div className=" footer-divider" />
        <Button
          variant="contained"
          color="success"
          startIcon={<MailIcon />}
          onClick={handleOpen}
        >
          Subscribe to our newsletter
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="subscribe-to-newsletter"
      >
        <Box className="newsletter-modal">
          <img src={newsletter} width="200px"></img>
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Stay in the Loop
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            Subscribe for Exclusive Travel Tips, Deals, and Destination
            Inspiration!
          </Typography>
          <div className="newsletter-form">
            <TextField
              className="newsletter-email"
              error={!validEmail}
              id="standard-error-helper-text"
              helperText={validEmail ? " " : "Please enter the valid email"}
              variant="standard"
              onChange={handleInputChange}
              required={true}
              placeholder="email@gmail.com"
            />
            <Button
              variant="contained"
              className="newsletter-button"
              color="success"
              onClick={handleSubmit}
            >
              Subscribe
            </Button>
          </div>
          <Backdrop
            className="newsletter-backdrop"
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}

export default FooterSection;
