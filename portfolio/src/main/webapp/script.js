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

/**
 * Displays one of my favorite foods
   TODO: either remove this function or utilize it
 */
function addRandomFood() {
  const fav_foods =
      ['Pizza', 
      'Tacos', 
      'Sushi', 
      'Ice Cream Cake'];

  // Pick a random greeting.
  const food = fav_foods[Math.floor(Math.random() * fav_foods.length)];

  // Add it to the page.
  const foodContainer = document.getElementById('food-container');
  foodContainer.innerText = food;
}
