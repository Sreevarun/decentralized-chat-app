import React, { useState } from "react";
import { Paper, TextField, Typography, Box, Button } from "@mui/material/";
import Navbar from "../Components/navbar";
import ABI from "./../Asserts/ABI.json";
export default function Auth() {
  const address = "0x28CaDE23ADe86018Af03c48A54293F5720C9437D";
  const { ethers } = require("ethers");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let signer = null;
      let provider;
      if (window.ethereum == null) {
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      }
      const create = new ethers.Contract(address, ABI, signer);
      let result = await create.loginUser(user.username,user.password);
      window.replace("/chat")
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <Paper
        style={{ margin: "50px 50px", borderRadius: "30px solid red" }}
        elevation={3}
      >
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">Login</Typography>
        </Box>
        <Box style={{ padding: "10px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              fullWidth
              label="username"
              variant="outlined"
            />
            <TextField
              fullWidth
              type="password"
              style={{ margin: "5px 0px" }}
              label="password"
              variant="outlined"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button
              style={{ margin: "0px 550px" }}
              size="large"
              variant="outlined"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Paper>
    </div>
  );
}
