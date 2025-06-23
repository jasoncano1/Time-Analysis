
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
let day, hour, data, data2, tasks, transformed_tasks, layout, monday, friday, layout2, user_id, start_options, end_options, x_values, y_values1, y_values2, tuesday, weekdays, thursday, checkbox, username, wednesday, filterData;

const getWkDays = d => {
  monday = new Date(d.getDay != 1 ? d - (d.getDay() - 1) * 86400000 : d).toLocaleDateString();
  tuesday = new Date(d.getDay != 1 ? d - (d.getDay() - 2) * 86400000 : d).toLocaleDateString();
  wednesday = new Date(d.getDay != 1 ? d - (d.getDay() - 3) * 86400000 : d).toLocaleDateString();
  thursday = new Date(d.getDay != 1 ? d - (d.getDay() - 4) * 86400000 : d).toLocaleDateString();
  friday = new Date(d.getDay != 1 ? d - (d.getDay() - 5) * 86400000 : d).toLocaleDateString();
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
      let dTime = new Date(parseInt(dayTime)).toLocaleDateString();

      if (dTime == date) {
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

      <h5>${i == 0 ? `Monday<br>${new Date(date).toDateString().slice(4, 10)}` :
        i == 1 ? `Tuesday<br>${new Date(date).toDateString().slice(4, 10)}` :
          i == 2 ? `Wednesday<br>${new Date(date).toDateString().slice(4, 10)}` :
            i == 3 ? `Thursday<br>${new Date(date).toDateString().slice(4, 10)}` :
              `Friday<br>${new Date(date).toDateString().slice(4, 10)}`
      }</h5>
    </section>`;

    let div = document.getElementById(date);
    hours.forEach((hour, i) => {
      let h = i + 9;
      let d2 = new Date(date).toLocaleDateString();
      let str = new Date(`${d2} ${h}:00`).getTime();
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
              <input class="_${hour}" onChange="handleChange('${date} ${hour}')" value="${task}" />
              <input class="_${hour}" disabled type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
         `:
            `
            <div>
              <h5>${hour}</h5>
              <input class="_${hour}" onChange="handleChange('${date} ${hour}')" value="${task}" />
              <input class="_${hour}" onChange="handleChange('${date} ${hour}')" type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
          `;
      status == "done"
        ? div.querySelector(`._${hour}`).style.textDecoration = "line-through"
        : div.querySelector(`._${hour}`).style.textDecoration = "none";
    });
  });
};

const handleChange = async dayTime => {

  let [d, h] = dayTime.split(' ');
  let day = document.getElementById(d);
  let hour = day.querySelector(`._${h}`);
  checkbox = day.querySelector(`._${h}[type=checkbox]`);

  checkbox.checked == false
    ? (
      hour.style.textDecoration = "none"
    ) : (
      hour.style.textDecoration = "line-through"
    );

  tasks = tasks.filter(obj => obj.date !== dayTime);

  let ms = new Date(dayTime.substr(0, dayTime.length - 2) + ':00 ' + dayTime.substr(dayTime.length - 2)).getTime();

  let newTask = { user_id, date: ms, task: hour.value, status: checkbox.checked ? "done" : "pending" };
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

  Plotly.newPlot('chart2b', data2, layout);
};

const getUser = async username => {
  let data = await (await fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })).json();

  return data.map(obj => {
    let date = parseInt(obj.date);
    return { ...obj, date }

  }).sort((a, b) => a.date - b.date);
};

const graphData = (x, y1, y2) => {
  graph01.innerHTML = '';
  var trace1 = {
    mode: "lines+markers",
    name: 'Quality',
    x: x,
    y: y1,
    line: { color: 'red' }
  };

  var trace2 = {
    mode: "bars",
    name: 'Efficiency',
    x: x,
    y: y2,
    line: { color: 'green' }
  };
  var data = [trace1, trace2];
  var layout = {
    autosize: true,
    margin: { l: 75, r: 50, t: 20, b: 130 },
    width: 600,
    height: 300
  };
  Plotly.newPlot('graph01', data, layout)
};

let getWk = ms => {

  let wk = 0;
  let isWk = false;
  let oneWk = 604800000;
  let janOne = new Date(new Date(parseInt(ms)).getFullYear(), 0, 1).getTime();

  while (!isWk) {
    wk++;
    janOne += oneWk;
    isWk = janOne > parseInt(ms)
  };

  return wk + '/' + new Date(parseInt(ms)).getFullYear();
}

const ch_frequency = ({ value }) => {

  if (value == 'day') {

    transformed_tasks = tasks.map(obj => {
      let date = new Date(obj.date).toLocaleDateString();
      return { ...obj, date }
    });

  } else if (value == 'week') {

    transformed_tasks = tasks.map(obj => {
      let date = getWk(obj.date);
      return { ...obj, date };
    });

  };

  start_options = [...new Set(transformed_tasks.map(obj => obj.date))];

  start.innerHTML = '';
  end.innerHTML = '';

  start_options.map(date => {
    start.innerHTML += `<option>${date}</option>`;
    end.innerHTML += `<option>${date}</option>`;
    end.value = end.lastChild.value;
  });

  ch_range();
};

const ch_range = () => {

  fq = document.getElementById('frequency').value;
  start_value = document.getElementById('start').value;
  end_value = document.getElementById('end').value;


  if (fq == 'day') {

    transformed_tasks = tasks.map(obj => {
      let date = new Date(obj.date).toLocaleDateString();
      return { ...obj, date }
    });

    filterData = transformed_tasks.filter((_, i) => i >= transformed_tasks.map(obj => obj.date).indexOf(start_value) && i <= transformed_tasks.map(obj => obj.date).indexOf(end_value));
    x_values = [...new Set(filterData.map(obj => obj.date))];

    y_values1 = x_values.map(d => transformed_tasks.filter(obj => obj.date == d).length / 9 * 100);
    y_values2 = x_values.map(d => transformed_tasks.filter(obj => obj.date == d & obj.status == 'done').length / 9 * 100);

    totalScheduled = y_values1.reduce((a, b) => a + b, 0) / 100;
    totalDone = y_values2.reduce((a, b) => a + b, 0) / 100;
    totalHours = x_values.length;

  } else if (fq == 'week') {

    filterData = transformed_tasks.filter((_, i) => i >= transformed_tasks.map(obj => obj.date).indexOf(start_value) && i <= transformed_tasks.map(obj => obj.date).indexOf(end_value));
    x_values = [...new Set(filterData.map(obj => obj.date))];

    wkObj = {};
    doneObj = {};

    filterData.map(obj => obj.date).forEach(wk => Object.keys(wkObj).includes(wk) ? wkObj[wk] += 1 : wkObj[wk] = 1);

    filterData.forEach(({ status, date }) => {
      status == 'done'
        ? Object.keys(doneObj).includes(date)
          ? doneObj[date] += 1
          : doneObj[date] = 1
        : Object.keys(doneObj).includes(date)
          ? doneObj[date] += 0
          : doneObj[date] = 0
    });

    y_values1 = Object.values(wkObj).map(v => Math.round(v / 45 * 100));
    y_values2 = Object.values(doneObj).map(v => Math.round(v / 45 * 100));

    totalScheduled = y_values1.reduce((a, b) => a + b, 0) / 100;
    totalDone = y_values2.reduce((a, b) => a + b, 0) / 100;
    totalHours = x_values.length;
  };

  end.innerHTML = '';
  start_options = [...new Set(transformed_tasks.map(obj => obj.date))];

  start_options.forEach((date, i) => {
    if (i >= start_options.indexOf(start_value)) end.innerHTML += `<option>${date}</option>`;
    end.value = end_value;
  });

  renderGauges();
  graphData(x_values, y_values1, y_values2);
};

const analysisGraph = () => {
  x_values = [...new Set(tasks.map(({ date }) => parseInt(date)).sort().map(ms => new Date(ms).toLocaleDateString()))];

  main.classList.toggle("slideLeftOut", true);

  setTimeout(() => {

    main.innerHTML = `
    <div id="analysisDiv">
      <div id='control01'>
        <h2>Time Analysis</h2>
        <select id="frequency" onchange="ch_frequency(this)">
          <option>day</option>
          <option>week</option>
          <option>month</option>
        </select>
        <select id="start" onchange="ch_range()">
          ${x_values.map(date => `<option> ${date}</option>`)}
        </select>
        <select id="end" onchange="ch_range()">
          ${x_values.map(date => `<option> ${date}</option>`)}
        </select>
      </div>
      <div id = 'graph01'></div>
    </div>`;

    end.value = `${x_values[x_values.length - 1]}`

    filterData = x_values.map(d => tasks.filter(({ date }) => new Date(parseInt(date)).toLocaleDateString() == d));
    y_values1 = x_values.map(d => tasks.filter(({ date }) => new Date(parseInt(date)).toLocaleDateString() == d).length / 9 * 100);
    y_values2 = x_values.map(d => tasks.filter(({ date, status }) => new Date(parseInt(date)).toLocaleDateString() == d & status == 'done').length / 9 * 100);
    graphData(x_values, y_values1, y_values2);

    totalDone = 0;
    totalScheduled = 0;
    totalHours = filterData.length * 9;

    filterData.map(obj => obj.length).forEach(amount => totalScheduled += amount);
    filterData.map(arr => arr.filter(({ status }) => status == 'done').length).forEach(amount => totalDone += amount);

    renderGauges();
  }, 500);

  setTimeout(() => {
    main.classList.toggle("slideLeftOut", false);
  }, 1000);
};

init(d);
today.onclick = renderToday;

signOut.onclick = () => {
  localStorage.clear();
  window.location.href = "/";
};

nextWk.onclick = () => renderNextWeek(nextMonday);
prevWk.onclick = () => renderPreviousWeek(nextMonday);
analysis.onclick = analysisGraph;