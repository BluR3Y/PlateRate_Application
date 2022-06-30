import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { styles, pickerSelectStyles } from '../styles/homeStyles';
import { format12Hours, formatDate } from '../utilities/functions';
import Svg, { G, Rect } from 'react-native-svg';

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

const OrderNotification = ({ newOrders }) => {

    //fetch from database

    const [show, setShow] = useState(newOrders? true : false);
    
    const hideNotification = () => {
        setShow(!show);
    }

    return(
        <TouchableOpacity
            onPress={hideNotification}
            style={[styles.orderNotification, {display: (show ? 'flex' : 'none')}]}
        >
            <View style={{borderBottomWidth: 2}}>
                <Text style={styles.notificationText}>{`${newOrders} New Orders`}</Text>
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
                    <Text style={styles.ratingFilterText}>{filterItem.orderType}</Text>
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
    const [text, setText] = useState(title);
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

const ProviderSelectors = ({ changeProvider, from, setFrom, to, setTo }) => {

    const serviceProviders = [
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

    const updateProvider = (provider) => {
        changeProvider(provider);
    }

    return(
        <View style={styles.providerFilters}>
            <View style={styles.providerCont}>
                <RNPickerSelect
                    placeholder={{ label: 'Server / Delivery Person', value: null }}
                    useNativeAndroidPickerStyle={false}
                    items={serviceProviders}
                    onValueChange={updateProvider}
                    style={pickerSelectStyles}
                    textInputProps={{color: 'black'}}
                />
                <UpDownCaret caretStyle={{right: 8}} />
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

const SpentWithinDays = ({  }) => {

    // fetch lifetime spent and spent in N days
    // requires: venueId, userId

    const [numDays, setNumDays] = useState('90');

    const changeNumDays = (selected) => {
        setNumDays(selected.replace(/\D/g,''));
    }

    const onPress = () => {
        console.log('triggered');
    }

    return (
        <View style={styles.spent_n_daysCont}>
            <Text style={styles.accumInfoText}>Last</Text>
            <View style={styles.daysCont}>
                <TextInput
                    onChangeText={changeNumDays}
                    value={numDays}
                    keyboardType={'numeric'}
                    maxLength={3}
                    style={{padding:0, marginHorizontal: 4, fontSize:15, marginLeft: 8}}
                />
                <UpDownCaret caretStyle={{right: 2}} />
            </View>
            <Text style={styles.accumInfoText}>days = Spend: <Text style={{color: '#02843D'}}>${4000}</Text> Tip: <Text style={{color: '#02843D'}}>{22}%</Text></Text>
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
                <View style={styles.reservationCheckBox}>
                    <TouchableOpacity style={styles.reservationCheckBoxBtn} onPress={() => setSave_Notify(!save_notify)}>
                        <CheckBox customSize={12} isVisible={save_notify} />
                        <Text style={{marginLeft: 6, fontSize: 17, color: '#4A4A4A'}}>Save and notify customer</Text>
                    </TouchableOpacity>
                </View>
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

const InstructionInput = ({ instructionTitle, instructionPlaceHolder, instructionStyle, orderInstructions, setOrderInstructions }) => {

    const changeInstructions = (instructions) => {
        setOrderInstructions(instructions);
    }

    return(
        <View style={[styles.instructionInput, instructionStyle]}>
            <Text style={styles.instructionInputText}>{instructionTitle}</Text>
            <TextInput
                placeholder={instructionPlaceHolder}
                style={styles.InstructionInputBox}
                onChangeText={changeInstructions}
                value={orderInstructions}
            />
        </View>
    );
}

const CustomDropDown = ({ dropdownTitle, setVal, selectionList, customStyle }) => {
    
    const updateSelection = (selection) => {
        setVal(selection);
    }

    return(
        <View style={[styles.CustomDropDown, customStyle]}>
            <View style={{backgroundColor: '#E6F3EC', justifyContent: 'center', paddingHorizontal: 5}}>
                <Text style={{fontSize: 14}}>{dropdownTitle}</Text>
            </View>
            <View style={{ backgroundColor: '#F9F9F9', flex: 1}}>
                <RNPickerSelect
                    placeholder={{ label: '', value: null }}
                    useNativeAndroidPickerStyle={false}
                    items={selectionList}
                    style={pickerSelectStyles}
                    onValueChange={updateSelection}
                    textInputProps={{color: 'black', textAlign: 'center'}}
                />
                <UpDownCaret caretStyle={{right: 8}} />
            </View>
        </View>
    );
}

const CheckBox = ({ customSize, isVisible }) => {

    return(
        <View style={{backgroundColor: (isVisible ? 'green' : '#FFF'), borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 4,  width: customSize+3, height: customSize+3}}>
            <CheckMark width={customSize} height={customSize} fill={'#FFF'} />
        </View>
    );
}

const CircledBullet = ({customSize, isVisible}) => {

    return(
        <View style={{width: customSize, height: customSize, borderWidth: 1, borderColor: 'green', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: (isVisible ? 'green' : null), borderRadius: 100, width: '82%', height: '85%'}}></View>
        </View>
    );
}

const MenuItem = ({ numItems, itemName, itemPrice, paymentStatus, subOptions }) => {

    const [isSelected, setIsSelected] = useState(false);
    const [selectedSub, setSelectedSub] = useState(new Array(subOptions.length).fill(false));

    const updateStatus = () => {
        setIsSelected(!isSelected);
    }

    const orderPayment = () => {
        if(paymentStatus === 'paid') {
            return(
                <View style={[styles.paidCont,{backgroundColor: '#E6F3EC', borderColor: '#02843D'}]}>
                    <Text style={{color: '#02843D', fontSize: 11}}>Paid</Text>
                </View>
            );
        }else if(paymentStatus === 'paying'){
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

    const updateSelection = (id) => {
        let modifiedOptions = [];
        for(var i = 0; i < selectedSub.length; i++) {
            if(i !== id) {
                modifiedOptions.push(selectedSub[i]);
            }else{
                modifiedOptions.push(!selectedSub[i]);
            }
        }
        setSelectedSub(modifiedOptions);
    }

    return(
        <View style={styles.menuItem}>
            <TouchableOpacity style={styles.menuItemInfo} onPress={updateStatus}>
                <CheckBox customSize={12} isVisible={isSelected} />
                <Text style={{fontSize: 20, marginLeft: 8, fontWeight:'bold'}}>{`${numItems}x  ${itemName}`}</Text>
                <Text style={{fontSize: 20, marginHorizontal: 10}}>{`(${numItems} order)  $${itemPrice}`}</Text>
                {orderPayment()}
            </TouchableOpacity>
            {subOptions.map((subOption) => (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }} key={subOption.id} onPress={() => updateSelection(subOption.id)}>
                    <CircledBullet customSize={16} isVisible={selectedSub[subOption.id]} />
                    <Text style={{marginLeft: 10, fontSize: 18}}>{`${subOption.optionName} ${subOption.numSelections} x $${subOption.price} = $${(subOption.numSelections * subOption.price).toFixed(2)}`}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const FoodOrderItem = () => {

    const [seatNum, setSeatNum] = useState(null);
    const [assignedTo, setAssignedTo] = useState(null);

    //fetch from db menu items included in this order

    return(
        <View style={styles.foodOrderItem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.foodOrderUserInfo}>
                    <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.foodOrderUserImg}/>
                    <Text style={{fontSize: 16, marginHorizontal: 7, fontWeight: 'bold'}}>Sam A's Order</Text>
                </View>
                <CustomDropDown dropdownTitle={'Seat No.'} setVal={setSeatNum} selectionList={[{ label: '1', value: '1' },{ label: '2', value: '2' },{ label: '3', value: '3' }]} customStyle={{ width: 130, height: 30}}/>
            </View>
            <CustomDropDown dropdownTitle={'Assign(ed) to:'} setVal={setAssignedTo} customStyle={{marginVertical:6, marginHorizontal: 0}} selectionList={[{ label: '1', value: '1' },{ label: '2', value: '2' },{ label: '3', value: '3' }]} />
            <View>
                <MenuItem numItems={2} itemName={'Fried Cauliflower'} itemPrice={16.95} paymentStatus={'paid'} subOptions={[{ id: 0, optionName: 'Parmigiana', numSelections: 2, price: 2 },{ id:1, optionName: 'Others', numSelections: 4, price: 6 }]} />
            </View>
        </View>
    );
}

//------------------------------------------- Order Item Sections
const OrderSummarySection = ({ displayedSection }) => {

    const [orderInstructions, setOrderInstructions] = useState('');

    return(
        <View style={[styles.sectionItem, {display: (displayedSection === 0 ? 'flex' : 'none')}]}>
            <InstructionInput instructionStyle={{marginTop: 8}} instructionTitle={'Order Special Instructions'} instructionPlaceHolder={'Less spicy ...'} orderInstructions={orderInstructions} setOrderInstructions={setOrderInstructions} />
            <Text style={{fontSize: 15, color: 'black', marginTop: 10,marginBottom:5}}>Food Ordered</Text>
            <View>
                <FoodOrderItem/>
            </View>
        </View>
    )
}

const CustomerMgmtSection = ({ displayedSection }) => {
    return (
        <View style={[styles.sectionItem, {display: (displayedSection === 1 ? 'flex' : 'none')}]}>
            <Text>Section 2</Text>
        </View>
    )
}

const ReservationSection = ({ displayedSection }) => {

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

    return(
        <View style={[styles.sectionItem, {display: (displayedSection === 2 ? 'flex' : 'none')}]}>
            <View style={{marginVertical: 8}}>
                <Text style={styles.reservationCustomerInfo}>Customer Name: <Text style={{color: '#02843D'}}>John Doe</Text></Text>
                <Text style={styles.reservationCustomerInfo}>Customer phone number: <Text style={{color: '#02843D'}}>1 (234) 567-8901</Text></Text>
            </View>
            <ReservationDTInputs date={reservationDT} setDate={setReservationDT} save_notify={order_save_notify} setSave_Notify={setOrder_Save_Notify} time={arrivalTime} setTime={setArrivalTime} />
            <ReservationDurationInputs hours={durationHours} setHours={setDurationHours} minutes={durationMinutes} setMinutes={setDurationMinutes} numPeople={numPeople} setNumPeople={setNumPeople} />
            <ReservationRSVPInputs numPaidAhead={numPaidAhead} setNumPaidAhead={setNumPaidAhead} numRSVP={numRSVP} setNumRSVP={setNumRSVP} />
            <ReservationResponseInputs daysRemaining={reservation_days_remaining} setDaysRemaining={setReservation_days_remaining} dateRequested={reservation_date_requested} setDateRequested={setReservation_date_requested} dateConfirmed={reservation_date_confirmed} setDateConfirmed={setReservation_date_confirmed} />
        </View>
    )
}

const OrderTimingSection = ({ displayedSection }) => {
    return(
        <View style={[styles.sectionItem, {display: (displayedSection === 3 ? 'flex' : 'none')}]}>
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
                    <CustomDropDown dropdownTitle={'Table No.'} setVal={setSummarySelection} selectionList={testList} customStyle={{flex: 1}}/>
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.confirmOptionBtn, {marginLeft: 5}]} onPress={linkSummarySelection}>
                        <Text style={{color: 'white', fontSize: 16}}>Claim</Text>
                    </TouchableOpacity>
                </>
            )}
            {selectedSection === 1 && (
                <>
                    <CustomDropDown dropdownTitle={'Table No.'} setVal={setMgmtSelection} selectionList={testList} customStyle={{flex: 1}} />
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
                    <CustomDropDown dropdownTitle={'Table No.'} setVal={setTimingSelection} selectionList={testList} customStyle={{flex: 1}}/>
                    <TouchableOpacity style={[styles.orderOptionsBtns, styles.confirmOptionBtn, {marginLeft: 5}]} onPress={linkTimingSelection}>
                        <Text style={{color: 'white', fontSize: 16}}>Claim</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

// ------------------------------------------------------------------

const OrderItem = ({ orderInfo }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedSection, setSelectedSection] = useState(0);
    const [reservationAcceptance, setReservationAcceptance] = useState(null);   // reservation options
    const [summaryTableSelection, setSummaryTableSelection] = useState(null);   // order summary options
    const [mgmtTableSelection, setMgmtTableSelection] = useState(null);     // customer management options
    const [orderTimingTableSelection, setOrderTimingTableSelection] = useState(null);   // order timing options

    const updateIsCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    }

    const setSection = (section) => {
        setSelectedSection(section);
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
                    <Text style={{color: 'black', fontSize: 17, marginRight: 10}}>{orderInfo.vendorName}'s</Text>
                    <View style={styles.orderBanner}>
                        {orderBanner(orderInfo.orderType)}
                    </View>
                    <View style={styles.orderAmountCont}>
                        {orderPayment(orderInfo.paymentStatus)}
                        <Text style={{fontSize:17, fontWeight:'bold', color: '#02843D'}}>(${orderInfo.orderAmount})</Text>
                    </View>
                </View>
                <OrderOptions selectedSection={selectedSection} setReservationAcceptance={setReservationAcceptance} setSummaryTableSelection={setSummaryTableSelection} setMgmtTableSelection={setMgmtTableSelection} setOrderTimingTableSelection={setOrderTimingTableSelection} />
            </View>
            <Collapsible collapsed={isCollapsed}>
                <View style={{height:2, backgroundColor:'#DBE0DD'}}></View>
                <View style={styles.orderBody}>
                    <View>
                        <Text style={[styles.accumInfoText,{fontWeight: 'bold'}]}>Order number #{orderInfo.orderNumber}</Text>
                        <Text style={styles.accumInfoText}>
                            Order Lifetime Spend: 
                            <Text style={{color: '#02843D'}}> ${orderInfo.lifetimeSpent}</Text>    
                        </Text>
                        <SpentWithinDays />
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
                    <OrderSummarySection displayedSection={selectedSection} />
                    <CustomerMgmtSection displayedSection={selectedSection} />
                    <ReservationSection displayedSection={selectedSection} />
                    <OrderTimingSection displayedSection={selectedSection} />
                </View>
            </Collapsible>
        </View>
    );
}

const OrderList = ({ orderTypes, serviceProvider, from, to }) => {
    // fetch user review:
    //  reviews for all selected filters: orderin, delivery,takeout
    //  filter by selected delivery person
    //  filter by from and to dates

    //After fetching data, map all orders, creating a <OrderItem/> for each one
    return(
        <View style={styles.orderList}>
            <OrderItem orderInfo={testOrder} />
        </View>
    );
}

export function HomeView({ navigation }) {
    // fetch user information after logging in:
    //   userId
    //   service providers that handled user's order
    const [ratingFilters, setRatingFilters] = useState([
        {
            id: 1,
            orderType: 'OrderIn',
            selected: true,
        },
        {
            id: 2,
            orderType: 'Delivery',
            selected: true,
        },
        {
            id: 3,
            orderType: 'TakeOut',
            selected: true,
        }
    ]);
    const [provider, setProvider] = useState(null);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    return(
        <ScrollView contentContainerStyle={{flexGrow:1, justifyContent: 'space-between'}}>
            <OrderNotification newOrders={8} />
            <RatingFilters selectedFilters={ratingFilters} modifyRatingFilters={setRatingFilters} />
            <ProviderSelectors changeProvider={setProvider} from={fromDate} setFrom={setFromDate} to={toDate} setTo={setToDate} />
            <OrderList orderTypes={ratingFilters} serviceProvider={provider} from={fromDate} to={toDate} />
        </ScrollView>
    )
}