import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { AntDesign } from '@expo/vector-icons';

const SlideInput = ({ resposta, resetInputs }) => {
  const [data, setData] = useState([
    { key: '0', text: '...' },
    { key: '1', text: '...' },
    { key: '2', text: '...' },
  ]);

  const [resp, setResp] = useState([]);
  const [initialData, setInitialData] = useState([...data]);
  
  // Estado para controlar o texto do TextInput
  const [textInputs, setTextInputs] = useState([...data.map(item => item.text)]);

  const renderItem = ({ item, drag, isActive }) => {
    const onChangeText = (text) => {
      // Atualiza o estado textInputs
      setTextInputs(prevTextInputs => prevTextInputs.map((input, index) => index === parseInt(item.key) ? text : input));

      // Utiliza o estado textInputs para criar um novo estado data
      const newData = data.map((dataItem, index) => ({
        ...dataItem,
        text: textInputs[index],
      }));

      setData(newData);
      resposta(newData);
    };

    useEffect(() => {
    
      // Atualiza o estado textInputs para refletir o estado data
      setTextInputs([...data.map(item => item.text)]);
    
      // Create a copy of the current data state
      const currentData = [...data];
    
      // Reset the text property in the data state
      currentData.forEach((item, index) => {
        item.text = ``; // You can set the default value as needed
      });
    
      // Utilize o retorno da função do setData para garantir que a resposta seja chamada após a atualização do estado
      setData(currentData);
      resposta(currentData);
    }, [resetInputs]);
    
    return (
      <TouchableOpacity
        style={[
          styles.textInputContainer,
          { backgroundColor: isActive ? '#c3c3c3' : 'white' },
        ]}
        onLongPress={drag}
      >
        <TextInput
          style={styles.textInput}
          placeholder={item.text}
          onChangeText={onChangeText}
          value={textInputs[parseInt(item.key)]} // Set the value prop here
        />
        <AntDesign name='minus' size={40} color="#c3c3c3" />
      </TouchableOpacity>
    );
  };

  const onDragEnd = ({ data: newData }) => {
    setResp((prevResp) => [prevResp[0], newData]);
    setData(newData);
    resposta(newData);
  };

  return (
    <View style={{ width: '80%', marginVertical: 10 }}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={onDragEnd}
        style={styles.flatListContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 0,
    position: 'relative',
    width: '100%',
  },
  textInputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    borderColor: '#c3c3c3',
    borderWidth: 1,
    marginBottom: 4,
  },
  textInput: {
    height: 40,
    width: '85%',
  },
});

export default SlideInput;
