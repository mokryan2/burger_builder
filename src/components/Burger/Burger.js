import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Start stacking up ingredients!</p>
    }

    //The transformedIngredients constant is needed to allow us to convert an OBJECT into an ARRAY.
    //First the Object.keys() method lets us extract the keys of an object (in this case the initial state of ingredients) and converts it into an array.
    //Second the igKey is mapped so we can get the individual keys of said array.
    //Third the spread operator is applied to a new Array so we can get a new array with however many elements are within.
    //Fourth the ingredients are rendered into the DOM.
    //Fifth the reduce js function is applied to compile all the seperate arrays into 1 object
    //Sixth the concat js function combines the 2 values given to the reduce function

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;