const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      let characterDiv = document.getElementsByClassName(
        "characters-container"
      )[0];
      characterDiv.innerHTML = "";
      charactersAPI.getFullList().then((result) => {
        console.log(result);
        result.map((result) => {
          characterDiv.insertAdjacentHTML(
            "beforeend",
            `<div class="character-info">
        <div class="characterid">ID: ${result.id}</div>
        <div class="name">Name: ${result.name}</div>
        <div class="occupation">Occupation: ${result.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${result.cartoon}</div>
        <div class="weapon">Weapon: ${result.weapon}</div>
      </div>`
          );
        });
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      console.log(event);
      let id = document.getElementsByName("character-id")[0].value;
      charactersAPI.getOneRegister(id).then((result) => {
        let characterDiv = document.getElementsByClassName(
          "characters-container"
        )[0];
        characterDiv.innerHTML = "";
        characterDiv.insertAdjacentHTML(
          "beforeend",
          `<div class="character-info">
        <div class="characterid">ID: ${result.id}</div>
        <div class="name">Name: ${result.name}</div>
        <div class="occupation">Occupation: ${result.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${result.cartoon}</div>
        <div class="weapon">Weapon: ${result.weapon}</div>
      </div>`
        );
      });
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      let id = document.getElementsByName("character-id-delete")[0].value;
      let errorDiv = document.getElementById("errorDiv");
      try {
        const character = await charactersAPI.deleteOneRegister(id);
        document.getElementById("delete-one").style.backgroundColor = "green";
        errorDiv.innerHTML = "ID Deleted successfully";
      } catch (error) {
        console.log(error);
        if ((error = "Request failed with status code 404")) {
          errorDiv.innerHTML = "ID not found";
        }

        document.getElementById("delete-one").style.backgroundColor = "red";
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      console.log(event)
      try {
        event.preventDefault();
        const id = event.target[0].value ? event.target[0].value : "";
        const character = await charactersAPI.getOneRegister(id);
        const name = event.target[1].value
          ? event.target[1].value
          : character.data.name;
        const occupation = event.target[2].value
          ? event.target[2].value
          : character.data.occupation;
        const weapon = event.target[3].value
          ? event.target[3].value
          : character.data.weapon;
        const cartoon = event.target[4].value
          ? event.target[4].value === "on"
            ? true
            : false
          : character.data.cartoon;
        const info = { name, occupation, weapon, cartoon };
        console.log(info, id);
        const characterUpdate = await charactersAPI.updateOneRegister(id, info);
        console.log(characterUpdate);
        document.querySelector(
          "#edit-character-form button#send-data"
        ).style.backgroundColor = "green";
      } catch (error) {
        document.querySelector(
          "#edit-character-form button#send-data"
        ).style.backgroundColor = "red";
      }
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      try {
        event.preventDefault();
        const list = await charactersAPI.getFullList();
        console.log(list)
        const id = list[(list.length - 1) + 1];
        const name = event.target[0].value;
        const occupation = event.target[1].value;
        const weapon = event.target[2].value;
        const cartoon = event.target[3].value === 'on' ? true : false;
        const info = { id, name, occupation, weapon, cartoon };
        console.log(info);
        const character = await charactersAPI.createOneRegister(info);
        console.log(character);
        document.querySelector(
          '#new-character-form button#send-data'
        ).style.backgroundColor = 'green';
      } catch (error) {
        console.log(error)
        document.querySelector(
          '#new-character-form button#send-data'
        ).style.backgroundColor = 'red';
      }
    });
});
