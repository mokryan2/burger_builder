import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
    lettuce: .8,
    bacon: .9,
    cheese: .75,
    meat: 1.4,
    egg: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            egg: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            lettuce: 0

        },
        totalPrice: 5,
        purchase: false,
        checkOut: false
    };

    updatePurchaseState(ingredients) {
        const total = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((total, el) => {
                return total + el;
            }, 0);
        this.setState({
            purchase: total > 0
        });
    };
    // While this method is simiar to the one in Burger.js, we don't need to know the names.
    // All we really need is the collective value of all the ingredients

    addIngredeientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedIngredientCount;
        const priceAddition = INGREDIENT_PRICE[type]
        const startPrice = this.state.totalPrice;
        const endPrice = startPrice + priceAddition;
        this.setState({
            totalPrice: endPrice,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    };

    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <= 0) {
            return;
        };
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedIngredientCount;
        const priceDeduction = INGREDIENT_PRICE[type]
        const startPrice = this.state.totalPrice;
        const endPrice = startPrice - priceDeduction;
        this.setState({
            totalPrice: endPrice,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    };

    checkOutHandler = () => {
        this.setState({
            checkOut: true
        })
    };

    checkOutCancelHandler = () => {
        this.setState({
            checkOut: false
        })
    };

    checkOutContinueHandler = () => {
        alert("PAY MEEEEE")
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                console.log(response);
            })
            .catch(err =>
                console.log(err));
    };
    // This is important to note that becuase we're using firebase to serve as the database, you need to add ".json" to the end of the url link
    // Evetually we're going to replace the hard-coded stuff to be collectible from a form, but this will do for test purposes

    render() {

        const disabledButton = {
            ...this.state.ingredients
        };
        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0
        };

        return (
            <Aux>
                <Modal
                    show={this.state.checkOut}
                    modalClosed={this.checkOutCancelHandler}>
                    <OrderSummary
                        checkOutCancelled={this.checkOutCancelHandler}
                        checkOutContinue={this.checkOutContinueHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredeientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledButton}
                    purchase={this.state.purchase}
                    price={this.state.totalPrice}
                    ordered={this.checkOutHandler}
                />
            </Aux >
        );
    }
};

export default BurgerBuilder;