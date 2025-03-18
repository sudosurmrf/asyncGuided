const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20' //this is our API url, which we will use to fetch data from. 

// 1. what we want to do is first create a variable which we will connect to the div with the id of "root".


// 2. lets also set a variable equal to the button inside the html file. 


/* 3. below we will make a generic render function which will take in 1 parameter and will render that parameter to the dom.
This function will need to account for if the argument passed is an array or if the argument is any other data type. .
*/


/* 4. create our function to get pokemon from the pokemon API, make sure to include async/await inside this function and fetch from our api url.
after the response is returned, lets console log the response to see what it looks like. 
*/


  // 4a. test out the function both with and without async/await. What are the differences? Does it matter if we forget one of them? 
  
    /*we can see that the response is not exactly what we are looking for, but actually is a response Object that contains a bunch of metadata. Along with this metadata is the response.body. 
    This object is actually a readable stream. In order for us to be able to view this data, we need to use a built in method on the response Object 
    called ".json()" this will take the raw data from the response body and parse it into a javascript object so we can manipulate it's data.
    */

   /* 5. Let's try that! Take the response object and use the "json" method on it so that we can see what data came back inside the response. 
   lets also console log the data so that we can see it's output. 
   */



  /* 6. Let's destructure the data of our api call so that we are only left with an array. Once we have any array we can easily map
  through our data and create html elements for each item returned in our data. */
 
  


  /* 7. we want to map each pokemons name into a details card specific to it. While mapping, we want to create a new div for each pokemon, with the pokemons name in an h1.
  We also want to add the class of "card" to each div that we create, this way it inherits our styling.
  let's also create a button with a class of "getDetails", we can attach an event listener to it later. 
  */
 
  //  addBtnInteraction(detailsBtn); //add this line in at the end of the demo, right before the return to see what happens 
 
  /* 8. Let's try and render what we have currently so that we can see if it is currently what we expected.
  since we created our render function dynamically, and allowed it to take in almost any data type, we can easily pass the  
   mapped html elements in as an argument. 
  */
 

  /* 9. By now you have probably noticed that our "Get Details" button looks great, but currently doesn't function. 
  Let's add some functionality to the button by first attaching an event listener to it and on click, it should trigger
  an anonymous arrow function which calls a function called singlePokemon. When calling singlePokemon, we must pass in the 
  url that is attached to each pokemon from the original getPokemon data. Unless our singlePokemon function has scope access to the "getPokemon"
  data, then we MUST create an event listener that fires off an anonymous function, which then invokes singlePokemon, passing the url data as an argument
  directly into the singlePokemon function. 
  */

 

/* 10. Now that we have that event listener properly setup above and properly passing the url to a function called "singlePokemon"
we can now begin to write the singlePokemon function. Let's make this function using the function declarator instead of an arrow function. 
Make sure to remember that we still need to use async/await for any asynchronous code that we will run!
*/

  
  /* 11.Just like before, now that we have our api call and have seen what data it is returning, lets create the HTML for what a detail page
  should look like, where we just want to see the specific pokemon's information and nothing else. (we can also add another class to this card
  so that it is styled slightly differently than the multi-card view, but still keeps it's over look consistent.
  
  Let's also create a button at the end of the html with a class of "getDetails". we will use this button as a "go back" button*/
  

   // 12. let's call our dynamic render fuction again, this time passing the singleCard as the argument.      
      

/* 13. Once our html looks good for the single pokemon view and we have our button created, lets again add our event listener to it.
this time we will simply recall the original api call of getPokemon when the button is clicked. Does anyone know why calling our original function of "getPokemon*
functions as a "go back" button in this situation?*/ 
 
  
  // 14. Make sure to add one final touch to your projects, invoke the addBtnInteraction function, passing the backBtn as the argument. 
  //optionally also call this function up above at the end of the pokemonArray.map, right before the return. Pass that function the details button. (good luck btw).
  // addBtnInteraction(backBtn);
  // lets see what your website looks like now! 
  

  

//If we are using mostly arrow functions instead of the "function" keyword, we need to define the event listener AFTER the getPokemon function is defined, otherwise we will get a referrence error. 
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
