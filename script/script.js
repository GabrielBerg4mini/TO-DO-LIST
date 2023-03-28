const localStorageName = "to-do-list-gb";

function validateIfExistsNewTask() {
    const values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    const inputValue = document.getElementById("input-new-task").value;
    const exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}


function newTask() {
  const input = document.getElementById("input-new-task");
  input.style.border = ''
  

  //validação

  if (!input.value) {

    input.style.border = '1.5px solid red'

    alert("Digite algo para inserir em sua lista.");

  } else if (validateIfExistsNewTask()) {
    
    alert('Já existe uma tarefa com essa descrição!')
  }
  else {
    //increment to localStorage

    const values = JSON.parse(localStorage.getItem(localStorageName) || "[]");

    values.push({
      name: input.value,
    });

    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();
  }
  input.value = ''
}

function showValues() {
  const values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
  const list = document.getElementById("to-do-list");

  list.innerHTML = "";

  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]["name"]} <button id='btn-ok' onclick='removeItem("${values[i]["name"]}")'>ok</button></li>`;
  }
}

function removeItem(data) {
    const values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    const index = values.findIndex(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues()
}

showValues();
