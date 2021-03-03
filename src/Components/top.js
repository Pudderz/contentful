import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Tooltip from "@material-ui/core/Tooltip";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { Link, navigate } from "gatsby";
import Drawer from "@material-ui/core/Drawer";
import CategorySelection from "./categorySelection";
import { Grid } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import SearchIcon from "@material-ui/icons/Search";
import "./nav.scss";

export const MenuListComposition = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const searchBar = useRef(null);
  const [menuState, setShowMenu] = useState({
    showing: "",
    hamburger: "",
  });
  const [searchWidth, setSearchWidth] = useState("0px");
  const menuShowingRef = useRef(false);
  const prevOpen = useRef(open);
  const [state, setState] = useState({
    top: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleSearch = (boolean = true) => {
    if (boolean) {
      console.log("button clicked");
      searchBar.current.focus();
    }
    if (!boolean) {
      setSearchWidth("0px");
    } else {
      setSearchWidth(searchWidth === "0px" ? "auto" : "0px");
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const displayMenu = () => {
    menuShowingRef.current = menuState.showing === "none";

    setShowMenu({
      showing: menuState.showing === "" ? "showing" : "",
      hamburger: menuState.showing === "" ? "change" : "",
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: !state[anchor] });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/search") {
      props.changeSearch({ target: { value: searchQuery } });
      setSearchQuery("");
    } else {
      navigate("/search", { state: { search: searchQuery } });
    }
  };

  const changeSearchQuery = (e) => setSearchQuery(e.target.value);
  const changeCategory = (e) => props.changeCategory(e);
  return (
    <>
      <nav className="header">
        <div
          className="navbuttons buttons"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "75%",
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>
            <Button
              style={{ textTransform: "none", backgroundColor: 'transparent'}}
              onClick={toggleDrawer("top")}
            >
              Categories
            </Button>
          </div>

          <div
            style={{
              minWidth: "250px",
              width: "400px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ClickAwayListener onClickAway={() => handleSearch(false)}>
              <div style={{ display: "flex" }}>
                <div style={{ width: searchWidth, overflow: "hidden" }}>
                  <form onSubmit={(e) => submitSearch(e)}>
                    <InputBase
                      autoComplete="off"
                      ref={searchBar}
                      name="search"
                      value={searchQuery}
                      onChange={changeSearchQuery}
                      placeholder="Search…"
                      style={{
                        margin: "10px auto",
                        backgroundColor: "lightgrey",
                        padding: "0px 11px",
                        borderRadius: "36px",
                        width: searchWidth,
                        transition: "width 2s",
                      }}
                      // inputProps={{
                      //   "aria-label": "search",
                      // }}
                      endAdornment={
                        <IconButton size="small" type="submit">
                          <SearchIcon style={{ fill: "black" }} />
                        </IconButton>
                      }
                    />
                  </form>
                </div>
                {searchWidth === "0px" && (
                  <Tooltip title="Search">
                    <IconButton
                      variant="contained"
                      onClick={() => handleSearch()}
                    >
                      <SearchOutlinedIcon style={{ fill: "#4a5568" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </ClickAwayListener>
            <Tooltip title="Light / Dark Mode">
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                  style={{ width: "fit-content", margin: "-4px 5px" }}
                >
                  <Grid item>
                    <Switch checked={state.checkedC} name="checkedC" />
                  </Grid>
                </Grid>
              </MenuList>
            </Tooltip>
          </div>
        </div>
        <div className="menu">
          <Link to="/" style={{ margin: "0", fontSize: "large" }}>
            Blog
          </Link>
          <button
            className={`menubar${menuState.hamburger}`}
            onClick={displayMenu}
            onKeyDown={displayMenu}
            title="menu"
            style={{ background: "none", border: "none", outline: "none" }}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>
        </div>
      </nav>
      <div id="overlay" className={`${menuState.showing}`}>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/search">Search</Link>
        <Link to="/about">About</Link>
        <Button to="https://github.com/Pudderz">Github</Button>
      </div>
      <Drawer
        className={`categoriesSelection ${state["top"]}`}
        style={{
          position: "fixed",
          top: "52px",
          left: "0",
          right: "0",
          // backgroundColor: "#191c1d",
          backgroundColor: "#fff",
          maxHeight: "fit-content",
          width: "100%",
        }}
        anchor={"top"}
        variant="persistent"
        open={state["top"]}
        onClose={() => toggleDrawer("top", false)}
      >
        <div
          className="selection"
          style={{
            maxWidth: "1300px",
            margin: " 20px auto",
            width: "fit-content",
            maxHeight: "auto",
            // boxShadow: '0px 0px 5px 0px rgba(112, 154, 168, 0.3)'
          }}
        >
          <h5 style={{ margin: "5px auto", width: "fit-content" }}>
            Categories
          </h5>
          <CategorySelection changeCategory={changeCategory} />
        </div>
      </Drawer>
    </>
  );
};

export default React.memo(MenuListComposition);
