import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            egg: 1,
            meat: 1,
            cheese: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        // Remember that the componentDidMount method has an object that can be viewed via console.log(this.props); we're getting the props via this methodology
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        };
        // This allows us to loop through the list of ingredients and convert the URL into a key, value pair that can be used in the empty ingredients object stated up above
        this.setState({
            ingredients: ingredients
        });
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    // This will essentially reset the process and send us back to the burgerBuilder page.

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
            </div>
        )
    }
};

export default Checkout;