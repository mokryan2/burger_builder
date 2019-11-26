import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/">Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/auth">Authenticate</NavItem>
    </ul>
);

export default navItems;