const Source3 = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction';

//Opening "Now" element by default
document.getElementById("default2").click();


function dropMenu2() {
    document.getElementById("myDropdown2").classList.toggle('show');
  }
 window.onclick = function(event) {
  if (!(event.target.matches('.dropdown2') || event.target.matches('.drop2btn') || event.target.matches('#button2'))) {
   var dropdowns = document.getElementsByClassName("dropdown-content2");
   var i;
  for (i = 0; i < dropdowns.length; i++) {
   var openDropdown = dropdowns[i];
  if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
}
  }
    }
     }
 
  let wind = document.getElementById("button2").innerHTML;
  

    function getData(wind_direction, view, item2) {
      console.log("Updating");
      let source = Source3;
      let content = document.getElementById("table3");

    
  if (item2 == 1) {
      document.getElementById("button2").innerHTML = 'Now';
   
    }
  if (item2 == 2) {
    document.getElementById("button2").innerHTML = '24 hours';
    source = source + "/23";

  }
  else if (item2 == button2) {
    document.getElementById("button2").innerHTML = '48 hours';
    source = source + "/47";
  }
  else if (item2 == 4) {
    document.getElementById("button2").innerHTML = '72 hours';
    source = source + "/71";
  }
  else if (item2 == 5) {
    document.getElementById("button2").innerHTML = '1 week';
    source = source + "/167";
  }

  fetch(source)
  .then(response => {
    
    return response.json()
    })
    .then(data => {
      if (view == 4 && item2 == 1) {
        data = selectData(data, wind_direction); 
      }

      content.innerHTML = jsonToHtml(data, view, wind_direction, item2);
      if (view > 1) makeGraph(data, view, wind_direction);
      }
    )
    .catch(error => console.error('Something went wrong' + error));
}

function jsonToHtml (dataObj) {
let content = ``;
const length = dataObj.length;
let counter = 0;
  var i=0;
  content = `<div id = "table3">
  <table>
  <tr>
      <th>Number</th>
      <th>Wind Direction date</th>
      <th>Wind Direction time</th>
      <th>Wind Direction value</th>
  </tr>
  `;

    for (i = 0; i < dataObj.length; i++) {
      const object = dataObj[i];
        content +=  `
                        <tr>
                          <td>${i+1}</td>
                          <td>${object.date_time.slice(0, 10)}</td> 
                          <td>${object.date_time.slice(11, 22)}</td>
                          <td>${object.wind_direction}</td>
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
  let data_type = 'wind_direction';

    var graph2 = echarts.init(document.getElementById("graph3"));

    graphName = 'Wind Direction - ';
    if (document.getElementById("button2").innerHTML == 'Select period') {
 
    }
    else {
      graphName += document.getElementById("button2").innerHTML;
  }

    for(var i = 0; i < jsonData.length; i++) {
        let item2 = jsonData[i];

        category.push("\""+getTime(item2.date_time)+"\"");
        value.push("\""+item2.wind_direction+"\"");
    }
  
  category= '['+category+']';
  var result_category = category.toString();

  value= '['+value+']';
  var result_value = value.toString();


  //Drawing a graph
 
 var item2 = {
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

graph2.setOption(item2);
}
