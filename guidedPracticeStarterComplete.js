const mockApiUrl = 'https://jsonplaceholder.typicode.com/posts' //this is for our mock api calls (POST and DELETE since pokeApi doesn't allow those methods)
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20' //this is our API url, which we will use to fetch data from. 

//this will be our state object that we will update after each api call. 
const state = {
  allPokemon: [],
  singlePokemon: {},
  favPokemon: {},
}

const currFav = document.querySelector('#currFav');
currFav.innerHTML = `Current Fav: ${state.favPokemon.name || null}`

// 1. what we want to do is first create a variable which we will connect to the div with the id of "root".

const root = document.querySelector('#root');
// 2. lets also set a variable equal to the button inside the html file. 
const getButton = document.querySelector('#getButton');

/* 3. below we will make a generic render function which will take in 1 parameter and will render that parameter to the dom.
This function will need to account for if the argument passed is an array or if the argument is any other data type. .
*/
const render = (content) => {
  if(Array.isArray(content)){
    root.replaceChildren(...content);
  } else {
    root.replaceChildren(content);
  }
};


/* 4. create our function to get pokemon from the pokemon API, make sure to include async/await inside this function, the fetch request should also be wrapped in a try/catch.
after the response is returned, lets console log the response to see what it looks like. 
*/

const getPokemon = async() => {
  try{

    const response = await fetch(`${baseUrl}`);
    console.log('Response', response);
    // 4a. test out the function both with and without async/await. What are the differences? Does it matter if we forget one of them? 
    
    /*we can see that the response is not exactly what we are looking for, but actually is a response Object that contains a bunch of metadata. Along with this metadata is the response.body. 
    This object is actually a readable stream. In order for us to be able to view this data, we need to use a built in method on the response Object 
    called ".json()" this will take the raw data from the response body and parse it into a javascript object so we can manipulate it's data.
    */
   
   /* 5. Let's try that! Take the response object and use the "json" method on it so that we can see what data came back inside the response. 
   lets also console log the data so that we can see it's output. 
   */
  
  const data = await response.json();
  console.log('Data', data);
  
  
  /* 6. Let's destructure the data of our api call so that we are only left with an array. Once we have any array we can easily map
  through our data and create html elements for each item returned in our data. */
  const pokemonArray  = data.results;
  
  
  
  /* 7. we want to map each pokemons name into a details card specific to it. While mapping, we want to create a new div for each pokemon, with the pokemons name in an h1.
  We also want to add the class of "card" to each div that we create, this way it inherits our styling.
  let's also create a button with a class of "getDetails", we can attach an event listener to it later.
  make sure that we are updating the state here so that we don't need to do redundant api calls later on and can re-render from cache if needed.  
  */
 state.allPokemon = pokemonArray.map((pokemon) => {
   const card = document.createElement('div');
   card.classList.add('card');
   card.innerHTML = `<h1>${pokemon.name}</h1>
   <button class="getDetails">Get Details</button>`
   
   const detailsBtn = card.querySelector('.getDetails');
   detailsBtn.addEventListener('click', () => {
     singlePokemon(pokemon.url);
    });
    return card;
  })
  
  /* 8. Let's try and render what we have currently so that we can see if it is currently what we expected.
  since we created our render function dynamically, and allowed it to take in almost any data type, we can easily pass the  
  mapped html elements in as an argument. 
  */
 render(state.allPokemon)
 
 /* 9. By now you have probably noticed that our "Get Details" button looks great, but currently doesn't function. 
 Let's add some functionality to the button by first attaching an event listener to it and on click, it should trigger
 an anonymous arrow function which calls a function called singlePokemon. When calling singlePokemon, we must pass in the 
 url that is attached to each pokemon from the original getPokemon data. Unless our singlePokemon function has scope access to the "getPokemon"
 data, then we MUST create an event listener that fires off an anonymous function, which then invokes singlePokemon, passing the url data as an argument
 directly into the singlePokemon function. 
 */
}catch(err){
  console.log(err);
}
}


/* 10. Now that we have that event listener properly setup above and properly passing the url to a function called "singlePokemon"
we can now begin to write the singlePokemon function. Let's make this function using the function declarator instead of an arrow function. 
Make sure to remember that we still need to use async/await for any asynchronous code that we will run, along with wrapping it in a try/catch to prevent your code for breaking! 
*/
async function singlePokemon(url) {
  try{
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    
    /* 11.Just like before, now that we have our api call and have seen what data it is returning, lets create the HTML for what a detail page
    should look like, where we just want to see the specific pokemon's information and nothing else. (we can also add another class to this new div
    so that it is styled slightly differently than the multi-card view, but still keeps it's over look consistent.)
    
    Let's also create a button at the end of the html with a class of "getDetails". we will use this button as a "go back" button*/
    state.singlePokemon = document.createElement('div');
    state.singlePokemon.classList.add('card', 'single');
    state.singlePokemon.innerHTML = `
    <h1> Pokemon Name: ${data.name}</h1>
    <img src=${data.sprites?.front_default} />
    <p>Abilities: ${data.abilities.map((ability) => `<p>${ability.ability.name}</p>`).join('')}
    <button class="getDetails">Go back</button>
    <button class="addFav">Add ${data.name} as your favorite pokemon!</button>
    `
    
    // 12. let's call our dynamic render fuction again, this time passing the state of the singlePokemon as the argument.      
    render(state.singlePokemon);
    
    
    /* 13. Once our html looks good for the single pokemon view and we have our button created, lets again add our event listener to it.
    this time we will simply re-render the original data that we have stored in state for allPokemon. By not triggering a new api call
    and re-rendering from a local (cached) copy of the api data, we save computer resources and are much more efficient.
    After we re-render, make sure to reset the state of singlePokemon to empty so we don't carry over unwanted data.*/ 
    const backBtn = state.singlePokemon.querySelector('.getDetails');
    backBtn.addEventListener('click', ()=> {
      render(state.allPokemon);
      state.singlePokemon = {};
    });
   
    // 15* line 118 also add at the end, after we create the add fav. 
    const favBtn = state.singlePokemon.querySelector('.addFav');
    favBtn.classList.add('getDetails')
    favBtn.addEventListener('click', async()=>{
      await addFavoritePokemon(data.name);
      if(addFavoritePokemon){
        alert(`Added ${data.name} as your favorite!`);
      }
    })
  }catch (err){
    console.log(err);
  }
}

/* 14. Now that we have successfully done 2 api get requests to fetch data, lets now do a post request to send data to an api. POST requests are typically used to send data from
the frontend (your website or app) to a server and create a new resource or user-submited information. Post requests are designed to not be "idempotent", which means that making 
the same request multiple times does not yield the same result. For instance, when creating a new user for a website, the usual request used would be a POST request, since we
would want to be creating a brand new user, and not updating a current user. Sending multiple requests to create a new user would result in multiple users created, instead of a single user.
It's not dire to understand this currently, but it's a good thing to keep in the back of your head as we move into React. 

Since we can't directly alter the pokeApi with POST or DELETE requests, we will need to do the remainder of this demo with mock data. We will be using the "mockApiUrl" for the
following requests. 

Let's make a POST request to the mockApiUrl to add our favorite pokemon out of the ones we currently have. The route will require the headers to be set, making sure the server knows
that we intend to send them a specific content-type of application/json. We must also pass the pokemon's name into the body of the request and stringify it into a json. Make sure to
also update state as well!*/

async function addFavoritePokemon(pokemonName) {
  try{
    const response = await fetch(mockApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: pokemonName })
    });
    const data = await response.json();
    console.log(data);
    state.favPokemon = data;
    currFav.innerHTML = `Current Favorite: ${data.name}`;
  } catch(err){
    console.log(err);
  }
} 
  /* 15. Once we have created the addFavorite function, we need to go back up into the singlePokemon function and add a new button. This new button will also need an event listener which runs 
  this add favorite pokemon function, passing the argument of the currently selected pokemon's name.*/ 

/* 16. Now that all the other routes are created, lets finish it up with a DELETE method. Let's create a DELETE request to the "mockApiUrl". This request should be to remove the favorite pokemon.
We will need to pass the pokemon's id, along with the method of DELETE. We should update our state only if our api call succeeds.*/

async function deleteFavoritePokemon(pokemonId) {
  try{
    const response = await fetch(`${mockApiUrl}/${pokemonId}`, {
      method: 'DELETE',
    });
    if(response.ok){
      alert('Your favorite pokemon has been deleted.');
      state.favPokemon = {};
      currFav.innerHTML = `Current Fav: ${state.favPokemon.name || null}`
    }
  }catch(err){
    console.log(err);
  }
}

// 17. we will again add the event listener to the currFav div to track when a user clicks on it. When the currFav div is clicked, we should delete the user's current favorite 
//pokemon from state as well as update the dom to the curr state. 

currFav.addEventListener('click', async()=> {
  await deleteFavoritePokemon(state.favPokemon.id);
  console.log('deleted fav')
 })

 
 //If we are using mostly arrow functions instead of the "function" keyword, we need to define the event listener AFTER the getPokemon function is defined, otherwise we will get a referrence error. 
//------------------------Leave below untouched
getButton.addEventListener('click', getPokemon);
const gottaCatchEmAll = document.querySelector('#catchEm');

gottaCatchEmAll.addEventListener('click', () => {
  document.body.style.cursor = `
  url(http://www.sherv.net/cursors/pm2.ani),
  url(http://www.sherv.net/cursors/pm2.cur),
  url(http://www.sherv.net/cursors/pm2.gif),
  auto`;
  const allBtns = window.document.querySelectorAll('button');
  allBtns.forEach((btn) => addBtnInteraction(btn));
});

function addBtnInteraction(btn){
  if (btn.dataset.hasInteraction) return;
  btn.addEventListener('mouseover', moveAway);
  btn.addEventListener('click', moveAway);
  btn.dataset.hasInteraction = true; 
  function moveAway() {
    const randX = Math.floor(Math.random() * (window.innerWidth - 150));
    const randY = Math.floor(Math.random() * (window.innerHeight - 60));
    const randRotate = Math.floor(Math.random() * 720) - 360;

    btn.style.transform = `translate(${randX}px, ${randY}px) rotate(${randRotate}deg)`;
  }
}
