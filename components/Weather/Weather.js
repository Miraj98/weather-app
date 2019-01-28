import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import  { MaterialCommunityIcons } from '@expo/vector-icons'
import { weatherConditions } from '../../utils/WeatherConditions'
import { Constants } from 'expo'

export default class Weather extends React.Component {
    render() {
        return (
            <View style={[styles.weatherContainer, { backgroundColor: weatherConditions[this.props.weather].color }]}>
              <View style={styles.headerContainer}>
                <MaterialCommunityIcons size={48} name={weatherConditions[this.props.weather].icon} color={'#fff'} />
                <Text style={styles.tempText}>{this.props.temperature} ˚C</Text>
                <Text style={styles.tempText}>{this.props.location}</Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weatherConditions[this.props.weather].title}</Text>
                <Text style={styles.subtitle}>{weatherConditions[this.props.weather].subtitle}</Text>
              </View>
            </View>
          )
    }
}

const styles = StyleSheet.create({
    weatherContainer: {
      flex: 1,
      paddingTop: Constants.statusBarHeight + 12
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tempText: {
      fontSize: 48,
      color: '#fff'
    },
    bodyContainer: {
    //   flex: 2,
    //   alignItems: 'flex-start',
    //   justifyContent: 'flex-end',
    //   paddingLeft: 25,
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
    },
    title: {
      fontSize: 48,
      color: '#fff'
    },
    subtitle: {
      fontSize: 24,
      color: '#fff'
    }
  })

