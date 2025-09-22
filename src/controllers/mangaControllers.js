import dados from "./../models/dados.js";

const { mangas } = dados;

const getAllMangasFiltrados = (req, res) => {
  const {
    autor,
    editora,
    genero,
    status,
  } = req.query;
  let resultado = mangas;

  if (autor) {
    resultado = resultado.filter(
      (m) => m.autor.toLocaleLowerCase() === autor.toLocaleLowerCase()
    );
  } 

  if (editora) {
    resultado = marseInt(resultado.filter((m) => m.editora == editora));
  }

  if (genero) { resultado = resultado.filter((m) => m.genero.toLocaleLowerCase() === genero.toLocaleLowerCase()
    );
  }

  if (status) { resultado = parseInt(resultado.filter((m) => m.status == status)
    );
  }

  if (resultado.length > 0) {
    res.status(200).json({
      total: resultado.length,
      mangas: resultado,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `Não foi possível encontrar mangas com essas características`,
    });
  }
};

const getMangasById = (req, res) => {
    const id = parseInt(req.params.id);

   const manga = mangas.find(m => m.id === parseInt(id));

   if (manga) {
   res.status(200).json(manga);
 } else {
   res.status(404).json({
     erro: `Manga com id ${id} não encontrado!`,
   });
 }
};



const createManga = (req, res) => {
    const {
        id,
        titulo,
        autor,
        editora,
        genero,
        status,
        } = req.body;

    if(!titulo || !autor){
        return res.status(400).json({
            success: false,
            message: "Nome e autor são obrigatorios"
        });
    } 

    const novoManga = {
        id: mangas.length + 1,
        titulo,
        autor,
        editora,
        volumes: parseInt(volumes),
        genero,
        status
    }

    mangas.push(novoManga);

    res.status(201).json({
        success: true,
        message:"Manga cadastrado com sucesso",
        manganovoManga
    });
}


const deleteManga = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const idParaApagar = parseInt(id);

  const mangaParaRemover = mangas.find((m) => m.id === idParaApagar);
  console.log(mangaParaRemover);

  if (!mangaParaRemover) {
    return res.status(404).json({
      success: false,
      message: "Manga com o id não existe",
    });
  }

  const mangaFiltrado = mangas.filter((m) => m.id !== id);
  console.log(mangaFiltrado);

  mangas.splice(0, mangas.length, ...mangaFiltrado);

  return res.status(200).json({
    success: true,
    message: "O Manga foi removido com sucesso!",
    mangaDeletado: mangaParaRemover,
  });
};

const updateManga = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    titulo,
    autor,
    editora,
    volumes,
    genero,
    status,
    anoInicio,
    preco,
  } = req.body;

  
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const mangaExiste = mangas.find((m) => m.id === id);

  if (!mangaExiste) {
    return res.status(404).json({
      success: false,
      message: "O manga não existe",
    });
  }



  const mangasAtualizados = mangas.map((m) =>
    m.id === id
      ? {
          ...m,
          ...(titulo && {
            titulo,
          }),
          ...(autor && {
            autor,
          }),
          ...(editora && {
            editora,
          }),
          ...(volumes && {
            volumes,
          }),
          ...(genero && {
            genero,
          }),
          ...(status && {
            status,
          }),
          ...(anoInicio && {
            anoInicio,
          }),
          ...(preco && {
            preco,
          }),
        }
      : m
  );

  mangas.splice(0, mangas.length, ...mangasAtualizados);

  const mangaAtualizado = mangas.find((m) => m.id === id);

  res.status(200).json({
    success: true,
    message: "Manga atualizado com sucesso",
    manga: mangaAtualizado,
  });
};


export { getAllMangasFiltrados, getMangasById, createManga, deleteManga, updateManga,};