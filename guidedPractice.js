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
  console.log(response);
  /*we can see that the response is not exactly what we are looking for, but actually is a response Object that contains a bunch of metadata. Along with this metadata is the response.body. This object is actually a readable stream.
  in order for us to be able to view this data, we need to use a built in method on the response Object called ".json()" this will take the raw data from the response body and parse it into a javascript object so we can manipulate it's data in code.
  */
 
  //Let's try that! Take the response object and use the "json" method on it so that we can see what data came back inside the response. 
  const result = await response.json();
  //lets also console log the result so that we can see it's output. 
  console.log(result);

  /*since our render function takes an array, we need to destructure the result until we are left with an array, we can't pass the render function anything besides an array. 
  after you think you've destructured the object into an array, try calling the render function with the array passed in as an argument and see what happens to your website!
  */


render(result.results)
}

//let's then create an event listener to listen for a "click" on our button. If it recieves a click, it should run our above function. 
getButton.addEventListener('click', getPokemon);