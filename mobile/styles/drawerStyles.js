import React from "react";
import { StyleSheet } from 'react-native';

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
    }
})