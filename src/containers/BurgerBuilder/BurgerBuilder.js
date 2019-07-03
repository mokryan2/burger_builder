import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger"

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            bacon: 0,
            cheese: 3,
            meat: 2
        }
    };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Building controls will go here</div>
            </Aux>
        );
    }
};

export default BurgerBuilder;