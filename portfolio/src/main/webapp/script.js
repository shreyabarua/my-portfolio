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
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) slideIndex = 1
  if (n < 1) slideIndex = slides.length
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

/*
unused/untested function. (for practice/reference)
*/
async function getMsgUsingAsyncAwait() {
  const response = await fetch('/data');
  const msg = await response.text();
  document.getElementById('msg-container').innerText = msg;
}

/**
 * Fetches messages from the servers and adds them to the DOM.
 */
function getMessages() {
  fetch('/data').then(response => response.json()).then((messages) => {
    // messages is an arraylist object, not a string, so we have to
    // reference its indexes to create HTML content
    const messageListElement = document.getElementById('msg-container');
    messageListElement.innerHTML = '';
    messageListElement.appendChild(
        createListElement('Message 1: ' + messages[0]));
    messageListElement.appendChild(
        createListElement('Message 2: ' + messages[1]));
    messageListElement.appendChild(
        createListElement('Message 3: ' + messages[2]));
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
