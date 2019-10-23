import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your ZIP Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            orderType: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "",
                validation: {},
                // Because our inputChangedHandler is looking for the field "validation", whenever the delivery method is changed it causes an error
                // The quick fix is to add a validation field w/ nothing inside it to meet the validation object search and remove the error!
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    };

    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== " " && isValid
        };
        // If the required rule is true, isValid is true if not an empty string

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        };
        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid
        };

        return isValid;
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        };
        // We're creating an empty array to collect the data from the user here; We're also essentially creating a key:value pair set specifically to the
        // the exact form element to allow collection by firebase!

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order);

    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        // This is to grab and maintain immutable state for the top-level of the order form

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        // This is to go a level deeper than what we grab in the updated form to allow access to value field

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        // These allow the field of the specific form element to be updated in the DOM
        // The valid field is set to check if the value and validity is true
        // The touched field is set to change to true when the user starts to input any data.

        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        // This is set up in a way that double checks the validity of the form; if either half is invalid, formIsValid will be false!

        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid
        });
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
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
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
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurgerStart(orderData))
    };
};

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));