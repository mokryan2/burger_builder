import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {

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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(Checkout);
// We don't really need to use mapDispatchToProps here b/c we're not passing data; however, it is worth noting
// that if it were the other way around and we weren't passing mapStateToProps the connect method requires you to pass
// null, mapDispatchToProps in this order because MDTP needs to always be the second argument