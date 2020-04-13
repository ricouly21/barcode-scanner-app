import * as React from "react";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";

import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import HeaderButton from "components/custom-buttons/HeaderButton.js";
import ButtonNormal from "components/custom-buttons/ButtonNormal.js";

import main_styles from "assets/main.styles.js";


const styles = StyleSheet.create({
  buttonPanelContainer: {
    // backgroundColor: "pink",
    height: 100,
    borderColor: "#aaa",
    borderBottomWidth: 1.0,
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
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: () => alert("You are logged out!") },
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
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    return status;
  }

  handleMicrophonePermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    return status;
  }

  openCamera = async () => {
    this.props.navigation.navigate("CameraView")
  }

  render() {
    return (
      <View style={main_styles.container}>
        <View style={main_styles.content}>
          <View style={styles.buttonPanelContainer}>
            <Grid>
              <Row style={{ paddingVertical: 8 }}>
                <Col style={main_styles.alignCenter}>
                  <ButtonNormal title={"QR Reader"} />
                </Col>
                <Col style={main_styles.alignCenter}>
                  <ButtonNormal title={"Text Scanner"} />
                </Col>
                <Col style={main_styles.alignCenter}>
                  <ButtonNormal
                    title={"Camera"}
                    primaryAction={this.openCamera} />
                </Col>
              </Row>
            </Grid>
          </View>
        </View>
      </View>
    )
  }
}


export default HomeView;
