const URL_API_INDICATION =
  "https://my-json-server.typicode.com/profgarrido/indication-recipes";

const carouselInside = document.getElementById("carousel-inside");

fetch(`${URL_API_INDICATION}/user-preference-banner`)
  .then((response) => response.json())
  .then((receitas) => preencherCarousel(receitas))
  .catch((error) => console.error("Erro ao carregar receitas:", error));

function preencherCarousel(receitas) {
  receitas.forEach((receita, index) => {
    const { name, src, description } = receita;

    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const img = document.createElement("img");
    img.src = src;
    img.className = "d-block w-100";
    img.alt = name;

    carouselItem.appendChild(img);
    carouselInside.appendChild(carouselItem);
  });
}
const divReceitas = document.getElementById("receitas");

fetch(`${URL_API_INDICATION}/indication-recipes`)
  .then((response) => response.json())
  .then((receitas) => receitasBasicas(receitas))
  .catch((error) => console.error("Erro ao buscar receitas básicas:", error));

function receitasBasicas(receitas) {
  receitas.forEach(
    ({ img, name, description, ingredients, preparationMethod }) => {
      const imagem = criarImagemReceita(img);
      const titulo = document.createElement("h2");
      titulo.innerText = `${name}`;

      const ul = document.createElement("ul");
      ul.setAttribute("class", "d-flex flex-column mb-3");

      const li = criarNovaReceita(
        imagem,
        description,
        ingredients,
        preparationMethod
      );
      ul.appendChild(li);
      divReceitas.appendChild(titulo);
      divReceitas.appendChild(ul);
    }
  );
}

function criarImagemReceita(src) {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  return img;
}

function criarNovaReceita(imagem, description, ingredients, preparationMethod) {
  const li = document.createElement("li");
  li.innerHTML = `<strong> Descrição: </strong> ${description}<br>
  <strong>  Ingredientes: </strong> ${ingredients}<br>
  <strong> Modo de Preparo: </strong> ${preparationMethod} <br>`;
  li.setAttribute("class", "p-2");
  li.appendChild(imagem);

  return li;
}

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
