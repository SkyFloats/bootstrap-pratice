const URL_API_INDICATION =
  "https://my-json-server.typicode.com/profgarrido/indication-recipes";

const cardsReceitas = document.getElementById("outras-receitas");

fetch(`${URL_API_INDICATION}/favorite-recipes`)
  .then((response) => response.json())
  .then((receitas) => receitasFavoritas(receitas))
  .catch((error) => console.error("Erro ao buscar receitas básicas:", error));

function receitasFavoritas(receitas) {
  receitas.forEach(({ img, description }) => {
    const coluna = document.createElement("div");
    coluna.setAttribute("class", "col pb-2");

    const cardMini = document.createElement("div");
    cardMini.setAttribute("class", "card h-100 ");

    const imagem = criarImagemReceita(img);
    const cardMiniInfo = document.createElement("div");
    cardMiniInfo.setAttribute("class", "card-body");

    const p = document.createElement("p");
    p.innerText = `${description}`;
    p.setAttribute("class", "card-text");

    const botao = document.createElement("a");
    botao.className = "btn btn-secondary";
    botao.innerHTML = `Visualizar Receita`;

    cardMiniInfo.appendChild(p);
    cardMiniInfo.appendChild(botao);

    cardMini.appendChild(imagem);
    cardMini.appendChild(cardMiniInfo);

    coluna.appendChild(cardMini);

    cardsReceitas.appendChild(coluna);
  });
}

function criarImagemReceita(src) {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  return img;
}

const cardGrande = document.getElementById("receita-grande");

fetch(`${URL_API_INDICATION}/user-preference-banner`)
  .then((response) => response.json())
  .then((receitas) => preencherCardGrande(receitas))
  .catch((error) => console.error("Erro ao buscar receitas básicas:", error));

function preencherCardGrande(receitas) {
  receitas.forEach((receita) => {
    const { name, src, description } = receita;

    const cardGrandeItem = document.createElement("div");
    cardGrandeItem.setAttribute("class", "card-body");

    const img = document.createElement("img");
    img.src = src;
    img.className = "card-img-top";
    img.alt = name[0].toUpperCase();

    const titulo = document.createElement("h5");
    titulo.setAttribute("class", "card-title");
    titulo.innerText = name[0].toUpperCase() + name.slice(1);;

    const descricao = document.createElement("p");
    descricao.setAttribute("class", "card-text");

    const atualizacao = document.createElement("p");
    atualizacao.setAttribute("class", "card-text");
    atualizacao.innerHTML = `<small class="text-body-secondary">Última atualização a 3 minutos</small>`;

    cardGrandeItem.appendChild(titulo);
    cardGrandeItem.appendChild(descricao);
    cardGrandeItem.appendChild(atualizacao);

    cardGrande.appendChild(img);
    cardGrande.appendChild(cardGrandeItem);
  });
}
