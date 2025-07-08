
      html = '';
      if (div.classList.contains("past")) {
        html = `
            <div>
              <h5>${hour}</h5>
              <input class="_${hour}" disabled value="${task}" />
              <input class="_${hour}" disabled type="checkbox" ${status == "done" ? "checked" : ""} />
            </div>
          `
      } else if (div.classList.contains("future")) {
        html = `<div><h5>${hour}</h5><select><option></option>`;
        //<option><input class="_${hour}" onChange="handleChange('${date} ${hour}')" value="${task}" /></option>`;
        // [...new Set(tasks.map(obj => obj.task))].forEach(val => html += `<option>${val}</option>`);

        html += `</select>
                <input class="_${hour}" disabled type="checkbox" ${status == "done" ? "checked" : ""} />
              </div>`;
      } else {
        html = `<div><h5>${hour}</h5><select><option></option>`;
        [...new Set(tasks.map(obj => obj.task))].forEach(val => html += `<option>${val}</option>`);
        // <option><input class="_${hour}" onChange="handleChange('${date} ${hour}')" value="${task}" /></option>`;

        html += `</select>
                <input class="_${hour}" onChange="handleChange('${date} ${hour}')" type="checkbox" ${status == "done" ? "checked" : ""} />
              </div>`;
      };

      div.innerHTML += html;