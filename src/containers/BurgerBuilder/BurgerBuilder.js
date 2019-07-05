import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"

const INGREDIENT_PRICE = {
    lettuce: .5,
    bacon: 1,
    cheese: .75,
    meat: 1.5
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

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredeientHandler}
                />
            </Aux>
        );
    }
};

export default BurgerBuilder;