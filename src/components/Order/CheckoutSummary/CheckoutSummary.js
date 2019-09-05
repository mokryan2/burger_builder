import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css"

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>You sure have some interesting tastes...</h1>
            <div className={classes.Burger}>
                <Burger
                    ingredients={props.ingredients}
                />
            </div>
            <Button
                btnType="Danger"
                clicked>
                CANCEL</Button>/>
            <Button
                btnType="Success"
                clicked>
                CONTINUE</Button>/>

        </div>
    )
};

export default checkoutSummary;