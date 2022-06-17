import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Button } from 'react-native';
import styles from '../styles/homeStyles';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import CheckMark from '../content/images/check_mark.svg';

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

const ProviderSelector = () => {

    const sports = [
        {
          label: 'Football',
          value: 'football',
        },
        {
          label: 'Baseball',
          value: 'baseball',
        },
        {
          label: 'Hockey',
          value: 'hockey',
        },
      ];

    return (
        <View style={styles.providerCont}>
            <RNPickerSelect
                items={sports}
                onValueChange={(value) => console.log(value)}
            />
        </View>
    );
}

const ProviderDateSelector = () => {
    
    return (
        <View style={styles.providerDateCont}>

        </View>
    );
}

export function HomeView({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Image
                    style={styles.headerLogo}
                    source={require('../content/images/platerate_logo.png')}
                />
                <Image
                    style={styles.headerAward}
                    source={require('../content/images/award.png')}
                />
            </View>
            <View style={styles.ratingFilters}>
                <RatingFilter filterName='Pickup'/>
                <RatingFilter filterName='Delivery'/>
                <RatingFilter filterName='Order In/Ahead'/>
            </View>
            <View style={styles.providerFilters}>
                <ProviderSelector/>
                <ProviderDateSelector/>
            </View>
        </ScrollView>
    )
}
