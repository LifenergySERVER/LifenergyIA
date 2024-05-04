import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const FotoTelaCheia = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('./03052024.jpg')}
                style={styles.image}
                resizeMode="contain"
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Define a cor de fundo para preto
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
export default FotoTelaCheia;
