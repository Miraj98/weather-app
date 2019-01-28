import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Weather from  './components/Weather/Weather'
import { Permissions, Location, Constants } from 'expo'
import { API_KEY } from './utils/WeatherAPIKey'


export default class App extends React.Component {

    state = {
        isLoading: true,
        location: null,
        temperature: 0,
        weatherCondition: null,
        error: null
    }

    componentDidMount() {
        this.getLocation()
    }

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            Location.getCurrentPositionAsync({}).then(location => {
                this.setState(() => ({ location }))
                let fetchUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=${API_KEY}&units=metric`
                console.log(fetchUrl)
                fetch(fetchUrl).then(res => res.json()).then(json => {
                    console.log(json)
                    this.setState(() => ({
                        temperature: json.main.temp,
                        weatherCondition: json.weather[0].main,
                        location: json.name,
                        isLoading: false
                      }), () => console.log(this.state))
                    });
            })
        } else {
            this.setState(() => ({ error: 'Permission denied!' }))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ? <View style={styles.loadingContainer}><Text style={styles.loadingText}>Fetching weather data...</Text></View> : <Weather weather={this.state.weatherCondition} temperature={this.state.temperature} location={this.state.location}/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
})
