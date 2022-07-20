export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const setUserId = userId => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: userId,
    });
};

export const setUserName = userName => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: userName,
    });
};

export const setUserEmail = userEmail => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: userEmail,
    });
};
