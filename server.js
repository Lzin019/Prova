import express from "express";
import dotenv from "dotenv";
import mangaRoutes from "./src/routes/mangaRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});



app.get("/mangas/autor/:autor", (req, res) => {
  
    let autor = req.params.autor.toLowerCase();

    
    const mangasEncontrados = mangas.filter(m => 
        m.autor.toLowerCase().includes(autor)
    );

    if (mangasEncontrados.length > 0) {
      
        res.status(200).json(mangasEncontrados);
    } else {
        
        res.status(404).json({
            mensagem: "Manga nao encontrado!"
        });
    }
});

app.get("/mangas/genero/:genero", (req, res) => {

    let genero = req.params.genero;

    const mangasDoGenero = mangas.filter(m => m.genero.toLowerCase() === genero.toLowerCase());
    if (mangasDoGenero.length > 0) {
    
        res.status(200).json(mangasDoGenero);
    } else {

        res.status(404).json({
            mensagem: "Nenhum manga foi encontrado nesse genero!"
        })
    }
});

app.get("/mangas/status/:status", (req, res) => {

    let status = req.params.status;

    const mangasDoStatus = mangas.filter(m => m.status.toLowerCase() === status.toLowerCase());
    if (mangasDoStatus.length > 0) {
    
        res.status(200).json(mangasDoStatus);
    } else {

        res.status(404).json({
            mensagem: "Nenhum manga foi encontrado nesse status!"
        })
    }
});

app.get("/mangas/editora/:editora", (req, res) => {

    let editora = req.params.editora;

    const mangasDoEditora = mangas.filter(m => m.editora.toLowerCase() === editora.toLowerCase());
    if (mangasDoEditora.length > 0) {
    
        res.status(200).json(mangasDoEditora);
    } else {

        res.status(404).json({
            mensagem: "Nenhum manga foi encontrado nessa editora!"
        })
    }
});

app.use("/mangas", mangaRoutes);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});