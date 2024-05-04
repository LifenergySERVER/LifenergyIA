const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();

// URI de conexão do MongoDB
const uri = "mongodb+srv://lifeuserappdev:wPHRfgOnQr848u8Q@clusterlifenergy.xmla5cg.mongodb.net/StorageLifenergy?retryWrites=true&w=majority";

async function getAllDocuments() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log("Conectado ao MongoDB");

    const database = client.db('StorageLifenergy');
    const collection1 = database.collection('RelConsigo');
    const collection2 = database.collection('RelOutro');
    const collection3 = database.collection('RelTodo');
    const collection4 = database.collection('CapPergunta');
    
    let documentos1 = await collection1.find().toArray();
    let documentos2 = await collection2.find().toArray();
    let documentos3 = await collection3.find().toArray();
    let documentos4 = await collection4.find().toArray();

    return [documentos1,documentos2,documentos3,documentos4];
  } finally {
    await client.close();
  }
}

// Rota GET para obter todos os documentos da coleção
router.get('/getall', async (req, res) => {
  try {
    const documentos = await getAllDocuments();
    res.status(200).json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;