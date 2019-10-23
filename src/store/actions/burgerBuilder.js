import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};
// This is a SYNCHRONOUS action creator. This is dispatched AFTER the ASYNCHRONOUS code below

export const initIngredients = () => {
    return dispatch => {
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
        // // It is important to note that this method requires an ingredients object with the ingredients
        // // to ALWAYS exist within firebase. If it isn't there, you'll get stuck with infinite loading...
    };
};