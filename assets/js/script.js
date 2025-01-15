
let d = new Date();
let monday = new Date(d.getDay != 1 ? d - (d.getDay() - 1) * 86400000 : d).toDateString().split(' ').join('');
let tuesday =new Date(d.getDay != 1 ? d - (d.getDay() - 2) * 86400000 : d).toDateString().split(' ').join('');
let wednesday = new Date(d.getDay != 1 ? d - (d.getDay() - 3) * 86400000 : d).toDateString().split(' ').join('');
let thursday = new Date(d.getDay != 1 ? d - (d.getDay() - 4) * 86400000 : d).toDateString().split(' ').join('');
let friday = new Date(d.getDay != 1 ? d - (d.getDay() - 5) * 86400000 : d).toDateString().split(' ').join('');

let store = [];
let main = document.getElementById('main');

const handleStorage = async () => {

  store = await localStorage.dayTime ? JSON.parse(localStorage.dayTime) : {};

  let keys = Object.keys(store)

  if (keys) {
    keys.forEach(dayTime => {
      let [d, h] = dayTime.split("_");
      let day = document.getElementById(d);

      let hour = day.querySelector(`._${h}`);
      let checkbox = day.querySelector(`._${h}[type=checkbox]`);
      let value = store[dayTime].split("_");
      hour.value = value[0];

      if (value[1]) {
        checkbox.checked = true;
        hour.style.textDecoration = "line-through";
      }
    });
  }

  let totalDone = 0;
  let totalHours = 0;
  let totalScheduled = 0;

  weekdays.forEach((day, i) => {
    if (i + 1 < d.getDay()) {
      totalHours += 9;

      keys.forEach(dayTime => {
        if (dayTime.includes(day)) {
          totalScheduled += 1;

          if (store[dayTime].includes("done")) {
             totalDone += 1
          };
        };
      });
    }
  });

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalScheduled / totalHours * 100,
      title: { text: "Quality" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: { axis: { range: [null, 100] } }
    }
  ];

  var layout = { width: 300, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart1', data, layout);

  var data2 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalDone / totalScheduled * 100,
      title: { text: "Efficiency" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: { axis: { range: [null, 100] } }
    }
  ];

  var layout2 = { width: 300, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart2', data2, layout2);

  var data = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 100 },
      value: 50,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Quality" }
    }
  ];
  
  var layout = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 }};
  Plotly.newPlot('chart1b', data, layout);
  


  var data = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 100 },
      value: 50,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Efficiancy" }
    }
  ];
  
  var layout = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 }};
  Plotly.newPlot('chart2b', data, layout);
};

handleStorage();

currentDay.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;
currentDay2.innerText = `${d.toDateString()}, ${d.toLocaleTimeString()}`;

const weekdays = [monday, tuesday, wednesday, thursday, friday];
const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

weekdays.forEach((date, i) => {

  main.innerHTML += `
    <section id=${date} class=${i + 1 < d.getDay() ? "past" : i + 1 == d.getDay() ? "present" : "future"} >
      <h5>${
        i==0 ? 'Monday' : 
        i==1 ? 'Tuesday' :
        i==2 ? 'Wednesday' :
        i==3 ? 'Thursday' : 'Friday'
      }</h5>
    </section>`;

  let div = document.getElementById(date);
  hours.forEach(hour => {
    div.innerHTML +=
      div.classList.contains("past") ?
        `
      <div>
      <h5>${hour}</h5>
      <input class="_${hour}" disabled />
      <input class="_${hour}" disabled type="checkbox" />
      </div>
      ` :
        div.classList.contains("future") ?
          `
          <div>
            <h5>${hour}</h5>
            <input class="_${hour}" onChange="handleChange(this, '${date}_${hour}')" />
            <input class="_${hour}" disabled type="checkbox" />
          </div>
        `:
          `
          <div>
            <h5>${hour}</h5>
            <input class="_${hour}" onChange="handleChange(this, '${date}_${hour}')" />
            <input class="_${hour}" onChange="handleCheck('${date}_${hour}')" type="checkbox" />
          </div>
        `
  });
});

const handleChange = (e, dayTime) => {
  store[dayTime] = e.value;
  localStorage.dayTime = JSON.stringify(store);
}

const handleCheck = dayTime => {
  let value = store[dayTime];
  let [d, h] = dayTime.split("_");
  let day = document.getElementById(d);
  let hour = day.querySelector(`._${h}`);
  let checkbox = day.querySelector(`._${h}[type=checkbox]`);

  value.includes("done") 
    ? (
      value = value.replace("_done", ""),
      hour.style.textDecoration = "none"
    ) : (
      value = `${value}_done`,
      hour.style.textDecoration = "line-through"
    );

  store[dayTime] = value;
  localStorage.dayTime = JSON.stringify(store);
};

