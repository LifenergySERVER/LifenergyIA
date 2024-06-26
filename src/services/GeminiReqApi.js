const handleButtonPress = async (resposta, setLoading, setResult) => {
  try {
    setLoading(true);
    const response = await fetch('https://gemini-rj8q55qfz-lifenergyservers-projects.vercel.app/api/Server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Adicione esta linha
      body: JSON.stringify({ conteudo: resposta }),
    });   
    const data = await response.json();
    setResult(data.result.replace("Resultado: ", " "));
  } catch (error) {
    console.error('Erro na solicitação:', error.message);
  } finally {
    setLoading(false);
  }
};

export default handleButtonPress;
