var xmlhttp = new XMLHttpRequest()
var url = 'https://my.api.mockaroo.com/cars.json?key=a46fe600'
xmlhttp.open("GET", url, true)
xmlhttp.send()
xmlhttp.onreadystatechange = function()
{
    if(this.readyState == 4 && this.status == 200)
    {
        var data = JSON.parse(this.responseText)
        document.getElementById("loader").style.display="none";
        // CREATING TABLE
        let tableData=""
        data.map((subObj)=>{
        tableData+=
        `
        <tr>
            <td>${subObj.id_purchase}</td>
            <td>${subObj.car_make}</td>
            <td>${subObj.car_model}</td>
            <td>${subObj.car_year}</td>
            <td>${subObj.vin}</td>
            <td>${subObj.price}</td>
            <td>${subObj.purchase_date}</td>
        </tr>
        `
        })
        document.getElementById("table_body").innerHTML=tableData

        // CREATING CHARTS
        makes = []
        years = []
        chartKeys_Years = []
        chartValues_Years = []
        chartKeys_Makes = []
        chartValues_Makes = []
        KVpairs_Years = {}
        KVpairs_Makes = {}
        for (var o of data) // list of all years, makes in arrays
        {
            years.push(o.car_year)
            makes.push(o.car_make)
        }
        for (const num of years) // creating key value pair object
        {
            KVpairs_Years[num] = KVpairs_Years[num] ? KVpairs_Years[num] + 1 : 1;
        }
        for (const num of makes) // creating key value pair object
        {
            KVpairs_Makes[num] = KVpairs_Makes[num] ? KVpairs_Makes[num] + 1 : 1;
        }
        for (let k of Object.keys(KVpairs_Years)) // creating array out of the keys
        {
            chartKeys_Years.push(k)
        }
        for (let v of Object.values(KVpairs_Years))  // creating array out of the values
        {
            chartValues_Years.push(v)
        }
        for (let k of Object.keys(KVpairs_Makes)) // creating array out of the keys
        {
            chartKeys_Makes.push(k)
        }
        for (let v of Object.values(KVpairs_Makes))  // creating array out of the values
        {
            chartValues_Makes.push(v)
        }


        //year chart
        const chart1 = document.getElementById('canvas1').getContext('2d');
        const myChart1 = new Chart(chart1, {
            type: 'bar',
            data: {
                labels: chartKeys_Years,
                datasets: [{
                    label: 'Ammount',
                    data: chartValues_Years,
                    backgroundColor: [
                        'black'
                    ],
                    borderColor: [
                        'darkgray'
                    ],
                    hoverBackgroundColor:[
                        'darkgray'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }); 
        //year chart

        // making color array for polar chart
        polar_colors = []
        for(const i in chartKeys_Makes)
        {
            var n = Math.floor(Math.random() * 200)
            polar_colors.push(`rgb(${n}, ${n}, ${n})`)
        }

        //polar chart
        const chart2 = document.getElementById('canvas2').getContext('2d');
        const myChart2 = new Chart(chart2, {
            type: 'polarArea',
            data: {
                labels: chartKeys_Makes,
                  datasets: [{
                    label: 'Ammount',
                    data: chartValues_Makes,
                    backgroundColor: polar_colors
                  }]
            },
            options:{}
        });
        //polar chart

    } // if bracket

}


// BUTTON HANDLING
document.getElementById("show-year-chart").addEventListener("click", ()=>{
    document.getElementById("year-chart-container").style.display = "block"
    document.getElementById("data-table").style.display = "none"
    document.getElementById("make-chart-container").style.display = "none"
})

document.getElementById("show-data-table").addEventListener("click", ()=>{
    document.getElementById("year-chart-container").style.display = "none"
    document.getElementById("data-table").style.display = "block"
    document.getElementById("make-chart-container").style.display = "none"
})

document.getElementById("show-make-table").addEventListener("click", ()=>{
    document.getElementById("year-chart-container").style.display = "none"
    document.getElementById("data-table").style.display = "none"
    document.getElementById("make-chart-container").style.display = "block"
})