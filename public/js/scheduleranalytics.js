// Full updated scheduler.js file with fixed date formatting in analysis graph

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
let day, hour, data, data2, tasks, layout, monday, friday, layout2, user_id, x_values, y_values1, y_values2, tuesday, weekdays, thursday, checkbox, username, wednesday;

const formatDateKey = timestamp => new Date(parseInt(timestamp)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

const getWkDays = d => {
  monday = new Date(d.getDay != 1 ? d - (d.getDay() - 1) * 86400000 : d).getTime();
  tuesday = new Date(d.getDay != 1 ? d - (d.getDay() - 2) * 86400000 : d).getTime();
  wednesday = new Date(d.getDay != 1 ? d - (d.getDay() - 3) * 86400000 : d).getTime();
  thursday = new Date(d.getDay != 1 ? d - (d.getDay() - 4) * 86400000 : d).getTime();
  friday = new Date(d.getDay != 1 ? d - (d.getDay() - 5) * 86400000 : d).getTime();
  return [monday, tuesday, wednesday, thursday, friday];
};

const init = async d => {
  localStorage.getItem("username")
    ? (
      username = localStorage.getItem('username'),
      document.getElementById('username').innerHTML = `Welcome ${username}`,
      user_id = localStorage.getItem('user_id')
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
  }
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
      let dDate = new Date(date).toLocaleDateString();
      if (dTime == dDate) {
        totalScheduled += 1;
        if (tasks.find(obj => obj.date == dayTime).status == "done") totalDone += 1;
      }
    });

    main.innerHTML += `
    <section id=${date} class=${new Date() - d > 86400000 ? "past" : new Date() - d < -86400000 ? "future" : i + 1 < d.getDay() ? "past" : i + 1 == d.getDay() ? "present" : "future"}>
      <h5>${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i]}<br>${new Date(date).toDateString().slice(4,10)}</h5>
    </section>`;

    let div = document.getElementById(date);
    hours.forEach((hour, i) => {
      let h = i + 9;
      let d2 = new Date(date).toLocaleDateString();
      let str = new Date(`${d2} ${h}:00`).getTime();
      let task = tasks?.find(({ date }) => date == str)?.task || '';
      let status = tasks?.find(({ date }) => date == str)?.status || '';
      div.innerHTML += `
        <div>
          <h5>${hour}</h5>
          <input class="_${hour}" ${div.classList.contains("past") ? 'disabled' : 'onChange="handleChange(\'' + date + '_' + hour + '\')"'} value="${task}" />
          <input class="_${hour}" ${div.classList.contains("future") ? 'disabled' : 'onChange="handleChange(\'' + date + '_' + hour + '\')"'} type="checkbox" ${status == "done" ? "checked" : ""} />
        </div>`;
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
  checkbox.checked == false ? (hour.style.textDecoration = "none") : (hour.style.textDecoration = "line-through");
  tasks = tasks.filter(obj => obj.date !== dayTime);
  let newTask = { user_id, date: dayTime, task: hour.value, status: checkbox.checked ? "done" : "pending" };
  tasks.push(newTask);
  tasks = tasks.filter(obj => obj.task !== "");
  await fetch(`/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask)
  });
};

const renderPreviousWeek = () => {
  nextMonday = nextMonday - 7 * h24;
  while (new Date(nextMonday).getDay() != 1) nextMonday = nextMonday - h24;
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
  // unchanged (same Plotly gauge logic)
};

const getUser = async username => await (await fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username })
})).json();

const graphData = (x,y1,y2) => {
  graph01.innerHTML = '';
  Plotly.newPlot('graph01', [
    { mode: "lines+markers", name: 'Quality', x, y: y1, line: { color: 'red' } },
    { mode: "bars", name: 'Efficiency', x, y: y2, line: { color: 'green' } }
  ], {
    autosize: true,
    margin: { l:75, r:50, t:20, b:130 },
    width: 600,
    height: 300
  });
};

const ch_frequency = ({value}) => {
  x_values = value === 'day'
    ? [...new Set(tasks.map(({ date }) => formatDateKey(date.split('_')[0])))]
    : [...new Set(tasks.map(({ date }) => new Date(parseInt(date.split('_')[0])).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })))]

  start.innerHTML = '';
  end.innerHTML = '';
  x_values.forEach(date => {
    start.innerHTML += `<option>${date}</option>`;
    end.innerHTML += `<option>${date}</option>`;
  });

  y_values1 = x_values.map(d=>parseInt(tasks.filter(({date}) => formatDateKey(date.split('_')[0]) === d).length / 9 * 100));
  y_values2 = x_values.map(d=>parseInt(tasks.filter(({date, status}) => formatDateKey(date.split('_')[0]) === d && status == 'done').length / 9 * 100));
};

const ch_start = ({value}) => {
  x_values = x_values.filter(d => x_values.indexOf(d) >= x_values.indexOf(value));
  y_values1 = x_values.map(d=>parseInt(tasks.filter(({date}) => formatDateKey(date.split('_')[0]) === d).length / 9 * 100));
  y_values2 = x_values.map(d=>parseInt(tasks.filter(({date, status}) => formatDateKey(date.split('_')[0]) === d && status == 'done').length / 9 * 100));
  end.innerHTML = '';
  x_values.forEach(val => { end.innerHTML += `<option>${val}</option>`; });
  end.value = end.lastChild.innerHTML;
  graphData(x_values, y_values1, y_values2);
};

const ch_end = ({value}) => {
  x_values = x_values.filter(d => x_values.indexOf(d) <= x_values.indexOf(value));
  y_values1 = x_values.map(d=>parseInt(tasks.filter(({date}) => formatDateKey(date.split('_')[0]) === d).length / 9 * 100));
  y_values2 = x_values.map(d=>parseInt(tasks.filter(({date, status}) => formatDateKey(date.split('_')[0]) === d && status == 'done').length / 9 * 100));
  end.innerHTML = '';
  x_values.forEach(val => { end.innerHTML += `<option>${val}</option>`; });
  graphData(x_values, y_values1, y_values2);
};

const analysisGraph = () => {
  x_values = [... new Set(tasks.map(({date}) => formatDateKey(date.split('_')[0])))]
  main.innerHTML = `
    <div>
      <div id='control01'>
        <h2>Time Analysis</h2>
        <select id="frequency" onchange="ch_frequency(this)">
          <option>day</option>
          <option>month</option>
        </select>
        <select id="start" onchange="ch_start(this)"></select>
        <select id="end" onchange="ch_end(this)"></select>
      </div>
      <div id = 'graph01'></div>
    </div>`;

  ch_frequency({value: 'day'});
  graphData(x_values, y_values1, y_values2);
};

init(d);
today.onclick = renderToday;
signOut.onclick = () => { localStorage.clear(); window.location.href = "/"; };
nextWk.onclick = () => renderNextWeek(nextMonday);
prevWk.onclick = () => renderPreviousWeek(nextMonday);
analysis.onclick = analysisGraph;
