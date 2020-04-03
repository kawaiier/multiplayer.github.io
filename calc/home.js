const usp = new URLSearchParams(window.location.search);
const homeList = document.getElementById("home");

const floorWindowsAllowed = 10;
const floorsAllowed = 30;
let totalWindows = 0;

let floorWindows = +usp.get("floorWindows");
let floors = +usp.get("floors");

let floorWindowsCache = localStorage.getItem("floorWindowsCache");
let floorsCache = localStorage.getItem("floorsCache");

let mybr = document.createElement('br');

function input_check(){
  if (isNaN(floorWindows)  || isNaN(floors)){
    floorWindows = Math.random() * floorWindowsAllowed;
    floors = Math.random() * floorsAllowed;
  }
  if (typeof floorWindows == "number"){
    floorWindows = Math.round(floorWindows);
    floorWindows = Math.abs(floorWindows);
  }
  if (typeof floors == "number") {
    floors = Math.round(floors);
    floors = Math.abs(floors);
  }
}

input_check();

function max_limit_check() {
    if (floorWindows > floorWindowsAllowed) {
        floorWindows = floorWindowsAllowed;
    }

    if (floors > floorsAllowed) {
        floors = floorsAllowed;
    }
}
max_limit_check();

function chech_cache(){
  if (floorWindowsCache == null && floorsCache == null){
    localStorage.setItem("floorWindowsCache", floorWindows);
    localStorage.setItem("floorsCache", floors);
  }
  
  if (floorWindows == null && floors == null){
    floorWindows = floorWindowsCache;
    floors = floorsCache;
  }  
}
chech_cache();

totalWindows = floorWindows * floors;
localStorage.setItem("totalWindows", totalWindows);

homeList.append(`Всего в доме ${totalWindows} окошек!`);
homeList.innerHTML += "<br>";
homeList.innerHTML += "<br>";

function generate_table() {
    // get the reference for the body
    var body = document.getElementById("home");

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < floors; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < floorWindows; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            cell.classList.add("checkbox-style");
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "flat";
            checkbox.value = 1;
            checkbox.label = "";
            checkbox.id = j;
            //var cellText = document.createTextNode("cell in row "+i+", column "+j);
            //cell.appendChild(cellText);
            cell.appendChild(checkbox);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}

generate_table();