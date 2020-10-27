import React, { useState } from "react";
import Navigation from "../Components/navigation";
import Featured from "../Components/featured";
import "../Components/styles.scss";
import RecentPosts from "../Components/recentPosts";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Metadata from "../Components/metadata";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";
import "fontsource-roboto";
import Typography from "@material-ui/core/Typography";

import MenuListComposition from '../Components/top'
import Footer from "../Components/footer";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #333, #999)",
    border: 0,
    color: "white",
    borderRadius: 15,
    padding: "0 30px",
  },
});

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
    },
  },
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: blue[200],
    },
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>Text Styled Button</Button>;
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<DeleteIcon />}
          checkedIcon={<SaveIcon />}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{
            "aria-label": "secondary checkbox",
          }}
        />
      }
      label="Testing Checkbox"
    />
  );
}

function Home({ data }) {
  const [state, setstate] = useState({
    featuredIndex: 0,
  });
  const onPostClick = (e) => {
    setstate({
      featuredIndex: e,
    });
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  };

  return (
    <>
      <Metadata />
      
      <MenuListComposition/>
      {/* <Navigation /> */}
      <main>
        <div className="featured">
          <Featured
            data={data.allContentfulTeam.edges[state.featuredIndex]}
            allData={data}
            onPostClick={onPostClick}
          ></Featured>
        </div>
        <RecentPosts data={data.allContentfulTeam.edges} onPostClick={onPostClick} />
      </main>
      <Footer/>



      {/* <div>
        <Typography variant="h2">Welcome to material ui test</Typography>
        <Typography variant="subtitle1" component="div">
          Learn how to use material ui
        </Typography>
        <Typography variant="body1">body 1</Typography>
        <ThemeProvider theme={theme}>
          <TextField
            variant="filled"
            color="secondary"
            type="time"
            label="The Time"
          />
          <CheckboxExample />
          <ButtonGroup>
            <Button
              startIcon={<SaveIcon />}
              onClick={() => console.log("test")}
              variant="contained"
              color="primary"
            >
              save
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => console.log("test")}
              variant="contained"
              color="secondary"
            >
              discard
            </Button>
          </ButtonGroup>
          <ButtonStyled />
        </ThemeProvider>
      </div> */}
    </>
  );
}
Home.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    allContentfulTeam(
      limit: 4
      sort: { fields: [post___childMdx___frontmatter___Date], order: DESC }
    ) {
      edges {
        node {
          featuredImage {
            fluid(maxWidth: 1300,quality: 90) {
              ...GatsbyContentfulFluid
            }
          }
          post {
            childMdx {
              frontmatter {
                slug
                title
                snippet
                postedAt
              }
            }
          }
        }
      }
    }
  }
`;

export default Home;
