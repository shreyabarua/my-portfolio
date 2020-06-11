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

function onLoad() {
    getMessages();
    displayComments();
}

function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 37.0902, lng: -95.7129}, zoom: 4});

  const gauchoMarker = new google.maps.Marker({
    position: {lat: 40.4428, lng: -80.0025},
    map: map,
    title: 'Gaucho Parrilla Argentina'
  });

  const pimaanMarker = new google.maps.Marker({
    position: {lat: 40.9724, lng: -74.0285},
    map: map,
    title: 'Pimaan Thai Restaurant'
  });

  const brendasMarker = new google.maps.Marker({
    position: {lat: 37.7829, lng: -122.4189},
    map: map,
    title: 'Brenda\'s French Soul Food'
  });

  const halalMarker = new google.maps.Marker({
    position: {lat: 42.6673, lng: -73.7749},
    map: map,
    title: 'Albany Halal Grill'
  });

  const lobsterMarker = new google.maps.Marker({
    position: {lat: 44.4401, lng: -68.3708},
    map: map,
    title: 'Lunt\'s Gateway Lobster Pound'
  });

  const cakedupMarker = new google.maps.Marker({
    position: {lat: 41.1461, lng: -73.9895},
    map: map,
    title: 'Caked Up Cafe'
  });

  const artichokeMarker = new google.maps.Marker({
    position: {lat: 40.7372, lng: -74.0300},
    map: map,
    title: 'Artichoke Basille\'s Pizza'
  });

  const voodooMarker = new google.maps.Marker({
    position: {lat: 28.4739, lng: -81.4657},
    map: map,
    title: 'Voodoo Doughnut'
  });
}
