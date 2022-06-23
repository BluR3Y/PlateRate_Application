import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles, pickerSelectStyles } from '../styles/homeStyles';
import { format12Hours, formatDate } from '../utilities/functions';

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

const ReservationDateSelector = () => {
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timeSelector, setTimeSelector] = useState(null);
    const [isDefault, setIsDefault] = useState(true);
    const [save_notify, setSave_Notify] = useState(false);

    const showTime = (event, selectedDate) => {
        if(event.type === 'set') {
            setTimeSelector(
                <DateTimePicker
                    testID='ReservationTime'
                    value={selectedDate}
                    mode={'time'}
                    display='default'
                    onChange={updateDate}
                />
            )
        }
        setShowDate(!showDate);
    }

    const updateDate = (event, selectedDate) => {
        if(event.type === 'set') {
            setDate(selectedDate);
            setIsDefault(false);
        }
        setTimeSelector(null);
    }

    return (
        <View style={styles.reservationDateSelector}>
            <Text style={styles.reservationInputText}>Reservation Date/Time</Text>
            <TouchableOpacity style={styles.reservationDateTimeCont} onPress={() => setShowDate(!showDate)}>

                <Text style={[styles.reservationSelectorText,{color: (isDefault? '#979797' : 'black')}]}>
                    {formatDate(date) + '  ' + format12Hours(date)}
                </Text>

                {showDate && (
                    <DateTimePicker
                        testID='ReservationDate'
                        value={date}
                        mode={'date'}
                        display='default'
                        onChange={showTime}
                    />
                )}
                {timeSelector}
                
                <UpDownCaret caretStyle={{right: 6}}/>

            </TouchableOpacity>
            <View style={styles.reservationCheckBox}>
                <TouchableOpacity style={styles.reservationCheckBoxBtn} onPress={() => setSave_Notify(!save_notify)}>
                    <View style={{borderWidth:1, borderRadius: 4, height: 15, width: 15, backgroundColor: (save_notify? 'green' : null)}}>
                        <CheckMark width={12} height={12} fill={'#FFF'} />
                    </View>
                    <Text style={{marginLeft: 6, fontSize: 16, color: '#4A4A4A'}}>Save and notify customer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const ReservationArrivalSelector = () => {
    
    const [time, setTime] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const [isDefault, setIsDefault] = useState(true);

    const updateTime = (event, selectedTime) => {
        if(event.type === 'set'){
            setTime(selectedTime);
            setIsDefault(false);
        }
        setShowTime(false);
    }

    return (
        <View style={styles.ReservationArrivalSelector}>
            <Text style={[styles.reservationInputText]}>Customer Arrived</Text>
            <TouchableOpacity style={[styles.ReservationArrivalCont]} onPress={() => setShowTime(!showTime)}>

            <Text style={[styles.reservationSelectorText, {color: (isDefault? '#979797' : 'black')}]}>{format12Hours(time)}</Text>

            {showTime && (
                <DateTimePicker
                    testID='ReservationArrivalTime'
                    value={time}
                    mode={'time'}
                    display='default'
                    onChange={updateTime}
                />
            )}

            <UpDownCaret caretStyle={{right:6}}/>
            </TouchableOpacity>
        </View>
    );
}

const ReservationLengthSelectors = () => {

    const [isDefaultHours, setIsDefaultHours] = useState(true);
    const [isDefaultMinutes, setIsDefaultMinutes] = useState(true);

    const hours = [{ label: '1 hour', value: '1' }];
    for(var i = 2; i <= 10; i++) {
        hours.push({
            label: `${i} hours`,
            value: `${i}`
        });
    }
    
    const minutes = [
        {
            label: '15 mins',
            value: '15',
        },
        {
            label: '30 mins',
            value: '30',
        },
        {
            label: '45 mins',
            value: '45',
        }
    ]

    const onChangeHours = (value) => {
        setIsDefaultHours(false);
    }

    const onChangeMinutes = (value) => {
        setIsDefaultMinutes(false);
    }

    return (
        <View style={styles.ReservationLengthSelectors}>
            <Text style={styles.reservationInputText}>Reservation Length</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.reservationLengthSelectorCont}>
                    <RNPickerSelect
                        placeholder={{
                            label: '0 hours',
                            value: null,
                        }}
                        useNativeAndroidPickerStyle={false}
                        items={hours}
                        onValueChange={onChangeHours}
                        style={pickerSelectStyles}
                        textInputProps={{color: (isDefaultHours? '#979797' : 'black')}}
                    />
                    <UpDownCaret caretStyle={{right:6}} />
                </View>
                <View style={styles.reservationLengthSelectorCont}>
                    <RNPickerSelect
                        placeholder={{
                            label: '00 mins',
                            value: null,
                        }}
                        useNativeAndroidPickerStyle={false}
                        items={minutes}
                        onValueChange={onChangeMinutes}
                        style={pickerSelectStyles}
                        textInputProps={{color: (isDefaultMinutes? '#979797' : 'black')}}
                    />
                    <UpDownCaret caretStyle={{right:6}} />
                </View>
            </View>
        </View>
    );
}

const ReservationNumPeopleSelector = () => {

    const [isDefault, setIsDefault] = useState(true);
    const numPeople = [];
    for(var i = 1; i < 20; i++){
        numPeople.push({
            label: `${i}`,
            value: `${i}`
        });
    }

    const onChange = (value) => {
        setIsDefault(false);
    }

    return(
        <View style={styles.ReservationNumPeopleSelector}>
            <Text style={[styles.reservationInputText, {alignSelf: 'center'}]}>Reservation # People</Text>
            <View style={styles.reservationNumPeopleCont}>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    items={numPeople}
                    value={'1'}
                    onValueChange={onChange}
                    style={pickerSelectStyles}
                    textInputProps={{color: (isDefault? '#979797' : 'black'), textAlign: 'center'}}
                />
            </View>
        </View>
    );
}

const OrderItem = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(1);
    const [selectedSection, setSelectedSection] = useState(2);

    const updateIsCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    }

    const orderBanner = (orderType) => {
        if(orderType === 'OrderIn') {
            return (
                <>
                    <Utensils width={13} height={13} fill={'#02843D'}/>
                    <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Order In</Text>
                </>
            );
        }else if(orderType === 'Delivery') {
            return (
                <>
                    <Biker width={18} height={18} fill={'#02843D'} />
                    <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Delivery</Text>
                </>
            );
        }else{
            return (
                <>
                    <Walker width={18} height={18} fill={'#02843D'} style={{marginRight: -3}} />
                    <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Pickup</Text>
                </>
            );
        }
    }

    const setSection = (section) => {
        setSelectedSection(section);
    }

    const orderPayment = (paymentStatus) => {
        if(paymentStatus === 'Paid') {
            return(
                <View style={[styles.paidCont,{backgroundColor: '#E6F3EC', borderColor: '#02843D'}]}>
                    <Text style={{color: '#02843D', fontSize: 11}}>Paid</Text>
                </View>
            );
        }else if(paymentStatus === 'Paying'){
            return(
                <View style={[styles.paidCont,{backgroundColor: '#FFF3CE', borderColor: '#FCC41F'}]}>
                    <Text style={{color: '#000', fontSize: 11}}>Paying</Text>
                </View>
            );
        }else {
            return(
                <View style={[styles.paidCont,{backgroundColor: '#fad4d4', borderColor: '#a10202'}]}>
                    <Text style={{color: '#a10202', fontSize: 11}}>Not Paid</Text>
                </View>
            );
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
                        {orderPayment(props.paymentStatus)}
                        <Text style={{fontSize:17, fontWeight:'bold', color: '#02843D'}}>(${props.orderAmount})</Text>
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
                    <View>
                        <Text style={[styles.accumInfoText,{fontWeight: 'bold'}]}>Order number #{props.orderNumber}</Text>
                        <Text style={styles.accumInfoText}>
                            Order Lifetime Spend: 
                            <Text style={{color: '#02843D'}}> ${props.lifetimeSpent}</Text>    
                        </Text>
                        <View style={styles.spent_n_daysCont}>
                            <Text style={styles.accumInfoText}>Last</Text>
                            <SelectorDays/>
                            <Text style={styles.accumInfoText}>days = Spend: <Text style={{color: '#02843D'}}>${props.spentWithinDaysN}</Text> Tip: <Text style={{color: '#02843D'}}>{props.tipPercentage}%</Text></Text>
                        </View>
                    </View>
                    <View style={styles.orderSectionBtns}>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 0? '#02843D' : '#F3F3F3')}]} onPress={() => setSection(0)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 0? '#FFF' : '#7D7D7D')}]}>Order Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 1? '#02843D' : '#F3F3F3')}]}  onPress={() => setSection(1)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 1? '#FFF' : '#7D7D7D')}]}>Customer Mgmt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 2? '#02843D' : '#F3F3F3')}]}  onPress={() => setSection(2)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 2? '#FFF' : '#7D7D7D')}]}>Reservation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 3? '#02843D' : '#F3F3F3')}]}  onPress={() => setSection(3)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 3? '#FFF' : '#7D7D7D')}]}>Order Timing</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.sectionItem, {display: (selectedSection === 0? 'flex' : 'none')}]}>
                        <Text>Section 1</Text>
                    </View>
                    <View style={[styles.sectionItem, {display: (selectedSection === 1? 'flex' : 'none')}]}>
                        <Text>Section 2</Text>
                    </View>
                    <View style={[styles.sectionItem, {display: (selectedSection === 2? 'flex' : 'none')}]}>
                        <View style={{marginVertical: 8}}>
                            <Text style={styles.reservationCustomerInfo}>Customer Name: <Text style={{color: '#02843D'}}>{props.customerName}</Text></Text>
                            <Text style={styles.reservationCustomerInfo}>Customer phone number: <Text style={{color: '#02843D'}}>{props.customerPhoneNumber}</Text></Text>
                        </View>
                        <View style={styles.reservationSelectorsCont}>
                            <ReservationDateSelector/>
                            <ReservationArrivalSelector/>
                        </View>
                        <View style={styles.reservationSelectorsCont}>
                            <ReservationLengthSelectors/>
                            <ReservationNumPeopleSelector/>
                        </View>
                    </View>
                    <View style={[styles.sectionItem, {display: (selectedSection === 3? 'flex' : 'none')}]}>
                        <Text>Section 4</Text>
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
                <OrderItem username='Sam A' orderAmount={89.55} orderType='OrderIn' paymentStatus='Paid' lifetimeSpent={3325.25} orderNumber={15040} spentWithinDaysN={350.35} tipPercentage={22} customerName={'Rey Flores'} customerPhoneNumber={'1 (202) 294-9906'} />
                <OrderItem username='Sam A' orderAmount={89.55} orderType='Delivery' paymentStatus='Paying'/>
                <OrderItem username='Sam A' orderAmount={89.55} orderType='Pickup' paymentStatus='Not Paid'/>
            </View>
        </ScrollView>
    )
}