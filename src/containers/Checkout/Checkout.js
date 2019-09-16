import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        // Remember that the componentDidMount method has an object that can be viewed via console.log(this.props); we're getting the props via this methodology
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === "price") {
                price = param[1]
                // This allows us to look at the price first and collect how much the burger will cost
            }
            else {
                ingredients[param[0]] = +param[1]
            }
        };
        // This allows us to loop through the list of ingredients and convert the URL into a key, value pair that can be used in the empty ingredients object stated up above
        this.setState({
            ingredients: ingredients,
            totalPrice: price
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
                <Route
                    path={this.props.match.path + "/contact-data"}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props} />)
                        // We pass props here to give the ContactData component access to the history object so we can eventually 
                        // redirect the app to the BurgerBuilder after posting the data we created to firebase
                    }
                // We changed this from the component to the render method to allow the ContactData component to accept props. 
                // This is important so the user data can actually be passed and collected.
                />
            </div>
        )
    }
};

export default Checkout;