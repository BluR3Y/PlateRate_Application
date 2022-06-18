import React from "react";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
})