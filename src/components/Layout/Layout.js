import React from 'react';
import Aux from "../../hoc/Auxiliary";

const layout = (props) => (
    <Aux>
        <div>Toolbar, Side Drawer, and Backdrop will eventually go here</div>
        <p>{props.children}</p>
    </Aux>
);

export default layout