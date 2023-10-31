import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flexGrow: 1
    },
    camera: {
        marginTop: 'auto',
        marginBottom: 'auto',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        aspectRatio: 3 / 4,
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
        paddingTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    modal: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 25,
        position: 'absolute', 
        height: Dimensions.get('screen').height * 0.80,
        width: Dimensions.get('screen').width * 0.97,
    },
    title: {
        paddingTop: 20,
        fontSize: 36,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    list: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'gray',
        height: 500
    },
});