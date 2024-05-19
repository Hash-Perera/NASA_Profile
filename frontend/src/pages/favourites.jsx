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
import GradientCircularProgress from "../components/gradient-circular-progress";
import Pagination from "@mui/material/Pagination";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import { Backend_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";

const getImages = async (setFaveImages, setLoading) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.get(`${Backend_URL}/auth/getFavourites`, config).then((res) => {
    setFaveImages(res.data.data);
    console.log(res.data.data);
    setLoading(false);
  });
};

function Favourites() {
  const Navigate = useNavigate();

  //! States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [faveImages, setFaveImages] = useState([]);
  const [loading, setLoading] = useState(true);

  //! This hook runs when the component is mounted
  useEffect(() => {
    getImages(setFaveImages, setLoading);
  }, []);

  //! This function toggles the drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />

      <Typography
        variant="h4"
        gutterBottom
        component="div"
        className="ms-5 mt-3"
      >
        Favourites
      </Typography>
      {!loading && (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            padding={5}
          >
            {faveImages.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 345 }}
                    image={item}
                    title="green iguana"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Favourites;
