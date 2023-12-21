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

  document.getElementById('centerValue').innerText = sum + '%';


 
function updateChart(year, timePeriod) {
  fetch('json/data.json')
    .then(response => response.json())
    .then(data => {
      const selectedData = data[year][timePeriod];
      linechart.data.labels = selectedData.labels;
      linechart.data.datasets[0].data = selectedData.datasets[0].data;
      linechart.update();
    })
    
    .catch(error => {
      console.error('Fetch error:', error);
    });
}


  var canvas = document.getElementById('linechart');
  var ctx = canvas.getContext('2d');
  var gradient = ctx.createLinearGradient(300, 0, 500, 0);
  gradient.addColorStop(1, 'rgb(255, 58, 76)');
  gradient.addColorStop(0, 'rgb(255, 185, 108)');

  var gradientFill = ctx.createLinearGradient(300, 0, 500, 0);
  gradientFill.addColorStop(1, 'rgba(255, 58, 76, 0.1)');
  gradientFill.addColorStop(0, 'rgba(255, 185, 108, 0.1)');

  const hoverLine = {
    id: 'hoverLine',
    afterDatasetDraw(chart, args, plugins) {
      const { ctx, tooltip, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart
      if (tooltip._active.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex)
        const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y)
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = gradient//'rgba(255, 58, 76, 0.1)'
        ctx.moveTo(xCoor, yCoor)
        ctx.lineTo(xCoor, bottom)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }

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
      },
      layout: {
        padding: 15
      }
    },
    plugins: [hoverLine]
  });

  const yearSelect = document.getElementById('yearSelect');
  const timePeriodSelect = document.getElementById('timePeriodSelect');

  yearSelect.addEventListener('change', function() {
    updateChart(yearSelect.value, timePeriodSelect.value);
  });

  timePeriodSelect.addEventListener('change', function() {
    updateChart(yearSelect.value, timePeriodSelect.value);
  });
};



const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), 
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), 
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { 
        
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 
        
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { 
            
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar(); 
    });
});
