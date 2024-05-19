import * as React from "react";
import AppDrawer from "../components/app-drawer";
import PrimarySearchAppBar from "../components/app-bar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@mui/material";
import GradientCircularProgress from "../components/gradient-circular-progress";
import { Backend_URL } from "../config/constants";

//? Functions -------------------------------------------------------------
const getImages = async (setMarsImages) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.get(`${Backend_URL}/nasa/apod`, config).then((res) => {
    setMarsImages(res.data.data);
    console.log(res.data.data);
  });
};

//? Main Component -------------------------------------------------------
function Dashboard() {
  //! States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [marsImages, setMarsImages] = useState();
  const [userName, setUserName] = useState("");

  //! This hook runs when the component is mounted
  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    getImages(setMarsImages);
  }, []);

  //! This function toggles the drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  //! This is the main content of the dashboard
  return (
    <>
      <AppDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      <Typography
        variant="h3"
        sx={{
          padding: "0px",
          fontWeight: "bold",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        Hi <span className="text-secondary">{userName}</span> 👋
      </Typography>
      <Typography
        variant="p"
        sx={{ padding: "20px", fontWeight: "bold", marginLeft: "50px" }}
      >
        "Today's Update: Explore Your Favorites, Discover Something New!"
      </Typography>
      {!marsImages && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "70vh" }}
        >
          <GradientCircularProgress />
        </div>
      )}
      {marsImages && (
        <>
          <Divider />

          <div className="mt-5"></div>
          <Typography
            variant="p"
            sx={{
              padding: "20px",
              fontWeight: "bold",
              paddingBottom: "0",
            }}
          >
            Astronomy Photo of The Day
          </Typography>
          <Grid container spacing={2} sx={{ padding: "20px" }}>
            <Grid item lg={8} md={8} xs={12} sm={12}>
              <Card>
                {marsImages?.media_type === "video" ? (
                  <div style={{ height: "60vh" }}>
                    <iframe
                      src={marsImages.url}
                      title="video"
                      width="100%"
                      height="100%"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <CardMedia
                    component="img"
                    sx={{ height: "60vh" }}
                    image={marsImages.url}
                    title="green iguana"
                  />
                )}
              </Card>
            </Grid>
            <Grid item lg={4} md={4} xs={12} sm={12}>
              <Card>
                <CardContent sx={{ height: "60vh", overflowY: "scroll" }}>
                  <Typography variant="h6">{marsImages?.title}</Typography>
                  <Typography>Date : {marsImages?.date}</Typography>
                  <div className="mt-3"></div>
                  <Typography variant="p">{marsImages?.explanation}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default Dashboard;
