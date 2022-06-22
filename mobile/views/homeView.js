import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles, pickerSelectStyles } from '../styles/homeStyles';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Collapsible from 'react-native-collapsible';
import { Input } from 'react-native-elements';

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
    const [showTime, setShowTime] = useState(false);
    const [date, setDate] = useState(new Date());

    const updateDate = (event, selectedDate) => {
        // const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        // setDate(currentDate);
        console.log(selectedDate);
        setShowDate(Platform.OS === 'ios');
        setShowTime(!showTime);
    }

    return (
        <View style={styles.reservationDateSelector}>
            <Text style={{fontSize:18, marginBottom: 6}}>Reservation Date/Time</Text>
            <TouchableOpacity style={styles.reservationDateTimeCont} onPress={() => setShowDate(!showDate)}>


                {showDate && (
                    <DateTimePicker
                        testID='ReservationDateTime'
                        value={date}
                        mode={'show'}
                        display='default'
                        onChange={updateDate}
                    />
                )}

            </TouchableOpacity>
        </View>
    );
}

const ReservationDateTimeSelector = () => {
    const [startingDateTimeValue, setStartingDateTimeValue] = useState(null);
    const [toDateValue, setToDateValue] = useState(null);
    const [toTimeValue, setToTimeValue] = useState(null);
    const [isStartingDateTimePickerVisible, setIsStartingDateTimePickerVisible] = useState(false);
    const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);
    const [isToTimePickerVisible] = useState(false);
    const [dateOrTimeValue, setDateOrTimeValue] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);

    const saveStartingDateTime = (value) => {
        console.log('saveStartingDateTime - value: ', value);
        setStartingDateTimeValue(value);
    }

    const saveEndingDate = (value) => {
        console.log("saveEndingDate - value:", value);
        setToDateValue(value);
    }

    const saveEndingTime = (value) => {
        console.log("saveEndingTime - value:", value);
        setToTimeValue(value);
    }

    const fRenderDateTimePicker = (dateTimePickerVisible, visibilityVariableName, dateTimePickerMode, defaultValue, saveValueFunctionName) => {
        return (
            <View>
                {Platform.OS === 'ios' && dateTimePickerVisible &&
                    (<DateTimePicker
                        mode={dateTimePickerMode}
                        value={defaultValue}

                        onChange={ (event, value) => {
                            this.setState({
                                dateOrTimeValue: value,

                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set") {
                                saveValueFunctionName(value);
                            }

                        }}
                    />)
                }
                {Platform.OS === 'android' && dateTimePickerVisible && this.state.datePickerVisible &&
                    (<DateTimePicker
                        mode={"date"}
                        display='default'
                        value={defaultValue}

                        onChange={ (event, value) => {
                            this.setState({
                                dateOrTimeValue: value,
                                datePickerVisible: false,
                            });

                            if (event.type === "set" && dateTimePickerMode === "datetime") {
                                this.setState({
                                    timePickerVisible: true,
                                });
                            }

                            else if (event.type === "set" && dateTimePickerMode === "date") {
                                this.setState({ 
                                    [visibilityVariableName]: Platform.OS === 'ios' ? true : false, 
                                }); 

                                saveValueFunctionName(value);
                            }
                        }}
                    />)
                }
                {Platform.OS === 'android' && dateTimePickerVisible && this.state.timePickerVisible &&
                    (<DateTimePicker
                        mode={"time"}
                        display='spinner' 
                        is24Hour={false} 
                        value={defaultValue}

                        onChange={(event, value) => {
                            let newDateTime = value;

                            if (event.type === "set" && dateTimePickerMode === "datetime") {

                                newDateTime = this.state.dateOrTimeValue;

                                const newHours = value.getHours();
                                const newMinutes = value.getMinutes();

                                newDateTime.setHours(newHours);
                                newDateTime.setMinutes(newMinutes);
                                newDateTime.setSeconds(0);
                            }

                            this.setState({
                                dateOrTimeValue: newDateTime,
                                datePickerVisible: false,
                                timePickerVisible: false,

                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                            });

                            if (event.type === "set") {
                                saveValueFunctionName(newDateTime);
                                // console.log("visibilityVariableName:", [visibilityVariableName], " - newDateTime:", newDateTime); 
                            } 
                        }}

                    />)
                } 
            </View>
        );
    };

    const fRenderDatePicker = (mode, visibilityVariableName) => {
        switch (mode) {
            case "datetime":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
            case "date":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
            case "time":
                return this.setState({ [visibilityVariableName]: true, datePickerVisible: false, timePickerVisible: true });
        }
    }

    return (
        <View>
            <TouchableOpacity
                // THE FOLLOWING ARGUMENT VALUE IS THE (1st place OF 2) PLACES, WHICH DIFFERENTIATE BETWEEN THE DIFFERENT MODES (DATETIME, DATE & TIME)
                onPress={() => {
                    // this.setState({ isStartingDateTimePickerVisible: true, });
                    this.fRenderDatePicker("datetime", "isStartingDateTimePickerVisible");
                }}>
                <Input
                    label='Starting Date & Time'
                    placeholder={"01/01/2019 - 09:00 AM"}
                    editable={false}
                    value={this.fFormatDateTime(this.state.StartingDateTimeValue)}
                />
            </TouchableOpacity>

            {// This function would render the necessary DateTimePicker only if the relevant state variable is set (above)
            this.fRenderDateTimePicker(
                this.state.isStartingDateTimePickerVisible,
                "isStartingDateTimePickerVisible",

                // THE FOLLOWING ARGUMENT VALUE IS THE (2nd place OF 2) PLACES, WHICH DIFFERENTIATE BETWEEN THE DIFFERENT MODES (DATETIME, DATE & TIME)
                "datetime",

                defaultShiftStartDateTime,

                // This is my function, which saves the selected value to my app's state. 
                // YOU NEED TO REPLACE IT WITH SOMETHING RELEVANT TO YOUR APP. 
                this.saveStartingDateTime,
            )}


            <TouchableOpacity
                onPress={() => {
                    // this.setState({ isToDatePickerVisible: true, });
                    this.fRenderDatePicker("date", "isToDatePickerVisible");
                }}>
                <Input
                    label='Ending Date'
                    placeholder={"01/01/2019"}
                    editable={false}
                    value={this.fFormatDateTime(this.state.ToDateValue, "date")}
                />
            </TouchableOpacity>
            {this.fRenderDateTimePicker(
                this.state.isToDatePickerVisible,
                "isToDatePickerVisible",
                "date",
                defaultShiftEndDateTime,

                // This is my function, which saves the selected value to my app's state. 
                // YOU NEED TO REPLACE IT WITH SOMETHING RELEVANT TO YOUR APP. 
                this.saveEndingDate,
            )}

            <TouchableOpacity
                onPress={() => {
                    // this.setState({ isToTimePickerVisible: true, });
                    this.fRenderDatePicker("time", "isToTimePickerVisible");
                }}>
                <Input
                    label='Ending Time'
                    placeholder={"09:00 AM"}
                    editable={false}
                    value={this.fFormatDateTime(this.state.ToTimeValue, "time")}
                />
            </TouchableOpacity>
            {this.fRenderDateTimePicker(
                this.state.isToTimePickerVisible,
                "isToTimePickerVisible",
                "time",
                defaultShiftEndDateTime,

                // This is my function, which saves the selected value to my app's state. 
                // YOU NEED TO REPLACE IT WITH SOMETHING RELEVANT TO YOUR APP. 
                this.saveEndingTime,
            )}
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
                            <Text style={{color: '#02843D', fontSize:11}}>{orderPayment(props.paymentStatus)}</Text>
                        </View>
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
                        <View style={styles.reservationTimeCont}>
                            <ReservationDateTimeSelector/>
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