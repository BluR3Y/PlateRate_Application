import { setUserInfo } from "../redux/actions";
import { store } from "../redux/store";
import { withinRange } from "./functions";

export async function getNewOrders(userRestaurants) {
    if(userRestaurants.length === 0) return [];

    var newOrders = [];

    for(const restaurant of userRestaurants) {
        var restaurantOrders = await fetch(`https://platerate.com/restaurantadmin/getPersonReceiveNotificationNewOrder/${restaurant.venueId}`);
        restaurantOrders = await restaurantOrders.json();
        newOrders = newOrders.concat(restaurantOrders.data);
    }
    
    return newOrders;
}

export async function getUserFilteredOrders(userId, from,to, orderTypes) {
    if(!userId) return[];

    var userOrders = [];
    var selectedOrderTypes = [];
    for(var type of orderTypes) {
        if(type.selected)
            selectedOrderTypes.push(type.orderType);
    }

    try{
        var orders = await fetch('https://platerate.com/getUserOrders');
        orders = await orders.json();
    
        for(const order of orders) {
            if((order.order_placed_date && !withinRange(order.order_placed_date,from,to)) || !selectedOrderTypes.includes(order.order_type)) {continue;}
            // console.log(`${order.order_placed_date} <  ${from} ? ${order.order_placed_date < from}`);
            // console.log(`${order.order_placed_date} >  ${to} ? ${order.order_placed_date > to}`);
    
            let shoppingCart = await fetch(`https://platerate.com/orders/shoppingcart/get?userId=${userId}&venueId=${order.venue_id}&orderId=${order.order_id}`);
            shoppingCart = await shoppingCart.json();
            
            let orderTotal = await fetch(`https://platerate.com/orders/gettotal?orderId=${order.order_id}`);
            orderTotal = await orderTotal.json();
    
            let orderObj = {
                orderInfo: order,
                shoppingCart: shoppingCart.data,
                orderTotal: orderTotal.data[0],
            };
            userOrders.push(orderObj);
        }
    }catch(err) {
        console.error(err);
    }

    return userOrders;
}

export async function getRestaurantOrders(userId, userRestaurants, from, to, orderTypes) {
    if(!userId || !userRestaurants.length) return [];

    var restaurantOrders = [];
    var selectedOrderTypes = [];
    for(var type of orderTypes) {
        if(type.selected)
            selectedOrderTypes.push(type.orderType);
    }

    for(var restaurant of userRestaurants) {
        var orders = await fetch('https://platerate.com/orders/getRestaurantOrdersHistory', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                venueId: restaurant.venueId,
                user: { _id : userId },
                orderTypes: selectedOrderTypes,
                fromDate: from,
                toDate: to,
            })
        });
        orders = await orders.json();
        restaurantOrders = restaurantOrders.concat(orders.data);
    }

    return restaurantOrders;
}

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