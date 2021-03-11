import { Link, navigate } from "gatsby";
import React, { useState } from "react";
import { Fab, IconButton, InputBase, Tooltip } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
export const AboutSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const submitSearch = (e) => {
    e.preventDefault();
    navigate("/search", { state: { search: searchQuery } });
  };
  const changeSearchQuery = (e) => setSearchQuery(e.target.value);
  return (
    <div>
      <div className="aboutContainer">
        <h3>Hey I'm Matthew</h3>

        <div>
          <p>
            I'm a front-end web developer based in the UK, looking for a
            full-time role.
          </p>
          <p>
            Here I take a deep dive into tech that I've been learning to
            solidify and further my knowledge, improve my explanation and
            writing skills, and hopefully create a helpful resource to others.
          </p>
          <p>Feel free to message me as I would love to chat and share ideas.</p>
        </div>

        <div
          className="aboutButtons"
          style={{
            display: "flex",
            gap: "1em",
            justifyContent: "space-around",
            flexFlow: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1em",
              justifyContent: "space-around",
            }}
          >
            <Tooltip title="LinkedIn profile">
              <a
                href="https://www.linkedin.com/in/matthew-pudney/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Fab size="small">
                  <LinkedInIcon />
                </Fab>
              </a>
            </Tooltip>
            <Tooltip title="Github profile">
              <a
                href="https://github.com/Pudderz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Fab size="small">
                  <GitHubIcon />
                </Fab>
              </a>
            </Tooltip>
          </div>

          <Link to="/contact">Get in touch</Link>
          <Link to="/about">More Details...</Link>
          <Link to="/contact">Portfolio</Link>
        </div>
      </div>
      <div className="aboutContainer" style={{ marginTop: "20px" }}>
        <form onSubmit={submitSearch}>
          <InputBase
            autoComplete="off"
            name="search"
            value={searchQuery}
            onChange={changeSearchQuery}
            placeholder="Search…"
            style={{
              margin: "10px auto",
              backgroundColor: "lightgrey",
              padding: "2px 11px",
              borderRadius: "20px",
              width: "100%",
            }}
            inputProps={{
              "aria-label": "search",
            }}
            endAdornment={
              <IconButton size="small" type="submit">
                <SearchIcon style={{ fill: "black" }} />
              </IconButton>
            }
          />
        </form>

        <Link to="/posts">All Articles</Link>
        <Link to="/about">About</Link>
        <Link to="/about#contact">Contact</Link>
      </div>
    </div>
  );
};

export default AboutSection;
