let day;
let hour;
let data;
let data2;
let tasks;
let layout;
let monday;
let friday;
let layout2;
let user_id;
let tuesday;
let weekdays;
let thursday;
let checkbox;
let username;
let wednesday;
let totalDone = 0;
let d = new Date();
let totalHours = 45;
let totalScheduled = 0;
let nextMonday = Date.now();
const h24 = 60 * 60 * 24 * 1000;
const main = document.getElementById('main');
const nextWk = document.getElementById('nextWeek');
const prevWk = document.getElementById('prevWeek');
const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

const getWkDays = d => {
  monday = new Date(d.getDay != 1 ? d - (d.getDay() - 1) * 86400000 : d).toDateString().split(' ').join('');
  tuesday = new Date(d.getDay != 1 ? d - (d.getDay() - 2) * 86400000 : d).toDateString().split(' ').join('');
  wednesday = new Date(d.getDay != 1 ? d - (d.getDay() - 3) * 86400000 : d).toDateString().split(' ').join('');
  thursday = new Date(d.getDay != 1 ? d - (d.getDay() - 4) * 86400000 : d).toDateString().split(' ').join('');
  friday = new Date(d.getDay != 1 ? d - (d.getDay() - 5) * 86400000 : d).toDateString().split(' ').join('');
  return [monday, tuesday, wednesday, thursday, friday];
};

const init = async d => {
  localStorage.getItem("username")
    ? (
      username = localStorage.getItem('username'),
      document.getElementById('username').innerHTML = `Welcome ${username}`,
      user_id = localStorage.getItem('user_id')
      // localStorage.clear()
    )
    : (window.location.href = "/");

  await populateWk(d);
  renderGauges();
};

const renderToday = () => {
  d = new Date();
  nextMonday = Date.now();

  main.classList.toggle("slideRightOut", true);
  setTimeout(() => {
    main.innerHTML = "";
    d = new Date(nextMonday);
    init(d);
  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideRightOut", false);
  }, 1000);

  main.scrollTo({
    left: document.querySelector('.present').getBoundingClientRect().x - main.getBoundingClientRect().x,
    behavior: 'smooth'
  });
};

const renderNextWeek = () => {
  if (new Date(nextMonday).getDay() == 1) nextMonday = nextMonday + h24;

  while (new Date(nextMonday).getDay() != 1) {
    nextMonday = nextMonday + h24;
  };

  main.classList.toggle("slideLeftOut", true);
  setTimeout(() => {
    main.innerHTML = "";
    d = new Date(nextMonday);
    init(d);
  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideLeftOut", false);
  }, 1000);
};

const populateWk = async d => {
  weekdays = getWkDays(d);
  tasks = tasks || await getUser(username);
  dateTimes = tasks.map(obj => obj.date);

  totalDone = 0;
  totalScheduled = 0;
  main.innerHTML = '';

  weekdays.forEach((date, i) => {

    dateTimes.forEach(dayTime => {
      if (dayTime.includes(date)) {
        totalScheduled += 1;

        if (tasks.find(obj => obj.date == dayTime).status == "done") {
          totalDone += 1
        };
      };
    });

    main.innerHTML += `
    <section id=${date} class=${new Date() - d > 86400000 ? "past" :
        new Date() - d < -86400000 ? "future" :
          i + 1 < d.getDay() ? "past" :
            i + 1 == d.getDay() ? "present" : "future"
      }>

      <h5>${i == 0 ? `Monday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` :
        i == 1 ? `Tuesday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` :
          i == 2 ? `Wednesday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` :
            i == 3 ? `Thursday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` : `Friday<br>${date.slice(3, 6)} ${date.slice(6, 8)}`
      }</h5>
    </section>`;

    let div = document.getElementById(date);
    hours.forEach(hour => {
      let str = `${date}_${hour}`
      let task = tasks?.find(({ date }) => date == str)?.task || '';
      let status = tasks?.find(({ date }) => date == str)?.status || '';

      div.innerHTML +=
        div.classList.contains("past") ?
          `
            <div>
              <h5>${hour}</h5>
              <input class="_${hour}" disabled value="${task}" />
              <input class="_${hour}" disabled type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
          ` :
          div.classList.contains("future") ?
            `
            <div>
              <h5>${hour}</h5>
              <input class="_${hour}" onChange="handleChange('${date}_${hour}')" value="${task}" />
              <input class="_${hour}" disabled type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
         `:
            `
            <div>
              <h5>${hour}</h5>
              <input class="_${hour}" onChange="handleChange('${date}_${hour}')" value="${task}" />
              <input class="_${hour}" onChange="handleChange('${date}_${hour}')" type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
          `;
      status == "done"
        ? div.querySelector(`._${hour}`).style.textDecoration = "line-through"
        : div.querySelector(`._${hour}`).style.textDecoration = "none";
    });
  });
};

const handleChange = async dayTime => {

  let [b, h] = dayTime.split("_");
  let day = document.getElementById(b);
  let hour = day.querySelector(`._${h}`);
  checkbox = day.querySelector(`._${h}[type=checkbox]`);

  checkbox.checked == false
    ? (
      hour.style.textDecoration = "none"
    ) : (
      hour.style.textDecoration = "line-through"
    );

  tasks = tasks.filter(obj => obj.date !== dayTime);
  let newTask = { user_id, date: dayTime, task: hour.value, status: checkbox.checked ? "done" : "pending" };
  tasks.push(newTask);
  tasks = tasks.filter(obj => obj.task !== "");

  await fetch(`/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  }).then(res => {
    () => init(d);
  });
};

const renderPreviousWeek = () => {
  nextMonday = nextMonday - 7 * h24;
  while (new Date(nextMonday).getDay() != 1) {
    nextMonday = nextMonday - h24
  };

  main.classList.toggle("slideRightOut", true);
  setTimeout(() => {
    main.innerHTML = "";
    d = new Date(nextMonday);
    init(d);
  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideRightOut", false);
  }, 1000);
};

const renderGauges = () => {

  data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalScheduled / totalHours * 100,
      title: { text: "Quality" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: "red" },
        steps: [
          { range: [0, 50], color: "black" },
          { range: [51, 74], color: "yellow" },
          { range: [75, 100], color: "green" }
        ]
      }
    }
  ];

  layout = { width: 300, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart1', data, layout);

  data2 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalDone / (totalScheduled == 0 ? 45 : totalScheduled) * 100,
      title: { text: "Efficiency" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 },
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: "red" },
        steps: [
          { range: [0, 50], color: "black" },
          { range: [51, 74], color: "yellow" },
          { range: [75, 100], color: "green" }
        ]
      }
    }
  ];

  layout2 = { width: 300, height: 250, paper_bgcolor: 'transparent' };
  Plotly.newPlot('chart2', data2, layout2);

  data = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 100 },
      value: totalScheduled / totalHours * 100,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Quality" }
    }
  ];

  layout = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 } };
  Plotly.newPlot('chart1b', data, layout);

  data2 = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 100 },
      value: totalDone / (totalScheduled == 0 ? 45 : totalScheduled) * 100,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Efficiancy" }
    }
  ];

  layout = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 } };
  Plotly.newPlot('chart2b', data2, layout);
};

const getUser = async username => await (await fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username })
})).json();

// Updated graphData function to accept date parameters
const graphData = (start, end) => {
  let y_tasks = {};
  
  // Filter tasks based on date range if provided
  const filteredTasks = start && end ? 
    tasks.filter(obj => {
      const taskDate = obj.date.split('_')[0];
      return taskDate >= start && taskDate <= end;
    }) : tasks;
  
  filteredTasks.map(obj => {
    let val = obj.date.split('_')[0];

    if (!Object.keys(y_tasks).includes(val)) {
      y_tasks[val] = [0, 0];
    }

    y_tasks[val][0] = filteredTasks.filter(task => task.date.includes(val)).length;
    y_tasks[val][1] = filteredTasks.filter(task => task.date.includes(val)).filter(task => task.status == 'done').length;
  });

  var trace1 = {
    mode: "lines+markers",
    name: 'Quality',
    x: Object.keys(y_tasks),
    y: Object.values(y_tasks).map(arr => arr[0] / 9 * 100),
    line: { color: 'red' }
  };
  
  var trace2 = {
    mode: "bars",
    name: 'Efficiency',
    x: Object.keys(y_tasks),
    y: Object.values(y_tasks).map(arr => arr[1] / 9 * 100),
    line: { color: 'green' }
  };

  var data = [trace1, trace2];

  var layout = {
    autosize: true,
    margin: { l: 75, r: 50, t: 20, b: 130 },
    width: 600,
    height: 300
  };

  Plotly.newPlot('graph01', data, layout);
};

// New function to handle date range updates
const updateDateRange = () => {
  // Get the selected values from the dropdowns
  const startSelect = document.getElementById('startDate');
  const endSelect = document.getElementById('endDate');
  
  if (!startSelect || !endSelect) return;
  
  const startDate = startSelect.value;
  const endDate = endSelect.value;
  
  // Get all unique dates from tasks
  const allDates = [...new Set(tasks.map(obj => obj.date.split('_')[0]))].sort();
  
  // Find the index of the selected start date
  const startIndex = allDates.indexOf(startDate);
  
  // Update the end date dropdown to only show dates after the start date
  endSelect.innerHTML = '';
  
  for (let i = startIndex; i < allDates.length; i++) {
    const option = document.createElement('option');
    option.value = allDates[i];
    option.textContent = allDates[i];
    
    // Keep the previously selected end date if it's still valid
    if (allDates[i] === endDate && i >= startIndex) {
      option.selected = true;
    }
    
    endSelect.appendChild(option);
  }
  
  // If the current end date is before the start date, select the first valid option
  if (endSelect.selectedIndex === -1 && endSelect.options.length > 0) {
    endSelect.selectedIndex = 0;
  }
  
  // Update the graph with the new date range
  graphData(startDate, endSelect.value);
};

// Updated analysisGraph function
const analysisGraph = () => {
  const uniqueDates = [...new Set(tasks.map(obj => obj.date.split('_')[0]))].sort();
  
  main.innerHTML = `
    <div>
      <div id='control01'>
        <h2>Time Analysis</h2>
        <select id="startDate" onchange="updateDateRange()">
          ${uniqueDates.map(date => `<option value="${date}">${date}</option>`).join('')}
        </select>
        <select id="endDate" onchange="updateDateRange()">
          ${uniqueDates.map(date => `<option value="${date}">${date}</option>`).join('')}
        </select>
      </div>
      <div id='graph01'></div>
    </div>`;

  // Initialize with the full date range
  updateDateRange();
};

init(d);
today.onclick = renderToday;

signOut.onclick = () => {
  localStorage.clear();
  window.location.href = "/";
};

// Fixed: removed duplicate analysis.onclick assignments
nextWk.onclick = () => renderNextWeek(nextMonday);
prevWk.onclick = () => renderPreviousWeek(nextMonday);
analysis.onclick = analysisGraph;