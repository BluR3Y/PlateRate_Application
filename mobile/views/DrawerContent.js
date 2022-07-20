import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Hamburger from '../content/images/hamburger.svg';
import { useSelector, useDispatch } from 'react-redux';

export function DrawerHeader(props){

    return (
        <View style={styles.header}>
            <Image
                style={styles.headerLogo}
                source={require('../content/images/platerate_logo.png')}
            />
            <Image
                style={styles.headerAward}
                source={require('../content/images/award.png')}
            />

            <TouchableOpacity style={styles.hamburgerCont} onPress={() => props.navigation.toggleDrawer()}>
                <Hamburger width={35} height={35} fill={'#4A4A4A'}/>
            </TouchableOpacity>
        </View>
    );
};

export function DrawerContent(props) {

    const { userId, userName, userEmail } = useSelector(state => state.userReducer);

    return(
        <View style={{flex:1}}>
            {!userId && (
                <>
                    <TouchableOpacity 
                    style={styles.guestOptionBtn}
                    onPress={() => {
                        props.navigation.navigate('Login', { formType: 'login' });
                    }}  
                    >
                    <Text style={styles.guestLabel}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.guestOptionBtn}
                    onPress={() => {
                        props.navigation.navigate('Login', { formType: 'signup' });
                    }}
                    >
                    <Text style={styles.guestLabel}>Sign Up</Text>
                    </TouchableOpacity>
                </>
            )}
            {userId && (
                <View style={styles.userContainer}>
                    <View style={styles.userInfoCont}>
                        <Image
                            style={styles.userProfileImg}
                            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        />
                        <View style={styles.userNameCont}>
                            <Text numberOfLines={1} style={styles.userNameText}>Rey Hector Flores</Text>
                            <View style={styles.userOptionsCont}>
                                <TouchableOpacity 
                                    style={{flex: 1}}
                                    onPress={() => {
                                    props.navigation.navigate('Profile');
                                    }}
                                >
                                    <Text style={styles.userOptionText}>Profile</Text>
                                </TouchableOpacity>
                                <View style={{height: '80%', width: 1, backgroundColor: '#979797'}}/>
                                <TouchableOpacity 
                                    style={{flex: 1}}
                                    onPress={() => props.setUserInfo(null)} 
                                >
                                    <Text style={[styles.userOptionText, {marginLeft: 20}]}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ScreenList}>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#02843D'}}>Current Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#4A4A4A'}}>Waitstaff Screen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#4A4A4A'}}>Bar/Kitchen Screen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#4A4A4A'}}>Delivery person Screen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#4A4A4A'}}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#4A4A4A'}}>Closed Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenItem}>
                        <Text style={{fontSize: 22, color: '#F64646'}}>Exit</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const primaryColor = '#02843D';
const secondaryColor = '#FFE20B';

const styles =  StyleSheet.create({
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
});