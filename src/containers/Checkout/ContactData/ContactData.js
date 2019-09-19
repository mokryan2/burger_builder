import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street"
                },
                value: ""
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your ZIP Code"
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: ""
            },
            orderType: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: ""
            },
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push("/")
                // Because we're granted the history object from Checkout.js, we can force a redirect
                // to the BurgerBuilder after posting data
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                // We're setting the spinner to stop loading in both instances of success or failure for the sake of maintaining the flow of the app.
                // Sure we won't know right now if there's an error, but at least we won't think the app is still loading!
            });
        // This is important to note that becuase we're using firebase to serve as the database, you need to add ".json" to the end of the url link
        // Evetually we're going to replace the hard-coded stuff to be collectible from a form, but this will do for test purposes
    };

    render() {

        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        };
        // Much like in the Orders component, what we do is create an array to hold the information, push the state into said array (i.e. the orderForm) while collecting the id and config,
        // and we eventually map the different fields to dynamically display the form!

        let form = (
            <form>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} />
                ))}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }

        return (

            <div className={classes.ContactData}>
                <h4>Where we dropping this off?</h4>
                {form}
            </div>
        )
    }
};

export default ContactData;