import React from 'react';
import { View, Text, ScrollView, Button, Image } from 'react-native';
import styles from '../styles/homeStyles';

import { SvgUri } from 'react-native-svg';

import Logo from '../content/images/platerate_logo.svg';

export function HomeView({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.header}>
                <SvgUri
                    width='10%'
                    height='100%'
                    uri='http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'
                />
                <Logo 
                    
                />
            </View>
        </ScrollView>
    )
}
