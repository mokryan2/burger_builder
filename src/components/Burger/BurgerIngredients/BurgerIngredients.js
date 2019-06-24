import React from "react";
import classes from "./BurgerIngredients.css"

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ("bread-bottom"):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ("bread-top"):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ("meat"):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ("cheese"):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ("bacon"):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
    }
};

export default burgerIngredient;