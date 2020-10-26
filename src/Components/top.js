import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import IconButton from "@material-ui/core/IconButton";
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [bookmarkOpen, setBookOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorBookRef = React.useRef(null);

  const handleToggle = e => {
      console.log('opened')
    setOpen((prevOpen) => !prevOpen);
    // anchorRef.current = e.currentTarget
    console.log(open)
  };
  const handleBookmarkToggle = e => {
      console.log('opened')
    setBookOpen((prevOpen) => !prevOpen);
    // anchorRef.current = e.currentTarget
    console.log(bookmarkOpen)
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
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  function handleBookListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setBookOpen(false);
    }
  }
  const [searchWidth, setSearchWidth]= useState('0px')
  const handleSearch = ()=>{
    setSearchWidth((searchWidth=== '0px')? 'auto': '0px')
  }
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
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="Search">
            <IconButton color="disabled" variant="contained" onClick={handleSearch}>
            <SearchOutlinedIcon />
            </IconButton>    
        </Tooltip>
            <div style={{    width: searchWidth,
    overflow: 'hidden',}}>
                <InputBase
              placeholder="Search…"
            //   classes={{
            //     root: classes.inputRoot,
            //     input: classes.inputInput,
            //   }}
            style={{
                margin: '10px auto',
                backgroundColor: 'lightgrey',
                padding: '0px 11px',
                borderRadius: '36px',
                width: searchWidth,
                transition: 'width 2s'
            }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>
            
        <Tooltip title={bookmarkOpen == true ? "" : "Saved"}>
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
        
        <Tooltip title={open == true ? "" : "Profile"}>
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
        </Tooltip>
        
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{zIndex: 4}}
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Popper
          open={bookmarkOpen}
          anchorEl={anchorBookRef.current}
          role={undefined}
          transition
          disablePortal
          style={{zIndex: 4}}
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
                    <ol style={{'padding': '25px 8px 0px 8px',
                
    'listStyle': 'none'}}>
                        <li>
                            No Saved Posts
                        </li>
                        <hr/>
                        <li>
                            <MenuItem onClick={handleClose}>Go To all</MenuItem>
                        </li>
                        
                    </ol>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}