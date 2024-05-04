import React, { useState, useEffect } from "react";
import DraggableFlatList from 'react-native-draggable-flatlist';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Swiper from "react-native-swiper/src";
import sortearFracomportamento from "../../services/Sort";
import { AntDesign } from "@expo/vector-icons";
import SlideInput from "../../components/SlideInput";

const Home = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState([[],[],[]]);
  const [pergunta, setPergunta] = useState("");
  const [pergescolhida, setPergescolhida] = useState("");
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [resetInputs, setResetInputs] = useState(false);
  const [justificativa, setJustificativa] = useState('');

  const API_KEY = "AIzaSyDtZ7cWyYF4foBnY0fXDRFFcAi4ZtM67xI";
  const MODEL_NAME = "gemini-pro";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const run = async (data) => {
    const parts = [{ text: data }];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        safetySettings,
      });

      return result.response.text(); // Return the generated text
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  };

  const handleInputChange = (text) => {
    setResposta(text);
  };

  const callHandleButtonPress = async () => {
    const text1 = `Responda a pessoa de forma que seja apoiando, ou concordando com pensamentos 
      positivo, como se fosse o avatar da pessoa e vendo também as mensagens antigas e analisando 
      respostas antigas. pergunta feita: ${pergescolhida} E aqui estão suas respostas para ser analisada e respondida 
      de maneira curta:1º ${data[0].text || 'não informado'}, 2º ${data[1].text || 'não informado'}, 3º ${data[2].text || 'não informado'}, e essas são as justificativas das escolhas ${inputs},  ${inputs1},  ${inputs2}
      mas faça a resposta focada nas ultima posição que as respostas que ficaram. Não fale como se conhecesse a pessoa e soubesse como ela é, e nao crie enunciados com asteristico para nao focar artificial.`;
    console.log(text)
    setLoading(true);

     const text = `pergunta feita: ${pergescolhida} E aqui estão suas respostas para ser analisada e respondida 
      de maneira curta:1º ${data[0].text || 'não informado'}, 2º ${data[1].text || 'não informado'}, 3º ${data[2].text || 'não informado'}, e essas são as justificativas das escolhas ${inputs},  ${inputs1},  ${inputs2}
      . Não fale como se conhecesse a pessoa e soubesse como ela é, e nao crie enunciados com asteristico para nao focar artificial. quero uma resposta natural
    `;
    
    try {
      const response = await run(text);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult("Erro ao gerar resposta. Verifique a sua conexão com a internet.");
    } finally {
      setLoading(false);
    }
  };

  const callHandleButtonPress1 = async (text) => {

    setLoading(true);

    try {
      const response = await run(text);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult("Erro ao gerar resposta. Verifique a sua conexão com a internet.");
    } finally {
      setLoading(false);
    }
  };
  
  const callRefresh = async () => {
    const perguntaSorteada = sortearFracomportamento(pergunta);
    const respostaGerada = await run(`recrie somente a pergunta  ${perguntaSorteada}`);
    setInputs("");
    setInputs1("");
    setInputs2("");
    setData([
    { key: '1', text: '', placeholder: 'Digite uma escolha' },
    { key: '2', text: '', placeholder: 'Digite uma escolha' },
    { key: '3', text: '', placeholder: 'Digite uma escolha' },
  ]);
    setPergescolhida(`${respostaGerada} Hierarquize e Justifique!`);
    setResult("");
    setResposta([[],[],[]]);
    setSwiperIndex((prevIndex) => (prevIndex + 1) % perguntaSorteada.length);
    setResetInputs((prev) => !prev); // Alternar o estado para resetar os inputs
  };

useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("https://mongodb-dibrw2qir-lifenergyservers-projects.vercel.app/api/Server");
        const data = await response.json();
        setPergunta(data)
        console.log(data)

        const perguntaSorteada = sortearFracomportamento(data);
        const respostaGerada = await run(`recrie somente a pergunta  ${perguntaSorteada}`);
        
        setPergescolhida(`${respostaGerada} Hierarquize e Justifique`);
        setResult("");
        setResposta([[],[],[]]);
        setSwiperIndex((prevIndex) => (prevIndex + 1) % perguntaSorteada.length);
        setResetInputs((prev) => !prev); // Alternar o estado para resetar os inputs
    };

    fetchData();
}, []);


useEffect(() => {

  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch("https://mongodb-dibrw2qir-lifenergyservers-projects.vercel.app/api/Server");
      const data = await response.json();
      setPergunta(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchDataFromDatabase();
  callHandleButtonPress1(
    "1º Não quero que mostre palavras no inicio, só sua resposta, 2º Responda como um humano do Sistema Lifenergy, Repita essa frase sem mudar... Oi sou a inteligencia artifícial da Lifenergy, responda a pergunta para podermos inícia a sua jornada",
    setLoading,
    setResult
  );
}, []);

  
  
const [inputs, setInputs] = useState([]);
const [inputs1, setInputs1] = useState([]);
const [inputs2, setInputs2] = useState([]);


  const [data, setData] = useState([
    { key: '1', text: '', placeholder: 'Digite uma escolha' },
    { key: '2', text: '', placeholder: 'Digite uma escolha' },
    { key: '3', text: '', placeholder: 'Digite uma escolha' },
  ]);

const onChangeText = (text, index) => {
  const newData = [...data];
  if (newData[index]) {
    newData[index].text = text;
    setData(newData);
  }
};
  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
  <ScrollView style={styles.card}>
            <Text style={styles.cardTitle}>{pergescolhida}</Text>
          </ScrollView>
        
<DraggableFlatList
  data={data}
  renderItem={({ item, index, drag, isActive }) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
      }}
      onLongPress={drag}
    >
<TextInput
  style={styles.textInput}
  value={item.text || ''}
  onChangeText={(text) => {
    const newData = data.map((itemData, idx) => {
      console.log('idx:', idx); // Exibir o valor de idx
      console.log('item:', item.key); // Exibir o valor de index
      console.log('itemData:', itemData.key); // Exibir o valor de index
      if (item.key === itemData.key) {
        return { ...itemData, text: text };
      } else {
        return itemData;
      }
    });
    console.log('newData:', newData); // Exibir o novo array de dados
    setData(newData);
  }}
  placeholder={item.placeholder}
/>


    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.key.toString()}
  onDragEnd={({ data }) => setData(data)}
/>
        
    <TextInput
    style={styles.textInput} value={inputs}
    onChangeText={text => setInputs (text)} 
    placeholder="justificativa 1 Resposta"
    />        
    <TextInput
    style={styles.textInput} value={inputs1}
    onChangeText={text => setInputs1 (text)} 
    placeholder="justificativa 2 Resposta"
    />
              
    <TextInput
    style={styles.textInput} value={inputs2}
    onChangeText={text => setInputs2 (text)} 
    placeholder="justificativa 3 Resposta"
    />
      
  
    
        <View style={styles.buttonContainer}>
<TouchableOpacity
  style={
    data.some(item => item.text === '') || input.some()
      ? styles.buttondisable
      : styles.buttonTextsend
  }
  onPress={resposta === "" ? null : callHandleButtonPress}
>

            <Text style={styles.buttonText}>Analisar
              </Text>
            <AntDesign name="arrowright" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRefresh} onPress={callRefresh}>
            <Text style={styles.buttonText}>Próxima Pergunta</Text>
            <AntDesign name="reload1" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator color="#FFf" size="small" style={styles.loader} />
        )}
        
          <ScrollView style={styles.resultContainer}>
          {result !== "" && <Text style={styles.resultText}>{result}</Text>}
        </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  container: {
    paddingVertical: 20,
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  container1: {
    paddingVertical: 10,
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
  },
  input: {
    borderWidth: 1,
    width: "80%",
    color: "#333",
    marginVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  card: {
    width: "80%",
    height: "300",
    backgroundColor: "#3498db",
    borderRadius: 10,
    marginBottom:20,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    marginBottom: 20,
  },
  buttondisable: {
    flexDirection: "row",
    backgroundColor: "#c3c3c3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonTextsend: {
    flexDirection: "row",
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonRefresh: {
    flexDirection: "row",
    backgroundColor: "#4cbb17",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
  },
  loader: {
    zIndex: 1,
    position: "absolute",
    bottom: 170,
  },
  resultContainer: {
    flex: 1,
    width: "80%",
    height: 100,
    backgroundColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 10, // Ajuste o espaçamento interno se necessário
  },
  resultText: {
    marginHorizontal: 20,
    fontSize: 16,
    color: "#fff",
    textAlign: "justify",
  },

  textInput: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    marginBottom: 4,
    height: 35,
    width: "80%",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    width: '100%',
    height: '100%',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Para elevação no Android
  },
  input: {
    width: '100%',
    height: '100%',
    marginBottom: 14,
    fontSize: 16,
  },
});

export default Home;
