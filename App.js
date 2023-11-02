import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Image, Text, View, TouchableOpacity, VirtualizedList, Button, Modal, Dimensions, Alert } from 'react-native';
import Toast from 'react-native-root-toast'

import { styles } from './src/styles';


const CameraApp = () => {
    //instance variables
    const camRef = useRef(Camera);
    const emptyData = [];
    const getItemCount = (data) => list.length;
    const getItem = (data, index) => (list[index]);
    const toast = {
        backgroundColor: 'white',
        textColor: 'black',
        duration: Toast.durations.LONG,
        opacity: 1,
        position: Toast.positions.CENTER,
    }

    //state variables
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [galleryVisible, setGalleryVisible] = useState(false);
    const [viewerVisible, setViewerVisible] = useState(false);
    const [viewPhoto, setViewPhoto] = useState(null);
    const [list, setList] = useState(emptyData);
    const [imgIndex, setImgIndex] = useState(-1);
    const [mediaPermissions, setMediaPermissions] = MediaLibrary.usePermissions();

    //components
    const Item = ({ item, onPress }) => (
        <TouchableOpacity style={[styles.item]} onPress={onPress}>
            <View style={styles.itemContainer}>
                <Image style={styles.imageContainer} source={{ uri: item.uri }} />
                <Text style={[styles.itemText]}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    //modal object for gallary and other functions.
    const GalleryModal = ({ visible }) => (
        <Modal animationType={'slide'} visible={visible} transparent={true} style={{ alignItems: 'center' }}>
            <View style={styles.centered}>
                <View style={styles.galleryModal}>
                    <Text style={styles.title}>Gallery</Text>
                    <Text style={styles.instructions}>Tap on a photo to view it in the Image Viewer</Text>
                    <View style={{borderRadius: 25, overflow: 'hidden'}}>
                        <VirtualizedList
                            style={styles.list}
                            data={emptyData}
                            initialNumToRender={4}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                        <Button title='Close' style={styles.button} textStyle={styles.buttonText} onPress={() => { setGalleryVisible(!visible) }} />
                    </View>
                </View>
            </View>
        </Modal>
    );

    const renderItem = ({ item, index }) => {
        return (<Item
            item={item}
            onPress={() => { setImgIndex(index), showImage(item) }}
        />);
    }

    //function for viewing selected photo
    const showImage = (selectedImage) => {
        setGalleryVisible(false);
        setViewPhoto(selectedImage);
        setViewerVisible(true);
    }

    //modal object for viewing selected image
    const ViewerModal = ({ visible, image }) => (
        <Modal animationType={'slide'} visible={visible} transparent={true} style={{ alignItems: 'center' }}>
            <View style={styles.centered}>
                <View style={styles.viewerModal}>
                    <Text style={styles.title}>Image Preview</Text>
                    <Text style={styles.instructions}>Use the controls below</Text>
                    <Image source={{ uri: image == null ? null : image.uri }} style={styles.viewerImage} />
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{image == null ? "" : image.name}</Text>
                    <View style={styles.buttonLayout}>
                        <Button title='Share' style={styles.button} textStyle={styles.buttonText} onPress={shareImage} />
                        <Button title='Save' style={styles.button} textStyle={styles.buttonText} onPress={saveImage} />
                        <Button title='Delete' style={styles.button} textStyle={styles.buttonText} onPress={deleteImage} />
                        <Button title='Close' style={styles.button} textStyle={styles.buttonText} onPress={() => setViewerVisible(!visible)} />
                    </View>
                </View>
            </View>
        </Modal>
    );

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
        var notice = <View style={{ justifyContent: 'center', fontSize: 36, }}><Text>No Access To Cameara</Text></View>;
        return notice;
    }

    //function for flipping camera
    const flipCamera = () => setType(
        type === Camera.Constants.Type.back ?
            Camera.Constants.Type.front : Camera.Constants.Type.back
    )

    //function for taking picture and adding it to list
    const snap = async () => {
        if (camRef.current) {
            const date = new Date();
            const dateString = date.toLocaleDateString('en-IT', {hour12: false}).replaceAll('/', '');
            const timeString =  date.toLocaleTimeString('en-IT', {hour12: false}).replaceAll(':', '');

            var imgTimeStamp = dateString + '-' + timeString + "." + date.getMilliseconds();

            const options = { quality: 1, base64: false, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }
            let photo = await camRef.current.takePictureAsync(options);
            photo.name = 'IMG_' + imgTimeStamp;
            const newList = [photo].concat(list)

            setList(newList);
            console.log('Image Taken: ' + JSON.stringify(newList.at(0).name))
        };
    }

    // function for sharing selected image
    const shareImage = async () => {
        try {
            await Sharing.shareAsync(list[imgIndex].uri);
            setViewerVisible(!viewerVisible)
            Toast.show(list[imgIndex].name + ' shared successfully', toast);
        }
        catch (error) {
            console.error('Error sharing image: ' + error)
        }
    }

    // function for saving selected image to device
    const saveImage = async () => {
        if (!mediaPermissions.granted)
            setMediaPermissions();
        else {
            try {
                setViewerVisible(!viewerVisible)
                await MediaLibrary.saveToLibraryAsync(list[imgIndex].uri);
                Toast.show(list[imgIndex].name + ' saved to device', toast);
            }
            catch (error) {
                console.error('Error saving image: ' + error);
            }
        }
    }

    // function for deleting selected image
    const deleteImage = () => {
        Alert.alert('Are you sure you want to delete this photo?', 'This action is irreversable.', [
            {
                text: 'Yes',
                onPress: () => {
                    setViewerVisible(!viewerVisible)
                    
                    const newList = [];
                    list.map((image, index) => {
                        if (imgIndex != index) 
                            newList.push(image)
                        else 
                        Toast.show(image.name + ' deleted', toast);
                    })
                    setList([...newList]);
                },
            },
            {
                text: 'No',
            }
        ])
    }

    var cameraUi =
        <>
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => { camRef.current = ref; }}
                        style={styles.camera}
                        type={type}
                    />
                </View>
            </View>
            <View style={styles.actionRow}>
                <View style={styles.buttonLayout}>
                    <TouchableOpacity onPress={flipCamera}>
                        <Image style={styles.controlButtons} source={require('./assets/flip.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={snap}>
                        <Image style={styles.controlButtons} source={require('./assets/snap.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setGalleryVisible(!galleryVisible)}>
                        <Image style={styles.galleryPreview} source={list.length == 0 ? require('./assets/gallery.png') : list[0]}/>
                    </TouchableOpacity>
                </View>
                <GalleryModal visible={galleryVisible} />
                <ViewerModal visible={viewerVisible} image={viewPhoto} />
            </View>
        </>
    return (cameraUi);
}

export default CameraApp;