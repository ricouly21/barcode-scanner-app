import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";

import TopToolbar from "screens/camera/components/top-toolbar.component.js";
import BottomToolbar from "screens/camera/components/bottom-toolbar.component.js";

import main_styles from "assets/main.styles.js";

const { width: winWidth, height: winHeight } = Dimensions.get("window");
const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});


class CameraView extends React.Component {

  camera = null;

  state = {
    captures: [],
    recordings: [],
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
    hasMicrophonePermission: null,
  }

  constructor(props) {
    super(props);
    
  }
  
  async componentDidMount() {
    // const { cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({
    //   hasCameraPermission: (cameraPermission === "granted"),
    // })

    // const { microphonePermission } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    // this.setState({
    //   hasMicrophonePermission: (microphonePermission === "granted"),
    // })
  }

  setFlashMode = (flashMode) => this.setState({ flashMode });

  setCameraType = (cameraType) => this.setState({ cameraType });

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) {
      this.camera.stopRecording();
    }
  }

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    let captures = this.state.captures
    captures.push(photoData);

    console.log(captures);

    this.setState({
      capturing: false,
      captures: captures
    });
  }

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    let recordings = this.state.recordings;
    recordings.push(videoData);

    console.log(recordings);
    
    this.setState({
      capturing: false,
      recordings: recordings,
    });
  }
  
  render() {
    const { hasCameraPermission, flashMode, cameraType, capturing } = this.state

    // console.log("\n\n")
    // console.log(this.state.captures)

    return (
      <View style={styles.container}>
        <Camera
          ref={ref => this.camera = ref}
          style={styles.preview}
          type={cameraType}
          flashMode={flashMode}
        />

        <TopToolbar
          navigateBack={() => this.props.navigation.pop()}
          flashMode={flashMode}
          setFlashMode={(flashMode) => this.setFlashMode(flashMode)}
        />

        <BottomToolbar
          capturing={capturing}
          cameraType={cameraType}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </View>
    )
  }
}


export default CameraView;