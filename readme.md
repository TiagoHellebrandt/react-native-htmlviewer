# react-native-htmlviewer

  

Converta string HTML em componentes nativos para React Native.

  

## Uso básico

    import React, { Component } from 'react';
    import HTMLViewer from 'react-native-htmlviewer';
    
    export default class MyScreen extends Component {
	    render() {
		    return (
			    <HTMLViewer 
				    html={"<p>Olá, mundo!</p>"}
			    />
		    );
	    }
    }

## Personalização simples

    import React, { Component } from 'react';
    import HTMLViewer from 'react-native-htmlviewer';
    
    export default class MyScreen extends Component {
	    render() {
		    return (
			    <HTMLViewer 
				    html={"<p>Olá, mundo!</p>"}
				    customProps={{
					    img: {
						    maxWidth: Dimensions.get('window').width - 40
					    }
				    }}
			    />
		    );
	    }
    }