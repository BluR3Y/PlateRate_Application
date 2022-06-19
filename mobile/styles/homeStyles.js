import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    orderNotification: {
        width: '100%',
        height: 85,
        backgroundColor: '#FCE20A', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        fontSize: 25,
        color: 'black',
    },
    ratingFilters : {
        width: '100%',
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
        right: 8,
        top: '30%',
        elevation: -1,
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