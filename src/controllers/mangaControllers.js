import dados from "./../models/dados.js";

const { mangas } = dados;

const getAllMangasFiltrados = (req, res) => {
  const {
    titulo,
    autor,
    editora,
    volumes,
    genero,
    status,
    anoInicio,
    preco,
  } = req.query;
  let resultado = mangas;

  if (titulo) {
    resultado = resultado.filter(
      (m) => m.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase()
    );
  }

  if (autor) {
    resultado = resultado.filter(
      (m) => m.autor.toLocaleLowerCase() === autor.toLocaleLowerCase()
    );
  } 

  if (editora) {
    resultado = marseInt(resultado.filter((m) => m.editora == editora));
  }

  if (volumes) {
    resultado = resultado.filter((m) => m.volumes.toLocaleLowerCase() === volumes.toLocaleLowerCase()
    );
  }

  if (genero) { resultado = resultado.filter((m) => m.genero.toLocaleLowerCase() === genero.toLocaleLowerCase()
    );
  }

  if (status) { resultado = parseInt(resultado.filter((m) => m.status == status)
    );
  }

  if (anoInicio) {
    resultado = resultado.filter((m) => m.anoInicio.toLocaleLowerCase() === anoInicio.toLocaleLowerCase()
    );
  }

  if (preco) {
    resultado = resultado.filter((m) => m.preco.toLocaleLowerCase() === preco.toLocaleLowerCase()
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

  const manga = personagens.find((m) => m.id === id);

  if (manga) {
    res.status(200).json(manga);
  } else {
    res.status(404).json({
      success: false,
      message: `Manga com o id: ${id} não encontrado`,
    });
  }
};

const createManga = (req, res) => {
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

  const autoresMangas = [
    "Eiichiro Oda",
    "Kentaro Miura",
    "Masashi Kishimoto",
    "Hajime Isayama",
    "Tsugumi Ohba",
    "Hiromu Arakawa",
    "Koyoharu Gotouge",
    "Gege Akutami",
    "Kohei Horikoshi",
    "Tatsuki Fujimoto",
  ];

  if (
    !titulo ||
    !autor ||
    !volumes ||
    !genero ||
    !preco 
  ) {
    return res.status(400).json({
      success: false,
      message:
        "titulo, autor, volumes, genero e preço são obrigatórios para criar um Mangá",
    });
  }

  // Regras de negócio

  if (volumes <= 0) {
    return res.status(400).json({
      success: false,
      message: "O numero de volumes deve ser maior que 0!",
    });
  }

  if (raca) {
    if (!racasPersonagens.includes(raca)) {
      return res.status(400).json({
        success: false,
        message: `A raça "${raca}" não é válida. Raças permitidas: ${racasPersonagens.join(
          ", "
        )}.`,
      });
    }
  }

  if (raca === "Saiyajin") {
    if (transformacoes.length < 1) {
      res.status(400).json({
        success: false,
        message:
          "Se a raça for Saiyajin, o personagem deve ter pelo menos UMA transformação",
      });
    }
  }

  if (qtdeVitorias <= 0) {
    return res.status(400).json({
      success: false,
      message: "O número de vitorias deve ser maior que 0",
    });
  }

  if (raca === "Namekuseijin" && planetaOrigem !== "Namekusei") {
    res.status(400).json({
      success: false,
      message:
        "Se a raça for Namekuseijin, o planeta de origem precisa ser obrigatoriamente Namekusei",
    });
  }

  if (
    raca === "Saiyajin" &&
    !["Planeta Vegeta", "Planeta Terra"].includes(planetaOrigem)
  ) {
    res.status(400).json({
      success: false,
      message:
        "Se a raça for Saiyajin, o planeta de origem precisa ser Planeta Terra ou Planeta Vegeta",
    });
  }

  // Fim das regras de negócio e continuação da criação do personagem

  const novoPersonagem = {
    id: personagens.length + 1,
    titulo,
    raca,
    nivelPoder,
    transformacoes,
    planetaOrigem,
    qtdeVitorias,
  };

  personagens.push(novoPersonagem);

  res.status(200).json({
    success: true,
    message: "Personagem cadastrado com sucesso!",
    personagem: novoPersonagem,
  });
};

const deletePersonagem = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve sr válido",
    });
  }

  const idParaApagar = parseInt(id);

  const personagemParaRemover = personagens.find((p) => p.id === idParaApagar);
  console.log(personagemParaRemover);

  if (!personagemParaRemover) {
    return res.status(404).json({
      success: false,
      message: "Personagem com o id não existe",
    });
  }

  const personagemFiltrado = personagens.filter((m) => m.id !== id);
  console.log(personagemFiltrado);

  personagens.splice(0, personagens.length, ...personagemFiltrado);

  return res.status(200).json({
    success: true,
    message: "O personagem foi removido com sucesso!",
    persoangemDeletado: personagemParaRemover,
  });
};

const updatePersonagem = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    titulo,
    raca,
    nivelPoder,
    transformacoes,
    planetaOrigem,
    qtdeVitorias,
  } = req.body;

  const racasPersonagens = [
    "Saiyajin",
    "Meio-Saiyajin",
    "Namekujeijin",
    "Terráqueo",
    "Arco-Irís",
    "Bio-androide",
    "Criatura Mágica",
  ];

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const personagemExiste = personagens.find((p) => p.id === id);

  if (!personagemExiste) {
    return res.status(404).json({
      success: false,
      message: "O personagem não existe",
    });
  }

  // regras de negócio novamente

  if (raca) {
    if (!racasPersonagens.includes(raca)) {
      return res.status(400).json({
        success: false,
        message: `A raça "${raca}" não é válida. Raças permitidas: ${racasPersonagens.join(
          ", "
        )}.`,
      });
    }
  }

  if (nivelPoder < 1000) {
    return res.status(400).json({
      success: false,
      message: "O poder deve ser maior ou igual a 1000!",
    });
  }

  if (raca === "Saiyajin") {
    if (transformacoes.length < 1) {
      res.status(400).json({
        success: false,
        message:
          "Se a raça for Saiyajin, o personagem deve ter pelo menos UMA transformação",
      });
    }
  }

  if (qtdeVitorias <= 0) {
    return res.status(400).json({
      success: false,
      message: "O número de vitorias deve ser maior que 0",
    });
  }

  if (raca === "Namekuseijin" && planetaOrigem !== "Namekusei") {
    res.status(400).json({
      success: false,
      message:
        "Se a raça for Namekuseijin, o planeta de origem precisa ser obrigatoriamente Namekusei",
    });
  }

  if (
    raca === "Saiyajin" &&
    !["Planeta Vegeta", "Planeta Terra"].includes(planetaOrigem)
  ) {
    res.status(400).json({
      success: false,
      message:
        "Se a raça for Saiyajin, o planeta de origem precisa ser Planeta Terra ou Planeta Vegeta",
    });
  }

  // Fim das regras de negócio

  const personagensAtualizados = personagens.map((p) =>
    p.id === id
      ? {
          ...p,
          ...(titulo && {
            titulo,
          }),
          ...(raca && {
            raca,
          }),
          ...(nivelPoder && {
            nivelPoder,
          }),
          ...(transformacoes && {
            transformacoes,
          }),
          ...(planetaOrigem && {
            planetaOrigem,
          }),
          ...(qtdeVitorias && {
            qtdeVitorias,
          }),
        }
      : p
  );

  personagens.splice(0, personagens.length, ...personagensAtualizados);

  const personagemAtualizado = personagens.find((p) => p.id === id);

  res.status(200).json({
    success: true,
    message: "Personagem atualizado com sucesso",
    personagem: personagemAtualizado,
  });
};

// Rota para saber o item que tem maior numero de alguma coisa
const getPersonagemCampeao = (req, res) => {
  if (personagens.length === 0) {
    return res.status(404).json({
      message: "Nenhum personagem cadastrado.",
    });
  }

  const campeao = personagens.reduce((maisVitorias, atual) => {
    return atual.qtdeVitorias > maisVitorias.qtdeVitorias
      ? atual
      : maisVitorias;
  });

  res.status(200).json({
    success: true,
    message: `O personagem com mais vitórias é: ${campeao.titulo}!`,
    campeao,
  });
};

// Rota para saber o tipo que mais se repete
const getRacaRepetida = (req, res) => {
  if (personagens.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Nenhum personagem cadastrado.",
    });
  }

  let maisRepetido = null;
  let maxContagem = 0;

  for (let i = 0; i < personagens.length; i++) {
    let atual = personagens[i].raca;
    let contagem = 0;

    for (let r = 0; r < personagens.length; r++) {
      if (personagens[r].raca === atual) {
        contagem++;
      }
    }

    if (contagem > maxContagem) {
      maxContagem = contagem;
      maisRepetido = atual;
    }
  }

  res.status(200).json({
    success: true,
    message: `O valor que mais se repete em 'raca' é: ${maisRepetido} (${maxContagem} vezes).`,
  });
};

export { getAllPersonagensFiltrados, getPersonagensById, createPersonagem, deletePersonagem, getPersonagemCampeao, getRacaRepetida, updatePersonagem,};