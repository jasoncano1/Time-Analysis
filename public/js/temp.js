
      } else if (value == 'week') {

      start_options = [... new Set(tasks.map(({ date }) => getWk(date)))];



      wkObj = {};
      doneObj = {};

      tasks.map(({ date }) => getWk(date)).forEach(wk => Object.keys(wkObj).includes(wk) ? wkObj[wk] += 1 : wkObj[wk] = 1)

      x_values.forEach(wk => {
        tasks.forEach(({ status, date }) => {
          getWk(date) == wk && status == 'done'
            ? Object.keys(doneObj).includes(wk)
              ? doneObj[wk] += 1
              : doneObj[wk] = 1
            : Object.keys(doneObj).includes(wk)
              ? doneObj[wk] += 0
              : doneObj[wk] = 0
        })
      });

      y_values1 = Object.values(wkObj).map(v => Math.round(v / 45 * 100));
      y_values2 = Object.values(doneObj).map((v, i) => v / Object.values(wkObj)[i] * 100);

      totalScheduled = Object.values(wkObj).reduce((a, b) => a + b, 0);
      totalDone = Object.values(doneObj).reduce((a, b) => a + b, 0);
      totalHours = x_values.length * 45;

    } else if (value == 'month') {

    }

    renderGauges();
    graphData(x_values, y_values1, y_values2)


































