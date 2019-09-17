import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavItem.css";

const navItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink
            to={props.link}
            activeClassName={classes.active}>
            {/*CSS Modules takes the classNames and creates unique classNames; in other words, the active class from CSS modules won't match with the active class from NavLink
        This is fixed by using activeClassName to allow us to reference the CSS file!*/}
            {props.children}
        </NavLink>
    </li>
);

export default navItem;