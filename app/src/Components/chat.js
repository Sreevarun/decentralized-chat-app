import React, { useEffect, useState } from "react";
import ABI from './../Asserts/ABI.json'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Tabs,
  Button,
} from "@mui/material";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux/";
import { fetchMessages } from "../store/messagesSlice";
function Chat(props) {
  const address = "0x28CaDE23ADe86018Af03c48A54293F5720C9437D";
  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])
  const [curUser,setCurUser] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMessages(){
      try {
        //dispatch(fetchMessages());
        setCurUser(JSON.parse(localStorage.getItem("chat")))
        //console.log(curUser,message)
          let signer = null;
          let provider;
          if (window.ethereum == null) {
            provider = ethers.getDefaultProvider();
          } else {
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
          }
          const create = new ethers.Contract(address, ABI, signer);
          let result = await create.getAllMessages();
          //console.log(JSON.stringify(result));
          var msgs = []
          for(let i=0;i<result.length;i++){
            let msg = {
              user: result[i][0],
              msg:result[i][1]
            }
            msgs.push(msg)
          }
        setMessages(msgs)
         console.log(msgs)
        } catch (error) {
          console.log(error);
        }
    }
    fetchMessages()
  }, []);
  const contents = useSelector((state) => state.users.data);
  const isLoading = useSelector((state) => state.users.isLoading);
  const error = useSelector((state) => state.users.error);
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error;
  }
  const handleSubmit = async()=>{
  try {
    //console.log(curUser,message)
      let signer = null;
      let provider;
      if (window.ethereum == null) {
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      }
      const create = new ethers.Contract(address, ABI, signer);
      let result = await create.sendMessage(curUser,message);
     console.log(result);
     console.log(contents)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "grid",
        gridTemplateRows: "1fr 28fr 1fr",
        height: 500,
      }}
    >
      <Typography
        style={{ display: "flex", justifyContent: "space-around" }}
        borderBottom={3}
        variant="h4"
      >
        Chat
      </Typography>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        style={{ width: "100%" }}
        aria-label="Vertical tabs example"
      >
        <Box>
          {contents
            ? contents.map((user) => {
                return (
                  <Card
                    onClick={() => {
                      console.log(user);
                    }}
                    style={{ marginTop: "5px" }}
                  >
                    <CardContent>
                    <Button onClick={() => {
                      console.log(user);
                    }}>
                      {user}
                    </Button> 
                    </CardContent>
                  </Card>
                );
              })
            : 
            <div style={{display:"flex",flexDirection:"flex-end"}}>
              <div>
              <div>
              <Typography>
                {curUser}
              {
                messages.map((user)=>{
                  return(
                    <div>
                      {
                        (curUser===user.user)? 
                        <div>
                          {user.user} : {user.msg}
                        </div> 
                        :console.log(user)
                      }
                    </div>
                  )
                })
              }
              </Typography>
              </div>
              </div>
            </div>
            }
        </Box>
      </Tabs>
      <Box style={{display:"flex",flexDirection:"row"}} marginBottom={2} marginRight={2}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e)=>{setMessage(e.target.value)}}
          placeholder="Enter the message"
        />
        <Button onClick={handleSubmit} variant="outlined">Send</Button>
      </Box>
    </Box>
  );
}
export default Chat;
