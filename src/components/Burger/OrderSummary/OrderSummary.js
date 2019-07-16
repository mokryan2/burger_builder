import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>)
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>You've selected the following additions to your burger:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Order total: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                clicked={props.checkOutCancelled}
                btnType="Danger">
                CANCEL
                </Button>
            <Button
                clicked={props.checkOutContinue}
                btnType="Success"
            >CONTINUE</Button>
        </Aux>
    );

};

export default orderSummary;