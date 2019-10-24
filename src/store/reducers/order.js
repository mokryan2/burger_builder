import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            // This order is actually recieved through the action, but the ID is on a seperate property; this will combine the two into one
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
                // Reminder: concat() creates a new array that includes elements in object; maintains IMMUTABILITY!!!
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
};

export default reducer;