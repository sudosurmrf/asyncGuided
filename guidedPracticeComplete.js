/*what we want to do is first create a variable which we will connect to the div with the id of "root".
*/
const root = document.querySelector('#root');

//lets also set a variable equal to the button inside the html file. 
// const getButton = document.createElement('button');
// getButton.innerText = 'Get Api Data!';
const getButton = document.querySelector('#getButton');
root.append(getButton);

/*below is a generic render function which will take in 1 parameter and will render that parameter to the dom.
This function expects that the parameter is already an array.
*/

const render = (content) => {
  if(Array.isArray(content)){
   root.replaceChildren(...content)
  } else {
    root.replaceChildren(content);
  }
}

//create our function to get pokemon from the pokemon API, make sure to include async/await inside this function.

const getPokemon = async() => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  //after the response is returned, lets console log the response to see what it looks like. 
  console.log('Response', response);
  /*we can see that the response is not exactly what we are looking for, but actually is a response Object that contains a bunch of metadata. Along with this metadata is the response.body. This object is actually a readable stream.
  in order for us to be able to view this data, we need to use a built in method on the response Object called ".json()" this will take the raw data from the response body and parse it into a javascript object so we can manipulate it's data in code.
  */
 
  //Let's try that! Take the response object and use the "json" method on it so that we can see what data came back inside the response. 
  const result = await response.json();
  //lets also console log the result so that we can see it's output. 
  console.log('Result', result);

  /*since our render function takes an array, we need to destructure the result until we are left with an array. The array that we should have, should be each individual pokemon with their info as an object. 
  */
  const pokemonArray = result.results;
  
  //lastly we want to map each pokemons info into a details card for it. While mapping, we want to create a new div for each pokemon, with the pokemons name in an h1. Let's also add a clickable link for each pokemon by setting an "a" tag with an href around the h1.
  //this way, the h1 will inherit the hyperlink from the "a" tag. We can then call the render function with the mapped html elements passed in as an argument. 
  const pokemonHTML = pokemonArray.map((pokemon)=> {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <h1>${pokemon.name}</h1>
    <button class="getDetails">Get details</button>`
    //we dont want to select the document in this query selector, since if we do, it will select the entire outer document and since we have multiple buttons with the same id, it wont function
    //properly. What we need to do is select each card that we are creating and use a query selector on that to
    //place the event listener on each button.
    const buttonListener = card.querySelector('.getDetails');
    if(buttonListener){
      buttonListener.addEventListener('click', async() => {
        const getSinglePokemon = await fetch(`${pokemon.url}`)
        const result = await getSinglePokemon.json();
        console.log(result);
        const singleCard = document.createElement('div');
        singleCard.classList.add('card', 'single');
        singleCard.innerHTML = `
        <h1> Pokemon Name: ${result.name}</h1>
        <img src=${result.sprites?.front_default} />
        <p>Abilities: ${result.abilities.map((ability) => `<p>${ability.ability.name}</p>`).join('')}
        <button class="getDetails">Go back</button>
        `
        render(singleCard);
        // root.replaceChildren(singleCard);
        const backBtn = singleCard.querySelector('.getDetails');
        backBtn.addEventListener('click', getPokemon);
        addBtnInteraction(backBtn);
      })
    }
    // addBtnInteraction(buttonListener);
    return card;
  })
console.log(pokemonHTML);
render(pokemonHTML)
}
//lets see what your website looks like now!

//Since we are using arrow functions instead of the "function" keyword, we need to define the event listener AFTER the getPokemon function is defined, otherwise we will get a referrence error. 
getButton.addEventListener('click', getPokemon);

//------------------------Leave below untouched
function addBtnInteraction(btn){
  btn.addEventListener('mouseover', moveAway);
  btn.addEventListener('click', moveAway);

  function moveAway() {
    const randX = Math.floor(Math.random() * (window.innerWidth - 150));
    const randY = Math.floor(Math.random() * (window.innerHeight - 60));
    const randRotate = Math.floor(Math.random() * 720) - 360;

    btn.style.transform = `translate(${randX}px, ${randY}px) rotate(${randRotate}deg)`;
  }
}
