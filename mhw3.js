//menu a tendina
function menuTendina(event){
  const opzioni = document.querySelector('#tendina');
  opzioni.classList.remove('hidden');
  event.currentTarget.removeEventListener('click', menuTendina);
  event.currentTarget.addEventListener('click', nascondiMenu);
}

function nascondiMenu(event){
  const opzioni = document.querySelector('#tendina');
  opzioni.classList.add('hidden');
  event.currentTarget.removeEventListener('click', nascondiMenu);
  event.currentTarget.addEventListener('click', menuTendina);
}

const menu = document.querySelector('#strisce');
menu.addEventListener('click', menuTendina);

//cambio sfondo header
const sfondi = [
  'url("immagini/AdobeStock_353560265.jpg")',
  'url("immagini/AdobeStock_246750740.jpg")',
  'url("immagini/Home-slider-1.jpg")'
];
let indiceSfondo = 0;

function cambioSfondo() {
  indiceSfondo = (indiceSfondo + 1) % sfondi.length;
  document.querySelector("#background").style.backgroundImage = sfondi[indiceSfondo];
}

const freccia = document.querySelectorAll('#frecce img'); 
for (let i = 0; i < freccia.length; i++) {
  freccia[i].addEventListener('click', cambioSfondo);
}

//Funzione Scopri di più
const descrizioni = {
  Pescheria: {
    descrizione: "Tutti i giorni selezioniamo per Voi il miglior pescato, pesce fresco di mare, crostacei e  prodotti locali."
  },

  StreetFood: {
    descrizione: "Pranzo e cena in pescheria, tutta la nostra gastronomia marinara pronta per essere gustata da voi, il tutto è sempre accompagnato da ottimi vini locali e non."
  },

  Aperifish: {
    descrizione:"Durante il nostro aperitivo in pescheria verrai coinvolto dalle nostre cruditè con tartare, ostriche e crostacei e dai nostri vini ghiacciati."
  }
}

function mostraDescrizione(event){
  const descr = event.currentTarget;
  const sezione = descr.dataset.sezione;
  descr.textContent=descrizioni[sezione].descrizione;
  descr.classList.add('mostra_descrizione');
  descr.removeEventListener('click', mostraDescrizione);
  descr.addEventListener('click', nascondiDescrizione);
}

function nascondiDescrizione(event){
  const descr = event.currentTarget;
  descr.classList.remove('mostra_descrizione');
  descr.textContent = 'Scopri di più';
  descr.removeEventListener('click', nascondiDescrizione); 
  descr.addEventListener('click', mostraDescrizione);
}

const Scopri = document.querySelectorAll('.post_content');
for(const postContent of Scopri){
  postContent.addEventListener('click', mostraDescrizione);
}

//cambiare le immagini al passaggio del mouse
const imgg = [
  'immagini/76.jpg',
  'immagini/77.jpg',
  'immagini/78.jpg'
];

const original = [
  'immagini/IMG-20231203-WA0003-400x250.jpg',
  'immagini/IMG-20231203-WA0001-1-400x250.jpg',
  'immagini/IMG-20231203-WA0005-1-400x250.jpg'
];

function cambioImmagini(event)
{
  const images = event.currentTarget;
  const indice = parseInt(images.dataset.indice);
  images.src = imgg[indice];
}

function ripristinaImmagini(event){
  const images = event.currentTarget;
  const indice = parseInt(images.dataset.indice);
  images.src = original[indice];
}

const images = document.querySelectorAll('.post img');
for (let i = 0; i < images.length; i++) {
  images[i].setAttribute('data-indice', i);
  images[i].addEventListener('mouseover', cambioImmagini);
  images[i].addEventListener('mouseout', ripristinaImmagini);
}

//galleria
const lista_immagini = [
  "immagini/FB_IMG_1587027909317-Custom.png",
  "immagini/FB_IMG_1587027834564-Custom.png",
  "immagini/FB_IMG_1587027951663-Custom.png",
  "immagini/FB_IMG_1587027847786-Custom.jpg",            
  "immagini/98053950_1322535031276681_3760812465483415552_o-Custom.jpg"
];

function createImage(src){
  const image = document.createElement('img');
  image.src = src;
  return image;
}

const album = document.querySelector('#galleria-items');
for(let i = 0; i < lista_immagini.length; i++){
  const src_foto = lista_immagini[i];
  const image = createImage(src_foto);
  image.addEventListener('click', onThumbnailClick)
  album.appendChild(image);
}

function onThumbnailClick(event){
  const modalView = document.querySelector('#modal-view');
  const image = createImage(event.currentTarget.src);
  document.body.classList.add('no-scroll');
  modalView.innerHTML = '';
  modalView.appendChild(image);
  modalView.classList.remove('hidden');
}

function onModalClick(event){
  document.body.classList.remove('no-scroll');
  const modalView = document.querySelector('#modal-view');
  modalView.classList.add('hidden');
}

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

const galleriaItems = document.querySelectorAll('#galleria-items img');
for (let i = 0; i < galleriaItems.length; i++) {
  const item = galleriaItems[i];
  item.addEventListener('click', onThumbnailClick);
}

//codice sconto
function codiceSconto(event){
  const caratteri = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let codice = ''; 
  for(let i = 0; i < 8; i++){
    const idx_casuale = Math.floor(Math.random() * caratteri.length);
    codice += caratteri.charAt(idx_casuale);
  }

  document.querySelector('#codiceSconto').textContent = codice;
  event.target.removeEventListener('click', codiceSconto);
}

const button = document.querySelector('#button');
button.addEventListener('click', codiceSconto);

//prenotazioni online
function prenotazioneOnline(event){
  event.preventDefault();
  const nome = document.querySelector('input[name = nome]').value;
  const cognome = document.querySelector('input[name = cognome]').value;
  const data = document.querySelector('input[type = date]').value;
  const ora = document.querySelector('input[type = time]').value;

  console.log("Prenotazione effettuata!\nNome: " + nome + "\nCognome: " + cognome + "\nData: " + data + "\nOra: " + ora);
}

const Prenota = document.querySelector('#bloccodx');
Prenota.addEventListener('submit', prenotazioneOnline);

//informazioni sui vini
const apiKey = '2d8ba449a5bd41388941e727fd0ac22b';

function displayResults(data) {
  const resultsContainer = document.querySelector('#results');
  resultsContainer.innerHTML = '';

  if (data === '' || data.recommendedWines === '' || data.recommendedWines.length === '') {
    resultsContainer.textContent = 'Nessun vino raccomandato trovato.';
    return;
  }

  for (let i = 0; i < data.recommendedWines.length; i++) {
    const wine = data.recommendedWines[i];
  
    const wineElement = document.createElement('div');
    wineElement.classList.add('risultato');
  
    const titleElement = document.createElement('h2');
    titleElement.textContent = wine.title;
    wineElement.appendChild(titleElement);
  
    if (wine.description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = wine.description;
      wineElement.appendChild(descriptionElement);
    }
  
    if (wine.price) {
      const priceElement = document.createElement('p');
      priceElement.textContent = 'Prezzo: ' + wine.price;
      wineElement.appendChild(priceElement);
    }
  
    resultsContainer.appendChild(wineElement);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onError(error) {
  console.log('Error: ' + error);
}

function cerca() {
  const query = document.querySelector('#searchQuery').value;
  fetch(`https://api.spoonacular.com/food/wine/recommendation?wine=${query}&number=4&apiKey=${apiKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(onResponse).then(displayResults).catch(onError);
}

const cercaButton = document.querySelector('#cerca');
cercaButton.addEventListener('click', cerca);

//id podcast
const id_podcast = [
  'Cronache di Cucina: 2wE0NnMV8higiwFsgx32Pf',
  'Mangia come parli: 30TKFq5XsUKPyFjeEfAiXB',
  'Generi di conforto: 7fBO69OvRC95chpOko5MP1',
  'DOI - Denominazione di Origine Inventata: 4HAxuHe75m4b1Wq0sAtBkV',
  'Lievito Madre: 4BbYFSN0Zn2JlPLvgnLhfu',
  'Che Pizza - Il podcast: 6NDPAJfE31aoOv37w0wTNo',
  'Mikettä - Tutto il pane del mondo: 33Dns6PzVB2S4SHXuTahQK',
  'IO SONO CUCINA: 4UCDNxsnHLJMfpgS408YP5',
  'Juice It Up: 4oMQZ5JKpYMQqsMrIlJ6dw',
  'La Retroetichetta: 6Nb3gAOnIQ7gx9lnWi2bED',
  'A tavola con Giulio Cesare: 1hxmdppsGngh2a4IIGSG3y',
  'diVino: 0X3jdGd8CwRkNSbPZLoJ6q',
  'Corso per Sommelier di A.I.S. (Associazione Italiana Sommelier): 3zMvHiGOHCMTsdh7YrupY6'
];

function mostraElenco(event){
  const lista = event.currentTarget;
  const elenco = document.querySelector('.elenco');
  elenco.innerHTML = "";
  for(let i = 0; i<id_podcast.length; i++){
    const scritta = document.createElement('li');
    scritta.textContent = id_podcast[i];
    elenco.appendChild(scritta);
  }
  elenco.classList.remove('hidden');
  lista.removeEventListener('mouseover', mostraElenco);
  elenco.addEventListener('mouseleave', nascondiElenco);
}

function nascondiElenco(event){
  const elenco = event.currentTarget;
  const lista = document.querySelector('.id_spoti');
  elenco.classList.add('hidden');
  lista.addEventListener('mouseover', mostraElenco);
}

const lista_id = document.querySelector('.id_spoti');
lista_id.addEventListener('mouseover', mostraElenco);

//spotify
function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const library = document.querySelector('#podcast-view');
  library.innerHTML = '';
  const results = json.shows;
  let num_results = results.length;
  if(num_results > 5)
    num_results = 5;
  for (let i = 0; i < results.length; i++) {
    const podcast_data = results[i];
    const title = podcast_data.name;
    const selected_image = podcast_data.images[0].url;
    const didascalia = podcast_data.description;
    const episodi = podcast_data.total_episodes;
    const editore = podcast_data.publisher;
    const podcast = document.createElement('div');
    podcast.classList.add('podcast');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('h3');
    caption.textContent = title;
    const describe = document.createElement('p');
    describe.classList.add('text')
    describe.textContent = didascalia;
    const div = document.createElement('div');
    div.classList.add('riga_spotify');
    const episodes = document.createElement('p');
    episodes.textContent = 'Numero episodi: ' + episodi;
    const publisher = document.createElement('p');
    publisher.textContent = 'Editore: ' + editore;
    episodes.classList.add('text');
    publisher.classList.add('text');
    library.appendChild(img);
    podcast.appendChild(caption);
    podcast.appendChild(describe);
    div.appendChild(episodes);
    div.appendChild(publisher);
    podcast.appendChild(div);
    library.appendChild(podcast);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  event.preventDefault();
  const podcast_input = document.querySelector('#podcast');
  const podcast_value = encodeURIComponent(podcast_input.value);
  console.log('Eseguo ricerca: ' + podcast_value);
  fetch('https://api.spotify.com/v1/shows?ids='+podcast_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token_spotify
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  token_spotify = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const client_id = '6250146e6b5748fe9b91b5b621782d34';
const client_secret = '085c2a1d074e40fcb3d46780992e5df6';
let token_spotify;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);
const form = document.querySelector('#spotify');
form.addEventListener('submit', search);