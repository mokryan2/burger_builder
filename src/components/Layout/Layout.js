import React from 'react';
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";

const layout = (props) => (
    <Aux>
        <div>Toolbar, Side Drawer, and Backdrop will eventually go here</div>
        <div className={classes.Content}>{props.children}</div>
    </Aux>
);

export default layout