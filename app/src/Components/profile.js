import React, { useEffect} from "react";
import { Card, CardContent, Typography,Button,Box, Tabs } from "@mui/material";
import { useSelector,useDispatch } from "react-redux/";
import { fetchUsers } from "../store/userSlice";
function Profile(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);
  const contents = useSelector((state) => state.users.allUsers)
  const isLoading = useSelector((state) => state.users.isLoading)
  const error = useSelector((state) => state.users.error)
  if(isLoading){
    return "Loading..."
  }
  if (error) {
    return error
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 500,
        maxWidth: 230,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        style={{ width: "250px" }}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 3, borderColor: "divider" }}
      >
        <Typography style={{display:"flex",justifyContent:"space-around"}} width={300} borderBottom={3} variant="h4">USERS</Typography>
        {contents
          ? contents.map((user) => {
              return (
                <Card
                  onClick={() => {
                    localStorage.setItem("chat",JSON.stringify(user))
                  }}
                  style={{ marginTop: "5px" }}
                >
                  <CardContent>
                    <Typography variant="h5">
                    <Button onClick={()=>{console.log(user);}}>
                      {user}
                      </Button>  
                    </Typography>
                  </CardContent>
                </Card>
              );
            })
          : ""}
      </Tabs>
    </Box>
  );
}
export default Profile;
