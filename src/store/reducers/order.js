import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purcahsed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });
            // This order is actually recieved through the action, but the ID is on a seperate property; this will combine the two into one
            return updateObject(
                state,
                {
                    loading: false,
                    purchased: true,
                    orders: state.orders.concat(newOrder)
                    // Reminder: concat() creates a new array that includes elements in object; maintains IMMUTABILITY!!!
                });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(
                state,
                {
                    orders: action.orders,
                    loading: false
                });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false});
        default:
            return state
    }
};

export default reducer;