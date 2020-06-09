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
  slides[slideIndex-1].style.display = "block";
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
        }
    }
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/** Tells the server to delete all comments */
function deleteComments() {
  fetch('/delete-data', {method: 'POST'}).then(fetch('/data', {method: 'GET'})).then(getMessages());
}

function displayComments() {
    console.log("hi");
    fetch('/login').then(response => response.json()).then((login) => {
        if (login.status) {
            document.getElementById("comments-form").style.display = 'block';
        }
    });
    
}
