(function() {
  var table = document.querySelector("table");
  var ageBtnUp = table.rows[0].cells[3].children[0].children[0];
  var ageBtnDown = table.rows[0].cells[3].children[0].children[1];
  var ageNameUp = table.rows[0].cells[0].children[0].children[0];
  var ageNameDown = table.rows[0].cells[0].children[0].children[1];

  ageBtnUp.addEventListener("click", sort.bind(null, table, sortNumberByFieldUp("age")), false);
  ageBtnDown.addEventListener("click", sort.bind(null, table, sortNumberByFieldDown("age")), false);
  ageNameUp.addEventListener("click", sort.bind(null, table, sortStringByFieldUp("name")), false);
  ageNameDown.addEventListener("click", sort.bind(null, table, sortStringByFieldDown("name")), false);

  function sort(table, sortFunc) {
    var data = getDataFromDom(table);
    var sort = data.sort(sortFunc);

    table.appendChild(replaceDataFofDom(sort, table));
  }

  function sortNumberByFieldUp(field) {
    return function(a, b) {
      return a[field] - b[field];
    }
  }

  function sortNumberByFieldDown(field) {
    return function(a, b) {
      return b[field] - a[field];
    }
  }

  function sortStringByFieldUp(field) {
    return function(a, b) {
      return a.name < b.name ? -1 : 1;
    }
  }

  function sortStringByFieldDown(field) {
    return function(a, b) {
      return a.name < b.name ? 1 : -1;
    }
  }

  function getDataFromDom(table) {
    var rows = table.querySelectorAll("tr");
    var store = [];

    for (var i = 1; i < rows.length; i++) {
      store.push({
        name: table.rows[i].cells[0].innerHTML,
        last: table.rows[i].cells[1].innerHTML,
        sur: table.rows[i].cells[2].innerHTML,
        age: table.rows[i].cells[3].innerHTML,
        elem: table.rows[i]
      });
    }
    return store;
  }

  function replaceDataFofDom(store, table) {
    var tBody = document.createElement("tbody");

    table.removeChild(table.lastElementChild);

    for (var j = 0; j < store.length; j++) {
      tBody.appendChild(store[j].elem);
    }

    return tBody;
  }

  function genDomTable(table) {
    var data = [
      {
        name: "Вася",
        last: "Петров",
        sur: "Александрович",
        age: 10
      }
    ];
    var strRepl = "";

    function getRandom(min, max) {
      return min + Math.floor(Math.random() * (max + 1 - min));
    }

    for (var i = 0; i < 100; i++) {
      strRepl += "<tr><td>" + String.fromCharCode(getRandom(1040, 1070)) + data[0].name.slice(1) + "</td><td>" + data[0].last + "</td><td>" + data[0].sur + "</td><td>" + getRandom(10, 100) + "</td></tr>";
    }

    table.querySelector("tBody").innerHTML = strRepl;
  }

  genDomTable(table);
})();