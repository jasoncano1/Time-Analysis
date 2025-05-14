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
    )
    :
      (window.location.href = "/");

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
          totalDone += 1;
        }
      }
    });

    main.innerHTML += `
      <section id=${date} class=${
        new Date() - new Date(date) > 86400000 ? "past" :
        new Date() - new Date(date) < -86400000 ? "future" :
        i + 1 < d.getDay() ? "past" :
        i + 1 == d.getDay() ? "present" : "future"
      }>
        <h5>${
          i == 0 ? `Monday<br>${date.slice(3,6)} ${date.slice(6,8)}` :
          i == 1 ? `Tuesday<br>${date.slice(3,6)} ${date.slice(6,8)}` :
          i == 2 ? `Wednesday<br>${date.slice(3,6)} ${date.slice(6,8)}` :
          i == 3 ? `Thursday<br>${date.slice(3,6)} ${date.slice(6,8)}` :
                    `Friday<br>${date.slice(3,6)} ${date.slice(6,8)}`
        }</h5>
      </section>`;

    let div = document.getElementById(date);
    hours.forEach(hour => {
      let str = `${date}_${hour}`;
      let task = tasks?.find(({ date }) => date == str)?.task || '';
      let status = tasks?.find(({ date }) => date == str)?.status || '';
      div.innerHTML +=
        div.classList.contains("past") ?
          `<div>
             <h5>${hour}</h5>
             <input class="_${hour}" disabled value="${task}" />
             <input class="_${hour}" disabled type="checkbox" ${status=="done"?"checked":""}/>
           </div>` :
        div.classList.contains("future") ?
          `<div>
             <h5>${hour}</h5>
             <input class="_${hour}" onChange="handleChange('${date}_${hour}')" value="${task}" />
             <input class="_${hour}" disabled type="checkbox" ${status=="done"?"checked":""}/>
           </div>` :
          `<div>
             <h5>${hour}</h5>
             <input class="_${hour}" onChange="handleChange('${date}_${hour}')" value="${task}" />
             <input class="_${hour}" onChange="handleChange('${date}_${hour}')" type="checkbox" ${status=="done"?"checked":""}/>
           </div>`;
      status=="done"
        ? div.querySelector(`._${hour}`).style.textDecoration="line-through"
        : div.querySelector(`._${hour}`).style.textDecoration="none";
    });
  });
};

const handleChange = async dayTime => {
  let [b, h] = dayTime.split("_");
  let day = document.getElementById(b);
  let hour = day.querySelector(`._${h}`);
  checkbox = day.querySelector(`._${h}[type=checkbox]`);

  checkbox.checked
    ? hour.style.textDecoration = "line-through"
    : hour.style.textDecoration = "none";

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
  nextMonday -= 7 * h24;
  while (new Date(nextMonday).getDay() != 1) nextMonday -= h24;

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
  // … your existing gauge code untouched …
};

const getUser = async username =>
  (await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })).json();

// ─── NEW: Replaced graphData + injected setupDateRangeControls + new analysisGraph ───

/**
 * Redraws the Plotly chart for the chosen date range.
 * @param {string} startDate  label like "MonMar102025"
 * @param {string} endDate    label like "FriMar142025"
 */
const graphData = (startDate, endDate) => {
  // 1. Grab sorted list of all dates from the 'startDateSelect'
  const allDates = Array.from(
    document.getElementById('startDateSelect').options,
    opt => opt.value
  );
  const sIdx = allDates.indexOf(startDate);
  const eIdx = allDates.indexOf(endDate);
  const range = allDates.slice(sIdx, eIdx + 1);

  // 2. Tally total tasks vs. done tasks per day
  const tally = {};
  range.forEach(d => (tally[d] = [0, 0]));

  tasks.forEach(task => {
    const d = task.date.split('_')[0];
    if (tally[d]) {
      tally[d][0]++;
      if (task.status === 'done') tally[d][1]++;
    }
  });

  // 3. Build Plotly traces
  const traceQuality = {
    mode: 'lines+markers',
    name: 'Quality',
    x: Object.keys(tally),
    y: Object.values(tally).map(([total]) => (total / 9) * 100),
    line: { color: 'red' }
  };
  const traceEfficiency = {
    mode: 'lines+markers',
    name: 'Efficiency',
    x: Object.keys(tally),
    y: Object.values(tally).map(([total, done]) => (done / 9) * 100),
    line: { color: 'green' }
  };

  // 4. Render
  Plotly.newPlot('graph01', [traceQuality, traceEfficiency], {
    autosize: true,
    margin: { l: 75, r: 50, t: 20, b: 130 },
    width: 600,
    height: 300
  });
};

/**
 * Inserts two linked <select> controls for date filtering,
 * and wires up change events to call graphData().
 */
function setupDateRangeControls() {
  const container = document.getElementById('control01');
  container.innerHTML = `<h2>Time Analysis</h2>`;

  // Extract, parse & sort unique date labels
  const raw = [...new Set(tasks.map(o => o.date.split('_')[0]))];
  const sorted = raw
    .map(lbl => {
      const m = lbl.match(/^([A-Za-z]{3})([A-Za-z]{3})(\d{1,2})(\d{4})$/);
      return {
        label: lbl,
        ts: new Date(`${m[1]} ${m[2]} ${m[3]}, ${m[4]}`).getTime()
      };
    })
    .sort((a, b) => a.ts - b.ts)
    .map(o => o.label);

  // Build selects
  const startSel = document.createElement('select');
  const endSel   = document.createElement('select');
  startSel.id = 'startDateSelect';
  endSel.id   = 'endDateSelect';

  sorted.forEach(lbl => {
    [startSel, endSel].forEach(sel => {
      const opt = document.createElement('option');
      opt.value = opt.text = lbl;
      sel.appendChild(opt);
    });
  });

  container.appendChild(startSel);
  container.appendChild(endSel);

  // Defaults: earliest → latest
  startSel.selectedIndex = 0;
  endSel.selectedIndex   = sorted.length - 1;

  // Update helper
  const update = () => graphData(startSel.value, endSel.value);

  // When start changes, rebuild end options
  startSel.addEventListener('change', () => {
    endSel.innerHTML = '';
    sorted
      .filter(lbl => new Date(lbl) >= new Date(startSel.value))
      .forEach(lbl => {
        const opt = document.createElement('option');
        opt.value = opt.text = lbl;
        endSel.appendChild(opt);
      });
    endSel.selectedIndex = 0;
    update();
  });

  // When end changes, simply redraw
  endSel.addEventListener('change', update);

  // Initial draw
  update();
}

/**
 * Replaces the old Analysis tab’s content and initializes the
 * date-range selectors + chart.
 */
const analysisGraph = () => {
  main.innerHTML = `
    <div>
      <div id="control01"></div>
      <div id="graph01"></div>
    </div>`;
  setupDateRangeControls();
};

// ─── preserved bindings and startup ──────────────────────────────────────────

init(d);
today.onclick   = renderToday;
signOut.onclick = () => { localStorage.clear(); window.location.href = "/"; };
analysis.onclick = analysisGraph;
nextWk.onclick  = () => renderNextWeek(nextMonday);
prevWk.onclick  = () => renderPreviousWeek(nextMonday);
