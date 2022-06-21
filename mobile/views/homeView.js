import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles, pickerSelectStyles } from '../styles/homeStyles';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Collapsible from 'react-native-collapsible';

import CheckMark from '../content/images/check_mark.svg';
import Calendar from '../content/images/calendar.svg';
import Caret from '../content/images/triangle.svg';
import Utensils from '../content/images/utensils.svg';
import Dash from '../content/images/dash.svg';
import Biker from '../content/images/person_biking.svg';
import Walker from '../content/images/person_walking.svg';

const OrderNotification = (props) => {

    const [show, setShow] = useState(props.newOrders? true : false);

    const onPress = () => {
        setShow(!show);
    }

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.orderNotification, {display: (show? 'flex' : 'none')}]}>
            <View style={{borderBottomWidth: 2}}>
                <Text style={styles.notificationText}>{`${props.newOrders} New Orders`}</Text>
            </View>
        </TouchableOpacity>
    );
}

const RatingFilter = (props) => {

    const [isEnabled, setIsEnabled] = useState(true);

    const onPress = () => {
        setIsEnabled(!isEnabled);
    }

    return(
        <TouchableOpacity style={styles.ratingFilterItem} onPress={onPress}>
            <View style={[styles.checkMark, {opacity: isEnabled ? 1 : 0}]}>
                <CheckMark width={18} height={13} fill={'#FFF'}/>
            </View>
            <Text style={styles.ratingFilterText}>{props.filterName}</Text>
        </TouchableOpacity>
    )
}

const UpDownCaret = (props) => {
    return (
        <View style={[styles.caretCont, props.caretStyle]}>
            <Caret width={5} height={5} fill={'#4A4A4A'} />
            <Caret width={5} height={5} fill={'#4A4A4A'} style={{transform: [{rotate: '180deg'}]}} />
        </View>
    );
}

const ProviderSelector = () => {

    const sports = [
        {
          label: 'Jessica',
          value: 'Jessica',
        },
        {
          label: 'Richard',
          value: 'Richard',
        },
        {
          label: 'James',
          value: 'James',
        },
        {
            label: 'Andrew',
            value: 'Andrew'
        }
      ];

    return (
        <View style={styles.providerCont}>
            <RNPickerSelect
            placeholder={{ label: 'Server / Delivery Person', value: null }}
            useNativeAndroidPickerStyle={false}
                items={sports}
                onValueChange={(value) => console.log(value)}
                style={pickerSelectStyles}
                textInputProps={{color: 'black'}}
            />
            <UpDownCaret caretStyle={{right: 8}} />
        </View>
    );
}

const SelectorDays = () => {

    const dayIntervals = [
        {
            label: '365',
            value: '365',
        },
        {
            label: '182',
            value: '182',
        },
        {
            label: '90',
            value: '90',
        },
        {
            label: '30',
            value: '30',
        },
        {
            label: '15',
            value: '15',
        },
        {
            label: '7',
            value: '7',
        }
    ];

    return (
        <View style={styles.daysCont}>
            <RNPickerSelect
                value={'90'}
                useNativeAndroidPickerStyle={false}
                items={dayIntervals}
                onValueChange={(value) => console.log(value)}
                style={pickerSelectStyles}
                textInputProps={{color: 'black'}}
            />
            <UpDownCaret caretStyle={{right: 3}}/>
        </View>
    );
}

const DateSelectorItem = (props) => {

    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(`${props.title}`);
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate);
    }

    return (
        <TouchableOpacity style={styles.DateItemCont} onPress={() => setShow(!show)}>
            <Text style={{
                fontSize: 15,
                marginLeft: 10,
                color: '#979797',
                display: (text == props.title? 'flex' : 'none')
            }}>{props.title}</Text>

            <View style={[styles.DateDisplay, {display: (text === props.title? 'none' : 'flex')}]}>
                <Text style={{
                    fontSize: 14,
                    marginLeft: 13,
                    marginLeft: 5,
                    color: 'black',
                }}>
                    {date.getDate()+'/'+(date.getMonth()+1)}
                </Text>
                <Text style={{
                    fontSize: 14,
                    marginLeft: 13,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    color: '#979797',
                }}>
                    {date.getFullYear()}
                </Text>
            </View>

            {show && (
                <DateTimePicker
                    testID='ProviderDatePicker'
                    value={date}
                    mode={'date'}
                    display='default'
                    onChange={onChange}
                />
            )}
            <UpDownCaret caretStyle={{right: 8}}/>
        </TouchableOpacity>
    );
}

const ProviderDateSelector = () => {
    
    return (
        <View style={styles.providerDateCont}>
            <Calendar style={{marginLeft: 6}} width={18} height={18} fill={'#02843D'} />
            <View style={styles.DateInputCont}>
                <DateSelectorItem title='From' />
                <DateSelectorItem title='To' />
            </View>
        </View>
    );
}

const OrderItem = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(1);

    const updateIsCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    }

    const orderBanner = (orderType) => {
        if(orderType === 'OrderIn') {
            return (
                <>
                    <Utensils width={13} height={13} fill={'green'}/>
                    <Text style={{fontSize:18, marginLeft:5, color: 'green'}}>Order In</Text>
                </>
            );
        }else if(orderType === 'Delivery') {
            return (
                <>
                    <Biker width={18} height={18} fill={'green'} />
                    <Text style={{fontSize:18, marginLeft:5, color: 'green'}}>Delivery</Text>
                </>
            );
        }else{
            return (
                <>
                    <Walker width={18} height={18} fill={'green'} style={{marginRight: -3}} />
                    <Text style={{fontSize:18, marginLeft:5, color: 'green'}}>Pickup</Text>
                </>
            );
        }
    }

    const orderPayment = (paymentStatus) => {
        if(paymentStatus === 'Paid') {
            return 'Paid';
        }else if(paymentStatus === 'Paying') {
            return 'Paying';
        }else {
            return 'Not Paid';
        }
    }

    return(
        <View style={styles.orderCont}>
            <View style={styles.orderHeader}>
                <View style={styles.orderHeaderInfo}>
                    <TouchableOpacity style={styles.orderExpandBtn} onPress={updateIsCollapsed}>
                        <Dash width={20} height={20} fill={'#000'}/>
                    </TouchableOpacity>
                    <Text style={{color: 'black', fontSize: 17, marginRight: 10}}>{props.username}'s</Text>
                    <View style={styles.orderBanner}>
                        {orderBanner(props.orderType)}
                    </View>
                    <View style={styles.orderAmountCont}>
                        <View style={styles.paidCont}>
                            <Text style={{color: 'green', fontSize:11}}>{orderPayment(props.paymentStatus)}</Text>
                        </View>
                        <Text style={{fontSize:17, fontWeight:'bold', color: 'green'}}>(${props.orderAmount})</Text>
                    </View>
                </View>
                <View style={styles.orderReservationCont}>
                    <TouchableOpacity style={[styles.reservationBtns, styles.declineReservationBtn]}>
                        <Text style={{color:'red', fontSize: 16}}>Decline Reservation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reservationBtns, styles.confirmReservationBtn]}>
                        <Text style={{color:'white', fontSize: 16}}>Confirm Reservation</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Collapsible collapsed={isCollapsed}>
                <View style={{height:2, backgroundColor:'#DBE0DD'}}></View>
                <View style={styles.orderBody}>
                    <View style={styles.accumulativeInfo}>
                        <Text style={[styles.accumInfoText,{fontWeight: 'bold'}]}>Order number #{props.orderNumber}</Text>
                        <Text style={styles.accumInfoText}>
                            Order Lifetime Spend: 
                            <Text style={{color: 'green'}}> ${props.lifetimeSpent}</Text>    
                        </Text>
                        <View style={styles.spent_n_daysCont}>
                            <Text style={styles.accumInfoText}>Last</Text>
                            <SelectorDays/>
                            <Text style={styles.accumInfoText}>days = Spend: <Text style={{color: 'green'}}>$350.35</Text> Tip: <Text style={{color: 'green'}}>22%</Text></Text>
                        </View>
                        {/* <Text style={styles.accumInfoText}>
                            Last 
                            <SelectorDays/>
                            days
                        </Text> */}
                    </View>
                </View>
            </Collapsible>
        </View>
    );
};


export function HomeView({ navigation }) {
    return (
        <ScrollView contentContainerStyle={{flexGrow:1, justifyContent: 'space-between'}}>
            <OrderNotification newOrders={9} />
            <View style={styles.ratingFilters}>
                <RatingFilter filterName='Pickup'/>
                <RatingFilter filterName='Delivery'/>
                <RatingFilter filterName='Order In/Ahead'/>
            </View>
            <View style={styles.providerFilters}>
                <ProviderSelector/>
                <ProviderDateSelector/>
            </View>
            <View style={styles.orderList}>            
                <OrderItem username='Sam A' orderAmount={89.55} orderType='OrderIn' paymentStatus='Paid' lifetimeSpent={3325.25} orderNumber={15040}/>
                <OrderItem username='Sam A' orderAmount={89.55} orderType='Delivery' paymentStatus='Paying'/>
                <OrderItem username='Sam A' orderAmount={89.55} orderType='Pickup' paymentStatus='Not Paid'/>
            </View>
        </ScrollView>
    )
}