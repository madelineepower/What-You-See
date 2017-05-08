console.log("hey");

var input = document.getElementById("input");
var outputDiv = document.getElementById("output");

//load character data
function loadPeopleData() {
  var dataRequest = new XMLHttpRequest();
    dataRequest.addEventListener("load", dataRequestLoadComplete);
    dataRequest.addEventListener("error", dataRequestError);

    function dataRequestLoadComplete(event){
      console.log("Character data has LOADED");
      var characters = JSON.parse(event.target.responseText);
      console.log("characters", characters);
      showPeople(characters);
    }

    function showPeople(array) {
           array.forEach(function(item, index) {
            var eachPerson = `<section class="person-container">
                                  <header><h3>${item.title} ${item.name}</h3></header>
                                  <section><p class="bio">${item.bio}</p>
                                  <img src="${item.image}" class="images"></section>
                              </section>`
            var personDiv = document.createElement("div");
            personDiv.className = "personDiv";
            personDiv.innerHTML = eachPerson;
            outputDiv.appendChild(personDiv);
          })
           var personEl = document.getElementsByClassName("person-container");
           for (var i = 0; i < personEl.length; i++) {
            personEl.item(i).addEventListener("click", function (event) {
                var targetDiv = event.target.parentNode.parentNode;
                console.log(targetDiv);
                targetDiv.classList.toggle('border');
                input.focus();
            input.addEventListener("keyup", function(event) {
                console.log("keyup event", event);
                var targetbioArea = targetDiv.childNodes[3].childNodes[0];
                console.log("input", this);
                console.log("targetDiv", targetDiv.childNodes[3].childNodes[0]);
                targetbioArea.innerHTML = this.value;
              })
            input.addEventListener("keydown", function(event){
                if(event.keyCode === 13) {
                  input.value = "";
                  input.blur();
                  targetDiv.classList.remove('border');
                }
              })
            })
          }
        }
        function dataRequestError(event){
          console.log("character data has error");
        }

        dataRequest.open("GET", "people.json");
        dataRequest.send();
  }
loadPeopleData()
