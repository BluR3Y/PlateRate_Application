import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image, RefreshControl, Linking, Button } from 'react-native';
import { styles, pickerSelectStyles } from '../styles/homeStyles';
import { format12Hours, formatDate, formatPhoneNumber, sortMenuItems, withinRange } from '../utilities/functions';
import Svg, { G, Rect } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../redux/store';
import Animated, { useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import MaskedView from '@react-native-masked-view/masked-view';
import { getNewOrders, getRestaurantOrders, getUserFilteredOrders, getUserOrders } from '../utilities/fetchingFunctions';
import NetInfo from '@react-native-community/netinfo';

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
import Heart from '../content/images/heart.svg';
import Phone from '../content/images/phone.svg';
import Envelope from '../content/images/envelope.svg';
import Wifi from '../content/images/wifi.svg';

// ----------------------- test Values --------------------

const testUser = {
    name: 'John Doe',
    email: 'rey@gmail.com',
    phone_number: '1 (234) 567-8901',
    orders: [
        {
            order_number: 1,
            restaurantName: 'Sam A',
            orderType: 'OrderIn',
            totalAmount: 89.55,
        },{
            order_number: 2,
            restaurantName: 'Chris B',
            orderType: 'Delivery',
            totalAmount: 95.35,
        },
        {
            order_number: 3,
            restaurantName: 'Sam A',
            orderType: 'TakeOut',
            totalAmount: 25.50,
        }
    ]
}

const testOrder = {
    vendorName: 'Sam A',
    orderAmount: 89.55,
    orderType: 'OrderIn',
    paymentStatus: 'Paid',
    lifetimeSpent: 3325.25,
    orderNumber: 15040,
    spentWithinDaysN: 350.35,
    tipPercentage: 22,
    customerName: 'John Doe',
    customerPhoneNumber: '1 (202) 294-9906'
};

const testMenuItems = [
    {
        itemId: 1,
        itemName: 'Fried Cauliflower',
        itemPrice: 16.95,
        paymentStatus: 'paid',
        numItemSelections: 2,
        specialInstructions: 'No cooked peppers please',
        subOptions: [
            {
                optionId: 1,
                optionName: 'Parmigiana',
                price: 2,
                numSelections: 2,
            },
            {
                optionId: 2,
                optionName: 'lasagna',
                price: 4,
                numSelections: 2
            }
        ]
    },{
        itemId: 2,
        itemName: 'Chicken Parm',
        itemPrice: 16.95,
        paymentStatus: 'not paid',
        numItemSelections: 1,
        subOptions: [
            {
                optionId: 1,
                optionName: 'Rigatoni',
                price: 3,
                numSelections: 2,
            },{
                optionId: 2,
                optionName: 'Penne',
                price: 2,
                numSelections: 3,
            }
        ]
    }
];

const testFoodOrderedItem = [
    {
        orderId: 1,
        clientName: 'Marcus Anderson',
        clientProfileImg: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        seatNo: 4,
        assignedServer: 'John Cena',
        menuItems: testMenuItems
    },{
        orderId: 2,
        clientName: 'Jessica Martinez',
        clientProfileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GNLQ5Rq4_uCHZY7yxKiYXxjkkhro_aIbGQ&usqp=CAU',
        seatNo: 1,
        assignedServer: 'Duane Beltre',
        menuItems: testMenuItems
    },{
        orderId: 3,
        clientName: 'Patrick Mellos',
        clientProfileImg: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
        seatNo: 3,
        assignedServer: 'Alice Parker',
        menuItems: testMenuItems
    }
];

// ------------------------------------------------------

const OrderNotification = ({ newOrders }) => {

    const [show, setShow] = useState(newOrders.length !== 0);

    return(
        <TouchableOpacity
            onPress={() => setShow(!show)}
            style={[styles.orderNotification, {display: (show ? 'flex' : 'none')}]}
        >
            <View style={{borderBottomWidth: 2}}>
                <Text style={styles.notificationText}>{`${newOrders.length} New Orders`}</Text>
            </View>
        </TouchableOpacity>
    );
}

const RatingFilters = ({ selectedFilters, modifyRatingFilters }) => {

    const modifySelections = (id) => {
        const modifiedItem = selectedFilters.find(filterItem => filterItem.id === id);
        modifiedItem.selected = !modifiedItem.selected;
        const updatedFilters = selectedFilters.map((filterItem) => filterItem.id === id ? modifiedItem : filterItem);
        modifyRatingFilters(updatedFilters);
        console.log(selectedFilters);
    }

    return(
        <View style={styles.ratingFilters}>
            {selectedFilters.map((filterItem) => (
                <TouchableOpacity style={styles.ratingFilterItem} key={filterItem.id} onPress={() => modifySelections(filterItem.id)}>
                    <View style={[styles.checkMark, {opacity: (filterItem.selected ? 1 : 0)}]}>
                        <CheckMark width={18} height={13} fill={'#FFF'} />
                    </View>
                    <Text style={styles.ratingFilterText}>{filterItem.orderText}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const UpDownCaret = (props) => {
    if(props.onPress) {
        return (
            <TouchableOpacity style={[styles.caretCont, props.caretStyle]} onPress={props.onPress}>
                <Caret width={5} height={5} fill={'#4A4A4A'} />
                <Caret width={5} height={5} fill={'#4A4A4A'} style={{transform: [{rotate: '180deg'}]}} />
            </TouchableOpacity>
        );
    }
    return(
        <View style={[styles.caretCont, props.caretStyle]}>
            <Caret width={5} height={5} fill={'#4A4A4A'} />
            <Caret width={5} height={5} fill={'#4A4A4A'} style={{transform: [{rotate: '180deg'}]}} />
        </View>
    );
}

const DashedLine = () => {
    const { width } = Dimensions.get('screen');
    const spacing = 16;
    const dashes = new Array(Math.floor(width / spacing)).fill(null);
    return(
        <Svg height='11' width='100%' style={{marginTop:12, marginBottom: 12}}>
            <G>
                {dashes.map((_, index) => (
                    <Rect
                        key={index}
                        x='11'
                        y='10'
                        width='10'
                        height='1'
                        fill='#CBCBCB'
                        translateX={spacing * index}
                    />
                ))}
            </G>
        </Svg>
    );
}

const DateSelectorItem = ({ title ,date, setDate }) => {
    const [text, setText] = useState(date? date : title);
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
                display: (text == title? 'flex' : 'none')
            }}>{title}</Text>

            <View style={[styles.DateDisplay, {display: (text === title? 'none' : 'flex')}]}>
                <Text style={{
                    fontSize: 14,
                    marginLeft: 13,
                    marginLeft: 5,
                    color: 'black',
                }}>
                    {date && (
                        date.getDate()+'/'+(date.getMonth()+1)
                    )}
                </Text>
                <Text style={{
                    fontSize: 14,
                    marginLeft: 13,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    color: '#979797',
                }}>
                    {date && (
                        date.getFullYear()
                    )}
                </Text>
            </View>

            {show && (
                <DateTimePicker
                    testID='ProviderDatePicker'
                    value={date?date : new Date()}
                    mode={'date'}
                    display='default'
                    onChange={onChange}
                />
            )}
            <UpDownCaret caretStyle={{right: 8}}/>
        </TouchableOpacity>
    );
}

const ProviderSelectors = ({ provider, setProvider, from, setFrom, to, setTo }) => {

    // const serviceProviders = [
    //     {
    //       label: 'Jessica',
    //       value: 'Jessica',
    //     },
    //     {
    //       label: 'Richard',
    //       value: 'Richard',
    //     },
    //     {
    //       label: 'James',
    //       value: 'James',
    //     },
    //     {
    //         label: 'Andrew',
    //         value: 'Andrew'
    //     }
    // ];

    const updateProvider = (provider) => {
        setProvider(provider);
    }

    return(
        <View style={styles.providerFilters}>
            <View style={styles.providerCont}>
                <RNPickerSelect
                    placeholder={{ label: 'Server / Delivery Person', value: null }}
                    useNativeAndroidPickerStyle={false}
                    items={provider}
                    onValueChange={updateProvider}
                    style={pickerSelectStyles}
                    textInputProps={{color: 'black'}}
                />
                <UpDownCaret caretStyle={{right: 5}} />
            </View>
            <View style={styles.providerDateCont}>
                <Calendar style={{marginLeft: 6}} width={18} height={18} fill={'#02843D'} />
                <View style={styles.DateInputCont}>
                    <DateSelectorItem title={'From'} date={from} setDate={setFrom}/>
                    <DateSelectorItem title={'To'} date={to} setDate={setTo}/>
                </View>
            </View>
        </View>
    );
}

const ReservationDTInputs = ({ date, setDate, save_notify, setSave_Notify, time, setTime }) => {

    const [showDate, setShowDate] = useState(false);
    const [timeSelector, setTimeSelector] = useState(null);
    const [isDTDefault, setIsDTDefault] = useState(true);

    const [showArrivalTime, setShowArrivalTime] = useState(false);
    const [isArrivalTimeDefault, setIsArrivalTimeDefault] = useState(true);

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
            );
        }
        setShowDate(!showDate);
    }

    const updateDate = (event, selectedDate) => {
        if(event.type === 'set') {
            setDate(selectedDate);
            setIsDTDefault(false);
        }
        setTimeSelector(null);
    }

    const updateTime = (event, selectedTime) => {
        if(event.type === 'set'){
            setTime(selectedTime);
            setIsArrivalTimeDefault(false);
        }
        setShowArrivalTime(false);
    }

    return(
        <View style={styles.reservationSelectorsCont}>
            <View style={styles.reservationDateSelector}>
                <Text style={styles.reservationInputText}>Reservation Date/Time</Text>
                <TouchableOpacity style={styles.reservationDateTimeCont} onPress={() => setShowDate(!showDate)}>

                    <Text style={[styles.reservationSelectorText,{color: (isDTDefault? '#979797' : 'black')}]}>
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
                {/* <View style={styles.reservationCheckBox}>
                    <TouchableOpacity style={styles.reservationCheckBoxBtn} onPress={() => setSave_Notify(!save_notify)}>
                        <CheckBox customSize={12} isVisible={save_notify} />
                        <Text style={{marginLeft: 6, fontSize: 17, color: '#4A4A4A'}}>Save and notify customer</Text>
                    </TouchableOpacity>
                </View> */}
                <CheckBoxSelector
                    selectionText={'Save and notify customer'}
                    isSelected={true}
                    textStyle={{fontWeight:'500'}}
                />
            </View>
            <View style={styles.ReservationArrivalSelector}>
                <Text style={[styles.reservationInputText]}>Customer Arrived</Text>
                <TouchableOpacity style={[styles.ReservationArrivalCont]} onPress={() => setShowArrivalTime(!showArrivalTime)}>

                <Text style={[styles.reservationSelectorText, {color: (isArrivalTimeDefault? '#979797' : 'black')}]}>{format12Hours(time)}</Text>

                {showArrivalTime && (
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
        </View>
    );
}

const ReservationDurationInputs = ({ hours, setHours, minutes, setMinutes, numPeople, setNumPeople }) => {

    const [isDefaultHours, setIsDefaultHours] = useState(true);
    const [isDefaultMinutes, setIsDefaultMinutes] = useState(true);
    const [isDefaultNumPeople, setIsDefaultNumPeople] = useState(true);

    const selectionHours = [{ label: '1 hour', value: '1' }];
    for(var i = 2; i <= 10; i++) {
        selectionHours.push({
            label: `${i} hours`,
            value: `${i}`
        });
    }

    const selectionMinutes = [
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

    const onChangeHours = (selected) => {
        setHours(selected);
        setIsDefaultHours(false);
    }

    const onChangeMinutes = (selected) => {
        setMinutes(selected);
        setIsDefaultMinutes(false);
    }

    const onChangeNumPeople = (selected) => {
        setNumPeople(selected.replace(/\D/g,''));
        setIsDefaultNumPeople(false);
    }

    return(
        <View style={styles.reservationSelectorsCont}>
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
                            items={selectionHours}
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
                            items={selectionMinutes}
                            onValueChange={onChangeMinutes}
                            style={pickerSelectStyles}
                            textInputProps={{color: (isDefaultMinutes? '#979797' : 'black')}}
                        />
                        <UpDownCaret caretStyle={{right:6}} />
                    </View>
                </View>
            </View>
            <View style={styles.ReservationNumPeopleSelector}>
            <Text style={[styles.reservationInputText, {alignSelf: 'center'}]}>Reservation # People</Text>
            <View style={styles.reservationNumPeopleCont}>
                <TextInput
                    onChangeText={onChangeNumPeople}
                    value={numPeople}
                    keyboardType={'numeric'}
                    style={[styles.reservationTextInput, {color: (isDefaultNumPeople ? '#979797' : 'black')}]}
                />
                <UpDownCaret caretStyle={{right: 8}} />
            </View>
        </View>
        </View>
    );
}

const ReservationRSVPInputs = ({ numPaidAhead, setNumPaidAhead, numRSVP, setNumRSVP }) => {

    const [isPaidAheadDefault, setIsPaidAheadDefault] = useState(true);
    const [isNumRSVPDefault, setIsNumRSVPDefault] = useState(true);

    const updatePaidAhead = (selected) => {
        setNumPaidAhead(selected.replace(/\D/g,''));
        setIsPaidAheadDefault(false);
    }

    const updateNumRSVP = (selected) => {
        setNumRSVP(selected.replace(/\D/g,''));
        setIsNumRSVPDefault(false);
    }

    return (
        <View style={styles.ReservationAheadInputs}>
            <View style={{width: '45%',}}>
                <Text style={styles.reservationInputText}># Paid Order Ahead</Text>
                <View style={styles.paidAheadInput}>
                    <TextInput
                        onChangeText={updatePaidAhead}
                        value={numPaidAhead}
                        keyboardType={'numeric'}
                        style={[styles.reservationTextInput, {color: (isPaidAheadDefault ? '#979797' : 'black')}]}
                    />
                    <UpDownCaret caretStyle={{right: 8}}/>
                </View>
            </View>
            <View style={{width: '30%', marginLeft: 12}}>
                <Text style={styles.reservationInputText}># RSVP'd</Text>
                <View style={styles.RSVPInput}>
                    <TextInput
                        onChangeText={updateNumRSVP}
                        value={numRSVP}
                        keyboardType={'numeric'}
                        style={[styles.reservationTextInput, {color: (isNumRSVPDefault ? '#979797' : 'black')}]}
                    />
                    <UpDownCaret caretStyle={{right:8}} />
                </View>
            </View>
        </View>
    );
}

const ReservationResponseInputs = ({ daysRemaining, setDaysRemaining, dateRequested, setDateRequested, dateConfirmed, setDateConfirmed }) => {

    const [isDefaultRemainingDays, setIsDefaultRemainingDays] = useState(true);

    const [showRequestedDate, setShowRequestedDate] = useState(false);
    const [requestedTimeSelector, setRequestedTimeSelector] = useState(null);
    const [isDefaultRequested, setIsDefaultRequested] = useState(true);

    const [showConfirmedDate, setShowConfirmedDate] = useState(false);
    const [confirmedTimeSelector, setConfirmedTimeSelector] = useState(null);
    const [isDefaultConfirmed, setIsDefaultConfirmed] = useState(true);

    const selectionDays = [
        {
            label: '30 days',
            value: '30'
        },
        {
            label: '15 days',
            value: '15'
        },
        {
            label: '7 days',
            value: '7'
        },
        {
            label: '1 day',
            value: '1'
        }
    ];

    const onChangeRemainingDays = (selected) => {
        setDaysRemaining(selected);
        setIsDefaultRemainingDays(false);
    }

    const updateRequestedDate = (event, selectedDate) => {
        if(event.type === 'set') {
            setDateRequested(selectedDate);
            setIsDefaultRequested(false);
        }
        setRequestedTimeSelector(null);
    }

    const showRequestedTime = (event, selectedDate) => {
        if(event.type === 'set') {
            setRequestedTimeSelector(
                <DateTimePicker
                    testID='RequestedTime'
                    value={selectedDate}
                    mode={'time'}
                    display={'default'}
                    onChange={updateRequestedDate}
                />
            );
        }
        setShowRequestedDate(!showRequestedDate);
    }

    const updateConfirmedDate = (event, selectedDate) => {
        if(event.type === 'set') {
            setDateConfirmed(selectedDate);
            setIsDefaultConfirmed(false);
        }
        setConfirmedTimeSelector(null);
    }

    const showConfirmedTime = (event, selectedDate) => {
        if(event.type === 'set') {
            setConfirmedTimeSelector(
                <DateTimePicker
                    testID='ConfirmedTime'
                    value={selectedDate}
                    mode={'time'}
                    display={'default'}
                    onChange={updateConfirmedDate}
                />
            );
        }
        setShowConfirmedDate(!showConfirmedDate);
    }

    return(
        <View style={styles.reservationResponseInputs}>
            <View style={{marginTop: 8}}>
                <Text style={styles.reservationInputText}>Days Remaining For people to reserve</Text>
                <TouchableOpacity style={styles.reservationDateTimeCont}>
                    <RNPickerSelect
                        placeholder={{ label: '0 day(s)', value: null }}
                        useNativeAndroidPickerStyle={false}
                        items={selectionDays}
                        onValueChange={onChangeRemainingDays}
                        style={pickerSelectStyles}
                        textInputProps={{color: (isDefaultRemainingDays? '#979797' : 'black'), textAlign: 'center'}}
                    />
                    <UpDownCaret caretStyle={{right: 8}} />
                </TouchableOpacity>
            </View>
            <DashedLine/>
            <View style={{marginTop: 8}}>
                <Text style={styles.reservationInputText}>Reservation Requested</Text>
                <TouchableOpacity style={styles.reservationDateTimeCont} onPress={() => setShowRequestedDate(!showRequestedDate)}>

                    <Text style={[styles.reservationSelectorText, {width: '90%', textAlign: 'center', color: (isDefaultRequested ? '#979797' : 'black')}]}>
                        {formatDate(dateRequested) + '  ' + format12Hours(dateRequested)}
                    </Text>            

                    {showRequestedDate && (
                        <DateTimePicker
                            testID='RequestedDate'
                            value={dateRequested}
                            mode={'date'}
                            display={'default'}
                            onChange={showRequestedTime}
                        />
                    )}
                    {requestedTimeSelector}

                    <UpDownCaret caretStyle={{right: 8}} />
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 8}}>
                <Text style={styles.reservationInputText}>Reservation Confirmed</Text>
                <TouchableOpacity style={styles.reservationDateTimeCont} onPress={() => setShowConfirmedDate(!showConfirmedDate)}>

                    <Text style={[styles.reservationSelectorText, {width: '90%', textAlign: 'center', color: (isDefaultConfirmed ? '#979797' : 'black')}]}>
                        {formatDate(dateConfirmed) + '  ' + format12Hours(dateConfirmed)}
                    </Text>            

                    {showConfirmedDate && (
                        <DateTimePicker
                            testID='ConfirmedDate'
                            value={dateConfirmed}
                            mode={'date'}
                            display={'default'}
                            onChange={showConfirmedTime}
                        />
                    )}
                    {confirmedTimeSelector}

                    <UpDownCaret caretStyle={{right: 8}} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const InstructionInput = ({ instructionTitle, instructionPlaceHolder, instructionStyle, orderInstructions, setOrderInstructions, isModifiable }) => {

    const changeInstructions = (instructions) => {
        setOrderInstructions(instructions);
    }

    return(
        <View style={{...styles.instructionInput, ...instructionStyle}}>
            <Text style={styles.instructionInputText}>{instructionTitle}</Text>
            <TextInput
                placeholder={instructionPlaceHolder}
                style={styles.InstructionInputBox}
                onChangeText={changeInstructions}
                value={orderInstructions}
                editable={isModifiable}
                selectTextOnFocus={isModifiable}
                placeholderTextColor={'#A4A4A4'}
            />
        </View>
    );
}

const CustomDropDown = ({ dropdownTitle, setVal, selectionList, customStyle, initialVal }) => {
    
    const updateSelection = (selection) => {
        setVal(selection);
    }

    return(
        <View style={[styles.CustomDropDown, customStyle]}>
            <View style={{backgroundColor: '#E6F3EC', justifyContent: 'center', paddingHorizontal: 5}}>
                <Text style={{fontSize: 18}}>{dropdownTitle}</Text>
            </View>
            <View style={{ backgroundColor: '#F9F9F9', flex: 1}}>
                <RNPickerSelect
                    placeholder={{ label: '', value: null }}
                    useNativeAndroidPickerStyle={false}
                    items={selectionList}
                    value={initialVal}
                    style={pickerSelectStyles}
                    onValueChange={updateSelection}
                    textInputProps={{color: 'black', textAlign: 'center'}}
                />
                <UpDownCaret caretStyle={{right: 8}} />
            </View>
        </View>
    );
}

const BulletPointSelector = ({isSelected, setIsSelected, selectionText, textStyle, BulletPointStyle, isDisabled}) => {

    const defaultBullet = {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }

    const defaultText = {
        marginLeft: 10,
        fontSize: 18,
        color: '#4A4A4A'
    }

    return(
        <TouchableOpacity style={{flexDirection:'row', alignSelf: 'flex-start', alignItems:'center'}} disabled={isDisabled? isDisabled : 0} onPress={() => setIsSelected(!isSelected)}>
            <View style={{...defaultBullet, ...BulletPointStyle}}>
                <View style={{backgroundColor:(isSelected?'green':null), borderRadius: 100, width: '82%', height:'85%'}} />
            </View>
            <Text style={{...defaultText, ...textStyle}}>{selectionText}</Text>
        </TouchableOpacity>
    );
}

const CheckBoxSelector = ({ isSelected, setIsSelected, selectionText, textStyle, checkBoxStyle, isDisabled}) => {

    const defaultText = {
        fontSize: 18,
        marginLeft: 8,
        fontWeight: '600',
        color: '#4A4A4A',
    };

    const defaultCheckBox = {
        borderWidth: 1,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4, 
        width: 15, 
        height: 15,
    }

    return(
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}} disabled={isDisabled? isDisabled : 0} onPress={() => setIsSelected(!isSelected)}>
            <View style={{...defaultCheckBox, ...checkBoxStyle, backgroundColor: (isSelected?'green':'#FFF')}}>
                <CheckMark 
                    width={(checkBoxStyle && checkBoxStyle.width ? checkBoxStyle.width -1 : 14)}
                    height={(checkBoxStyle && checkBoxStyle.height ? checkBoxStyle.height - 1 : 14)}
                    fill={'#FFF'}
                />
            </View>
            <Text style={{...defaultText,...textStyle}}>{selectionText}</Text>
        </TouchableOpacity>
    );
}

const MenuItem = ({ menuItemData, isModifiable }) => {

    const [isMenuItemSelected, setIsMenuItemSelected] = useState(true);
    // console.log(menuItemData)
    // console.log(menuItemData.addons)
    // to get payment status, use menuItem.payment_id: if not null, its paid for
    // special instructions

    return(
        <View style={{overflow:'hidden'}}>
            <View style={{ flexDirection:'row', alignItems:'center', flexWrap:'wrap', marginBottom: 7, marginTop:10}}>
                <CheckBoxSelector
                    isSelected={isMenuItemSelected}
                    setIsSelected={setIsMenuItemSelected}
                    selectionText={`${menuItemData.quantity}x ${menuItemData.item_name}`}
                    textStyle={{fontSize: 19, fontWeight: '500'}}
                    checkBoxStyle={{width: 14, height: 14}}
                    isDisabled={!isModifiable}
                />
                <Text style={{fontSize: 18, marginLeft:5, color: '#4A4A4A'}}>{`(${menuItemData.quantity} order) $${menuItemData.extended_price}`}</Text>
                <PaymentStatusBanner 
                    payment_status={(menuItemData.payment_id? 'paid' : 'unpaid')} 
                    customStyle={{marginLeft:8}}
                />
            </View>
            {menuItemData.addons.map(function(addonItem, index) {
                return (
                    <BulletPointSelector
                        key={index}
                        isSelected={isMenuItemSelected}
                        selectionText={`${addonItem.addon_name} ${addonItem.quantity} x $${addonItem.addon_price} = $${addonItem.addon_extended_price}`}
                        isDisabled={1}
                    />
                );
            })}
            <InstructionInput
                instructionTitle={'Menu Item Special Instructions'}
                orderInstructions={menuItemData.special_instructions}
                instructionPlaceHolder={'Have any requests?'}
                setOrderInstructions={menuItemData.special_instructions}
                isModifiable={isModifiable && isMenuItemSelected}
                instructionStyle={{marginTop: 15, marginBottom: 20, display:(menuItemData.special_instructions? 'flex' : 'none')}}
            />
        </View>
    );
}

// const FoodOrderItem = ({ CartOrderData, isModifiable }) => {

    // const [seatNum, setSeatNum] = useState(null);
    // const [assignedTo, setAssignedTo] = useState(null);

    

    // const setSeatNum = (seatNo) => {
    //     let modifiedItems = getOrders.map((order) => (
    //         order.orderId === orderItemId? {...order, seatNo: seatNo} : order
    //     ));
    //     setOrders(modifiedItems);
    // }

    // const setAssignedTo = (provider) => {
    //     let modifiedItems = getOrders.map((order) => (
    //         order.orderId === orderItemId ? {...order, assignedServer: provider} : order
    //     ));
    //     setOrders(modifiedItems);
    // }

    // const modifyItemOptions = (modifications) => {

    // }

    // return(
    //     <View style={styles.foodOrderItem}>
    //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    //             <View style={styles.foodOrderUserInfo}>
    //                 {/* <Image source={{ uri: getOrders[orderItemId - 1].clientProfileImg }} style={styles.foodOrderUserImg}/> */}
                    // <Text style={{fontSize: 20, marginHorizontal: 7, fontWeight: 'bold'}}>{`${getOrders[orderItemId - 1].clientName.substring(0, getOrders[orderItemId - 1].clientName.indexOf(' ')+2)}'s Order`}</Text>
    //             </View>
    //             <CustomDropDown 
    //                 dropdownTitle={'Seat No.'} 
    //                 initialVal={getOrders[orderItemId - 1].seatNo.toString()} 
    //                 setVal={setSeatNum} 
    //                 selectionList={[
    //                     { label: '1', value: '1' },
    //                     { label: '2', value: '2' },
    //                     { label: '3', value: '3' },
    //                     { label: '4', value: '4' },
    //                     { label: '5', value: '5' }
    //                 ]} 
    //                 customStyle={{ width: 130, height: 30}}/>
    //         </View>
    //         <CustomDropDown 
    //             dropdownTitle={'Assign(ed) to:'} 
    //             setVal={setAssignedTo} 
    //             customStyle={{marginVertical:6, marginHorizontal: 0}} 
    //             selectionList={[
    //                 { label: '1', value: '1' },
    //                 { label: '2', value: '2' },
    //                 { label: '3', value: '3' }
    //             ]}
    //         />
    //         <View>
    //             {getOrders[orderItemId - 1].menuItems.map((menuItem) => (
    //                 <MenuItem menuItem={menuItem} subOptionChange={modifyItemOptions} key={menuItem.itemId}/>
    //             ))}
    //         </View>
    //     </View>
    // );
// }


//------------------------------------------- Order Item Sections

const UserCartOrder = ({ cartOrderData, isModifiable, cartType }) => {

    const [menuItems, setMenuItems] = useState([]);
    const [cartOwnerImg, setCartOwnerImg] = useState('https://platerate.com/images/avatar.png');
    const [orderName, setOrderName] = useState(null);

    const setCartInfo = async () => {
        if(cartType === 'user') {
            setCartOwnerImg(store.getState().userReducer.userImg);
            setMenuItems(cartOrderData.userCartItems)
            setOrderName(cartOrderData.user + '\'s Order');
        }else if(cartType === 'joined') {
            var cartOwnerId = cartOrderData[0].user_id;

            setMenuItems(sortMenuItems(cartOrderData));

            let publicImg = await fetch(`https://platerate.com/getpublicprofileimg/${cartOwnerId}`);
            publicImg = await publicImg.text();
            if(publicImg) {setCartOwnerImg(publicImg);}
            setOrderName(cartOrderData[0].order_name);
            
        }else if(cartType === 'other'){
            let cartItems = await fetch(`https://platerate.com/orders/items?orderId=${cartOrderData.orderId}`);
            cartItems = await cartItems.json();
            cartItems = cartItems.data;

            setMenuItems(sortMenuItems(cartItems));

            let publicImg = await fetch(`https://platerate.com/getpublicprofileimg/${cartOrderData.userId}`);
            publicImg = await publicImg.text();
            
            if(publicImg) {setCartOwnerImg(publicImg);}
            setOrderName(cartOrderData.orderName);
        }
    }
    
    useEffect(() => {
        setCartInfo()
    },[])

    return(
        <View style={styles.foodOrderItem}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.foodOrderUserInfo}>
                    <View style={styles.cartOrderImgCont}>
                        <Image 
                            source={{ uri: cartOwnerImg }}
                            style={{width:40,height: 40}}
                        />
                    </View>
                    <Text style={{fontSize: 18, marginHorizontal: 7, fontWeight: 'bold', color:'#4A4A4A'}}>
                        {orderName}
                    </Text>
                </View>
            </View> 
            <View>
                {menuItems.map(function(menuItem, index) {
                    return(
                        <MenuItem
                            menuItemData={menuItem}
                            key={index}
                            isModifiable={isModifiable}
                        />
                    );
                })}
            </View>
        </View>
    )
}

const ManagementCartOrder = ({cartOrderData, isModifiable, cartType}) => {

    const [orderName, setOrderName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerImg, setCustomerImg] = useState('https://platerate.com/images/avatar.png');

    const setCartInfo = async () => {
        if(cartType === 'user') {
            const {userImg, userPhone, userEmail} = store.getState().userReducer;
            setCustomerPhone(userPhone);
            setCustomerEmail(userEmail);
            setCustomerImg(userImg);
            setOrderName(cartOrderData.user + '\'s Order');
        }else if(cartType === 'joined') {
            var cartOwnerId = cartOrderData[0].user_id;

            let publicImg = await fetch(`https://platerate.com/getpublicprofileimg/${cartOwnerId}`);
            publicImg = await publicImg.text();
            if(publicImg) {setCustomerImg(publicImg);}
            setOrderName(cartOrderData[0].order_name);
            
        }else if(cartType === 'other'){
            let cartItems = await fetch(`https://platerate.com/orders/items?orderId=${cartOrderData.orderId}`);
            cartItems = await cartItems.json();
            cartItems = cartItems.data;

            let publicImg = await fetch(`https://platerate.com/getpublicprofileimg/${cartOrderData.userId}`);
            publicImg = await publicImg.text();
            
            if(publicImg) {setCustomerImg(publicImg);}
            setOrderName(cartOrderData.orderName);
        }
    }
    
    useEffect(() => {
        setCartInfo()
    },[])

    return(
        <View style={styles.foodOrderItem}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.foodOrderUserInfo}>
                    <View style={styles.cartOrderImgCont}>
                        <Image 
                            source={{ uri: customerImg }}
                            style={{width:40,height: 40}}
                        />
                    </View>
                    <Text style={{fontSize: 18, marginHorizontal: 7, fontWeight: 'bold', color:'#4A4A4A'}}>
                        {orderName}
                    </Text>
                </View>
            </View> 
            <View>
                {customerPhone.length !== 0 && (
                    <View style={{flexDirection:'row', alignSelf:'flex-start',alignItems:'center', justifyContent:'center',flexWrap:'wrap',marginTop:5}}>
                        <Phone
                            width={20}
                            height={20}
                            fill={'green'}
                        />
                        <Text style={{color:'#4a4a4a',fontSize:20,marginLeft:5}}>Customer Phone Number: </Text>
                        <OpenURLButton
                            text={formatPhoneNumber(customerPhone)}
                            url={`tel:${customerPhone}`}
                            textStyle={{fontSize:20,fontWeight:'600',color:'green'}}
                        />
                    </View>
                )}
                {customerEmail.length !== 0 && (
                    <View style={{flexDirection:'row', alignSelf:'flex-start',alignItems:'center', justifyContent:'center',flexWrap:'wrap',marginTop:5}}>
                        <Envelope
                            width={22}
                            height={22}
                            fill={'green'}
                        />
                        <Text style={{color:'#4a4a4a',fontSize:20,marginLeft:5}}>Email: </Text>
                        <OpenURLButton
                            text={customerEmail}
                            url={`mailto:${customerEmail}`}
                            textStyle={{fontSize:20,fontWeight:'600',color:'green'}}
                        />
                    </View>
                )}
            </View>
            <View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'center', marginTop:10}}>
                <RatingSelector
                    selectorText={'Customer Rating: Overall'}
                />
                <RatingSelector
                    selectorText={'My rating of this user'}
                />
            </View>
        </View>
    );
}

const OrderSummarySection = ({ orderItem, isModifiable, selectedSection }) => {
    
    const isChildOrder = (orderItem.orderTotal.parent_order_id !== null);
    const orderState = orderItem.orderInfo.state;

    const [orderSpecialInstruction, setOrderSpecialInstructions] = useState(orderItem.orderTotal.special_instructions);
    // orders: otherOrders, joinedCartOrders, userCartOrders
    // console.log(orderItem.shoppingCart.userCartOrder)
    // console.log(orderItem.shoppingCart.userCartOrder)
    const [userOrder, setUserOrder] = useState(null);
    
    // const getUserOrder = () => {
    //     var order_id = orderItem.orderInfo.order_id;
    //     var cart = orderItem.shoppingCart;
    //     var userOrder = cart.userCartOrder;
    //     var userMenuItems = userOrder.userCartItems;
    //     // console.log(userMenuItems)
    //     userMenuItems.forEach(menuItem => {
    //         console.log(menuItem)
    //         // console.log(menuItem.item_name, menuItem.item_type)
    //         // console.log(menuItem.order_id)       // all menu items in a given cart have the same order_id
    //         // console.log(menuItem.suborder_id)   // each menu item has a unique suborder_id, all except approved orders had value of null
    //         // console.log(menuItem.cart_items_id)    // each menu item has a unique cart_items_id
    //         // console.log(menuItem.item_id);      // each menu item has a unique item_id
    //     })
        
    //     console.log('----------------------------------------\n\n');
    // }

    // useEffect(() => {
    //     getUserOrder();
    // },[])

    return(
        <View style={[styles.sectionItem, {display: (selectedSection === 0 ? 'flex' : 'none')}]}>
            <InstructionInput 
                instructionStyle={{marginTop: 8}} 
                instructionTitle={'Order Special Instructions'} 
                instructionPlaceHolder={'Less spicy ...'} 
                orderInstructions={orderSpecialInstruction}
                setOrderInstructions={setOrderSpecialInstructions} 
                isModifiable={isModifiable}
            />
            <Text style={{fontSize: 18, color: 'black', marginTop: 10,marginBottom:5}}>Food Ordered</Text>
            <View>
                <UserCartOrder
                    cartOrderData={orderItem.shoppingCart.userCartOrder}
                    isModifiable={isModifiable}
                    cartType={'user'}
                />
                {Object.values(orderItem.shoppingCart.joinedCartOrders).map(function(cartOrder, index) {
                    return(
                        <UserCartOrder
                            cartOrderData={cartOrder}
                            isModifiable={false}
                            cartType={'joined'}
                            key={index}
                        />
                    );
                })}
            </View>
            
            {/** cancel selected menu items should only appear when user has deselected items from their shopping cart **/}
            {/* {(orderState === 'in-cart' || orderState === 'created') && isModifiable && (
                <TouchableOpacity style={{borderWidth: 1, borderColor: '#02843D', paddingVertical: 15, width: 300, alignSelf:'center', borderRadius: 8, marginVertical: 20}}>
                    <Text style={{textAlign:'center', fontSize: 18, color: '#02843D'}}>Approve Selected Menu Items</Text>
                </TouchableOpacity>
            )} */}
            {(orderState === 'approved') && isModifiable && (
                <TouchableOpacity style={{borderWidth: 1, borderColor: 'red', paddingVertical: 15, width: 300, alignSelf:'center', borderRadius: 8, marginVertical: 20}}>
                    <Text style={{textAlign:'center', fontSize: 18, color: 'red'}}>Cancel Selected Menu Items</Text>
                </TouchableOpacity>
            )}
        </View>
    );
{/*
                to remove item that is already paid: '/orders/cancelItemsOrderPaid'
                to remove a whole incart-order: '/orders/delete/incart?orderId='
                update an incart order: '/orders/update?orderId='
*/}
}

const CustomerMgmtSection = ({ selectedSection, isModifiable, orderItem }) => {

    return (
        <View style={[styles.sectionItem, {display: (selectedSection === 1 ? 'flex' : 'none')}]}>
            <ManagementCartOrder
                cartOrderData={orderItem.shoppingCart.userCartOrder}
                isModifiable={isModifiable}
                cartType={'user'}
            />
        </View>
    )
}

const OpenURLButton = ({ url, text, textStyle }) => {
    
    let defaultText = {
        color: 'black',
        fontSize: 18,
        alignSelf: 'flex-start',
    }

    const openLink = useCallback(async () => {
        const linkedURL = await Linking.canOpenURL(url);

        if(linkedURL) {
            await Linking.openURL(url);
        }
    },[url]);

    return(
        <Text onPress={openLink} style={{...defaultText,...textStyle}}>{text}</Text>
    );
}

const RatingSelector = ({ selectorText }) => {
    const RatingArea = useAnimatedRef();
    const areaCoordinates = useSharedValue({ offsetLeft: 0, offsetRight:0, offsetTop:0, offsetBottom: 0 });
    const [deviceOrientation, setDeviceOrientation] = useState();
    const selectedRating = useSharedValue(0.5);
    const animatedStyles = useAnimatedStyle(() => {
        var newWidth = (selectedRating.value * 100).toFixed(2);
        return{
            width: `${newWidth}%`
        }
    })

    Dimensions.addEventListener('change',() => {
        const dim = Dimensions.get('screen');
        setDeviceOrientation(dim.height >= dim.width ? 'portrait' : 'landscape');
        console.log('oreientation')
    })

    const getMeasurements = () => {
        return new Promise((resolve,reject) => {
            if(RatingArea && RatingArea.current) {
                RatingArea.current.measure((x,y,width,height,pageX, pageY) => {
                    resolve({x,y,width,height,pageX,pageY});
                });
            }else{
                reject(new Error('measure: animated ref not ready'));
            }
        })
    }

    useEffect(()=> {
        getMeasurements()
        .then(async measurements => {
            areaCoordinates.value = {
                offsetLeft: measurements.pageX,
                offsetRight: measurements.pageX + measurements.width,
                offsetTop: measurements.pageY,
                offsetBottom: measurements.pageY + measurements.height,
            };
        })
    },[RatingArea, deviceOrientation]);

    const HeartElement = () => {
        return(
            <View style={{borderWidth:2, borderRadius:150/2,padding:5}}>
                <Heart width={30} height={30} fill={'#FFF'}/>
            </View>
        );
    }

    const gesture = Gesture.Pan()
    .onUpdate((e) => {
        if(e.x > areaCoordinates.value.offsetRight || e.x < areaCoordinates.value.offsetLeft || e.absoluteY < areaCoordinates.value.offsetTop || e.absoluteY > areaCoordinates.value.offsetBottom) return;
        selectedRating.value = (e.x - areaCoordinates.value.offsetLeft) / (areaCoordinates.value.offsetRight - areaCoordinates.value.offsetLeft);
    })

    return(
        <View style={{flexDirection:'column',alignItems:'center',width:'50%',minWidth:250,height:100}}>
            <Text style={{color:'#4a4a4a',fontSize:20, marginBottom:5}}>{selectorText}</Text>
            <GestureDetector gesture={gesture}>
                <MaskedView
                    pointerEvents={'box-none'}
                    style={{width:'100%',height:60,zIndex:-1}}
                    maskElement={
                        <Animated.View
                            style={{flex:1}}
                            ref={RatingArea}
                        >
                            <View style={{flex:1, flexDirection:'row',alignItems:'center', justifyContent:'space-evenly',backgroundColor:'transparent'}}>
                                <HeartElement/>
                                <HeartElement/>
                                <HeartElement/>
                                <HeartElement/>
                                <HeartElement/>
                            </View>
                        </Animated.View>
                    }
                >
                    <Animated.View
                        style={[{position:'absolute',left:0,top:0,backgroundColor:'green',height:'100%',zIndex:2},animatedStyles]}
                    />
                    <View style={{flex:1,backgroundColor:'#979797'}}/>
                </MaskedView>
            </GestureDetector>
        </View>
    );
}

const BallGestureDetector = () => {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: offset.value.x },   // moves the ball to new X
          { translateY: offset.value.y },   // moves the ball to new Y
          { scale: withSpring(isPressed.value ? 1.2 : 1) },     // when pressed, the ball gets bigger
        ],
        backgroundColor: isPressed.value ? 'yellow' : 'blue',
      };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const gesture = Gesture.Pan()
      .onBegin(() => {
        isPressed.value = true;
      })
      .onUpdate((e) => {
        console.log(e)
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      })
      .onEnd(() => {
        start.value = {
          x: offset.value.x,
          y: offset.value.y,
        };
      })
      .onFinalize(() => {
        isPressed.value = false;
      });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[{width:100, height:100, borderRadius: 100, backgroundColor:'blue', alignSelf:'center'},animatedStyles]} />
        </GestureDetector>
    )
}

const ReservationSection = ({ orderItem, isModifiable, selectedSection }) => {

    const [reservationDT, setReservationDT] = useState(new Date());
    const [order_save_notify, setOrder_Save_Notify] = useState(false);
    const [arrivalTime, setArrivalTime] = useState(new Date());
    const [durationHours, setDurationHours] = useState(null);
    const [durationMinutes, setDurationMinutes] = useState(null);
    const [numPeople, setNumPeople] = useState('1');
    const [numPaidAhead, setNumPaidAhead] = useState('7');
    const [numRSVP, setNumRSVP] = useState('7');
    const [reservation_days_remaining, setReservation_days_remaining] = useState('0');
    const [reservation_date_requested, setReservation_date_requested] = useState(new Date());
    const [reservation_date_confirmed, setReservation_date_confirmed] = useState(new Date()); 

    const { firstName,lastName, userEmail, userPhone } = useSelector(state => state.userReducer);

    return(
        <View style={[styles.sectionItem, {display: (selectedSection === 2 ? 'flex' : 'none')}]}>
            <View style={{marginVertical: 8}}>
                <Text style={styles.reservationCustomerInfo}>Customer Name: <Text style={{color: '#02843D'}}>{firstName + ' ' + lastName}</Text></Text>
                <Text style={styles.reservationCustomerInfo}>
                    {'Customer phone number: '}
                    <OpenURLButton
                        url={`tel:${userPhone}`}
                        text={formatPhoneNumber(userPhone)}
                        textStyle={{color:'green'}}
                    />
                </Text>
                <Text style={styles.reservationCustomerInfo}>
                    {'Customer email: '}
                    <OpenURLButton
                        url={`mailto:${userEmail}`}
                        text={userEmail}
                        textStyle={{color:'green'}}
                    />
                </Text>
            </View>
            <ReservationDTInputs 
                date={reservationDT} 
                setDate={setReservationDT} 
                save_notify={order_save_notify} 
                setSave_Notify={setOrder_Save_Notify} 
                time={arrivalTime} 
                setTime={setArrivalTime} 
            />
            <ReservationDurationInputs 
                hours={durationHours} 
                setHours={setDurationHours} 
                minutes={durationMinutes} 
                setMinutes={setDurationMinutes} 
                numPeople={numPeople} 
                setNumPeople={setNumPeople} 
            />
            <ReservationRSVPInputs 
                numPaidAhead={numPaidAhead} 
                setNumPaidAhead={setNumPaidAhead} 
                numRSVP={numRSVP} 
                setNumRSVP={setNumRSVP} 
            />
            <ReservationResponseInputs 
                daysRemaining={reservation_days_remaining} 
                setDaysRemaining={setReservation_days_remaining} 
                dateRequested={reservation_date_requested} 
                setDateRequested={setReservation_date_requested} 
                dateConfirmed={reservation_date_confirmed} 
                setDateConfirmed={setReservation_date_confirmed} 
            />
        </View>
    )
}

const OrderTimingSection = ({ selectedSection }) => {
    return(
        <View style={[styles.sectionItem, {display: (selectedSection === 3 ? 'flex' : 'none')}]}>
            <Text>Section 4</Text>
        </View>
    )
}

const OrderOptions = ({ selectedSection, setReservationAcceptance, setSummaryTableSelection, setMgmtTableSelection, setOrderTimingTableSelection }) => {
    
    const [summarySelection, setSummarySelection] = useState(null);
    const [mgmtSelection, setMgmtSelection] = useState(null);
    const [timingSelection, setTimingSelection] = useState(null);

    // fetch from database available tables

    const reservationResponse = (response) => {
        setReservationAcceptance(response);
        console.log(response);
    }

    const linkSummarySelection = () => {
        setSummaryTableSelection(summarySelection);
        console.log(summarySelection);
    }

    const linkMgmtSelection = () => {
        setMgmtTableSelection(mgmtSelection);
        console.log(mgmtSelection);
    }

    const linkTimingSelection = () => {
        setOrderTimingTableSelection(timingSelection);
        console.log(timingSelection);
    }

    const testList = [
        {
            label: '1',
            value: '1',
        },
        {
            label: '2',
            value: '2',
        },
        {
            label: '3',
            value: '3',
        },
        {
            label: '4',
            value: '4',
        },
        {
            label: '5',
            value: '5',
        }
    ]

    return(
        <View style={styles.orderOptionsCont}>
            {selectedSection === 0 && (
                <>
                    <CustomDropDown 
                        dropdownTitle={'Table No.'} 
                        setVal={setSummarySelection} 
                        selectionList={testList} 
                        customStyle={{flex: 1}}
                    />
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.confirmOptionBtn, {marginLeft: 5}]} onPress={linkSummarySelection}>
                        <Text style={{color: 'white', fontSize: 16}}>Claim</Text>
                    </TouchableOpacity>
                </>
            )}
            {selectedSection === 1 && (
                <>
                    <CustomDropDown 
                        dropdownTitle={'Table No.'} 
                        setVal={setMgmtSelection} 
                        selectionList={testList} 
                        customStyle={{flex: 1}} 
                    />
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.confirmOptionBtn, {marginLeft: 5}]} onPress={linkMgmtSelection}>
                        <Text style={{color: 'white', fontSize: 16}}>Send to Kitchen</Text>
                    </TouchableOpacity>
                </>
            )}
            {selectedSection === 2 && (
                <>
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.declineOptionBtn]} onPress={() => reservationResponse(0)}>
                        <Text style={{color:'red', fontSize: 16}}>Decline Reservation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.confirmOptionBtn]} onPress={() => reservationResponse(1)}>
                        <Text style={{color:'white', fontSize: 16}}>Confirm Reservation</Text>
                    </TouchableOpacity>
                </>
            )}
            {selectedSection === 3 && (
                <>
                    <CustomDropDown 
                        dropdownTitle={'Table No.'} 
                        setVal={setTimingSelection} 
                        selectionList={testList} 
                        customStyle={{flex: 1}}
                    />
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.confirmOptionBtn, {marginLeft: 5}]} onPress={linkTimingSelection}>
                        <Text style={{color: 'white', fontSize: 16}}>Claim</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

// ------------------------------------------------------------------

const OrderTypeBanner = ({orderType, customStyle}) => {
    return(
        <View style={{...styles.orderBanner,...customStyle}}>
            {orderType === 'order-ahead' && (
                <>
                    <Utensils width={13} height={13} fill={'#02843D'}/>
                    <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Order In</Text>
                </>
            )}
            {orderType === 'delivery' && (
                <>
                     <Biker width={18} height={18} fill={'#02843D'} />
                    <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Delivery</Text>
                </>
            )}
            {orderType === 'pickup' && (
                <>
                    <Walker width={18} height={18} fill={'#02843D'} style={{marginRight: -3}} />
                    <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Pickup</Text>
                </>
            )}
        </View>
    )
} 

const PaymentStatusBanner = ({payment_status, customStyle}) => {
    if(payment_status === 'paid') {
        return(
            <View style={{...styles.paidCont,...{backgroundColor: '#E6F3EC', borderColor: '#02843D'},...customStyle}}>
                <Text style={{color: '#02843D', fontSize: 11}}>Paid</Text>
            </View>
        );
    }else if(payment_status === 'paying'){
        return(
            <View style={{...styles.paidCont,...{backgroundColor: '#FFF3CE', borderColor: '#FCC41F'},...customStyle}}>
                <Text style={{color: '#000', fontSize: 11}}>Paying</Text>
            </View>
        );
    }else if(payment_status === 'unpaid') {
        return(
            <View style={{...styles.paidCont,...{backgroundColor: '#fad4d4', borderColor: '#a10202'},...customStyle}}>
                <Text style={{color: '#a10202', fontSize: 11}}>Not Paid</Text>
            </View>
        );
    }
}
    // const calculateSpending = () => {
    //     if(!userOrders.length) { return; }
    //     var totalSpent = 0;
    //     var inRangeSpent = 0;
    //     var inRangeTip = 0;
    //     var currentDate = new Date();
    //     var priorDate = new Date(new Date().setDate(currentDate.getDate() - inRangeSpent_days));

    //     userOrders.forEach((orderItem) => {
    //         if(orderItem.orderInfo.state !== 'approved') { return; }
    //         if(withinRange(orderItem.orderInfo.order_placed_date,priorDate, currentDate)){
    //             inRangeSpent += orderItem.orderInfo.total_price;
    //             inRangeTip += orderItem.orderTotal.tip;
    //         }
    //         totalSpent += orderItem.orderInfo.total_price;
    //     })
    //     setInRangeTip_amount(inRangeTip*100);
    //     setLifeTimeSpent(totalSpent);
    //     setInRangeSpent_amount(inRangeSpent);
    // }
const OrderItem = ({ orderItem }) => {

    const order_type = orderItem.orderInfo.order_type;
    const payment_status = orderItem.orderInfo.payment_status;
    const isModifiable = (orderItem.orderTotal.status === 'pending-creation' || orderItem.orderTotal.status === 'pending-approval'); 

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedSection, setSelectedSection] = useState(0);
    
    const [lifetimeSpent, setLifeTimeSpent] = useState(null);
    const [inRangeSpent_days, setInRangeSpent_days] = useState('90');
    const [inRangeSpent_amount, setInRangeSpent_amount] = useState(null);
    const [inRangeTip_amount, setInRangeTip_amount] = useState(null);

    const orderName = () => {
        if(!orderItem.orderTotal.parent_order_id) { return orderItem.orderTotal.order_name; }
        return orderItem.shoppingCart.userCartOrder.orderName;
    }
    
    const calculateSpending = async () => {
        const { userId } = store.getState().userReducer;
        
        if(orderItem.orderTotal.user_id === userId) {

            var orders = await fetch('https://platerate.com/getUserOrders');
            orders = await orders.json();

            if(!orders.length) return;

            var totalSpent = 0;
            var inRangeSpent = 0;
            var inRangeTip = 0;
            var targetVenue = orderItem.orderInfo.venue_id;
            var currentDate = new Date();
            var priorDate = new Date(new Date().setDate(currentDate.getDate() - inRangeSpent_days));
            for(var order of orders) {
                if(order.venue_id !== targetVenue || order.state !== 'approved') continue;
                if(withinRange(order.order_placed_date, priorDate, currentDate)) {
                    inRangeSpent += order.total_price;
                    var orderTotal = await fetch(`https://platerate.com/orders/gettotal?orderId=${order.order_id}`);
                    orderTotal = await orderTotal.json().then((data) => data.data[0])
                    inRangeTip += orderTotal.tip;
                }
                totalSpent += order.total_price;
            }

            setInRangeTip_amount(inRangeTip * 100);
            setLifeTimeSpent(totalSpent);
            setInRangeSpent_amount(inRangeSpent);
        }else{
            
        }
    }

    useEffect(() => {
        calculateSpending()
    },[inRangeSpent_days]);

    {/* <OrderOptions 
        selectedSection={selectedSection} 
        setReservationAcceptance={setReservationAcceptance} 
        setSummaryTableSelection={setSummaryTableSelection} 
        setMgmtTableSelection={setMgmtTableSelection} 
        setOrderTimingTableSelection={setOrderTimingTableSelection} 
    /> */}

    return(
        <View style={styles.orderCont}>
            <View style={styles.orderHeader}>
                <TouchableOpacity style={styles.orderExpandBtn} onPress={() => setIsCollapsed(!isCollapsed)}>
                    <Dash width={20} height={20} fill={'#000'} />
                </TouchableOpacity>
                <View style={styles.orderHeaderInfo}>
                    <Text style={{color: 'black', fontSize: 17, marginRight: 10}}>{orderName()}</Text>
                    <OrderTypeBanner 
                        orderType={order_type} 
                        customStyle={{marginRight:8}}
                    />
                    <View style={styles.orderAmountCont}>
                        <PaymentStatusBanner 
                            payment_status={payment_status}
                            customStyle={{marginRight:8}}
                        />
                        <Text style={{fontSize:17, fontWeight:'bold', color: '#02843D'}}>(${orderItem.orderInfo.total_price})</Text>
                    </View>
                </View>
            </View>
            <Collapsible collapsed={isCollapsed}>
                <View style={{height:2, backgroundColor:'#DBE0DD'}}></View>
                <View style={styles.orderBody}>
                    <View>
                        <Text style={{fontSize:24, color:'green',fontWeight:'600'}}>{orderItem.orderInfo.venue_name}</Text>
                        <Text style={[styles.accumInfoText,{fontWeight: 'bold'}]}>Order number #{orderItem.orderInfo.order_id}</Text>
                        <Text style={[styles.accumInfoText]}>
                            Order Lifetime Spend: 
                            <Text style={{color: '#02843D'}}> ${lifetimeSpent}</Text>    
                        </Text>
                        <View style={[styles.spent_n_daysCont]}>
                            <Text style={styles.accumInfoText}>Last</Text>
                            <View style={styles.daysCont}>
                                <TextInput
                                    onChangeText={(val) => setInRangeSpent_days(val.replace(/\D/g,''))}
                                    value={inRangeSpent_days}
                                    keyboardType={'numeric'}
                                    maxLength={3}
                                    style={{padding:0, marginHorizontal: 4, fontSize:15, marginLeft: 8, color:'#4A4A4A'}}
                                />
                                <UpDownCaret caretStyle={{right: 2}} />
                            </View>
                            <Text style={styles.accumInfoText}>days = Spend: <Text style={{color: '#02843D'}}>${inRangeSpent_amount}</Text> Tip: <Text style={{color: '#02843D'}}>{inRangeTip_amount}%</Text></Text>
                        </View>
                    </View>
                    <View style={styles.orderSectionBtns}>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 0? '#02843D' : '#F3F3F3')}]} onPress={() => setSelectedSection(0)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 0? '#FFF' : '#7D7D7D')}]}>Order Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 1? '#02843D' : '#F3F3F3')}]}  onPress={() => setSelectedSection(1)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 1? '#FFF' : '#7D7D7D')}]}>Customer Mgmt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 2? '#02843D' : '#F3F3F3')}]}  onPress={() => setSelectedSection(2)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 2? '#FFF' : '#7D7D7D')}]}>Reservation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 3? '#02843D' : '#F3F3F3')}]}  onPress={() => setSelectedSection(3)}>
                            <Text style={[styles.orderSelectionText, {color: (selectedSection === 3? '#FFF' : '#7D7D7D')}]}>Order Timing</Text>
                        </TouchableOpacity>
                    </View>
                    <OrderSummarySection
                        orderItem={orderItem}
                        isModifiable={isModifiable}
                        selectedSection={selectedSection}
                    />
                    <CustomerMgmtSection 
                        orderItem={orderItem}
                        isModifiable={isModifiable}
                        selectedSection={selectedSection} 
                    />
                    <ReservationSection
                        orderItem={orderItem}
                        isModifiable={isModifiable}
                        selectedSection={selectedSection} 
                    />
                    <OrderTimingSection
                        orderItem={orderItem}
                        isModifiable={isModifiable}
                        selectedSection={selectedSection} 
                    />
                </View>
            </Collapsible>
        </View>
    );
}

// const OrderItem = ({ orderInfo, orderData, lifetimeSpent, inRangeSpent_days, setInRangeSpent_days, inRangeSpent_amount }) => {

//     const [isCollapsed, setIsCollapsed] = useState(true);
//     const [selectedSection, setSelectedSection] = useState(0);
//     // const [reservationAcceptance, setReservationAcceptance] = useState(null);   // reservation options
//     // const [summaryTableSelection, setSummaryTableSelection] = useState(null);   // order summary options
//     // const [mgmtTableSelection, setMgmtTableSelection] = useState(null);     // customer management options
//     // const [orderTimingTableSelection, setOrderTimingTableSelection] = useState(null);   // order timing options

//     const updateIsCollapsed = () => {
//         setIsCollapsed(!isCollapsed);
//     }

//     const setSection = (section) => {
//         setSelectedSection(section);
//     }

//     const getOrderData = async () => {
//         // var orderDetailsRes = await fetch(`https://platerate.com/orders/details/user?orderId=${orderInfo.order_id}&res=json`);
//         // var orderDetails = await orderDetailsRes.json();

//         // var orderItemsRes = await fetch(`https://platerate.com/orders/items?orderId=${orderInfo.order_id}`);
//         // var orderItems = await orderItemsRes.json();
//     }

//     // const getOrderData = async () => {
//     //     var orderRes = await fetch(`https://platerate.com/orders/details/user?orderId=${orderInfo.order_id}&res=json`);
//     //     var orderData = await orderRes.json();
//     //     var subOrderTotalRes = await fetch('https://platerate.com/orders/subOrderTotal', {
//     //         method: 'post',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({
//     //             userId: orderData.data.user.userId,
//     //             venueId: orderInfo.venue_id,
//     //             orderId: orderInfo.order_id,
//     //         })
//     //     });
//     //     var subOrderTotalData = await subOrderTotalRes.json();
//     //     var detailsRes = await fetch(`https://platerate.com/orders/details/restaurant?venueId=${orderInfo.venue_id}&orderId=${orderInfo.order_id}&res=json`);
//     //     var orderDetails = await detailsRes.json();

//     //     var getMoreRes = await fetch('https://platerate.com/orders/get-more-order-infor', {
//     //         method: 'post',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({
//     //             data: {
//     //                 order_id : orderInfo.order_id,
//     //                 parent_order_id: null,
//     //             }
//     //         })
//     //     })
//     //     var getMoreData = await getMoreRes.json()
//     //     console.log(getMoreData);

//     //     setOrderData(orderData.data);
//     //     setOrderTotal(subOrderTotalData.data);
//     // }

//     useEffect(() => {
//         getOrderData();
//     }, [])

//     const orderBanner = (orderType) => {
//         if(orderType === 'order-ahead') {
//             return (
//                 <>
//                     <Utensils width={13} height={13} fill={'#02843D'}/>
//                     <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Order In</Text>
//                 </>
//             );
//         }else if(orderType === 'delivery') {
//             return (
//                 <>
//                     <Biker width={18} height={18} fill={'#02843D'} />
//                     <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Delivery</Text>
//                 </>
//             );
//         }else{
//             return (
//                 <>
//                     <Walker width={18} height={18} fill={'#02843D'} style={{marginRight: -3}} />
//                     <Text style={{fontSize:18, marginLeft:5, color: '#02843D'}}>Pickup</Text>
//                 </>
//             );
//         }
//     }

//     const orderPayment = (paymentStatus) => {
//         if(paymentStatus === 'paid') {
//             return(
//                 <View style={[styles.paidCont,{backgroundColor: '#E6F3EC', borderColor: '#02843D'}]}>
//                     <Text style={{color: '#02843D', fontSize: 11}}>Paid</Text>
//                 </View>
//             );
//         }else if(paymentStatus === 'paying'){
//             return(
//                 <View style={[styles.paidCont,{backgroundColor: '#FFF3CE', borderColor: '#FCC41F'}]}>
//                     <Text style={{color: '#000', fontSize: 11}}>Paying</Text>
//                 </View>
//             );
//         }else {
//             return(
//                 <View style={[styles.paidCont,{backgroundColor: '#fad4d4', borderColor: '#a10202'}]}>
//                     <Text style={{color: '#a10202', fontSize: 11}}>Not Paid</Text>
//                 </View>
//             );
//         }
//     }

//     return(
//         <View style={styles.orderCont}>
//             <View style={styles.orderHeader}>
//                 <View style={styles.orderHeaderInfo}>
//                     <TouchableOpacity style={styles.orderExpandBtn} onPress={updateIsCollapsed}>
//                         <Dash width={20} height={20} fill={'#000'}/>
//                     </TouchableOpacity>
//                     <Text style={{color: 'black', fontSize: 17, marginRight: 10}}>{orderData.order_name}</Text>
//                     <View style={styles.orderBanner}>
//                         {orderBanner(orderInfo.order_type)}
//                     </View>
//                     <View style={styles.orderAmountCont}>
//                         {orderPayment(orderInfo.payment_status)}
//                         <Text style={{fontSize:17, fontWeight:'bold', color: '#02843D'}}>(${orderInfo.total_price})</Text>
//                     </View>
//                 </View>
//                 {/* <OrderOptions 
//                     selectedSection={selectedSection} 
//                     setReservationAcceptance={setReservationAcceptance} 
//                     setSummaryTableSelection={setSummaryTableSelection} 
//                     setMgmtTableSelection={setMgmtTableSelection} 
//                     setOrderTimingTableSelection={setOrderTimingTableSelection} 
//                 /> */}
//             </View>
//             <Collapsible collapsed={isCollapsed}>
//                 <View style={{height:2, backgroundColor:'#DBE0DD'}}></View>
//                 <View style={styles.orderBody}>
//                     <View>
//                         <Text style={[styles.accumInfoText,{fontWeight: 'bold'}]}>Order number #{orderInfo.order_id}</Text>
//                         <Text style={styles.accumInfoText}>
//                             Order Lifetime Spend: 
//                             <Text style={{color: '#02843D'}}> ${lifetimeSpent}</Text>    
//                         </Text>
//                         <View style={styles.spent_n_daysCont}>
//                             <Text style={styles.accumInfoText}>Last</Text>
//                             <View style={styles.daysCont}>
//                                 <TextInput
//                                     onChangeText={(val) => setInRangeSpent_days(val.replace(/\D/g,''))}
//                                     value={inRangeSpent_days}
//                                     keyboardType={'numeric'}
//                                     maxLength={3}
//                                     style={{padding:0, marginHorizontal: 4, fontSize:15, marginLeft: 8}}
//                                 />
//                                 <UpDownCaret caretStyle={{right: 2}} />
//                             </View>
//                             <Text style={styles.accumInfoText}>days = Spend: <Text style={{color: '#02843D'}}>${inRangeSpent_amount}</Text> Tip: <Text style={{color: '#02843D'}}>{22}%</Text></Text>
//                         </View>
//                     </View>
//                     <View style={styles.orderSectionBtns}>
//                         <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 0? '#02843D' : '#F3F3F3')}]} onPress={() => setSection(0)}>
//                             <Text style={[styles.orderSelectionText, {color: (selectedSection === 0? '#FFF' : '#7D7D7D')}]}>Order Summary</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 1? '#02843D' : '#F3F3F3')}]}  onPress={() => setSection(1)}>
//                             <Text style={[styles.orderSelectionText, {color: (selectedSection === 1? '#FFF' : '#7D7D7D')}]}>Customer Mgmt</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 2? '#02843D' : '#F3F3F3')}]}  onPress={() => setSection(2)}>
//                             <Text style={[styles.orderSelectionText, {color: (selectedSection === 2? '#FFF' : '#7D7D7D')}]}>Reservation</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={[styles.orderSelectionBtn, { backgroundColor: (selectedSection === 3? '#02843D' : '#F3F3F3')}]}  onPress={() => setSection(3)}>
//                             <Text style={[styles.orderSelectionText, {color: (selectedSection === 3? '#FFF' : '#7D7D7D')}]}>Order Timing</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <OrderSummarySection selectedSection={selectedSection} />
                    // <CustomerMgmtSection selectedSection={selectedSection} />
                    // <ReservationSection selectedSection={selectedSection} />
                    // <OrderTimingSection selectedSection={selectedSection} />
//                 </View>
//             </Collapsible>
//         </View>
//     );
// }

const OrderList = ({ ratingFilters, serviceProvider, from, to, navigation }) => {

    const [refreshing, setRefreshing] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [restaurantOrders, setRestaurantOrders] = useState([]);
    const [isConnected, setIsConnected] = useState(null)
    
    const deviceConnection = NetInfo.useNetInfo();

    const {userId, userRestaurants} = useSelector(state => state.userReducer);

    const fetchOrders = async () => {
        setUserOrders(await getUserFilteredOrders(userId, from, to, ratingFilters));
        setRestaurantOrders(await getRestaurantOrders(userId, userRestaurants, from, to, ratingFilters));
    }

    const PromptLogin = () => {

        return(
            <View style={{width:'95%',height:'80%', borderRadius:20,backgroundColor:'#e8f1ff', marginTop:30,overflow:'hidden'}}>
                <Text style={{color:'#4e4e4e', fontSize:23,textAlign:'center',marginVertical:20}}>Please Login or Register to begin viewing your PlateRate Orders</Text>
                <Image 
                    source={require('../content/images/dummy_character.png')}
                    style={{height: 200,width: 250,alignSelf:'center'}}
                />
                <View style={{flexDirection:'column', width: 250, alignSelf:'center', marginTop:20}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('WebView', { viewType: 'accountAccess', formType: 'login' })}
                        style={{width:'100%',height:40,backgroundColor:'green',marginBottom:10,borderRadius:3,alignItems:'center',justifyContent:'center'}}
                    >
                        <Text style={{fontSize:20,color:'#FFF'}}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('WebView', { viewType: 'accountAccess', formType: 'register' })}
                        style={{width:'100%',height:40,backgroundColor:'#ffe20b',borderRadius:3,alignItems:'center',justifyContent:'center'}}
                    >
                        <Text style={{fontSize:20,color:'#000'}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    const PromptNoOrders = () => {
        return(
            <View style={{width:'95%',height:'80%', borderRadius:20,backgroundColor:'#e8f1ff', marginTop:30,overflow:'hidden'}}>
                <Text style={{color:'#4e4e4e', fontSize:25,textAlign:'center',marginVertical:20,paddingHorizontal:30}}>You Don't Have Any Orders in Your PlateRate Account.</Text>
                <OpenURLButton
                    text={'Go make an order'}
                    textStyle={{alignSelf:'center', fontSize:30, color:'#ffe20b',backgroundColor:'#02843d',borderRadius:4, paddingVertical:10,paddingHorizontal:5,marginTop:20}}
                    url={'https://platerate.com'}
                />
            </View>
        );
    }
    
    const PromptNoConnection = () => {
        return(
            <View style={{width:'95%',height:'80%', borderRadius:20,backgroundColor:'#e8f1ff', marginTop:30,overflow:'hidden'}}>
                <Wifi width={220} height={220} fill={'green'} style={{alignSelf:'center'}} />
                <Text style={{fontSize:29,color:'#4b4b4b',textAlign:'center'}}>Failed to detect a network connection</Text>
            </View>
        );
    }

    useEffect(() => {
        setRefreshing(true);
        fetchOrders()
        .then(() => setRefreshing(false));
    },[ratingFilters,serviceProvider,from,to,userId]);

    useEffect(() => {
        setIsConnected(deviceConnection.isConnected);
    },[deviceConnection]);

    const refreshOrders = React.useCallback(() => {
        setRefreshing(true);
        fetchOrders()
        .then(() => setRefreshing(false));
    },[]);

    // const filterOrders = async () => {
    //     if(!userOrders.length) { return []; }
    //     var selectedRatingFilters = [];
    //     var filteredOrders = [];

    //     ratingFilters.forEach((filterItem) => {
    //         if(filterItem.selected)
    //             selectedRatingFilters.push(filterItem.orderType);
    //     })

    //     userOrders.forEach((orderItem) => {
    //         if(selectedRatingFilters.includes(orderItem.orderInfo.order_type) && withinRange(orderItem.orderInfo.order_placed_date, from, to))
    //             filteredOrders.push(orderItem);
    //     });

    //     return filteredOrders;
    // }

    // const calculateSpending = () => {
    //     if(!userOrders.length) { return; }
    //     var totalSpent = 0;
    //     var inRangeSpent = 0;
    //     var inRangeTip = 0;
    //     var currentDate = new Date();
    //     var priorDate = new Date(new Date().setDate(currentDate.getDate() - inRangeSpent_days));

    //     userOrders.forEach((orderItem) => {
    //         if(orderItem.orderInfo.state !== 'approved') { return; }
    //         if(withinRange(orderItem.orderInfo.order_placed_date,priorDate, currentDate)){
    //             inRangeSpent += orderItem.orderInfo.total_price;
    //             inRangeTip += orderItem.orderTotal.tip;
    //         }
    //         totalSpent += orderItem.orderInfo.total_price;
    //     })
    //     setInRangeTip_amount(inRangeTip*100);
    //     setLifeTimeSpent(totalSpent);
    //     setInRangeSpent_amount(inRangeSpent);
    // }

    // const refreshOrders = React.useCallback(() => {
    //     if(!userId) {return;}
    //     console.log('makrer')
    //     setRefreshing(true);
    //     getUserOrders()
    //     .then(() => setRefreshing(false));
    // },[]);

    // useEffect(() => {
    //     filterOrders()
    //     .then(async filtered => {
    //         setFilteredOrders(filtered);
    //         calculateSpending();
    //     })
    // }, [userOrders, ratingFilters, serviceProvider, from, to]);

    // useEffect(() => {
    //     calculateSpending();
    // }, [inRangeSpent_days]);

    return(
        <ScrollView
            style={styles.orderList}
            contentContainerStyle={{alignItems:'center',flex:1}}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshOrders}
                />
            }
        >
            {userOrders.map(function(orderItem,index) {
                return(
                    <OrderItem
                        orderItem={orderItem}
                        key={index}
                    />
                );
            })}
            {restaurantOrders.map(function(orderItem, index) {
                return(
                    <OrderItem
                        orderItem={orderItem}
                        key={index}
                    />
                )
            })}
            {!userId && isConnected && (
                <PromptLogin
                    navigation={navigation}
                />
            )}
            {userId && isConnected && userOrders.length === 0 && (
                <PromptNoOrders/>
            )}
            {!isConnected && (
                <PromptNoConnection/>
            )}
        </ScrollView>
    );
}

export function HomeView({ navigation }) {
    
    const [ratingFilters, setRatingFilters] = useState([
        {
            id: 1,
            orderText: 'Order In',
            orderType: 'order-ahead',
            selected: true,
        },
        {
            id: 2,
            orderText: 'Delivery',
            orderType: 'delivery',
            selected: true,
        },
        {
            id: 3,
            orderText: 'Pick-Up',
            orderType: 'pickup',
            selected: true,
        }
    ]);
    const [provider, setProvider] = useState([]);
    const [fromDate, setFromDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
    const [toDate, setToDate] = useState(new Date());
    const [newOrders, setNewOrders] = useState([]);

    const { userRestaurants } = useSelector(state => state.userReducer);

    useEffect(() => {
        getNewOrders(userRestaurants)
        .then(async (newOrders) => {
            setNewOrders(newOrders);
        })
    },[userRestaurants]);

    return(
        <ScrollView contentContainerStyle={{flexGrow:1, justifyContent: 'space-between'}}>
            <OrderNotification 
                newOrders={newOrders}
            />
            <RatingFilters 
                selectedFilters={ratingFilters} 
                modifyRatingFilters={setRatingFilters} 
            />
            <ProviderSelectors 
                provider={provider}
                setProvider={setProvider} 
                from={fromDate} setFrom={setFromDate} 
                to={toDate} setTo={setToDate} 
            />
            <OrderList 
                ratingFilters={ratingFilters}
                serviceProvider={provider} 
                from={fromDate} to={toDate}
                navigation={navigation}
            />
        </ScrollView>
    )
}

/*
    approach: 
        1. Get user id +
        2. Get all user orders
        3. Filter by type: pickup/delivery/ahead
        4. Optional: Filter by delivery person and date range
        5. For each order, create an "OrderItem" to display


    useful db functions:

    - showOrderHistory: server/controllers/profile-controller.js


*/