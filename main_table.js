const Source = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
function jsonToHtml (dataObj) {
    let content = `<div id = "table">
    <table>
    <tr>
        <th>Number</th>
        <th>Measurenment date</th>
        <th>Measurenment time</th>
        <th>measurenment type</th>
        <th>measurenment value</th>
    </tr>
    `;
    const length = 30;
    for(let i = 0; i<length; i++) {
        const object = dataObj[i];
        const date = object.date_time;
        const day = date.substring(0, date.indexOf('T'));
        const time = date.substring(date.indexOf('T')+1, date.indexOf('.'));
        content += `
        <td>${i+1}</td>
        <td>${day}</td>
        <td>${time}</td>
        <td>${Object.keys(object.data)}</td>
        <td>${Object.values(object.data)}</td>
        </tr>
        `;
    
    }
    content += `
    </table>
    </div>
    `;
    return content;
}

function getList () {
    fetch(Source).then(response => {
        return response.json()
    })
    .then(data => {
        let content = document.getElementById("table");
        content.innerHTML = jsonToHtml(data);
    })
    .catch(error => console.error('Something went wrong' + error));
}
getList();

