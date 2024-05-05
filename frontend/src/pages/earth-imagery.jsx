import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import AppDrawer from "../components/app-drawer";
import PrimarySearchAppBar from "../components/app-bar";
import GradientCircularProgress from "../components/gradient-circular-progress";
import { Backend_URL } from "../config/constants";

//? Functions -------------------------------------------------------------
const getImages = async (setEarthImages, setLoading) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.get(`${Backend_URL}/nasa/earth`, config).then((res) => {
    setEarthImages(res.data.data);
    console.log(res.data.data);
    setLoading(false);
  });
};

const EarthImagery = () => {
  //! States
  const [earthImages, setEarthImages] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  //! This hook runs when the component is mounted
  useEffect(() => {
    getImages(setEarthImages, setLoading);
  }, []);

  //! This function toggles the drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      {loading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <GradientCircularProgress />
        </div>
      )}
      {earthImages && (
        <>
          <div className="mt-5"></div>
          <Typography
            variant="h4"
            sx={{
              padding: "20px",
              fontWeight: "bold",
              paddingBottom: "0",
            }}
          >
            Earth Imagery
          </Typography>
          <Grid container spacing={2} sx={{ padding: "20px" }}>
            <Grid item xs={12} sm={8}>
              <Card>
                <CardMedia
                  sx={{ height: "60vh" }}
                  image={earthImages.url}
                  title="green iguana"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ height: "60vh", overflowY: "scroll" }}>
                  <Typography variant="h6">{earthImages?.title}</Typography>
                  <Typography>Date : {earthImages?.date}</Typography>
                  <div className="mt-3"></div>
                  <Typography variant="p">
                    {earthImages?.explanation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default EarthImagery;
