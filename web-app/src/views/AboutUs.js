import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/staticPages.js";
import Parallax from "components/Parallax/Parallax";
import { language } from "config";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function AboutUs(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/background.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <br />
          <h2 className={classes.title}>{language.about_us}</h2>
          <h4 className={classes.title}>
            Siren24 is India's leading company in providing reliable ambulance
            services. We are now available in 50+ top cities
          </h4>
          <ul className={classes.description}>
            <li>
              <h4>Reliable</h4>
              <p>
                Verified respondents with real-time tracking are some of the
                security features.
              </p>
            </li>
            <li>
              <h4>Fast</h4>
              <p>
                In urgent cases, we instantly connect you to the necessary
                medical resource.
              </p>
            </li>
            <li>
              <h4>Strong network</h4>
              <p>
                2,000+ registered ambulances and over 10,000 doctors on board.
              </p>
            </li>
          </ul>
          <br />
        </div>
        <div className={classes.container}>
          <br />
          <h2 className={classes.title}>Why Siren 24</h2>
          <ul className={classes.description}>
            <li>
              <h4>Easy - Fast - Reliable</h4>
              <p>
                Choose the best ambulance We are at the forefront of innovation
                in out-of-order clinical care. We provide thousands of patients
                a year with advice, support, and pointers to the right services
                through our listen and lie down services.
              </p>
            </li>
            <li>
              <h4>Advance booking platform</h4>
              <p>
                Over the past two decades, we have developed into one of the
                most clinically advanced ambulance services in the world, with a
                focus on providing all our patients with high-quality care and
                service.
              </p>
            </li>
            <li>
              <h4>Ambulance safety</h4>
              <p>
                Don't worry about safety anymore when driving our ambulance. All
                our partners are proven professionals and we ensure safety on
                all your Siren24 rides.
              </p>
            </li>
            <li>
              <h4>Support</h4>
              <p>
                Our call handlers and clinical contact center staff handle over
                a million calls every year, 24 hours a day, 7 days a week, 365
                days a year.
              </p>
            </li>
            <li>
              <h4>Get some offers</h4>
              <p>
                Get quotes from different providers, compare and choose the
                best, most economical to order an ambulance.
              </p>
            </li>
            <li>
              <h4>Convenient payment options</h4>
              <p>
                Easy to use yet the ability to select different ambulance
                services in just a few clicks with very simple payment options.
              </p>
            </li>
          </ul>
          <br />
        </div>
      </div>

      <Footer />
    </div>
  );
}
