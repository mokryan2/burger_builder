import * as actionTypes from "./actions";

const initialState = {
    ingredients: null,
    totalPrice: 5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {

            };
        case actionTypes.REMOVE_INGREDIENT:
            return {

            };
        default:
            return state;
    }
    return state;
};
// Remember, we don't technically need to include the break statement due to the guarantee of a return

export default reducer;