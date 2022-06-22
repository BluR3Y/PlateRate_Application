import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    orderNotification: {
        height: 78,
        backgroundColor: '#FCE20A', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        fontSize: 22,
        color: 'black',
    },
    ratingFilters : {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }, ratingFilterItem: {
        width: 'auto',
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 10,
        borderTopEndRadius: 12,
        borderBottomEndRadius: 12,
        borderTopStartRadius: 12,
        borderBottomStartRadius: 12,
    },
    checkMark: {
        backgroundColor: 'green',
        width: 18,
        height: 18,
        borderRadius: 50,
        flexDirection: 'column',
        alignContent:'center',
        justifyContent: 'center',
    },
    ratingFilterText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#494949',
    },
    providerFilters: {
        width: '100%',
        height:55,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 2,
    },
    caretCont: {
        width: 10,
        height: 15,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        elevation: -1,
        top: '50%',
        transform: [{translateY: -7}]
    },
    providerCont: {
        width: '50%',
        height: 40,
        borderWidth: 1,
        borderColor: '#BDC6C1',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative'
    },
    providerDateCont: {
        width: '40%',
        height: 40,
        borderWidth: 1,
        borderColor: '#BDC6C1',
        borderRadius: 4,
        position: 'relative',
        justifyContent: 'center',
    },
    DateInputCont: {
        width: '85%',
        height: '90%',
        backgroundColor: '#CDD4D0',
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    DateItemCont: {
        width: '49.6%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    DateDisplay: {
        width: '78%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    orderList: {
        flex: 1,
        alignItems:'center',
        paddingBottom: 20,
    },
    orderCont: {
        width: '95%',
        marginTop:20,
        borderRadius: 5,
        overflow:'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 2.5,
        borderColor: '#E4E6E5',
    },
    orderHeader: {
        backgroundColor: '#F9F9F9',
    },
    orderHeaderInfo: {
        height:40,
        flexDirection: 'row',
        alignItems:'center',
    },
    orderExpandBtn: {
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3
    },
    orderBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    orderAmountCont: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    paidCont: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 0.5,
        borderColor: 'green',
        marginRight: 8,
        backgroundColor: '#E6F3EC',
    },
    orderReservationCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reservationBtns: {
        width: '46.75%',
        height: 43,
        borderWidth: 1,
        borderColor: 'red',
        marginTop: 5,
        marginBottom: 12,
        borderRadius:6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    declineReservationBtn: {
        borderColor: 'red',
        marginLeft: 10
    },
    confirmReservationBtn: {
        borderColor: 'green',
        marginRight: 10,
        backgroundColor: 'green',
    },
    orderBody: {
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 8,
    },
    accumInfoText: {
        fontSize: 18,
        color: '#4A4A4A',
        marginVertical: 4,
    },
    daysCont: {
        width: 50,
        height: 27,
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 8,
        position: 'relative'
    },
    pickerDays: {
        width:'100%',
        height: '100%',
        padding: 0,
    },
    spent_n_daysCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderSectionBtns: {
        height: 50,
        marginVertical: 16,
        flexDirection: 'row',
    },
    orderSelectionBtn: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderSelectionText: {
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 8,
    },
    sectionItem: {
        // height: 80,
    },
    reservationCustomerInfo: {
        fontSize: 18,
        color: '#4A4A4A',
        marginVertical: 2
    }, 
    reservationTimeCont: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        marginVertical: 10,
    },
    reservationDateSelector: {
        backgroundColor: 'red',
        width: '55%',
        flexDirection: 'column',
    },
    reservationDateTimeCont: {
        height:38,
        borderWidth: 1,
        borderRadius: 4, 
    }
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        width: '100%',
        height: '100%',
        padding: 0,
        paddingLeft: 5,
        fontSize: 16,
      },
})

// export default { styles, pickerSelectStyles};