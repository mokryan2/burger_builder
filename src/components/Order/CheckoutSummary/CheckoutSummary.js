import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.css"

const checkoutSummary = (props) => {
    return (
        <div>
            <h1>You sure have some interesting tastes...</h1>
            <div className={classes.Burger}>
                <Burger />
            </div>
        </div>
    )
};

export default checkoutSummary;