import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default class ButtonBasics extends Component {

  constructor(props) {
    super(props);
    this.render=this.render.bind(this);
    this._rearm=this._rearm.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordText = this.handlePasswordText.bind(this);
    //this.addData = this.addData.bind(this);
    this.state = {username: '', password: '', isLoading: true};
  }
  _onPressButton = () => {
    alert('You tapped the button!')
  };

  //handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleUsernameChange = (name) => {
    //alert(name);
    this.setState({ "username": name});
  };

  handlePasswordText = (name) => {
    this.setState({"password": name})
  }

  resreg(username, password){
    return fetch("https://resreg.ucsc.edu:9443/api/authRest", {
          body: "{\"platform\":\"Linux x86_64\",\"appversion\":\"5.0 (X11)\",\"username\":\"" + username + "\",\"password\":\"" + password +"\"}",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            Dnt: "1",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
            "X-Requested-With": "XMLHttpRequest"
          },
          method: "POST"
        })
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false
            //dataSource: responseJson.movies,
          }, function(){
          //alert(responseJson);
          });

        })
        .catch((error) =>{
          console.error(error);
        });
  }


  _rearm() {
    let username = this.state.username;
    let password = this.state.password;
    alert('You are rearming resnet: ' + this.state.username + '\nPassword: ' + password)
    // TODO verify current wifi network
    // TODO send POST request
    this.resreg(username, password)
  }

  render() {
    const { username, password} = this.state;
    return (
        <View style={styles.container}>
          <TextInput
              name="username"
              style={{height: 40}}
              placeholder="Enter your CruzID"
              onChangeText={(text) => this.handleUsernameChange(text)}
              autoCompleteType={"username"} //android
              textContentType={"username"}
              autoCapitalize={"none"}
              value={username}
          />
          <TextInput
              name="password"
              style={{height: 40}}
              placeholder="Enter your BLUE Password"
              //onChangeText={(text) => this.setState({password})}
              onChangeText={(text) => this.handlePasswordText(text)}
              autoCompleteType={"password"} // android
              textContentType={"password"}
              autoCapitalize={"none"}
              //keyboardType={"visible-password"}
              secureTextEntry={true}
              value={this.state.password}
          />
          <View style={styles.buttonContainer}>
            <Button
                onPress={this._rearm}
                title="Rearm Resnet"
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});