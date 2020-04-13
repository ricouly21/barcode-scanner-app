import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";

import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import TopToolbar from "screens/camera/components/top-toolbar.component.js";
import BottomToolbar from "screens/camera/components/bottom-toolbar.component.js";

// import main_styles from "assets/main.styles.js";

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
    // height: winWidth, // For 1:1 ratio
    // height: winWidth + (winWidth * 0.25), // For 4:3 ratio
    // height: winWidth + (winWidth * 0.5625), // For 16:9 ratio
    height: winHeight,
    width: winWidth,
    position: "absolute",
  },
});


class CameraView extends React.Component {

  camera = null;

  state = {
    captures: [],
    recordings: [],
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    cameraType: CameraTypes.front,
    // cameraType: CameraTypes.back,
    hasCameraPermission: null,
    hasMicrophonePermission: null,
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.handleCameraPermission()
      .then((cameraPermission) => {
        this.getSupportedRatiosAsync();
        if (cameraPermission === "granted") {
          this.handleMicrophonePermission()
            .then(() => {
              this.handleMediaLibraryPermission();
            });
        }
      });
  }

  getSupportedRatiosAsync = async () => {
    try {
      if (Platform.OS === "android" && this.camera) {
        const ratios = await this.camera.getSupportedRatiosAsync();
        console.log("Supported Ratios: ", ratios);
        const sizes = await this.getAvailablePictureSizesAsync();
        return ratios
      }

    } catch(error) {
      // console.log(error);
    }
  }

  getAvailablePictureSizesAsync = async () => {
    try {
      if (this.camera) {
        const sizes = await this.camera.getAvailablePictureSizesAsync("16:9");
        console.log("Supported sizes: ", sizes);
        return sizes
      }

    } catch(error) {
      // console.log(error);
    }
  }

  handleCameraPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: (status === "granted") ? true : false,
      });
      // console.log("hasCameraPermission: ", status);
      return status;

    } catch(error) {
      // console.log(error);
    }
  }

  handleMicrophonePermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      this.setState({
        hasMicrophonePermission: (status === "granted") ? true : false,
      });
      // console.log("hasMicrophonePermission: ", status);
      return status;

    } catch(error) {
      // console.log(error);
    }
  }

  handleMediaLibraryPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({
        hasMediaLibraryPermission: (status === "granted") ? true : false,
      });
      // console.log("hasMediaLibraryPermission: ", status);
      return status;

    } catch(error) {
      // console.log(error);
    }
  }

  getAssetsAsync = async () => {
    try {
      const assets = await MediaLibrary.getAssetsAsync({
        first: 1,
        sortBy: [["creationTime", false]],
      });
      return assets;

    } catch(error) {
      // console.log(error);
    }
  }

  getTempAlbumAsync = async () => {
    try {
      const album = await MediaLibrary.getAlbumAsync("temp");
      return album;

    } catch(error) {
      // console.log(error);
    }
  }

  saveToAlbum = async (assetID) => {
    try {
      const album = await this.getTempAlbumAsync();

      if (!album) {
        let newAlbum;
        if (Platform.OS === "android") {
          newAlbum = await MediaLibrary.createAlbumAsync("temp", assetID, false);
        } else {
          newAlbum = await MediaLibrary.createAlbumAsync("temp", assetID);
        }

        // console.log(`Saved to album: ${newAlbum.id}`);
        
      } else {
        let savedToAlbum;
        if (Platform.OS === "android") {
          savedToAlbum = await MediaLibrary.addAssetsToAlbumAsync([assetID], album.id, false);
        } else {
          savedToAlbum = await MediaLibrary.addAssetsToAlbumAsync([assetID], album.id);
        }

        // console.log(`Saved to album: ${album.id}`);
      }

    } catch (error) {
      // console.log(error);
    }
  }

  createAssetAsync = async (localUri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(localUri);
      // console.log(asset);

      await this.saveToAlbum(asset.id);

      return asset;

    } catch(error) {
      // console.log(error);
    }
  }

  setFlashMode = (flashMode) => this.setState({ flashMode });

  setCameraType = (cameraType) => {
    this.setState({
      cameraType: cameraType,
    });
  }

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) {
      this.camera.stopRecording();
    }
  }

  handleShortCapture = async () => {
    if (this.state.hasCameraPermission) {
      const photoData = await this.camera.takePictureAsync();

      let captures = this.state.captures
      captures.push(photoData);

      await this.createAssetAsync(photoData.uri);

      this.setState({
        capturing: false,
        captures: captures
      });

    }
  }

  handleLongCapture = async () => {
    if (this.state.hasMicrophonePermission) {
      const videoData = await this.camera.recordAsync();
      let recordings = this.state.recordings;
      recordings.push(videoData);

      await this.createAssetAsync(videoData.uri);

      this.setState({
        capturing: false,
        recordings: recordings,
      });
    }
  }

  render() {
    const { hasCameraPermission, flashMode, cameraType, capturing } = this.state

    if (!hasCameraPermission) { return null }
    return (
      <View style={styles.container}>
        <Camera
          ref={ref => this.camera = ref}
          style={styles.preview}
          type={cameraType}
          flashMode={flashMode}
          ratio="16:9"
          useCamera2Api={true}
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
          // onPressGallery={this.getTempAlbumAsync}
          onPressGallery={() => alert("opened gallery")}
        />
      </View>
    )
  }
}


export default CameraView;