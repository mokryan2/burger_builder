import React from "react";
import Aux from "../../../hoc/Auxiliary"

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
            <p>Order total: ${props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    );

};

export default orderSummary;