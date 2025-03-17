const state = {
  names: [],
  images: []
}
/*what we want to do is first create a variable which we will connect to the div with the id of "root".
*/
const root = document.querySelector('#root');

//lets also set a variable equal to the button inside the html file. 
const getButton = document.querySelector('#getButton');

/*below is a generic render function which will take in 1 parameter and will render that parameter to the dom.
This function expects that the parameter is already an array.
*/

const render = (content) => {
  root.append(...content)
}

//create our function to get pokemon from the pokemon API, make sure to include async/await inside this function.

const getPokemon = async() => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
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
    card.innerHTML = `
    <a href=${pokemon.url}><h1>This pokemon is: ${pokemon.name}</h1></a>`
    return card;
  })
console.log(pokemonHTML);
render(pokemonHTML)
}
//lets see what your website looks like now!

//Since we are using arrow functions instead of the "function" keyword, we need to define the event listener AFTER the getPokemon function is defined, otherwise we will get a referrence error. 
getButton.addEventListener('click', getPokemon);
