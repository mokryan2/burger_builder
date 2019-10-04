import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        egg: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        lettuce: 0
    },
    totalPrice: 5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                // This is something that should be done in all reducers to maintain immutable state,
                // HOWEVER, this won't create deep clones of an object; you need to go another level!!!
                ingredients: {
                    ...state.ingredients,
                    // Need the extra level because spread operator won't go into objects to create new ones
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            };
        default:
            return state;
    }
};
// Remember, we don't technically need to include the break statement due to the guarantee of a return

export default reducer;