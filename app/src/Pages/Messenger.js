import "./../App.css";
import Navbar from "./../Components/navbar";
import Profile from "./../Components/profile";
import Chat from "./../Components/chat";
import { Paper } from "@mui/material/";
//import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
function Messenger() {
  return (
    <>
      <Navbar />
      <Paper
        elevation={3}
        style={{
          margin: "55px 55px",
          marginLeft: "60px",
          minHeight: "500px",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "white",
          borderRadius: "15px solid #cccc",
        }}
      >
        <div>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 36fr",
              gap: "5px",
            }}
            sx = {{ display: "grid",
            gridTemplateColumns: "4fr 36fr",
            gap: "5px",}}
          >
            <Box height={500}>
              <Profile/>
            </Box>
            <Box>
              <Chat />
            </Box>
          </Box>
        </div>
      </Paper>
    </>
  );
}

export default Messenger;
