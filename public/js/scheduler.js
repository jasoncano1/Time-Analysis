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

// New function to handle frequency changes
const updateFrequency = () => {
  const frequencySelect = document.getElementById('frequencySelect');
  const startSelect = document.getElementById('startDate');
  const endSelect = document.getElementById('endDate');
  const frequency = frequencySelect.value;
  
  const uniqueDates = [...new Set(tasks.map(obj => obj.date.split('_')[0]))].sort();
  
  let dateOptions = [];
  
  if (frequency === 'day') {
    dateOptions = uniqueDates;
  } else if (frequency === 'week') {
    // Group by week - get unique week starts (Mondays)
    const weekStarts = [];
    uniqueDates.forEach(date => {
      const d = new Date(date.slice(3, 6) + ' ' + date.slice(6, 8) + ', ' + '20' + date.slice(8, 10));
      const monday = new Date(d);
      monday.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
      const weekKey = monday.toDateString().split(' ').join('');
      if (!weekStarts.includes(weekKey)) {
        weekStarts.push(weekKey);
      }
    });
    dateOptions = weekStarts.sort();
  } else if (frequency === 'month') {
    // Group by month
    const months = [];
    uniqueDates.forEach(date => {
      const monthKey = date.slice(3, 6) + date.slice(7, 10); // e.g., "Feb2025"
      if (!months.includes(monthKey)) {
        months.push(monthKey);
      }
    });
    dateOptions = months.sort();
  }
  
  // Update start date dropdown
  startSelect.innerHTML = dateOptions.map((date, index) => 
    `<option value="${date}" ${index === 0 ? 'selected' : ''}>${date}</option>`
  ).join('');
  
  // Update end date dropdown
  endSelect.innerHTML = dateOptions.map((date, index) => 
    `<option value="${date}" ${index === dateOptions.length - 1 ? 'selected' : ''}>${date}</option>`
  ).join('');
  
  // Update the graph with the new range
  updateDateRange();
};

// Updated graphData function to accept date parameters
const graphData = (start, end) => {
  let y_tasks = {};
  const frequency = document.getElementById('frequencySelect')?.value || 'day';
  
  // Filter tasks based on date range if provided
  const filteredTasks = start && end ? 
    tasks.filter(obj => {
      const taskDate = obj.date.split('_')[0];
      
      if (frequency === 'day') {
        return taskDate >= start && taskDate <= end;
      } else if (frequency === 'week') {
        const taskD = new Date(taskDate.slice(3, 6) + ' ' + taskDate.slice(6, 8) + ', ' + '20' + taskDate.slice(8, 10));
        const startD = new Date(start.slice(3, 6) + ' ' + start.slice(6, 8) + ', ' + '20' + start.slice(8, 10));
        const endD = new Date(end.slice(3, 6) + ' ' + end.slice(6, 8) + ', ' + '20' + end.slice(8, 10));
        return taskD >= startD && taskD <= new Date(endD.getTime() + 7 * 24 * 60 * 60 * 1000);
      } else { // month
        const taskMonth = taskDate.slice(3, 6) + taskDate.slice(7, 10);
        return taskMonth >= start && taskMonth <= end;
      }
    }) : tasks;
  
  // Group data based on frequency
  filteredTasks.map(obj => {
    let val = obj.date.split('_')[0];
    let key = val;
    
    if (frequency === 'week') {
      const d = new Date(val.slice(3, 6) + ' ' + val.slice(6, 8) + ', ' + '20' + val.slice(8, 10));
      const monday = new Date(d);
      monday.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1));
      key = monday.toDateString().split(' ').join('');
    } else if (frequency === 'month') {
      key = val.slice(3, 6) + val.slice(7, 10);
    }

    if (!Object.keys(y_tasks).includes(key)) {
      y_tasks[key] = [0, 0];
    }

    y_tasks[key][0] += 1;
    if (obj.status == 'done') {
      y_tasks[key][1] += 1;
    }
  });

  // Calculate appropriate divisor based on frequency
  let divisor = 9; // hours per day
  if (frequency === 'week') divisor = 45; // hours per week
  if (frequency === 'month') divisor = 180; // approximate hours per month

  var trace1 = {
    mode: "lines+markers",
    name: 'Quality',
    x: Object.keys(y_tasks),
    y: Object.values(y_tasks).map(arr => arr[0] / divisor * 100),
    line: { color: 'red' }
  };
  
  var trace2 = {
    mode: "bars",
    name: 'Efficiency',
    x: Object.keys(y_tasks),
    y: Object.values(y_tasks).map(arr => arr[1] / divisor * 100),
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
        <select id="frequencySelect" onchange="updateFrequency()">
          <option value="day" selected>Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        <select id="startDate" onchange="updateDateRange()">
          ${uniqueDates.map((date, index) => `<option value="${date}" ${index === 0 ? 'selected' : ''}>${date}</option>`).join('')}
        </select>
        <select id="endDate" onchange="updateDateRange()">
          ${uniqueDates.map((date, index) => `<option value="${date}" ${index === uniqueDates.length - 1 ? 'selected' : ''}>${date}</option>`).join('')}
        </select>
      </div>
      <div id='graph01'></div>
    </div>`;

  // Initialize with the full date range (first date to last date)
  graphData(uniqueDates[0], uniqueDates[uniqueDates.length - 1]);
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