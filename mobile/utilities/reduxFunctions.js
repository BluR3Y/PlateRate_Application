import { store } from "../redux/store";
import { setUserInfo, setUserOrders } from "../redux/actions";

export async function getUserOrders() {
    const userId = store.getState().userReducer.userId;

    if(userId) {
        console.log('passed marker')
        var orderItems = [];
        var orders = await fetch('https://platerate.com/getUserOrders');
        orders = await orders.json();

        for(var i = 0; i < orders.length; i++) {
            let orderData = await fetch(`https://platerate.com/orders/details/user?orderId=${orders[i].order_id}&res=json`);
            orderData = await orderData.json();

            let orderObj = {
                orderInfo: orders[i],
                orderData: orderData.data,
            };
            orderItems.push(orderObj);
        }
        store.dispatch(setUserOrders(orderItems));
    }else{
        store.dispatch(setUserOrders([]));
    }
}

export async function assignUserInfo(userInfo) {

    store.dispatch(setUserInfo({
        userId: (userInfo.userId? userInfo.userId : null ),
        email: (userInfo.email? userInfo.email : '' ),
        firstName: (userInfo.firstName? userInfo.firstName : '' ),
        lastName: (userInfo.lastName? userInfo.lastName : ''),
        phone: (userInfo.phone? userInfo.phone : '' ),
        userImg: (userInfo.userImg? userInfo.userImg : ''),
    }));
}

export async function getUserInfo() {

    const {userId} = store.getState().userReducer;

    var localData = await fetch(`https://platerate.com/users/profile/detail`);
    localData = await localData.json();

    if(userId && !localData) {
        assignUserInfo({});
    }else if((!userId && localData) || (userId && localData)) {
        var userData = await fetch('https://platerate.com/user/validateEmail', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localData.local.email,
            })
        });
        userData = await userData.json();
        var userProfile = userData.data.profile;
        var userContactInfo = userProfile.contactInfo;
        var imageUrl = userProfile.imageUrl;

        assignUserInfo({
            userId: userData.data._id,
            firstName: userContactInfo.firstName,
            lastName: userContactInfo.lastName,
            email: localData.local.email,
            phone: localData.local.phone,
            userImg: (imageUrl ? imageUrl : 'https://platerate.com/images/avatar.png'),
        })
        .then(() => {
            getUserOrders();
        })
    }
    // updating by adding another condition: userId && localData
}

export function signOutUser() {
    store.dispatch({ type: 'SIGNOUT_REQUEST' });
}