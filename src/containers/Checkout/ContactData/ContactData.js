import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipCode: ""
        },
        phoneNumber: "",
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Ryan Mok",
                address: {
                    street: "SecretAve 2",
                    zipcode: "53049",
                    country: "USA"
                },
                email: "testytest@test.com"
            },
            orderType: "Fastest"
        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({
                    loading: false,
                    checkOut: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    checkOut: false
                });
                // We're setting the spinner to stop loading in both instances of success or failure for the sake of maintaining the flow of the app.
                // Sure we won't know right now if there's an error, but at least we won't think the app is still loading!
            });
        // This is important to note that becuase we're using firebase to serve as the database, you need to add ".json" to the end of the url link
        // Evetually we're going to replace the hard-coded stuff to be collectible from a form, but this will do for test purposes
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Where we dropping this off?</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your E-mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your Address" />
                    <input className={classes.Input} type="text" name="zipCode" placeholder="Your Zip Code" />
                    <input className={classes.Input} type="text" name="phoneNumber" placeholder="Your Phone Number" />
                    <Button
                        btnType="Success"
                        clicked={this.orderHandler}
                    >ORDER</Button>
                </form>
            </div>
        )
    }
};

export default ContactData;