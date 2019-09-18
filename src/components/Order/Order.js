import React from "react";
import classes from "./Order.css"

const order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            total: props.ingredients[ingredientName]
            // Given the ingredients object in the order, we're pushing the name of the ingredient and the total amount of said
            // ingredient into a new array to allow us to map the ingredients here
        });
    };

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span key={ig.name}>{ig.name}: {ig.total} </span>
        )
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD ${props.price}</strong></p>
        </div>
    );
};

export default order;