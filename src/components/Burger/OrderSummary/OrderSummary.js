import React from "react";
import Aux from "../../../hoc/Auxiliary"

const orderSummary = (props) => {

    const ingredientSummary = props.ingredients

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>You've selected the following additions to your burger:</p>
            <ul>

            </ul>
        </Aux>
    );

};

export default orderSummary;