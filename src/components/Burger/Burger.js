import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map();

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            <BurgerIngredients type="cheese" />
            <BurgerIngredients type="meat" />
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;