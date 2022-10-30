//Weather app by Diana Efimova
//All links:
const Source = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
const Source2 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature';
const Source3 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction';
const Source4 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed';
const Source5 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain';
const Source6 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light';

//Hiding id of temperature and wind direction
  var tabcontent = document.getElementsByClassName("content1");
 for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  var tabcontent2 = document.getElementsByClassName("content2");
  for (i = 0; i < tabcontent2.length; i++) {
    tabcontent2[i].style.display = "none";
  }

//Menus:
function dropMenu3() {
  document.getElementById("myDropdown3").classList.toggle('show'); //All measurements
}
function dropMenu4() {
  document.getElementById("myDropdown4").classList.toggle('show'); //All times
}

//Dropdowns
window.onclick = function(event) {

  if (!(event.target.matches('.dropdown3') || event.target.matches('.drop3btn') || event.target.matches('#button3'))) {
    var dropdown3 = document.getElementsByClassName("dropdown-content3");
    var i;
    for (i = 0; i < dropdown3.length; i++) {
      var open = dropdown3[i];
      if (open.classList.contains('show')) {
        open.classList.remove('show');
      }
    }
  }

  if (!(event.target.matches('.dropdown4') || event.target.matches('.drop4btn') || event.target.matches('#button4'))) {
    var dropdown4 = document.getElementsByClassName("dropdown-content4");
    var i;
    for (i = 0; i < dropdown4.length; i++) {
      var open = dropdown4[i];
      if (open.classList.contains('show')) {
        open.classList.remove('show');
      }
    }
  }

  if (event.target.matches('.item3')) {
    let temp = document.getElementById("P4").innerHTML;
    document.getElementById("P4").innerHTML = event.target.text + " - " + temp.split(" - ")[1];
    document.getElementById("button3").innerHTML = event.target.text;
  }
  else if (event.target.matches('.item4')) {
    let temp = document.getElementById("P4").innerHTML;
    document.getElementById("P4").innerHTML = temp.split(" - ")[0] + " - " + event.target.text;
    document.getElementById("button4").innerHTML = event.target.text;
  }
}

//Getting time data

function getData(views, measurements, item) {
  console.log("Updating");
  let source = '';
  content = document.getElementById("table4");
if (measurements == 0) {
  let name = document.getElementById("P4").innerHTML.split(" - ")[0];
  if (name == "Temperature") measurements=1;
  else if (name == "Wind direction") measurements=2;
  else if (name == "Wind speed") measurements=3;
  else if (name == "Rain") measurements=4;
  else if (name == "Light") measurements=5;
      }

if (item == 0) {
let time = document.getElementById("P4").innerHTML.split(" - ")[1];
  if (time == "Now") item=1;
  else if (time == "24 hours") item=2;
  else if (time == "48 hours") item=3;
  else if (time == "72 hours") item=4;
  else if (time == "1 week") item=5
      }

//Separate data using main table
  if (item == 1) {
source = Source;
}
  else {
  if (measurements == 1) source = Source2;
  else if (measurements == 2) source = Source3;
  else if (measurements == 3) source = Source4;
  else if (measurements == 4) source = Source5;
  else if (measurements == 5) source = Source6;
}

if (item == 1) {
  document.getElementById("button2").innerHTML = "Select period";
  document.getElementById("button").innerHTML = "Select period";
}
if (item == 2) {
  source = source + "/23";
}
else if (item == 3) {
  source = source + "/47";
}
else if (item == 4) {
  source = source + "/71";
}
else if (item == 5) {
  source = source + "/167";
}

//Fetching data 
  fetch(source).then(response => {
    return response.json()
    })
    .then(data => {
      if (views == 4 && item == 1) {
//Getting latest 25 measurements
        data = selectData(data, measurements); 
      }

      content.innerHTML = jsonToHtml(data, views, measurements, item);
      if (views > 1) makeGraph(data, views, measurements);
      })
    .catch(error => console.error('Something went wrong' + error));
}

//Getting latest 25 measurements for each data type
function selectData(dataObj, types, num = 25) {

  let counter = 0, i=0;
  let obj = {};
  let obj2 = {};
  let object = {};

  if (types == 1) data_type = "temperature";
  else if (types == 2) data_type = "wind_direction";
  else if (types == 3) data_type = "wind_speed";
  else if (types == 4) data_type = "rain";
  else if (types == 5) data_type = "light";

  while (!(counter == num || i==dataObj.length))  {
  object = dataObj[i];
    for (const property in object.data) {
  var value = object.data[property];
  obj = {};
    if (property == data_type) {
      obj.date_time = object.date_time;
      obj[property] = value;
      obj2[counter] = obj;

counter++;
}
  i++;
}}

obj = {};
  for (i = 0; i < Object.keys(obj2).length; i++) {
    obj[i] = obj2[Object.keys(obj2).length -1 - i];
}

  return obj;
}

function jsonToHtml (dataObj, views, measurements) {
  let content = ``;
  const length = dataObj.length;
  let data_type = '';

    if (measurements == 1) data_type = "temperature";
    else if (measurements == 2) data_type = "wind_direction";
    else if (measurements == 3) data_type = "wind_speed";
    else if (measurements == 4) data_type = "rain";
    else if (measurements == 5) data_type = "light";

    let counter = 0;
    var i=0;
    content = `
    <table>
    <tr>
        <th>Number</th>
        <th>Date</th>
        <th>Time</th>
        <th>${document.getElementById("P4").innerHTML.split(" - ")[0]}</th>
    </tr>
    `;
for (i = 0; i < Object.keys(dataObj).length; i++) {
  const object = dataObj[i];
  content +=  `
  <tr>
    <td>${i+1}</td>
    <td>${object.date_time.slice(0, 10)}</td>
    <td>${object.date_time.slice(11, 22)}</td>
    <td>${object[data_type]}</td>
  </tr>
                            `;
  counter++;
}
  content += `</table> `;
  return content;
}

//Making graphs

function getDate (timeString) {
  let result = timeString.match(/(.+)T/);
  return result[1].split("-").reverse().join("-");
}
function getTime (timeString) {
  let result = timeString.match( /T(\d+:\d+:\d+)/);
  return result[1];
}

function makeGraph (jsonData, pagenumber, measurements) {

  let category = [];
  let value = [];
  let data_type = '';

  var graph = echarts.init(document.getElementById("graph4"));
  graphName = '';
  
   if (pagenumber==4) {
   if (measurements == 1) data_type = "temperature";
      else if (measurements == 2) data_type = "wind_direction";
      else if (measurements == 3) data_type = "wind_speed";
      else if (measurements == 4) data_type = "rain";
      else if (measurements == 5) data_type = "light";
  graphName = document.getElementById("P4").innerHTML;

  for (let i = 0; i < Object.keys(jsonData).length; i++) {
        var item = jsonData[i];

  category.push("\""+getTime(item.date_time)+"\"");
  value.push("\""+item[data_type]+"\"");
            }
  }
  category= '['+category+']';
  var result_category = category.toString();

  value= '['+value+']';
  var result_value = value.toString();


  //Drawing a graph
  var item = {
  title: {
  text: graphName,
  left: 'center',
},
  tooltip: {},
  legend: {
  data:['']
},
  xAxis: {
  axisLabel: {
  mininterval: 1.5,
  rotate: 60
},
  data: JSON.parse(result_category)
},
   yAxis: {
   gridLines: {
   color: "dark blue"
},},
  series: [{
  axisLabel : {
  formatter: '{value} °C'
},
  time: data_type,
  type: 'bar',
  data: JSON.parse(result_value)
}]};

    item.series[0].type = "line";
  
graph.setOption(item);
}
