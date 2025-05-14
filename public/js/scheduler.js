
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

const graphData = (start,end) => {

  let y_tasks = {};
  
  tasks.map(obj => {
    let val = obj.date.split('_')[0];

    if (!Object.keys(y_tasks).includes(val)) {
      y_tasks[val] = [0,0];
    };

    y_tasks[val][0] = tasks.filter(obj=>obj.date.includes(val)).length;
    y_tasks[val][1] = tasks.filter(obj=>obj.date.includes(val)).filter(obj=>obj.status=='done').length;
  });

  var trace1 = {
    mode: "lines+markers",
    name: 'Quality',
    x: Object.keys(y_tasks),
    y: Object.values(y_tasks).map(arr=>arr[0]/9*100),
    line: { color: 'red' }
  }
  
  var trace2 = {
    mode: "bars",
    name: 'Efficiency',
    x:  Object.keys(y_tasks),
    y: Object.values(y_tasks).map(arr=>arr[1]/9*100),
    line: { color: 'green' }
  }

  var data = [trace1, trace2];

  var layout = {
    autosize: true,
    margin: { l:75, r:50, t:20, b:130 },
    width: 600,
    height: 300
  };

  Plotly.newPlot('graph01', data, layout)
}

const analysisGraph = () => {
  main.innerHTML = `
    <div>
      <div id='control01'>
        <h2>Time Analysis</h2>
        <select onchage="graphData()">
          ${[... new Set(tasks.map(obj=>`<option> ${obj.date.split('_')[0]}</option>`))]}
        </select>
        <select onchage="graphData()">
        ${[... new Set(tasks.map(obj=>`<option> ${obj.date.split('_')[0]}</option>`))]}
        </select>
      </div>
      <div id = 'graph01'></div>
    </div>`;

    graphData();
};

init(d);
today.onclick = renderToday;

signOut.onclick = () => {
  localStorage.clear();
  window.location.href = "/";
};

analysis.onclick = () => {
  main.classList.toggle("slideLeftOut", true);
  setTimeout(() => {

    main.innerHTML = "";

    var data = [
      {
        x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
        y: [1, 3, 6],
        type: 'scatter'
      }
    ];

    Plotly.newPlot('main', data);

  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideLeftOut", false);
  }, 1000);
}

nextWk.onclick = () => renderNextWeek(nextMonday);
prevWk.onclick = () => renderPreviousWeek(nextMonday);
analysis.onclick = analysisGraph;let day;
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

// --- Existing functions - UNCHANGED AS PER YOUR REQUEST ---
const getWkDays = d => {
  monday = new Date(d.getDay() != 1 ? d - (d.getDay() - 1) * 86400000 : d).toDateString().split(' ').join('');
  tuesday = new Date(d.getDay() != 1 ? d - (d.getDay() - 2) * 86400000 : d).toDateString().split(' ').join('');
  wednesday = new Date(d.getDay() != 1 ? d - (d.getDay() - 3) * 86400000 : d).toDateString().split(' ').join('');
  thursday = new Date(d.getDay() != 1 ? d - (d.getDay() - 4) * 86400000 : d).toDateString().split(' ').join('');
  friday = new Date(d.getDay() != 1 ? d - (d.getDay() - 5) * 86400000 : d).toDateString().split(' ').join('');
  return [monday, tuesday, wednesday, thursday, friday];
};

const init = async d => {
  localStorage.getItem("username")
    ? (
      username = localStorage.getItem('username'),
      document.getElementById('username').innerHTML = `Welcome ${username}`, // Assuming 'username' element exists
      user_id = localStorage.getItem('user_id')
    )
    : (window.location.href = "/");

  // Ensure tasks are loaded for the initial view.
  // If tasks are not already populated, getUser will be called.
  // If tasks are populated by a previous action, it might use the existing ones,
  // depending on the logic `tasks = tasks || await getUser(username)` in populateWk
  if (!tasks) { // Explicitly load tasks if they are not already there
      tasks = await getUser(username);
  }

  await populateWk(d);
  renderGauges();
};

const renderToday = () => {
  d = new Date();
  nextMonday = Date.now();

  main.classList.toggle("slideRightOut", true);
  setTimeout(() => {
    main.innerHTML = "";
    d = new Date(nextMonday); // This seems to intend to set 'd' for the init call
    init(new Date()); // Initialize with the actual current date for 'today'
  }, 500);
  setTimeout(() => {
    main.classList.toggle("slideRightOut", false);
    // Scroll to present after content is loaded
    const presentElement = document.querySelector('.present');
    if (presentElement) {
        main.scrollTo({
            left: presentElement.getBoundingClientRect().x - main.getBoundingClientRect().x,
            behavior: 'smooth'
        });
    }
  }, 1000);
};

const renderNextWeek = () => {
  if (new Date(nextMonday).getDay() == 1) nextMonday = nextMonday + h24; // Small fix: ensure it moves if already Monday

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
  tasks = tasks || await getUser(username); // This loads tasks if 'tasks' is null/undefined
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
    
    // Original logic for past/present/future class based on 'd' and 'i'
    let dayClass = "future"; // Default
    const todayDate = new Date(); todayDate.setHours(0,0,0,0);
    const iterDate = new Date(date.replace(/(\w{3})(\w{3})(\d{2})(\d{4})/, '$1 $2 $3 $4')); iterDate.setHours(0,0,0,0);

    if (iterDate < todayDate) {
        dayClass = "past";
    } else if (iterDate.getTime() === todayDate.getTime() && d.toDateString() === todayDate.toDateString()) {
        // More precise 'present' check, especially if 'd' is not today
        if (i + 1 === new Date().getDay() || (new Date().getDay() === 0 && i === 4) || (new Date().getDay() === 6 && i === 0) ){ // handles Sunday/Saturday as well
             dayClass= "present";
        } else if (iterDate.getTime() === new Date(d).setHours(0,0,0,0) && iterDate.getDay() === (i+1)%7 ) { // check current day of the week being processed
            dayClass="present";
        }
    }
     // Simpler way from original, might need refinement depending on how 'd' is used:
     // class=${new Date() - d > 86400000 ? "past" : new Date() - d < -86400000 ? "future" : i + 1 < d.getDay() ? "past" : i + 1 == d.getDay() ? "present" : "future"}

    main.innerHTML += `
    <section id=${date} class=${dayClass}>
      <h5>${i == 0 ? `Monday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` :
        i == 1 ? `Tuesday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` :
          i == 2 ? `Wednesday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` :
            i == 3 ? `Thursday<br>${date.slice(3, 6)} ${date.slice(6, 8)}` : `Friday<br>${date.slice(3, 6)} ${date.slice(6, 8)}`
      }</h5>
    </section>`;

    let div = document.getElementById(date);
    hours.forEach(hour_val => { // Renamed 'hour' to avoid conflict
      let str = `${date}_${hour_val}`
      let task = tasks?.find(({ date }) => date == str)?.task || '';
      let status = tasks?.find(({ date }) => date == str)?.status || '';
      let taskInputId = `task_${str}`;
      let checkboxId = `cb_${str}`;

      div.innerHTML +=
        div.classList.contains("past") ?
          `
            <div>
              <h5>${hour_val}</h5>
              <input id="${taskInputId}" class="_${hour_val}" disabled value="${task}" />
              <input id="${checkboxId}" class="_${hour_val}" disabled type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
          ` :
          // Present and future allow task editing; checkbox only enabled for present.
            `
            <div>
              <h5>${hour_val}</h5>
              <input id="${taskInputId}" class="_${hour_val}" onChange="handleChange('${str}')" value="${task}" />
              <input id="${checkboxId}" class="_${hour_val}" onChange="handleChange('${str}')" type="checkbox" ${status == "done" ? "checked" : ""} ${div.classList.contains("future") ? "disabled" : ""}/>
            </div>
          `;
      let taskInputElement = div.querySelector(`#${taskInputId}`); // Use the unique ID
      if (taskInputElement) {
          taskInputElement.style.textDecoration = status == "done" ? "line-through" : "none";
      }
    });
  });
  renderGauges(); // Update gauges after week is populated
};

const handleChange = async dayTime => {
  let [b, h] = dayTime.split("_"); // b is date string, h is hour string
  // Use unique IDs to get elements
  let hourInput = document.getElementById(`task_${dayTime}`); // input for task text
  let checkboxInput = document.getElementById(`cb_${dayTime}`); // checkbox

  if (!hourInput || !checkboxInput) return; // Safety check

  checkboxInput.checked == false
    ? (
      hourInput.style.textDecoration = "none"
    ) : (
      hourInput.style.textDecoration = "line-through"
    );

  tasks = tasks.filter(obj => obj.date !== dayTime); // Remove old task if exists
  let newTaskValue = hourInput.value.trim();

  // Only add/update if there is a task text or if it's checked done
  if (newTaskValue !== "" || checkboxInput.checked) {
    let newTask = { user_id, date: dayTime, task: newTaskValue, status: checkboxInput.checked ? "done" : "pending" };
    tasks.push(newTask);

    await fetch(`/api/tasks`, { // Send to server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    }).then(res => {
        // The init(d) call here would refresh the entire week,
        // which might be too much if you just want gauges updated.
        // Consider a lighter update if needed, or if this is fine, keep it.
        // For now, removing init(d) to prevent full re-render from a single change,
        // and relying on updating gauges directly.
    }).catch(err => console.error("Failed to save task:", err));
  }
   // Recalculate totals for gauges based on the current week's tasks
    totalScheduled = 0;
    totalDone = 0;
    const currentWeekDateStrings = getWkDays(new Date(d)).map(dstr => dstr);

    tasks.forEach(task => {
        const taskDatePart = task.date.split('_')[0];
        if (currentWeekDateStrings.includes(taskDatePart)) {
            totalScheduled += 1; // Count all tasks in the current view for scheduled
            if (task.status === "done") {
                totalDone += 1;
            }
        }
    });
    renderGauges(); // Update gauges
};

const renderPreviousWeek = () => {
  nextMonday = nextMonday - 7 * h24;
  // No need to loop while day != 1 if nextMonday was already a Monday
  // If nextMonday might not be a Monday, then ensure it becomes one:
  let tempDate = new Date(nextMonday);
  while (tempDate.getDay() !== 1) { // 1 is Monday
      tempDate.setDate(tempDate.getDate() -1);
  }
  nextMonday = tempDate.getTime();


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
  data = [ {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalHours > 0 ? (totalScheduled / totalHours * 100) : 0, // Avoid division by zero
      title: { text: "Quality" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 }, // This reference seems high for a 0-100 scale
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
  if(document.getElementById('chart1')) Plotly.newPlot('chart1', data, layout);

  data2 = [ {
      domain: { x: [0, 1], y: [0, 1] },
      value: totalScheduled > 0 ? (totalDone / totalScheduled * 100) : 0, // Avoid division by zero
      title: { text: "Efficiency" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 400 }, // This reference seems high for a 0-100 scale
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: "red" }, // Consider a different color for distinction
        steps: [
          { range: [0, 50], color: "black" },
          { range: [51, 74], color: "yellow" },
          { range: [75, 100], color: "green" }
        ]
      }
    }
  ];
  layout2 = { width: 300, height: 250, paper_bgcolor: 'transparent' };
 if(document.getElementById('chart2')) Plotly.newPlot('chart2', data2, layout2);

  // Bullet charts - check if elements exist
  if(document.getElementById('chart1b')) {
    let bulletData1 = [ {
        type: "indicator",
        mode: "number+gauge+delta",
        gauge: { shape: "bullet", axis: {range: [null,100]} },
        delta: { reference: 100 },
        value: totalHours > 0 ? (totalScheduled / totalHours * 100) : 0,
        domain: { x: [0, 1], y: [0, 1] },
        title: { text: "Quality" }
    }];
    let bulletLayout1 = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 } };
    Plotly.newPlot('chart1b', bulletData1, bulletLayout1);
  }

  if(document.getElementById('chart2b')) {
    let bulletData2 = [ {
        type: "indicator",
        mode: "number+gauge+delta",
        gauge: { shape: "bullet", axis: {range: [null,100]} },
        delta: { reference: 100 },
        value: totalScheduled > 0 ? (totalDone / totalScheduled * 100) : 0,
        domain: { x: [0, 1], y: [0, 1] },
        title: { text: "Efficiency" } // Corrected typo "Efficiancy"
    }];
    let bulletLayout2 = { width: 350, height: 80, paper_bgcolor: 'transparent', margin: { t: 10, b: 40, l: 120, r: 60 } };
    Plotly.newPlot('chart2b', bulletData2, bulletLayout2);
  }
};

const getUser = async username => await (await fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username })
})).json();

// --- END OF UNCHANGED FUNCTIONS ---


// --- NEW/MODIFIED FUNCTIONS FOR DATE RANGE SELECTION AND GRAPH ---

/**
 * Parses a date string like "MonMay052025" into a JavaScript Date object.
 * @param {string} dateStr - The date string to parse.
 * @returns {Date|null} A Date object or null if parsing fails.
 */
const parseTaskDateString = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string' || dateStr.length !== 10) return null;
    const monthStr = dateStr.substring(3, 6);
    const day = parseInt(dateStr.substring(6, 8), 10);
    const year = parseInt(dateStr.substring(8, 12), 10);

    const monthMap = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const monthIndex = monthMap[monthStr];

    if (isNaN(day) || isNaN(year) || monthIndex === undefined) return null;
    // Check for valid date, e.g., not Feb 30
    const dateObj = new Date(year, monthIndex, day);
    if (dateObj.getFullYear() === year && dateObj.getMonth() === monthIndex && dateObj.getDate() === day) {
        return dateObj;
    }
    return null;
};

/**
 * Populates the date dropdowns and sets up their interactions.
 * @param {string[]} allDates - An array of unique, sorted date strings ("MonMay052025").
 */
const populateDateDropdowns = (allDates) => {
    const startDateSelect = document.getElementById('startDateSelect');
    const endDateSelect = document.getElementById('endDateSelect');

    if (!startDateSelect || !endDateSelect) {
        console.error("Date select dropdowns not found.");
        return;
    }

    // Clear existing options
    startDateSelect.innerHTML = '';
    endDateSelect.innerHTML = '';

    // Populate Start Date Dropdown
    allDates.forEach(dateStr => {
        const option = document.createElement('option');
        option.value = dateStr;
        const dateObj = parseTaskDateString(dateStr);
        // Display format: "Mon, May 5, 2025"
        option.textContent = dateObj ? dateObj.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : dateStr;
        startDateSelect.appendChild(option);
    });

    // Function to update End Date Dropdown based on Start Date
    const updateEndDateOptions = () => {
        const selectedStartDateStr = startDateSelect.value;
        const selectedStartDateObj = parseTaskDateString(selectedStartDateStr);
        endDateSelect.innerHTML = ''; // Clear current end date options

        if (!selectedStartDateObj) return;

        const filteredEndDates = allDates.filter(dateStr => {
            const dateObj = parseTaskDateString(dateStr);
            return dateObj && dateObj >= selectedStartDateObj;
        });

        filteredEndDates.forEach(dateStr => {
            const option = document.createElement('option');
            option.value = dateStr;
            const dateObj = parseTaskDateString(dateStr);
            option.textContent = dateObj ? dateObj.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : dateStr;
            endDateSelect.appendChild(option);
        });
        
        // If there are valid end dates, select the first one by default
        if (filteredEndDates.length > 0) {
            endDateSelect.value = filteredEndDates[0];
        }


        triggerGraphUpdate(); // Update graph when end dates are repopulated
    };

    // Add event listeners
    startDateSelect.addEventListener('change', updateEndDateOptions);
    endDateSelect.addEventListener('change', triggerGraphUpdate); // Also update graph if only end date changes

    // Initial population of end date dropdown and graph render
    if (allDates.length > 0) {
        startDateSelect.value = allDates[0]; // Default to the first date
        updateEndDateOptions(); // This will also trigger the first graph update
    } else {
        // No dates, clear graph or show message
        const graphDiv = document.getElementById('graph01');
        if (graphDiv) Plotly.purge(graphDiv);
    }
};

/**
 * Triggers the graphData function with the currently selected date range.
 */
const triggerGraphUpdate = () => {
    const startDateSelect = document.getElementById('startDateSelect');
    const endDateSelect = document.getElementById('endDateSelect');
    if (startDateSelect.value && endDateSelect.value) {
        graphData(startDateSelect.value, endDateSelect.value);
    } else {
        // If somehow one is missing, clear the graph
        const graphDiv = document.getElementById('graph01');
        if (graphDiv) Plotly.purge(graphDiv);
    }
};

/**
 * MODIFIED graphData: Renders the graph based on a selected date range.
 * @param {string} startDateString - The start date from the dropdown ("MonMay052025").
 * @param {string} endDateString - The end date from the dropdown ("MonMay052025").
 */
const graphData = (startDateString, endDateString) => {
    const graphDiv = document.getElementById('graph01');
    if (!graphDiv) {
        console.error("Graph container 'graph01' not found.");
        return;
    }
    Plotly.purge(graphDiv); // Clear previous graph

    const filterStartDate = parseTaskDateString(startDateString);
    const filterEndDate = parseTaskDateString(endDateString);

    if (!filterStartDate || !filterEndDate || filterEndDate < filterStartDate) {
        graphDiv.innerHTML = "<p style='text-align:center; padding:20px;'>Please select a valid date range.</p>";
        return;
    }

    let y_tasks = {}; // Stores { "MonMay052025": [scheduledCount, doneCount] }

    // Filter tasks based on the selected date range
    const tasksInDateRange = tasks.filter(obj => {
        const taskDateOnlyStr = obj.date.split('_')[0];
        const taskDateObj = parseTaskDateString(taskDateOnlyStr);
        return taskDateObj && taskDateObj >= filterStartDate && taskDateObj <= filterEndDate;
    });

    // Generate all date strings in the selected range for the X-axis
    let allDatesInSelectedRangeFormatted = [];
    let currentDateIter = new Date(filterStartDate); // Use a copy for iteration

    while (currentDateIter <= filterEndDate) {
        const dayOfWeek = currentDateIter.toLocaleDateString('en-US', { weekday: 'short' });
        const month = currentDateIter.toLocaleDateString('en-US', { month: 'short' });
        const dayOfMonth = String(currentDateIter.getDate()).padStart(2, '0');
        const year = currentDateIter.getFullYear();
        allDatesInSelectedRangeFormatted.push(`${dayOfWeek}${month}${dayOfMonth}${year}`);
        currentDateIter.setDate(currentDateIter.getDate() + 1);
    }

    // Populate y_tasks for each date in the complete range
    allDatesInSelectedRangeFormatted.forEach(dateKey => {
        const tasksOnThisDay = tasksInDateRange.filter(obj => obj.date.split('_')[0] === dateKey);
        const scheduledCount = tasksOnThisDay.length;
        const doneCount = tasksOnThisDay.filter(obj => obj.status === 'done').length;
        y_tasks[dateKey] = [scheduledCount, doneCount];
    });

    // For X-axis labels, use a more readable format like "May 05"
    const displayDatesXAxis = allDatesInSelectedRangeFormatted.map(dateStr => {
        const d = parseTaskDateString(dateStr);
        return d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : dateStr;
    });

    const qualityYValues = allDatesInSelectedRangeFormatted.map(dateKey => {
        const scheduled = y_tasks[dateKey] ? y_tasks[dateKey][0] : 0;
        // Quality: percentage of tasks scheduled out of available slots (hours.length)
        return hours.length > 0 ? (scheduled / hours.length * 100) : 0;
    });

    const efficiencyYValues = allDatesInSelectedRangeFormatted.map(dateKey => {
        const scheduled = y_tasks[dateKey] ? y_tasks[dateKey][0] : 0;
        const done = y_tasks[dateKey] ? y_tasks[dateKey][1] : 0;
        // Efficiency: percentage of scheduled tasks that are done
        return scheduled > 0 ? (done / scheduled * 100) : 0;
    });

    var trace1 = {
        mode: "lines+markers",
        name: 'Quality (% Scheduled)',
        x: displayDatesXAxis,
        y: qualityYValues,
        line: { color: 'red' }
    };

    var trace2 = {
        type: "bar", // Using 'bar' as it was in your original structure for one trace
        name: 'Efficiency (% Done)',
        x: displayDatesXAxis,
        y: efficiencyYValues,
        marker: { color: 'green' } // For bars, use marker.color
    };

    var dataForPlot = [trace1, trace2];
    const startDateFormatted = filterStartDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    const endDateFormatted = filterEndDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    var layoutForPlot = {
        autosize: true,
        margin: { l: 75, r: 50, t: 60, b: 100 }, // Adjusted margins
        xaxis: {
            type: 'category', //