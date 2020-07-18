import React, { Component } from 'react';
import { View } from 'react-native';

export default class RenderBr extends Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                height: '10%',
                padding: 0
            }}></View>
        );
    }
}