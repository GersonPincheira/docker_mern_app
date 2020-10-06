import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootBar: {
    backgroundColor: "rgb(0, 113, 206)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: 50,
    backgroundColor: " white",
    color: "black",
    "&:hover": {},
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const { logo, setText } = props;
  function handlerChange(event) {
    setText(event.target.value);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.rootBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {logo}
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchRoundedIcon />
            </div>
            <InputBase
              placeholder="¿Qué estás buscando?"
              onChange={handlerChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
