import React from 'react';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";

const layout = (props) => (
    <Aux>
        <Toolbar />
        <div className={classes.Content}>{props.children}</div>
    </Aux>
);

export default layout