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

//? Functions -------------------------------------------------------------
const getImages = async (page, setMarsImages, setLoading, date) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const requestBody = {
    page: page,
    filterDate: date,
  };

  axios.post(`${Backend_URL}/nasa/images`, requestBody, config).then((res) => {
    setMarsImages(res.data.data.photos);
    setLoading(false);
    console.log(res.data.data.photos);
  });
};

function MarsRover() {
  const Navigate = useNavigate();

  //! States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [marsImages, setMarsImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(null);

  //! This hook runs when the component is mounted
  useEffect(() => {
    getImages(1, setMarsImages, setLoading, date);
  }, []);

  //! This function toggles the drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  //! Handle pagination
  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
    getImages(value, setMarsImages, setLoading, date);
  };

  //! Handle date change
  const handleDateChange = (value) => {
    const newDate = new Date(value);
    setDate(
      `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`
    );
  };

  const filterData = () => {
    setLoading(true);
    getImages(page, setMarsImages, setLoading, date);
  };

  const reSetData = () => {
    window.location.reload();
  };

  const detailView = (index) => {
    Navigate("/detail", { state: { data: marsImages[index] } });
  };

  //! This is the main content of the dashboard
  return (
    <>
      <AppDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      <div className="row ps-5 align-items-center mt-2">
        <div className="col-xl-2 col-lg-4 col-md-12 col-sm-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Choose a date"
                disableFuture="true"
                onChange={(value) => {
                  handleDateChange(value.$d);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="mt-2 col-xl-2 col-lg-2 col-md-12 col-sm-6">
          <LoadingButton
            size="small"
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            className="me-2"
            onClick={() => {
              filterData();
            }}
          >
            <span>Filter</span>
          </LoadingButton>
          <LoadingButton
            size="small"
            type="submit"
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={() => {
              reSetData();
            }}
          >
            <span>Reset</span>
          </LoadingButton>
        </div>
      </div>

      {loading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <GradientCircularProgress />
        </div>
      )}

      {!loading && (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}
            padding={5}
          >
            {marsImages.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item.img_src}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.camera.name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      {item.camera.full_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Earth Date : {item.earth_date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rover Name : {item.rover.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Landing Date : {item.rover.landing_date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Launch Date : {item.rover.launch_date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        detailView(index);
                      }}
                    >
                      View More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="mb-5 d-flex justify-content-end">
            <Pagination
              count={10}
              page={page}
              color="secondary"
              onChange={handlePageChange}
            ></Pagination>
          </div>
        </>
      )}
    </>
  );
}

export default MarsRover;
