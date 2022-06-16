import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 65,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLogo: {
        width: 140,
        height: 35,
        marginLeft: 20,
    },
    headerAward: {
        width: 40,
        height: 30,
        position: 'absolute',
        right: 0,
        marginRight: 80
    },
    ratingFilters : {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: 'red',
    },
});

export default styles;