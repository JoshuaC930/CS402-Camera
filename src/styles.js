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
        backgroundColor: 'rgba(255, 255, 255, 0.90)',
        height: Dimensions.get('screen').height * 0.15,
        width: Dimensions.get('screen').width,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute', 
        bottom: 0,
    },
    buttonLayout: {
        paddingTop: 45,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});