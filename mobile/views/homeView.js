import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Button } from 'react-native';
import styles from '../styles/homeStyles';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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

    return (
        <View style={styles.providerCont}>
            <Picker
                style={styles.providerPicker}
            >
                <Picker.Item label='Java' value='java' />
                <Picker.Item label='JavaScript' value='javaScript' />
            </Picker>
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
