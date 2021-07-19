/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  HStack,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import {ArrowBackIcon, NativeBaseProvider, Fab} from 'native-base';

import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from 'react-native-wheel-picker-android';

import {Picker} from '@react-native-picker/picker';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: -100,
    width: 200,
  },
});

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60); // remaining of floor will be used on seconds
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)};
};

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

class CountDownTimerNext extends Component {
  state = {
    remainingSeconds: this.props.route.params.remainingSeconds,
    isRunning: false,
    selectedMinutes: 0,
    selectedSeconds: 0,
  };

  internal = null;

  // if there is change
  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      this.stop();
    }
  }

  // once
  componentDidMount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start = () => {
    this.setState(state => ({
      remainingSeconds: this.props.route.params.remainingSeconds,
      isRunning: true,
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1,
      }));
    }, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 5, //temporary
      isRunning: false,
    });
  };

  onMinutesSelected = selectedMinutes => {
    this.setState({selectedMinutes});
    if (!this.state.isRunning && this.state.remainingSeconds !== 5) {
      this.start();
    }
  };

  onSecondsSelected = selectedSeconds => {
    this.setState({selectedSeconds});
  };

  renderPickers = () => {
    const {selectedMinutes} = this.props.route.params;
    const {selectedSeconds} = this.props.route.params;

    // console.log('min', selectedMinutes);

    return (
      <>
        <View style={styles.pickerContainer}>
          <WheelPicker
            selectedItem={selectedMinutes}
            selectedItemTextColor={'white'}
            selectedItemTextSize={20}
            hideIndicator
            data={AVAILABLE_MINUTES.map((value, index) => {
              return value;
            })}
            onItemSelected={this.onMinutesSelected}
          />
          <Text style={styles.pickerItem}>minutes</Text>
          <WheelPicker
            selectedItem={selectedSeconds}
            selectedItemTextColor={'white'}
            selectedItemTextSize={20}
            hideIndicator
            data={AVAILABLE_SECONDS.map((value, index) => {
              return value;
            })}
            onItemSelected={this.onSecondsSelected}
          />
          <Text style={styles.pickerItem}>seconds</Text>
        </View>
      </>
    );
  };

  render() {
    const {minutes, seconds} = getRemaining(this.state.remainingSeconds);

    const {navigate} = this.props.navigation;

    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {this.state.isRunning ? (
            <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
          ) : (
            this.renderPickers()
          )}

          {this.state.isRunning ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonStop]}
              onPress={this.stop}>
              <Text style={[styles.buttonText, styles.buttonTextStop]}>
                Stop
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={this.start}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}
        </View>

        <Fab
          bg="transparent"
          position="absolute"
          bottom={10}
          right={19}
          icon={<ArrowBackIcon name="next" type="AntDesign" color="#89AAFF" />}
          onPress={() => navigate('Count Down Timer')}
          // label={<Text fontSize="sm">Click</Text>}
        />
      </NativeBaseProvider>
    );
  }
}

export default CountDownTimerNext;
