import Header from "../components/header";
import "../css/home.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";
import Astro_1 from "../assets/images/astro_1.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col curved ">
            <Header />
            <div className="row">
              <div className="col ms-5 mt-4 p-5 left-right-box">
                <h2>
                  Embark on Cosmic Journeys <br /> Personalized Exploration with
                  <br />
                  <span className="span-text-color"> NASA APIs</span>
                </h2>
                <p className="mt-3">
                  Discover the universe your way with NASA's APIs. Explore
                  personalized space experiences, from stunning imagery to
                  cutting-edge data. Start exploring today!
                </p>
                <div class="animation-container">
                  <div class="lightning-container">
                    <div class="lightning white"></div>
                    <div class="lightning red"></div>
                  </div>
                  <div class="boom-container">
                    <div class="shape circle big white"></div>
                    <div class="shape circle white"></div>
                    <div class="shape triangle big yellow"></div>
                    <div class="shape disc white"></div>
                    <div class="shape triangle blue"></div>
                  </div>
                  <div class="boom-container second">
                    <div class="shape circle big white"></div>
                    <div class="shape circle white"></div>
                    <div class="shape disc white"></div>
                    <div class="shape triangle blue"></div>
                  </div>
                </div>

                <div className="mt-5">
                  <Stack direction="row" spacing={3}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => Navigate("/signup")}
                    >
                      SIGNUP
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      endIcon={<LoginIcon />}
                      onClick={() => Navigate("/login")}
                    >
                      LOGIN
                    </Button>
                  </Stack>
                </div>
              </div>
              <div className="col mt-4 left-right-box">
                <img
                  src={Astro_1}
                  alt="nasa"
                  className="img-fluid animated-image"
                />
              </div>
            </div>
            <div>
              <div className="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                  <path
                    fill="#023e8a"
                    fill-opacity="1"
                    d="M0,224L120,240C240,256,480,288,720,256C960,224,1200,128,1320,80L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="65 -30 1310 319"
                >
                  <path
                    fill="#00b4d8"
                    fill-opacity="1"
                    d="M0,224L120,240C240,256,480,288,720,256C960,224,1200,128,1320,80L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="65 -45 1310 319"
                >
                  <path
                    fill="#fff"
                    fill-opacity="1"
                    d="M0,224L120,240C240,256,480,288,720,256C960,224,1200,128,1320,80L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="row animBody">
          <p>Hello</p>
        </div>
      </div>
    </>
  );
}

export default Home;
