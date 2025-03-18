/*what we want to do is first create a variable which we will connect to the div with the id of "root".
*/

//lets also set a variable equal to the button inside the html file. 
// const getButton = document.createElement('button');
// getButton.innerText = 'Get Api Data!';


/*below is a generic render function which will take in 1 parameter and will render that parameter to the dom.
This function expects that the parameter is already an array.
*/


//create our function to get pokemon from the pokemon API, make sure to include async/await inside this function.


  //after the response is returned, lets console log the response to see what it looks like. 

  /*we can see that the response is not exactly what we are looking for, but actually is a response Object that contains a bunch of metadata. Along with this metadata is the response.body. This object is actually a readable stream.
  in order for us to be able to view this data, we need to use a built in method on the response Object called ".json()" this will take the raw data from the response body and parse it into a javascript object so we can manipulate it's data in code.
  */
 
  //Let's try that! Take the response object and use the "json" method on it so that we can see what data came back inside the response. 
  
  //lets also console log the result so that we can see it's output. 
 

  /*since our render function takes an array, we need to destructure the result until we are left with an array. The array that we should have, should be each individual pokemon with their info as an object. 
  */
  
  
  //lastly we want to map each pokemons info into a details card for it. While mapping, we want to create a new div for each pokemon, with the pokemons name in an h1. Let's also add a clickable link for each pokemon by setting an "a" tag with an href around the h1.
  //this way, the h1 will inherit the hyperlink from the "a" tag. We can then call the render function with the mapped html elements passed in as an argument. 
 
    //we dont want to select the document in this query selector, since if we do, it will select the entire outer document and since we have multiple buttons with the same id, it wont function
    //properly. What we need to do is select each card that we are creating and use a query selector on that to
    //place the event listener on each button.
    
        // root.replaceChildren(singleCard);
        
    // addBtnInteraction(buttonListener);
  
 

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
