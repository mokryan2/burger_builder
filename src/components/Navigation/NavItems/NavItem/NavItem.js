import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavItem.css";

const navItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink to={props.link}>
            {props.children}
        </NavLink>
    </li>
);

export default navItem;