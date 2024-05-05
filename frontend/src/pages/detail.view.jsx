import * as React from "react";
import AppDrawer from "../components/app-drawer";
import PrimarySearchAppBar from "../components/app-bar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

const DetailView = () => {
  const location = useLocation();
  const imageData = location.state.data;

  //! States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //! This function toggles the drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <AppDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      <Grid container className="p-5">
        <Grid item xs={12}>
          <img
            src={imageData.img_src}
            alt="Mars Rover"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <h1>Name: {imageData.camera.full_name}</h1>
          <h2>Rover Name: {imageData.rover.name}</h2>
          <h3>Earth Date: {imageData.earth_date}</h3>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailView;
