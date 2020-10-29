import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, navigate } from "gatsby";
import Drawer from "@material-ui/core/Drawer";
import CategorySelection from "./categorySelection";
import { Grid } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

export const MenuListComposition = (props) => {
  const [open, setOpen] = React.useState(false);
  const [bookmarkOpen, setBookOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorBookRef = React.useRef(null);

  const handleToggle = (e) => {
    console.log("opened");
    setOpen((prevOpen) => !prevOpen);
    // anchorRef.current = e.currentTarget
    console.log(open);
  };
  const handleBookmarkToggle = (e) => {
    console.log("opened");
    setBookOpen((prevOpen) => !prevOpen);
    // anchorRef.current = e.currentTarget
    console.log(bookmarkOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleBookClose = (event) => {
    if (anchorBookRef.current && anchorBookRef.current.contains(event.target)) {
      return;
    }

    setBookOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  function handleBookListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setBookOpen(false);
    }
  }
  const [searchWidth, setSearchWidth] = useState("0px");
  const handleSearch = () => {
    setSearchWidth(searchWidth === "0px" ? "auto" : "0px");
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prevBookOpen = React.useRef(bookmarkOpen);
  React.useEffect(() => {
    if (prevBookOpen.current === true && bookmarkOpen === false) {
      anchorBookRef.current.focus();
    }

    prevBookOpen.current = bookmarkOpen;
  }, [bookmarkOpen]);

  const [navState, setNavDisplay] = useState({ top: "0px" });
  const [menuState, setShowMenu] = useState({
    showing: "",
    hamburger: "",
  });
  const menuShowingRef = useRef(false);

  const displayMenu = () => {
    menuShowingRef.current = menuState.showing === "none" ? true : false;

    setShowMenu({
      showing: menuState.showing === "" ? "showing" : "",
      hamburger: menuState.showing === "" ? "change" : "",
    });
    setNavDisplay({
      top: "0px",
    });
  };

  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: !state[anchor] });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const changeSearchQuery = (e) => setSearchQuery(e.target.value);

  const submitSearch = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/search") {
      props.changeSearch({ target: { value: searchQuery } });
      setSearchQuery("");
    } else {
      navigate("/search", { state: { search: searchQuery } });
    }
  };
  const changeCategory = (e) => props.changeCategory(e);
  return (
    <>
      <nav>
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
              style={{ textTransform: "none" }}
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
            <Tooltip title="Search">
              <IconButton variant="contained" onClick={handleSearch}>
                <SearchOutlinedIcon style={{ fill: "#fff" }} />
              </IconButton>
            </Tooltip>
            <div style={{ width: searchWidth, overflow: "hidden" }}>
              <form onSubmit={(e) => submitSearch(e)}>
                <InputBase
                  autoComplete="off"
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
                  inputProps={{ "aria-label": "search" }}
                />
              </form>
            </div>

            {/* <Tooltip title={bookmarkOpen === true ? "" : "Saved"}>
              <IconButton color="disabled" variant="contained">
                <BookmarksOutlinedIcon
                  ref={anchorBookRef}
                  aria-controls={bookmarkOpen ? "menu-book-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleBookmarkToggle}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton color="disabled" variant="contained">
                <Badge badgeContent={4} color="primary">
                  <NotificationsNoneTwoToneIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={open === true ? "" : "Profile"}>
              <IconButton
                aria-label="profile"
                variant="contained"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title={!open?"settings": ""}>
              <IconButton aria-label="profile" variant="contained" onClick={handleToggle}>
                <SettingsIcon
                  style={{ fill: "#fff" }}
                  aria-label="profile"
                  variant="contained"
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  
                />
              </IconButton>
            </Tooltip>
          </div>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            style={{ zIndex: 4 }}
            modifiers={{
              arrow: {
                enabled: true,
              },
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
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
                        style={{width:'fit-content', margin: '-4px 5px'}}
                      >
                        <Grid item>Light</Grid>
                        <Grid item>
                          <Switch
                            checked={state.checkedC}
                            // onChange={handleChange}
                            name="checkedC"
                          />
                        </Grid>
                        <Grid item>Dark</Grid>
                      </Grid>
                      {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {/* <Popper
            open={bookmarkOpen}
            anchorEl={anchorBookRef.current}
            role={undefined}
            transition
            disablePortal
            style={{ zIndex: 4 }}
            modifiers={{
              arrow: {
                enabled: true,
              },
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleBookClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-book-grow"
                      onKeyDown={handleBookListKeyDown}
                    >
                      <ol
                        style={{
                          padding: "25px 8px 0px 8px",

                          listStyle: "none",
                        }}
                      >
                        <li>No Saved Posts</li>
                        <hr />
                        <li>
                          <MenuItem onClick={handleClose}>Go To all</MenuItem>
                        </li>
                      </ol>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
        </div>
        <div className="menu">
          <Link
            to="/"
            style={{ color: "#000", margin: "0", fontSize: "large" }}
          >
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
        <Link to="/about">About</Link>
        <Button to="http://www.matthewPudney.co.uk">Portfolio</Button>
        <Button to="https://github.com/Pudderz">Github</Button>
      </div>
      <Drawer
        className={`categoriesSelection ${state["top"]}`}
        style={{
          position: "fixed",
          top: "52px",
          left: "0",
          right: "0",
          backgroundColor: "#191c1d",
          maxHeight: "fit-content",
          width: "100%",
        }}
        anchor={"top"}
        variant="persistent"
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
      >
        <div
          className="selection"
          style={{
            maxWidth: "1300px",
            margin: " 20px auto",
            width: "fit-content",
            maxHeight: "auto",
          }}
        >
          <h5
            style={{ margin: "5px auto", width: "fit-content", color: "#fff" }}
          >
            Categories
          </h5>
          <CategorySelection changeCategory={changeCategory} />
        </div>
      </Drawer>
    </>
  );
};

export default React.memo(MenuListComposition);
