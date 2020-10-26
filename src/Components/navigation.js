import { Link } from "gatsby";
import React, { useEffect, useState, useRef } from "react";

export default function Navigation() {
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

  const onScroll = (previousYPos) => {
    const currentYPos = window.pageYOffset;
    if (!menuShowingRef.current) {
      if (previousYPos > currentYPos) {
        setNavDisplay({
          top: "0px",
        });
      } else {
        setNavDisplay({
          top: "-50px",
        });
      }
    }
    return currentYPos;
  };

  useEffect(() => {
    let previousYPos = window.pageYOffset;
    window.addEventListener("scroll", () => {
      previousYPos = onScroll(previousYPos);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        previousYPos = onScroll(previousYPos);
      });
    };
  }, []);

  return (
    <>
      <nav style={{ top: navState.top, zIndex: "3" }}>
        <div className="buttons">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
          <Link to="/search">Search</Link>
          {/* <input
                id="Search"
                // value={searchQuery}
                // onChange={this.searchData}
                placeholder="Enter your search here"
              /> */}
        </div>
        <Link
          to="/"
          className="menu"
          style={{ color: "#fff", margin: "0", fontSize: "large" }}
        >
          Blog
        </Link>

        <button
          className={`menu ${menuState.hamburger}`}
          onClick={displayMenu}
          onKeyDown={displayMenu}
          title="menu"
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
      </nav>
      <div id="overlay" className={`${menuState.showing}`}>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/about">About</Link>
        <Link to="http://www.matthewPudney.co.uk">Portfolio</Link>
        <Link to="https://github.com/Pudderz">Github</Link>
      </div>
    </>
  );
}
