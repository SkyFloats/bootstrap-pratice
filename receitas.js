const URL_API_BASIC = "https://my-json-server.typicode.com/profgarrido/basics-recipes";

const carouselInner = document.getElementById("carousel-content");
const cardEmPe = document.getElementById("card-col");
const cardDeitado = document.getElementById("card-row");

fetch(`${URL_API_BASIC}/banners`)
  .then(response => response.json())
  .then(receitas => preencherCarousel(receitas))
  .catch(error => console.error("Erro ao carregar receitas:", error));

function preencherCarousel(receitas) {
  receitas.forEach((receita, index) => {
    const { name, src, description } = receita;
    
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;

    const img = document.createElement("img");
    img.src = src;
    img.className = "d-block w-100";
    img.alt = name;

    const carouselCaption = document.createElement("div");
    carouselCaption.className = "carousel-caption d-none d-md-block";

    const h5 = document.createElement("h5");
    h5.textContent = name;

    const p = document.createElement("p");
    p.textContent = description;

    carouselCaption.appendChild(h5);
    carouselCaption.appendChild(p);

    carouselItem.appendChild(img);
    carouselItem.appendChild(carouselCaption);

    carouselInner.appendChild(carouselItem);
  });
}

fetch(`${URL_API_BASIC}/recipes-highlights`)
  .then(response => response.json())
  .then(receitas => {
    preencherCardEmPe(receitas[0]); // Primeiro item para o card à esquerda
    preencherCardDeitado(receitas.slice(1, 3)); // Próximos dois itens para os cards horizontais
  })
  .catch(error => console.error("Erro ao carregar receitas:", error));

function preencherCardEmPe(receita) {
  const { img, name, description } = receita;

  const cardItem = document.createElement("div");
  cardItem.className = "card h-100";

  const imagem = document.createElement("img");
  imagem.src = img;
  imagem.className = "card-img-top";
  imagem.alt = name;

  const cardInfo = document.createElement("div");
  cardInfo.className = "card-body";

  const h5 = document.createElement("h5");
  h5.textContent = name;
  h5.className = "card-title";

  const p = document.createElement("p");
  p.textContent = description;
  p.className = "card-text";

  const botao = document.createElement("div");
  botao.className = "d-flex justify-content-md-end";
  botao.innerHTML = `<a href="#" class="btn btn-secondary">Visualizar Receita</a>`;

  cardInfo.appendChild(h5);
  cardInfo.appendChild(p);
  cardInfo.appendChild(botao);

  cardItem.appendChild(imagem);
  cardItem.appendChild(cardInfo);

  cardEmPe.appendChild(cardItem);
}

function preencherCardDeitado(receitas) {
  receitas.forEach(receita => {
    const { img, name, description } = receita;

    const cardItem = document.createElement("div");
    cardItem.className = "col-12 mb-4";

    const card = document.createElement("div");
    card.className = "card equal-height";

    const row = document.createElement("div");
    row.className = "row g-0";

    const colImg = document.createElement("div");
    colImg.className = "col-md-4";

    const imagem = document.createElement("img");
    imagem.src = img;
    imagem.className = "img-fluid rounded-start";
    imagem.alt = name;

    const colInfo = document.createElement("div");
    colInfo.className = "col-md-8";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const h5 = document.createElement("h5");
    h5.textContent = name;
    h5.className = "card-title";

    const p = document.createElement("p");
    p.textContent = description;
    p.className = "card-text";

    const botao = document.createElement("div");
    botao.className = "d-md-flex justify-content-md-end";
    botao.innerHTML = `<a href="#" class="btn btn-secondary">Visualizar Receita</a>`;

    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    cardBody.appendChild(botao);

    colInfo.appendChild(cardBody);
    colImg.appendChild(imagem);
    row.appendChild(colImg);
    row.appendChild(colInfo);
    card.appendChild(row);
    cardItem.appendChild(card);
    cardDeitado.appendChild(cardItem);
  });
}
