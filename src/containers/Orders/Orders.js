import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                const fetchedOrders = [];
                // Setting a place for the orders to go
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                        // Pushing the data into the fetchedOrders array with a spread operator
                        // as a new object to avoid losing the keys
                    });
                    console.log(fetchedOrders)
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            })
    };

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
};

export default Orders;