import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    };

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(
                order => (
                    < Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                )
            )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

// Note: Given the way that Firebase works, there is a rule set in place for all users that blocks the display of previous orders to any who are not authenticated. These rules can be seen in
// the rules sections of the database on the firebase database hosted by Google. As it is, non users can still place orders though.