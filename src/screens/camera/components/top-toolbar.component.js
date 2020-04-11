import React from "react";
import {
  TouchableOpacity,
} from "react-native";

import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./toolbar.styles.js";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default function TopToolbar({
  flashMode = CameraFlashModes.off,
  navigateBack,
  setFlashMode,
}) {
  return (
    <Grid style={styles.topToolbar}>
      <Row>
        <Col style={styles.alignCenter}>
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons
              name="md-close"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Col>

        <Col style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() => setFlashMode((flashMode === CameraFlashModes.on) ? CameraFlashModes.off : CameraFlashModes.on)}>
            <Ionicons
              name={flashMode === CameraFlashModes.on ? "md-flash" : "md-flash-off"}
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Col>

        <Col style={styles.alignCenter}>
          <TouchableOpacity>
            <Ionicons
              name="?"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Col>

        <Col style={styles.alignCenter}>
          <TouchableOpacity>
            <Ionicons
              name="?"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Col>
      </Row>
    </Grid>
  )
}