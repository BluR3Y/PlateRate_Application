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
        backgroundColor: '#02843D',
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
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 2,
        flexWrap: 'wrap',
        paddingHorizontal: 5,
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
        minWidth: 200,
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#BDC6C1',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        marginVertical: 6,
        marginRight: 5,
        marginLeft: 6
    },
    providerDateCont: {
        minWidth: 165,
        width: '30%',
        height: 40,
        borderWidth: 1,
        borderColor: '#BDC6C1',
        borderRadius: 4,
        position: 'relative',
        justifyContent: 'center',
        marginVertical: 6,
        marginRight: 6,
        marginLeft: 5
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
        // flex: 1,
        // alignItems:'center',
        // paddingBottom: 20,
        flex:1,
    },
    orderCont: {
        width: '95%',
        marginTop:20,
        borderRadius: 10,
        // overflow:'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 2.5,
        borderColor: '#E4E6E5',
    },
    orderHeader: {
        backgroundColor: '#F9F9F9',
        flexDirection: 'row',
    },
    orderHeaderInfo: {
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems:'center',
        alignSelf:'center',
        paddingBottom: 3,
    },
    orderExpandBtn: {
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    orderBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginRight: 8,
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
        // marginRight: 8,
    },
    orderOptionsCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    orderOptionsBtns: {
        width: '49%',
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    declineOptionBtn: {
        borderColor: 'red',
    },
    confirmOptionBtn: {
        borderColor: '#02843D',
        backgroundColor: '#02843D',
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
        height: 30,
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    pickerDays: {
        width:'100%',
        height: '100%',
        padding: 0,
    },
    spent_n_daysCont: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow:'hidden'
    },
    orderSectionBtns: {
        height: 50,
        marginVertical: 16,
        flexDirection: 'row',
        backgroundColor: 'yellow'
    },
    orderSelectionBtn: {
        flex: 1,
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
    reservationSelectorsCont: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    reservationDateSelector: {
        width: '56%',
        flexDirection: 'column',
    },
    reservationInputText: {     // multiple uses
        fontSize:18,
        marginBottom: 6,
        color: '#4A4A4A'
    },
    reservationDateTimeCont: {
        height:40,
        borderWidth: 1,
        borderRadius: 4, 
        justifyContent: 'center',
        borderColor: '#CBCBCB'
    },
    reservationSelectorText: {
        fontSize: 18,
        position: 'absolute',
        right: 25
    },
    reservationCheckBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reservationCheckBoxBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    ReservationArrivalSelector: {
        flex:1,
        marginLeft: 17,
    },
    ReservationArrivalCont: {
        height: 40,
        width: '90%',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        borderColor: '#CBCBCB'
    },
    ReservationLengthSelectors: {
        width: '50%',
    },
    reservationLengthSelectorCont: {
        width: '49%',
        height: 40,
        borderWidth:1,
        borderRadius: 4,
        borderColor: '#CBCBCB'
    },
    ReservationNumPeopleSelector: {
        flex: 1,
        marginLeft: 5,
    },
    reservationNumPeopleCont: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#CBCBCB',
        justifyContent: 'center'
    },
    ReservationAheadInputs: {
        width: '100%',
        flexDirection: 'row'
    },
    paidAheadInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#CBCBCB',
        justifyContent: 'center'
    },
    reservationTextInput: {     // multiple uses
        padding: 0,
        marginHorizontal: 4,
        fontSize: 18 ,
        textAlign: 'center',
    },
    RSVPInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#CBCBCB',
        justifyContent: 'center'
    },
    reservationResponseInputs: {
        marginTop: 8,
        marginBottom: 8,
    },
    instructionInput: {
        borderWidth: 1,
        height: 50,
        borderRadius: 4
    },
    instructionInputText: {
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: -10,
        left: 6,
        paddingLeft: 8,
        paddingRight: 4,
        color: '#02843D'
    },
    InstructionInputBox: {
        paddingHorizontal: 15,
        fontSize: 18,
        color:'#4A4A4A'
    },
    CustomDropDown: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D1DCD6',
        height: 40,
        // flex: 1,
        flexDirection: 'row',
    },
    OrderOptionsSubmitBtn: {
        backgroundColor: 'green',
        height: 40,
        width: '52%',
        marginLeft: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    foodOrderItem: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#F2F5F3',
        paddingHorizontal: 8,
        paddingTop:7,
        paddingBottom: 10,
        marginBottom: 15
    },
    foodOrderUserInfo: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginBottom: 5,
    },
    cartOrderImgCont: {
        height: 40,
        width: 40,
        borderRadius: 150/2,
        overflow: 'hidden',
        alignItems:'center',
        justifyContent:'center'
    },
    menuItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
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
      }
})

// export default { styles, pickerSelectStyles};