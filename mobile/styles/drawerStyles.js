import React from "react";
import { StyleSheet } from 'react-native';

const primaryColor = '#02843D';
const secondaryColor = '#FFE20B';

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 75,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLogo: {
        width: 160,
        height: 40,
        marginLeft: 20,
    },
    headerAward: {
        width: 45,
        height: 40,
        position: 'absolute',
        right: 0,
        marginRight: 80
    },
    hamburgerCont: {
        width: 42,
        height: 42,
        position: 'absolute',
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestOptionBtn: {
        paddingVertical: 15,
        paddingLeft: 20,
        borderBottomWidth: 1,

    },
    guestLabel: {
        fontSize: 19,
        fontWeight: 'bold',
        color: primaryColor
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    userInfoCont: {
        // borderBottomWidth: 1,
        paddingVertical: 20,
        flexDirection: 'row',
    },
    userProfileImg: {
        width: 80,
        height: 80,
        borderRadius: 150 /2 ,
        borderWidth: 2,
        borderColor: '#E6E6E6',
        marginLeft: 15,
    },
    userNameCont: {
        flex: 1,
        marginHorizontal: 10
    },
    userNameText: {
        fontSize: 20,
        fontWeight: '500',
    },
    userOptionsCont: {
        height: 26,
        width: 170,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userOptionText: {
        fontSize: 20,
        color: primaryColor
    },
    ScreenList: {
        flex:1,
        flexDirection: 'column',
    },
    screenItem: {
        borderTopWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 20
    }
})