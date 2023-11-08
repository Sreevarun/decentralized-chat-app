import React from "react";
//import { ethers } from "ethers";
import { Typography, Button, Box, Paper } from "@mui/material/";
function Navbar(props) {
  const { ethers } = require("ethers");
  const connectToMetamask = async()=>{
    try {
      if(window.ethereum){

       const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        return signer
      }
    else{
      console.log("metamask not found")
    }
      } catch (error) {
      console.log(error)
    }
  }
  //useEffect(connectToMetamask,[connectToMetamask])
  return (
    <>
      <Box>
        <Paper
          elevation={4}
          style={{
            minWidth: "107%",
            paddingRight: "15px",
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h4" component="h2">
              Messenger
            </Typography>
          </Box>
          <Box>
            <Button onClick={connectToMetamask} size="large" variant="text">
              connect
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default Navbar;
