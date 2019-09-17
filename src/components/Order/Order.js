import React from "react";
import classes from "./Order.css"

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: meat (1)</p>
        <p>Price: USD 6.75</p>
    </div>
);

export default order;