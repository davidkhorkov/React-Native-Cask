import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Vibration,
  Navigator,
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';

class BarcodeScanPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Scan Barcode',
      torchMode: 'off',
      type: '',
    };
  }

  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    
    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
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
      <View style={styles.container}>
        <NavBar style={navbar_styles}>
          <NavButton onPress={() => this.props.navigator.pop()}>
            <NavButtonText style={navbar_styles.buttonText}>
              {"Back"}
            </NavButtonText>
          </NavButton>

          <NavTitle style={navbar_styles.title}>
            {"Cask Prototype"}
          </NavTitle>
        </NavBar>

        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});

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
    color: '#rgba(255, 255, 255, 1)',
  },
});

module.exports = BarcodeScanPage;
