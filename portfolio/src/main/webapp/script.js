// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide-container");
    if (n > slides.length) slideIndex = 1
    if (n < 1) slideIndex = slides.length
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

/**
 * Fetches messages from the servers and adds them to the DOM.
 */
function getMessages() {
    fetch('/data').then(response => response.json()).then((messages) => {
        // messages is an array, not a string, so we have to
        // reference its indexes to create HTML content
        const messageListElement = document.getElementById('msg-container');
        if (messages.length == 0) messageListElement.innerHTML = 'no comments so far';
        else {
            console.log("printing messages");
            messageListElement.innerHTML = '';
            for (let x in messages) {
                messageListElement.appendChild(
                    createListElement(messages[x]));
                messageListElement.appendChild(document.createElement('hr'));
            }
        }
    });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
    var colon = text.indexOf(":");
    var email = text.substring(0, colon);
    var body = text.substring(colon, text.length);
    const liElement = document.createElement('li');
    liElement.innerHTML = "<i>" + email + "</i>" + body;
    return liElement;
}

/** Tells the server to delete all comments */
function deleteComments() {
    fetch('/delete-data', { method: 'POST' }).then(fetch('/data', { method: 'GET' })).then(getMessages());
}

function displayComments() {
    fetch('/login').then(response => response.json()).then((login) => {
        if (login.status) {
            document.getElementById("comments-form").style.display = 'block';
            const loginLinkElement = document.getElementById('logout-link-container');
            loginLinkElement.innerHTML = "Log out <a href=\"" + login.logout_url + "\">here</a>.";

        }
        else {
            const loginLinkElement = document.getElementById('login-link-container');
            loginLinkElement.innerHTML = "Log in <a href=\"" + login.login_url + "\">here</a> to leave a comment.";
        }
    });
}

function addLandmark(map, lat, lng, title, description) {
  const marker = new google.maps.Marker(
      {position: {lat: lat, lng: lng}, map: map, title: title});

  const infoWindow = new google.maps.InfoWindow({content: description});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

function createInfoWindowContent(name, location, description, url, img) {
    return '<h2>'+name+'</h2>' + '<h3>'+location+'</h3>' 
    + '<div class = "clearfix"><img class= "img1" src='+ img +
    ' width="150" height=auto>' + '<p>'+description+' <a href =\"' +
    url+ '\" target = "_blank">'+ url+'</a></p></div>' ;
}
function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 37.0902, lng: -95.7129}, zoom: 4});

  addLandmark(
      map, 40.4428, -80.0025, 'Gaucho Parrilla Argentina', 
      createInfoWindowContent('Gaucho Parrilla Argentina', 'Pittsburgh, PA', 'During my time at Pittsburgh last summer ' +
    'I ate at a lot of awesome restaurants, but this Argentinian steakhouse was definitely one to remember. The line ' +
    'to be seated was going out the door but it was well worth the wait. The Carne Asado sandwich I ordered was delicious ' + 
    'but the giant paella my friends and I shared was definitely the star of the show. ', 'https://www.eat-gaucho.com/',
    '/images/gaucho.jpg'));

  addLandmark(
      map, 40.9724, -74.0285, 'Pimaan Thai Restaurant',
      createInfoWindowContent('Pimaan Thai Restaurant','Emerson, NJ', 'Thai food is one of my ' +
      'favorite cuisines and my favorite Thai restaurant has to be Pimaan. My go to is always ' +
      'either the Red Curry or Pad Thai. One of my favorite things about Pimaan however is the ' +
      'fried ice cream for dessert. The server brings out the dish and basically pours fire ' +
      'on it as you can see in the picture to the right. Pretty cool!','http://www.pimaanthai.com/',
      '/images/pimaan.jpg'));

  addLandmark(
      map, 37.7829, -122.4189, 'Brenda\'s French Soul Food',
      createInfoWindowContent('Brenda\'s French Soul Food','San Francisco, CA',
      'The only time I\'ve been to California was for Google\'s GWE summit '+ 
      'and even though it was only for a few days, it was definitely one of my favorite trips of all ' +
      'time. After a long day of sight seeing in San Francisco, my friends and I decided to stop at ' +
      'Brenda\'s French Soul Food for dinner. Maybe it was because we were starving but this place had ' +
      'the greatest food. I ordered the Spicy Jambalaya and my friends got the fried chicken and mac & cheese. ' +
      'For dessert we were able to choose a sampler of three different flavors of beignets. If I\'m '+
      'ever back in SF, this is the first place I\'m going!','https://frenchsoulfood.com/',
      '/images/brendas.jpg'));

  addLandmark(
      map, 42.6673, -73.7749, 'Albany Halal Grill',
      createInfoWindowContent('Halal Grill','Albany, NY','In college, Halal Grill is the place ' +
      'my friends and I go for late night dinners. Although it\'s a bit far from our school ' +
      'and in a sketchy neighborhood, the food is yummy, cheap, and well worth the drive.','https://www.yelp.com/biz/albany-halal-grill-albany',
      '/images/halalgrill.jpg'));

  addLandmark(
      map, 44.4401, -68.3708, 'Lunt\'s Gateway Lobster Pound',
      createInfoWindowContent('Lunt\'s Gateway Lobster Pound','Trenton, ME',
      'When my family friends and I road tripped to Canada last summer, we could not pass ' +
      'through Maine without stopping for the state\'s famous delicacy: lobster. Knowing ' +
      'I probably couldn\'t handle the task of eating a whole lobster, I tried the Lobster Roll, ' +
      'pictured to the right, instead. Equally easy to eat and delicious!','https://www.luntsgatewaylobster.com/menu.htm',
      '/images/lobster.jpg'));

  addLandmark(
      map, 41.1461, -73.9895, 'Caked Up',
        createInfoWindowContent('Caked Up','New City, NY','This is one of my favorite dessert ' +
        'spots right by my house. Caked Up is well known for its custom designer cakes, having made ' +
        'cakes for celebrities like Scott Disick, Kevin Durant, Odell Beckham Jr., A-Rod, and ' +
        'Rihanna. They have crazy cupcake flavors which I have never tried, like Maple Bacon and Chicken '+
        'and Waffle, but their normal flavors are delicious as well!','https://cakedupcafe.com/',
        '/images/cakedup.jpg'));

  addLandmark(
      map, 40.7441, -74.0066, 'Artichoke Basille\'s Pizza',
      createInfoWindowContent('Artichoke Basille\'s Pizza','New York, NY', 'There\'s no ' +
      'better pizza than New York pizza and Artichoke Basille\'s is the ' +
      'the perfect place to eat after a long walk on the High Line. Usually I never '+
      'go for fancy pizza but since I was in the city for orientation, I decided to try ' +
      'it out. My friends and I each tried a slice of Margherita, Vodka, and of course, '+
      'Artichoke. All of them were delicious but my personal favorite was the Vodka slice. ' +
      'Luckily, this restaurant has multiple locations so people from all over the country can enjoy.',
      'https://www.artichokepizza.com/','/images/pizza.jpg'));

  addLandmark(
      map, 30.3322, -81.6557, 'Krispy Kreme',
      createInfoWindowContent('Krispy Kreme','Jacksonville, FL', 'My first time having Krispy ' +
      'Kreme was on the way back home from Universal Studios. Although I never go for glazed donuts ' +
      'because I think they\'re boring, having a hot glazed donut from here changed the game completely. '+
      'Dunkin Donuts could never.','https://www.krispykreme.com/','/images/krispykreme.jpg'));

}

function onLoad() {
    getMessages();
    displayComments();
    createMap();
}
