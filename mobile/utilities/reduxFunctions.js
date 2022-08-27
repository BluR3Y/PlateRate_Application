import { store } from "../redux/store";
import { setUserInfo, setUserOrders } from "../redux/actions";

export async function testUpdateOrder() {
    // works for updating order_type, 
    var update = await fetch('https://platerate.com/orders/update', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId: 7027,
            venueId: '61a3eada110bc56718838bb9',
            updateFields: {
                order_type: 'delivery',
            }
        })
    });
    update = await update.json();

    // console.log(update)
}

export async function testGetCheckOut() {
    // works for retrieving server/delivery person assigned to a processed order
    const { userId } = store.getState().userReducer;
    const venueId = '61bfb5c55da83c7bd48dc467';
    var checkOut = await fetch(`https://platerate.com/orders/checkouts?userId=${userId}&venueId=${'1234'}`);
    checkOut = await checkOut.json();
    // console.log(checkOut);
}

// for edit incart item: /orders/editItemsOrder
// for deleting incart item: /orders/shoppingcart/delete

export async function testGetRestaurantOrders() {
    // var userRest = await fetch(`https://platerate.com/restaurantadmin/listMyRestaurant`);
    // userRest = await userRest.json();
    // // console.log(userRest);
    // const {userId} = store.getState().userReducer;
    // // console.log(userRest[1]);    // returns either an empty array or a populated one
    // let currentDate = new Date();
    // var priorDate = new Date(new Date().setDate(currentDate.getDate() - 90));
    // try {
    //     userRest.forEach(async function(restaurant) {
    //         var restOrders = await fetch('https://platerate.com/orders/getRestaurantOrdersHistory', {
    //             method: 'post',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 venueId: restaurant.venueId,
    //                 user: { _id: userId },
    //                 orderTypes: ['delivery','pickup','order-ahead'],
    //                 fromDate: priorDate,
    //                 toDate: currentDate,
    //             })
    //         });
    //         restOrders = await restOrders.json();
    //         console.log(restOrders);
    //     })
    // } catch (error) {
    //     console.error(error);
    // }

}

export async function testNotification() {

    const {userRestaurants} = store.getState().userReducer;

    // var notifications = await fetch(`https://platerate.com/restaurantadmin/getPersonReceiveNotificationNewOrder/${userRestaurants[0].venueId}`);
    // notifications = await notifications.json();
    
    userRestaurants.forEach(async function(restaurant) {        
        var notifications = await fetch(`https://platerate.com/restaurantadmin/getPersonReceiveNotificationNewOrder/${userRestaurants[0].venueId}`);
        notifications = await notifications.json();
        console.log(notifications)
    })

    // console.log(notifications.data);
}


// -------------------------------- End Testing -----------------------------------------

// export async function getUserOrders() {
//     const userId = store.getState().userReducer.userId;

//     if(userId) {
//         var orderItems = [];

//         var orders = await fetch('https://platerate.com/getUserOrders');
//         orders = await orders.json();

//         for(var i = 0; i < orders.length; i++) {
//             let shoppingCart = await fetch(`https://platerate.com/orders/shoppingcart/get?userId=${userId}&venueId=${orders[i].venue_id}&orderId=${orders[i].order_id}`);
//             shoppingCart = await shoppingCart.json();
            
//             let orderTotal = await fetch(`https://platerate.com/orders/gettotal?orderId=${orders[i].order_id}`);
//             orderTotal = await orderTotal.json();

//             let orderObj = {
//                 orderInfo: orders[i],
//                 shoppingCart: shoppingCart.data,
//                 orderTotal: orderTotal.data[0],
//             };
//             orderItems.push(orderObj);
//         }

//         store.dispatch(setUserOrders(orderItems));
//     }else{
//         store.dispatch(setUserOrders([]));
//     }
//     return;
// }

export async function assignUserInfo(userInfo) {

    store.dispatch(setUserInfo({
        userId: (userInfo.userId? userInfo.userId : null ),
        email: (userInfo.email? userInfo.email : '' ),
        firstName: (userInfo.firstName? userInfo.firstName : '' ),
        lastName: (userInfo.lastName? userInfo.lastName : ''),
        phone: (userInfo.phone? userInfo.phone : '' ),
        userImg: (userInfo.userImg? userInfo.userImg : ''),
        userRestaurants: (userInfo.userRestaurants? userInfo.userRestaurants : [])
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

        var userRestaurants = await fetch(`https://platerate.com/restaurantadmin/listMyRestaurant`);
        userRestaurants = await userRestaurants.json();

        assignUserInfo({
            userId: userData.data._id,
            firstName: userContactInfo.firstName,
            lastName: userContactInfo.lastName,
            email: localData.local.email,
            phone: localData.local.phone,
            userImg: imageUrl,
            userRestaurants: userRestaurants,
        })
        // .then(() => {
        //     getUserOrders();
        // })
    }
    // updating by adding another condition: userId && localData
}

export function signOutUser() {
    store.dispatch({ type: 'SIGNOUT_REQUEST' });
}