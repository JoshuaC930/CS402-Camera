import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
// import PreviewList from './PreviewList';
// import ImageGrid from './ImageGrid'
import { Image, Text, View, TouchableOpacity, StatusBar, Animated, VirtualizedList, Alert, useWindowDimensions, Component, Button, Modal } from 'react-native';
//import Modal from 'react-native-modal'

import { styles } from './src/styles';

const renderItem = ({ item }) => {
  var backgroundColor, color;

  backgroundColor = item.selected ? '#349eeb' : 'white';
  color = item.selected ? 'white' : 'black';

  return (<Item
      item={item}
      onPress={() => { toggleList(item.key) }}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
  />);

  // called when a list item is touched
  function toggleList(key) {
      const newList = list.map((item) => {
          if (item.key == key) item.selected = item.selected ? false : true;
          return item;
      });

      setList([...newList]);
  }
}

const CameraApp = () => {
    //instance variables
    const camRef = useRef(Camera);
    const emptyData = [];
    const getItemCount = (data) => list.length;
    const getItem = (data, index) => (list[index]);

    //state variables
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState(emptyData);

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

  //function for flipping camera
  const flipCamera = () => setType(
    type === Camera.Constants.Type.back ?
        Camera.Constants.Type.front : Camera.Constants.Type.back
  )

  //modal object for gallary and other functions.
  const GalleryModal = ({visible}) => {
    return (
      <Modal visible={visible} transparent={true} style={{alignItems: 'center'}}>
        <View style={styles.modal}>
          <Text style={styles.title}>Gallery</Text>
            <View>
              <VirtualizedList
                style={styles.list}
                data={emptyData}
                initialNumToRender={4}
                renderItem={renderItem}
                keyExtractor={(item,index) => index}
                getItemCount={getItemCount}
                getItem={getItem}
              />
            </View>
            <View style={styles.buttonLayout}>
              <Button title='Share' style={styles.button} textStyle={styles.buttonText} onPress={() => console.log('Share pressed!')}/>
              <Button title='Save' style={styles.button} textStyle={styles.buttonText} onPress={() => console.log('Save pressed!')}/>
              <Button title='Delete' style={styles.button} textStyle={styles.buttonText} onPress={() => console.log('Delete pressed!')}/>
              <Button title='Close' style={styles.button} textStyle={styles.buttonText} onPress={() => setVisible(!visible)}/>
            </View>
        </View>
      </Modal>
    );
  }

  //function for taking picture and adding it to list
  const snap = async () => {
    
    if (camRef.current) {
      const options = { quality: 1, base64: true }
      let photo = await camRef.current.takePictureAsync(options);
      const newList = [photo.uri].concat(list)
      photo.name = 'IMG' + list.length;
      setList(newList);
      console.log('Snap Pressed! Photo Added');
    };
  }

  //TODO: Write function for sharing pictures
  //TODO: Write function for saving pictures
  //TODO: Write fuction for deleting pictures

    var cameraUi =
    <>
      <View style={styles.container}>
          <View style={styles.cameraContainer}>
              <Camera
                  ref={ref => {camRef.current = ref; }}
                  style={styles.camera}
                  type={type}
              />
          </View>
      </View>

      <View style={styles.actionRow}>
        <View style={styles.buttonLayout}>
          <TouchableOpacity onPress={flipCamera}><Text>Flip</Text></TouchableOpacity>
          <TouchableOpacity onPress={snap}><Text>Snap</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(!visible)}><Text>Gallery</Text></TouchableOpacity>
        </View>

        <GalleryModal
          visible={visible}
        />
      </View>
    </>
    return (cameraUi);
}

export default CameraApp;