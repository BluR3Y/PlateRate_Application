export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';
export const SET_USER_LAST_NAME = 'SET_USER_LAST_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_PHONE = 'SET_USER_PHONE';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const SET_USER_ORDERS = 'SET_USER_ORDERS';

// export const setUserId = userId => dispatch => {
//     dispatch({
//         type: SET_USER_ID,
//         payload: userId,
//     });
// };

// export const setUserFirstName = firstName => dispatch => {
//     dispatch({
//         type: SET_USER_FIRST_NAME,
//         payload: firstName,
//     });
// }

// export const setUserLastName = lastName => dispatch => {
//     dispatch({
//         type: SET_USER_LAST_NAME,
//         payload: lastName,
//     });
// }

// export const setUserEmail = userEmail => dispatch => {
//     dispatch({
//         type: SET_USER_EMAIL,
//         payload: userEmail,
//     });
// };

// export const setUserPhone = userPhone => dispatch => {
//     dispatch({
//         type: SET_USER_PHONE,
//         payload: userPhone,
//     });
// };

// export const setUserImage = userImage => dispatch => {
//     dispatch({
//         type: SET_USER_IMAGE,
//         payload: userImage,
//     });
// };

export const setUserOrders = userOrders => dispatch => {
    dispatch({
        type: SET_USER_ORDERS,
        payload: userOrders,
    });
};

export const setUserInfo = userInfo => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: userInfo.userId,
    });
    dispatch({
        type: SET_USER_FIRST_NAME,
        payload: userInfo.firstName,
    });
    dispatch({
        type: SET_USER_LAST_NAME,
        payload: userInfo.lastName,
    });
    dispatch({
        type: SET_USER_EMAIL,
        payload: userInfo.email,
    });
    dispatch({
        type: SET_USER_PHONE,
        payload: userInfo.phone,
    });
    dispatch({
        type: SET_USER_IMAGE,
        payload: userInfo.userImg,
    });
};