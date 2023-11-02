import { Dimensions, StyleSheet, Camera } from "react-native";

// const aspectRatio = await Camera.getSupportedRatiosAsync();

export const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    cameraContainer: {
        flexGrow: 1,
    },
    camera: {
        marginTop: 'auto',
        marginBottom: 'auto',
        width: Dimensions.get('window'),
        height: Dimensions.get('window'),
        aspectRatio:  10 / 16
    },
    actionRow: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        height: Dimensions.get('screen').height * 0.10,
        width: Dimensions.get('screen').width,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute', 
        bottom: 0,
    },
    buttonLayout: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    galleryModal: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 25,
        height: Dimensions.get('screen').height * 0.80,
        width: Dimensions.get('screen').width * 0.97,
    },
    viewerModal: { 
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 25,
        height: Dimensions.get('screen').height * 0.90,
        width: Dimensions.get('screen').width * 0.97, 
    },
    viewerImage: {
        flex: 0.95,
        alignItems: 'center',
        margin: 5,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 20
    },
    instructions: {
        fontSize: 14,
        paddingLeft: 20
    },
    list: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 25,
        width: Dimensions.get('screen').width * 0.92,
        height: Dimensions.get('screen').height * 0.64,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'gray',
        
    },
    itemText: {
        fontSize: 16
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginRight: 5,
        overflow: 'hidden',
        borderRadius: 25,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButtons: {
        width: 48,
        height: 48,
    },
    galleryPreview: {
        width: 48,
        height: 48,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
    }
});