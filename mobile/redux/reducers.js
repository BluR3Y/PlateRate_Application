import {
    SET_USER_ID,
    SET_USER_FIRST_NAME,
    SET_USER_LAST_NAME,
    SET_USER_EMAIL,
    SET_USER_PHONE,
    SET_USER_IMAGE,
    // SET_USER_ORDERS,
    SET_USER_RESTAURANTS,
} from './actions';

const initialState = {
    userId: null,
    firstName: '',
    lastName: '',
    userEmail: '',
    userPhone: '',
    userImg: 'https://platerate.com/images/avatar.png',
    // userOrders: [],
    userRestaurants: [],
};

function userReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER_ID:
            return {...state, userId: action.payload};
        case SET_USER_FIRST_NAME:
            return {...state, firstName: action.payload};
        case SET_USER_LAST_NAME:
            return {...state, lastName: action.payload};
        case SET_USER_EMAIL:
            return {...state, userEmail: action.payload};
        case SET_USER_PHONE:
            return {...state, userPhone: action.payload};
        case SET_USER_IMAGE:
            return {...state, userImg: action.payload};
        // case SET_USER_ORDERS:
        //     return {...state, userOrders: action.payload};
        case SET_USER_RESTAURANTS:
            return {...state, userRestaurants: action.payload};
        default:
            return state;
    }
};

export default userReducer;