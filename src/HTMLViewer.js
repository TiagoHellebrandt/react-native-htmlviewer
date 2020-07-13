import React, { Component } from 'react';
import { View, Text } from 'react-native';

import htmlparser from 'htmlparser2';
const entities = require("entities");

export default class HTMLViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            el: null,
            customRenderers: props.customRenderers || {},
            customProps: props.customProps || {},
            renderers: {
                default: require('./renderers/default'),
                img: require('./renderers/img'),
                p: require('./renderers/p'),
                b: require('./renderers/b'),
                strong: require('./renderers/strong'),
                i: require('./renderers/i'),
                em: require('./renderers/em'),
                sub: require('./renderers/sub'),
                sup: require('./renderers/sup'),
                u: require('./renderers/u'),
                br: require('./renderers/br'),
                small: require('./renderers/small')
            }
        };
    }

    componentDidMount() {
        this.build();
    }

    build = () => {
        const handler = new htmlparser.DomHandler((err, dom) => {
            if (err) {
                return console.log(err);
            }

            let el = dom.map((e, i) => this.renderComponent(e, i));
            this.setState({ el });
        });

        const parser = new htmlparser.Parser(handler);
        parser.write(this.props.html);
        parser.done();
    };

    renderComponent = (e, i, style = {}) => {
        let renderers = {
            ...this.state.renderers,
            ...this.state.customRenderers
        };

        let { customProps } = this.state;

        console.log(e.type)
        switch (e.type) {
            case 'tag':
                const Comp = (renderers[e.name] || renderers["default"]).default;

                return (
                    <Comp
                        key={i}
                        renderComponent={this.renderComponent}
                        element={e}
                        style={style}
                        {...(customProps[e.name] || customProps["default"])}
                    />
                );

            case 'text':
                return entities.decodeHTML(e.data).split(' ').map((text, j) => (
                    <View>
                        <Text key={`${i}_${j}`} style={[{ marginRight: 3, margin: 0 }, style]}>
                            {text}
                        </Text>
                    </View>
                ));
        }
    };

    render() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {this.state.el}
            </View>
        );
    }
}