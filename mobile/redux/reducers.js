import {
    SET_USER_ID,
    SET_USER_NAME,
    SET_USER_EMAIL
} from './actions';

const initialState ={
    userId: null,
    userName: '',
    userEmail: '',
};

function userReducer(state = initialState, action) {
    switch(action.type) {
        case SET_USER_ID:
            return {...state, userId: action.payload};
        case SET_USER_NAME:
            return {...state, userName: action.payload};
        case SET_USER_EMAIL:
            return {...state, userEmail: action.payload};
        default:
            return state;
    }
};

export default userReducer;