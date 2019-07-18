import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';

export default class RenderImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uri: null,
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        let { 
            src, 
            width: originalWidth, 
            height: originalHeight, 
            style 
        } = this.props.element.attribs;

        let { width, height } = this.limitSize(
            this.getSize(
                originalWidth, 
                originalHeight, 
                style,
                src
            )
        );

        this.setState({ uri: src, width, height });
    }

    getSize = (width, height, style, uri) => {
        if (width && height) {
            return { 
                width: parseInt(width), 
                height: parseInt(height) 
            };
        } else if (style) {
            // TODO
        }

        Image.getSize(
            uri, 
            (width, height) => {
                this.setState(
                    this.limitSize({ width, height })
                );
            }
        );

        return { width: 100, height: 100 };
    };

    limitSize = ({ width, height }) => {
        let { maxWidth, maxHeight } = this.props;
        
        maxWidth = maxWidth || Dimensions.get('window').width;

        if (width > maxWidth && maxWidth > 0) {
            height = (maxWidth * height) / width;
            width = maxWidth;
        }

        if (height > maxHeight) {
            width = (maxHeight * width) / height;
            height = maxHeight;
        }

        return { width, height };
    };

    render() {
        let { uri, width, height } = this.state;

        return (
            <Image 
                source={{ uri }}
                style={{ width, height }}
                resizeMode="contain"
            />
        );
    }
}