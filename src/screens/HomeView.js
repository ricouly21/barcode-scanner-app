import * as React from "react";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";

import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import HeaderButton from "components/custom-buttons/HeaderButton.js";
import ButtonNormal from "components/custom-buttons/ButtonNormal.js";

import main_styles from "assets/main.styles.js";


const styles = StyleSheet.create({
  buttonPanelContainer: {
    borderColor: "#aaa",
    borderBottomWidth: 1.0,
    padding: 16,
  },
  buttonPanel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})


class HomeView extends React.Component {

  constructor(props) {
    super(props);

    this.openCamera = this.openCamera.bind(this);

  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton
          title="Logout"
          primaryAction={() => (
            Alert.alert(
              "Confirm",
              "Are you sure you want to logout?",
              [
                {text: "No", style: "cancel"},
                {text: "Yes", onPress: () => alert("You are logged out!")},
              ]
            )
          )}
          />
      ),
      headerRight: () => (
        <HeaderButton
          title="Settings"
          primaryAction={() => navigation.navigate("SettingsView")}
          />
      )
    });
  }

  requestPermissions = async () => {
    await this.handleCameraPermission();
    await this.handleMicrophonePermission();
  }

  handleCameraPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
  }

  handleMicrophonePermission = async () => {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  }

  openCamera = async () => {
    await this.requestPermissions();
    this.props.navigation.navigate("CameraView");
  }

  render() {
    return (
      <View style={main_styles.container}>
        <View style={main_styles.content}>
          <View style={styles.buttonPanelContainer}>
            <View style={styles.buttonPanel}>
              <ButtonNormal title={"Button1"} />
              <View style={{ width: 8 }} />
              <ButtonNormal title={"Button2"} />
              <View style={{ width: 8 }} />
              <ButtonNormal
                title={"Scanner"}
                primaryAction={this.openCamera} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}


export default HomeView;