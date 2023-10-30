import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
// import PreviewList from './PreviewList';
// import ImageGrid from './ImageGrid'
import { Image, Text, View, TouchableOpacity, StatusBar, Animated, VirtualizedList, Alert, useWindowDimensions, Component, Button } from 'react-native';
//import Modal from 'react-native-modal'

import { styles } from './src/styles';

const CameraApp = () => {
    //instance variables
    const camRef = useRef(Camera);
    const emptyData = [];

    //state variables
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    //run after each redraw
    useEffect(() => {
      if (hasCameraPermission === null) {
          (async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setCameraPermission(status === 'granted');
          })();
      }
  });

  // if do not have permission to access camera show notice
  if (hasCameraPermission === null || hasCameraPermission === false) {
    var notice = <View><Text>No Access To Cameara</Text></View>;
    return notice;
  }

    var cameraUi =

    <>
      <View style={styles.container}>
          
          <View style={styles.cameraContainer}>
              <Camera
                  ref={ref => {camRef.current = ref; }}
                  style={styles.camera}
              />
          </View>
      </View>

      <View style={styles.actionRow}>
        <View style={styles.buttonLayout}>
          <Button title='Flip' onPress={() => console.log("Flip Pressed!")}/>
          <Button title='Snap' onPress={() => console.log("Snap Pressed!")}/>
          <Button title='Gallery' onPress={() => console.log("Gallery Pressed!")}/>
        </View>
            
      </View>
    </>
        

    return (cameraUi);
}

export default CameraApp;