import React from "react";
import Logo from "../../../Logo/Logo";
import NavItems from "../NavItems"
import classes from "./SideDrawer.css";

const sideDrawer = (props) => {
    return (
        <div>
            <Logo />
            <nav>
                <NavItems />
            </nav>
        </div>
    )
};

export default sideDrawer;