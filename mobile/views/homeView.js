import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Button, StyleSheet } from 'react-native';
import { styles, pickerSelectStyles } from '../styles/homeStyles';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import CheckMark from '../content/images/check_mark.svg';
import Calendar from '../content/images/calendar.svg';
import Caret from '../content/images/triangle.svg';

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

const UpDownCaret = () => {
    return (
        <View style={styles.caretCont}>
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
            <UpDownCaret/>
        </View>
    );
}

const DateSelectorItem = (props) => {

    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(`${props.title}`);
    const [show, setShow] = useState(false);
    // const [dateFirstPart, setFirstPart] = useState(date.getDate()+'/'+(date.getMonth()+1));
    // const [dateSecondPart, setSecondPart] = useState(date.getFullYear());

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
            {/* <Text style={{
                fontSize: (text === `${props.title}`? 15 : 13),
                marginLeft: (text === `${props.title}`? 10 : 0), 
                }}
            >{text}</Text> */}

            <Text style={{
                fontSize: 15,
                marginLeft: 10,
                display: (text == props.title? 'flex' : 'none')
            }}>{props.title}</Text>

            <View style={[styles.DateDisplay, {display: (text === props.title? 'none' : 'flex')}]}>
                <Text style={{
                    fontSize: 14,
                    marginLeft: 13,
                    marginLeft: 5
                }}>
                    {date.getDate()+'/'+(date.getMonth()+1)}
                </Text>
                <Text style={{
                    fontSize: 14,
                    marginLeft: 13,
                    fontWeight: 'bold',
                    marginLeft: 5
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
            <UpDownCaret/>
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

export function HomeView({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.ratingFilters}>
                <RatingFilter filterName='Pickup'/>
                <RatingFilter filterName='Delivery'/>
                <RatingFilter filterName='Order In/Ahead'/>
            </View>
            <View style={styles.providerFilters}>
                <ProviderSelector/>
                <ProviderDateSelector/>
            </View>
            <View style={{width:'100%', height: 1000}}>

            </View>
        </ScrollView>
    )
}