/* ---------------------------------------------
  scheduler.js  (updated with date‐range selectors)
  Drop this into your project, replacing the old graphData
  and analysisGraph definitions, and adding setupDateRangeControls().
--------------------------------------------- */

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

// … (all your existing functions: populateWk, renderWeek, handleChange, renderGauges, init, etc.) …

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
  range.forEach(d => tally[d] = [0, 0]);

  tasks.forEach(task => {
    const d = task.date.split('_')[0];
    if (tally[d]) {
      tally[d][0] += 1;
      if (task.status === 'done') tally[d][1] += 1;
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
      return { label: lbl, ts: new Date(`${m[1]} ${m[2]} ${m[3]}, ${m[4]}`).getTime() };
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
 * Replaces the old Analysis tab’s innerHTML and kicks off our
 * date‐range controls + chart build.
 */
const analysisGraph = () => {
  main.innerHTML = `
    <div>
      <div id="control01"></div>
      <div id="graph01"></div>
    </div>
  `;
  setupDateRangeControls();
};

// ------------------------------
// Hook our new functions into the UI
// ------------------------------
analysis.onclick = analysisGraph;
// (you likely already have nextWk.onclick, prevWk.onclick, etc.)

// If you already call init(d) on page load, that remains unchanged.
