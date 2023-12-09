window.onload = function() {
  var canvas = document.getElementById('donut');
  var ctx = canvas.getContext('2d');

  var donut = new Chart(ctx, {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [20, 20, 35, 25],
              backgroundColor: [
                  'rgba(88, 222, 182, 1)', // #58deb6 на 60deg
                  'rgba(98, 167, 255, 1)', // #62a7ff на 60deg
                  'rgba(237, 237, 237, 1)', // #ededed на 150deg
                  'rgba(255, 179, 94, 1)' // #ffb35e на 90deg
              ],
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: 67
      }
  });

  var sum = donut.data.datasets[0].data.reduce((a, b) => a + b, 0);

  // document.getElementById('centerText').innerText = 'Центр';
  document.getElementById('centerValue').innerText = sum + '%';



 





  var canvas = document.getElementById('linechart');
  var ctx = canvas.getContext('2d');
  var gradient = ctx.createLinearGradient(300, 0, 500, 0);
  gradient.addColorStop(1, 'rgb(255, 58, 76)');
  gradient.addColorStop(0, 'rgb(255, 185, 108)');

  var gradientFill = ctx.createLinearGradient(300, 0, 500, 0);
  gradientFill.addColorStop(1, 'rgba(255, 58, 76, 0.1)');
  gradientFill.addColorStop(0, 'rgba(255, 185, 108, 0.1)');
  var linechart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
      datasets: [{
        data: [210, 150, 130, 160, 220, 250, 240, 210, 170, 150, 145, 165, 220, 300],
        fill: true,
        cubicInterpolationMode: 'monotone',
        pointStyle: false,
        backgroundColor: gradientFill,
        borderColor: gradient,
        tension: 0.8,
      }]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
            color: 'orange',
            borderColor: 'orange',
          },
          ticks: {
            backdropPadding: 10
          }
        },
        y: {
          min: 0,
          max: 500,
          ticks: {
            stepSize: 100,
            backdropPadding: 20
          },
          grid: {
            padding: 50,
            color: '#ffcb84',
            borderWidth: 0,
            borderDash: [10]
          }
        },
      },
      plugins: {
        legend: false,
      //   annotation: {
      //     annotations: [{
      //       id: 'verticalLine',
      //       type: 'line',
      //       mode: 'vertical',
      //       scaleID: 'x',
      //       value: 'Mar',
      //       borderColor: 'black',
      //       borderWidth: 2,
      //       label: {
      //         content: 'Hovering Line',
      //         enabled: false
      //       }
      //     }]
      //   }
      // },
      // onHover: function(event, elements) {
      //   if (elements.length > 0) {
      //     var chartInstance = this.chart;
      //     var meta = chartInstance.getDatasetMeta(0);
      //     var xPos = meta.data[elements[0].index].x;
      //     var verticalLine = chartInstance.annotation.elements.verticalLine;
          
      //     verticalLine.options.value = xPos;
      //     verticalLine.options.label.enabled = true;
      //     chartInstance.update();
      //   }
      },
      layout: {
        padding: 15
      }
    }
  });
};

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
 // afterDraw: chart => {
          //   var ctx = chart.chart.ctx;
          //   var xAxis = chart.scales['x-axis-0'];
          //   var yAxis = chart.scales['y-axis-0'];
          //   var data = chart.data.datasets[0].data; // Отримання масиву даних з графіку
          //   xAxis.ticks.forEach((value, index) => {
          //     var x = xAxis.getPixelForTick(index);
          //     var yTop = yAxis.getPixelForValue(data[index]);
          //     ctx.save();
          //     ctx.strokeStyle = '#aaaaaa';
          //     ctx.beginPath();
          //     ctx.moveTo(x, yAxis.bottom);
          //     ctx.lineTo(x, yTop);
          //     ctx.stroke();
          //     ctx.restore();
          //   });
          // }

// const ctx = document.getElementById('linechart').getContext('2d');
// const gradient = ctx.createLinearGradient(0, 0, 0, 400);

// gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
// gradient.addColorStop(1, 'rgb(255, 91, 91)');

// const linechart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//         datasets: [{
//             label: 'My First Dataset',
//             data: [45, 33, 50, 40, 60, 65, 50, 75, 60, 70],
//             fill: true,
//             cubicInterpolationMode: 'monotone',
//             pointStyle: false,
//             backgroundColor: gradient,
//             borderColor: 'rgb(255, 91, 91)',
//             tension: 0.1,
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//             },
//         },
//         legend: {
//             display: false,
//         },
//         scales: {
//             x: {
//                 grid: {
//                     display: false
//                 }
//             },
//             y: {
//                 grid: {
//                     display: false
//                 },
//                 beginAtZero: true,
//                 max: 100,
//                 min: 0,
//                 ticks: {
//                     stepSize: 25,
//                 }
//             }
//         },
//         backgroundColor: gradient
//     },
// });


// id:'hoverLine',
          // afterDatasetsDraw(chart,args,plugins){
          //   const{ ctx, tooltip, chartArea:{top,bottom,left,right,width,heigth}, scales:{x, y}}=chart;
          //   if(tooltip._active.length > 0) {

          //     const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
              
          //     const yCoor=y.getPixelForValue(tooltip.dataPoints[0].parsed.y);
              
          //     ctx.save();
              
          //     ctx.beginPath();
              
          //     ctx.lineWidth = 3;
              
          //     ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
              
          //     ctx.moveTo(xCoor, yCoor);
              
          //     ctx.lineTo(xCoor, bottom);
              
          //     ctx.stroke();
              
          //     ctx.closePath();
          //   }
          // },
          // afterDraw: chart => {
          //   if (chart.tooltip?._active?.length) {
          //     let x = chart.tooltip._active[0].element.x;
          //     let yAxis = chart.scales.y;
          //     let ctx = chart.ctx;
          //     ctx.save();
          //     ctx.beginPath();
          //     ctx.setLineDash([5, 5]);
          //     ctx.moveTo(x, yAxis.top);
          //     ctx.lineTo(x, yAxis.bottom);
          //     ctx.lineWidth = 1;
          //     ctx.strokeStyle = 'rgba(0, 0, 255, 0.4)';
          //     ctx.stroke();
          //     ctx.restore(); 
          //   }
          // },