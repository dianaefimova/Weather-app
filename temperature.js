//Weather app by Diana Efimova 
const Source2 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature';

//Opening "Now" element by default
document.getElementById("default").click();

//Making a dropdown menu
function dropMenu() {
    document.getElementById("myDropdown").classList.toggle('show');
  }

  window.onclick = function(event) {
    if (!(event.target.matches('.dropdown') || event.target.matches('.dropbtn') || event.target.matches('#button'))) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
 
let temp = document.getElementById("button").innerHTML;
  
function getData(temperature, view, item) {
      console.log("Updating");
      let source = Source2;
      let content = document.getElementById("table2");

    
  if (item == 1) {
      document.getElementById("button").innerHTML = 'Now';
   
    }
  if (item == 2) {
    document.getElementById("button").innerHTML = '24 hours';
    source = source + "/23";

  }
  else if (item == 3) {
    document.getElementById("button").innerHTML = '48 hours';
    source = source + "/47";
  }
  else if (item == 4) {
    document.getElementById("button").innerHTML = '72 hours';
    source = source + "/71";
  }
  else if (item == 5) {
    document.getElementById("button").innerHTML = '1 week';
    source = source + "/167";
  }
//Fetching data keeping same details as in menu.js

fetch(source)
  .then(response => {
    
return response.json()
})
  .then(data => {
if (view == 4 && item == 1) {
data = selectData(data, temperature); 
}
content.innerHTML = jsonToHtml(data, view, temperature, item);
  makeGraph(data, view, temperature);
})
.catch(error => console.error('Something went wrong' + error));
}


function jsonToHtml (dataObj) {
  let counter = 0;
  var i=0;
  let content =`<div id = "table2">
  <table>
  <tr>
      <th>Number</th>
      <th>Temperature date</th>
      <th>Temperature time</th>
      <th>Temperature value</th>
  </tr>
  `;

    for (i = 0; i < dataObj.length; i++) {
      const object = dataObj[i];
        content +=  `
                        <tr>
                          <td>${i+1}</td>
                          <td>${object.date_time.slice(0, 10)}</td>
                          <td>${object.date_time.slice(11, 22)}</td>
                          <td>${object.temperature}</td>
                        </tr>
                      `;
        counter++;

  }
  return content;
}

//Getting time and date for the graph

function getDate (timeString) {
  let date = timeString.match(/(.+)T/);
  return date[1].split("-").reverse().join("-");
}
function getTime (timeString) {
  let time = timeString.match( /T(\d+:\d+:\d+)/);
  return time[1];
}

//Making a graph

function makeGraph (jsonData) {
  let category = [];
  let value = [];
  let data_type = 'Temperature';

  var graph = echarts.init(document.getElementById("graph2"));

    graphName = 'Temperature - ';
    if (document.getElementById("button").innerHTML == 'Select period') {
 
    }
    else {
      graphName += document.getElementById("button").innerHTML;
  }

    for(var i = 0; i < jsonData.length; i++) {
        let item = jsonData[i];

        category.push("\""+getTime(item.date_time)+"\"");
        value.push("\""+item.temperature+"\"");
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
    name: data_type,
    type: 'bar',
   data: JSON.parse(result_value)
}]};
graph.setOption(item);
}
