function sortearFracomportamento(data) {
    // Escolhe aleatoriamente uma das arrays
    const modif = [data[0], data[1], data[2]]
    const arrayEscolhida = modif[Math.floor(Math.random() * modif.length)];
    
    // Escolhe aleatoriamente um objeto fracomportamento da array escolhida
    const objetoEscolhido = arrayEscolhida[Math.floor(Math.random() * arrayEscolhida.length)];

    // Retorna o fracomportamento sorteado
    return objetoEscolhido.fracomportamento;
  }

  export default sortearFracomportamento