import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"

const INGREDIENT_PRICE = {
    lettuce: .8,
    bacon: .9,
    cheese: .75,
    meat: 1.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5
    };

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
        const endPrice = startPrice + priceDeduction;
        this.setState({
            totalPrice: endPrice,
            ingredients: updatedIngredient
        });
    }

    render() {

        const disabledButton = {
            ...this.state.ingredients
        };
        for (let key in disabledButton) {
            disabledButton[key] = disabledButton[key] <= 0
        };

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredeientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledButton}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
};

export default BurgerBuilder;