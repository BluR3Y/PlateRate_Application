export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';
export const SET_USER_LAST_NAME = 'SET_USER_LAST_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const setUserId = userId => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: userId,
    });
};

export const setUserFirstName = firstName => dispatch => {
    dispatch({
        type: SET_USER_FIRST_NAME,
        payload: firstName,
    });
}

export const setUserLastName = lastName => dispatch => {
    dispatch({
        type: SET_USER_LAST_NAME,
        payload: lastName,
    });
}

export const setUserEmail = userEmail => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: userEmail,
    });
};

// export const logoutUser = () => dispatch => {
//     dispatch({
//         type: SET_USER_ID,
//         payload: null,
//     });
//     dispatch({
//         type: SET_USER_EMAIL,
//         payload: '',
//     });
//     dispatch({
//         type: SET_USER_FIRST_NAME,
//         payload: '',
//     });
//     dispatch({
//         type: SET_USER_LAST_NAME,
//         payload: '',
//     });
//     console.log('marker');
// }