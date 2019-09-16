import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        loading: false,
        error: null
    };

    componentDidMount() {
        console.log(this.props)
        axios.get("https://react-burger-238f6.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            });
        // It is important to note that this method requires an ingredients object with the ingredients
        // to ALWAYS exist within firebase. If it isn't there, you'll get stuck with infinite loading...
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
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
            // encodeURIComponent is a helper method offered by javascript that encodes elements so they can be used in a URL; mostly used for white spaces.
            // This portion is needed so that it can be parsed into the Checkout.js file to acquire the ingredient count
        };

        queryParams.push("price=" + this.state.totalPrice.toFixed(2));
        //This is needed so we can also push the actual price of the burger to the checkout page! 

        const queryString = queryParams.join("&");
        // This is so the URL continues and puts everything together like a continuous string

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
        // Due to the nature of the component, we automatically have access to match, history, and location props which can be seen via the componentDidMount function; because of this
        // connection, we can essentially stack the checkout page to progress forward when we click the checkout button in the modal.
    };

    render() {

        const disabledButton = {
            ...this.state.ingredients
        };
        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0
        };

        let orderSummary = null;

        let burger = this.state.error ? <p>Someone ran off with our ingredients!</p> : <Spinner />;
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