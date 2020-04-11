import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./toolbar.styles.js";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;


export default function BottomToolbar({
  capturing = false,
  cameraType = CameraTypes.back,
  setCameraType,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture,
}) {
  return (
    <Grid style={styles.bottomToolbar}>
      <Row>
        <Col style={styles.alignCenter}>
          <TouchableOpacity>
            <Ionicons
              name="md-images"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Col>

        <Col style={styles.alignCenter} size={2}>
          <TouchableWithoutFeedback
            onPressIn={onCaptureIn}
            onPressOut={onCaptureOut}
            onLongPress={onLongCapture}
            onPress={onShortCapture}>
            <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
              {capturing && <View style={styles.captureBtnInternal} />}
            </View>
          </TouchableWithoutFeedback>
        </Col>

        <Col style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() => setCameraType(
              (cameraType === CameraTypes.back) ? CameraTypes.front : CameraTypes.back
            )}>
            <Ionicons
              name="md-reverse-camera"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Col>
      </Row>
    </Grid>
  )
}