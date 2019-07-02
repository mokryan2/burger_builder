import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger"

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            bacon: 2,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Aux>
                <Burger />
                <div>Building controls will go here</div>
            </Aux>
        );
    }
};

export default BurgerBuilder;