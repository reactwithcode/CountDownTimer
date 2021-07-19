/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react';
import CountDownTimer from './screens/CountDownTimer';
import CountDownTimerNext from './screens/CountDownTimerNext';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
  // store = createStore()

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Count Down Timer" component={CountDownTimer} />
          <Stack.Screen
            name="Count Down Timer Next"
            component={CountDownTimerNext}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
