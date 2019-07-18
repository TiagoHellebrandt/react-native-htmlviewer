import React, { Component } from 'react';
import { View } from 'react-native';

export default class RenderP extends Component {
    render() {
        return (
            <View style={{
                flexDirection: 'row', 
                flexWrap: 'wrap',
                width: '100%',
                marginVertical: 5
            }}>
                {this.props.element.children.map(
                    (e, i) => this.props.renderComponent(e, i, {
                        ...this.props.style
                    })
                )}
            </View>
        );
    }
}