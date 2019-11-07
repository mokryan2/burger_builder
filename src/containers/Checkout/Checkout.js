import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchase()
    };
    // This will allow the redirect after the order is submitted

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    // This will essentially reset the process and send us back to the burgerBuilder page.

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };


    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purcahsedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purcahsedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
                // This was causing an error b/c ingredients was initially null; this means if we tried to loop through the ingredients it would fail causing said error.
                // This way if the user tries to make his way to the checkout page before selecting ingredients, they'll be forcibly redirected to the landing page
            )
        };
        return summary;
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
// We don't really need to use mapDispatchToProps here b/c we're not passing data; however, it is worth noting
// that if it were the other way around and we weren't passing mapStateToProps the connect method requires you to pass
// (null, mapDispatchToProps) in this order because MDTP needs to always be the second argument