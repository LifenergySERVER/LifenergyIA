const handleButtonPress = async (resposta, setLoading, setResult) => {
  try {
    setLoading(true);
    const response = await fetch('https://nodejs-serverless-git-47fc86-marcus-vinicius-projects-542324bc.vercel.app/api/Server', {
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
