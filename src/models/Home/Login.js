import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const handleLoginPress = () => {
        // Navegar para a página Home
        navigation.navigate('Home');
    };

    const handleLoginPress1 = () => {
        // Navegar para a página Home
        navigation.navigate('Fototelacheia');
    };

    const handleImageClick = () => {
        Linking.openURL('https://www.funcap.ce.gov.br/');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./Life.jpg')}
                style={styles.logo}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={handleLoginPress}
            >
                <Text style={styles.btnText}>Iniciar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={handleLoginPress1}
            >
                <Text style={styles.btnText}>Dúvidas</Text>
            </TouchableOpacity>
                    
            <Text style={styles.btnText1}>Projeto Apoiada Pela Funcap</Text>

            <TouchableOpacity onPress={handleImageClick}>
                <Image
                    source={require('./funcap.png')}
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9bd4d3',
    },
    logo: {
        width: 400,
        height: 400,
        marginBottom: 20,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#005954',
        borderRadius: 5,
        marginVertical: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
        btnText1: {
        color: '#fff',
        fontSize: 16,
        marginTop: 60,

    },
    image: {
        width: 100,
        height: 50,
        marginTop: 10,
    },
});

export default LoginScreen;
