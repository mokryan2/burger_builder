import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {

    state = {
        checkOut: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        console.log(this.props)
        this.props.onInitIngredients();
    };

    updatePurchaseState(ingredients) {
        const total = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((total, el) => {
                return total + el;
            }, 0);
        return total > 0;
    };
    // While this method is simiar to the one in Burger.js, we don't need to know the names.
    // All we really need is the collective value of all the ingredients

    // addIngredeientHandler = (type) => {
    //     const oldIngredientCount = this.state.ingredients[type];
    //     const updatedIngredientCount = oldIngredientCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedIngredientCount;
    //     const priceAddition = INGREDIENT_PRICE[type]
    //     const startPrice = this.state.totalPrice;
    //     const endPrice = startPrice + priceAddition;
    //     this.setState({
    //         totalPrice: endPrice,
    //         ingredients: updatedIngredient
    //     });
    //     this.updatePurchaseState(updatedIngredient);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldIngredientCount = this.state.ingredients[type];
    //     if (oldIngredientCount <= 0) {
    //         return;
    //     };
    //     const updatedIngredientCount = oldIngredientCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedIngredientCount;
    //     const priceDeduction = INGREDIENT_PRICE[type]
    //     const startPrice = this.state.totalPrice;
    //     const endPrice = startPrice - priceDeduction;
    //     this.setState({
    //         totalPrice: endPrice,
    //         ingredients: updatedIngredient
    //     });
    //     this.updatePurchaseState(updatedIngredient);
    // };

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
        this.props.history.push({ pathname: "/checkout" });
        // Now that we're implementing Redux, querey params are pretty much useless. Redux will make all of this much easier!
    };

    render() {

        const disabledButton = {
            ...this.props.ings
        };
        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0
        };

        let orderSummary = null;

        let burger = this.props.error ? <p>Someone ran off with our ingredients!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledButton}
                        purchase={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.checkOutHandler}
                    />
                </Aux>
            );
            orderSummary =
                <OrderSummary
                    checkOutCancelled={this.checkOutCancelHandler}
                    checkOutContinue={this.checkOutContinueHandler}
                    ingredients={this.props.ings}
                    price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));