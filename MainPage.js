'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Navigator,
} from 'react-native';

import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Button from 'react-native-button';

class MainPage extends Component {

  state = {
    latitude: '0.0',
    longitude: '0.0',
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(      
      (position) => {
        var latitude = position.coords.latitude;//JSON.stringify(position.coords);
        var longitude = position.coords.longitude;
        this.setState({latitude});
        this.setState({longitude});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
        var latitude = position.coords.latitude;//JSON.stringify(position.coords);
        var longitude = position.coords.longitude;
        this.setState({latitude});
        this.setState({longitude});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _handleBarcodeScan() {

    console.log('Pressed!');
    this.props.navigator.push({
      id: 'BarcodeScanPage',
      name: 'BarcodeScan',
    });
  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}          
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View>
        <NavBar style={navbar_styles}>
          <NavTitle style={navbar_styles.title}>
            {"Cask Prototype"}
          </NavTitle>
        </NavBar>
        <Text style={styles.instructions}>
          Current Location : {this.state.latitude}, {this.state.longitude}
        </Text>
        <Button
          containerStyle={styles.buttonConatiner}
          style={styles.buttonText}
          onPress={() => this._handleBarcodeScan()}>
          Barcode Scan
        </Button>
      </View>
    );
  }
}

const navbar_styles = StyleSheet.create({  
  statusBar: {
    backgroundColor: '#019bed',
  },
  navBar: {
    backgroundColor: '#019bed',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color:'#fff',
    margin: 10,
  },
  buttonText: {
    color: '#rgba(255, 255, 255, 0.45)',
  },
});

const styles = StyleSheet.create({  

  buttonConatiner: {
    padding:10, 
    marginTop: 30, 
    marginLeft:80, 
    marginRight:80, 
    height:40, 
    overflow:'hidden', 
    borderRadius:8, 
    backgroundColor: '#019bed'
  },
  buttonText: {
    fontSize: 15, 
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 30,
  },

});

module.exports = MainPage;
