import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICE = {
    lettuce: .8,
    bacon: .9,
    cheese: .75,
    meat: 1.4,
    egg: 1.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchase: false,
        checkOut: false,
        loading: false
    };

    componentDidMount() {
        axios.get("https://react-burger-238f6.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            });
    }

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
        this.setState({
            loading: true
        });
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

        let orderSummary = null;

        let burger = <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredeientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledButton}
                        purchase={this.state.purchase}
                        price={this.state.totalPrice}
                        ordered={this.checkOutHandler}
                    />
                </Aux>
            );
            orderSummary =
                <OrderSummary
                    checkOutCancelled={this.checkOutCancelHandler}
                    checkOutContinue={this.checkOutContinueHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        };

        return (
            <Aux>
                <Modal
                    show={this.state.checkOut}
                    modalClosed={this.checkOutCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);