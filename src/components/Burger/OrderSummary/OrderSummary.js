import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>)
            })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>You've selected the following additions to your burger:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Order total: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    clicked={this.props.checkOutCancelled}
                    btnType="Danger">
                    CANCEL
                    </Button>
                <Button
                    clicked={this.props.checkOutContinue}
                    btnType="Success"
                >CONTINUE</Button>
            </Aux >
        );
    };
};

export default OrderSummary;