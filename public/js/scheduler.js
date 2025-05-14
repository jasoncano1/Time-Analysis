// Function to populate date dropdowns
const populateDateDropdowns = () => {
  // Get all unique dates from tasks and sort them
  const uniqueDates = [...new Set(tasks.map(obj => obj.date.split('_')[0]))].sort();
  
  // Get the dropdown elements
  const startDateDropdown = document.getElementById('startDate');
  const endDateDropdown = document.getElementById('endDate');
  
  // Clear existing options
  startDateDropdown.innerHTML = '';
  endDateDropdown.innerHTML = '';
  
  // Populate start date dropdown
  uniqueDates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = formatDateDisplay(date);
    startDateDropdown.appendChild(option);
  });
  
  // Initially populate end date dropdown with all dates
  uniqueDates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = formatDateDisplay(date);
    endDateDropdown.appendChild(option);
  });
  
  // Set initial values
  if (uniqueDates.length > 0) {
    startDateDropdown.value = uniqueDates[0];
    endDateDropdown.value = uniqueDates[uniqueDates.length - 1];
  }
};

// Function to update end date dropdown based on start date selection
const updateEndDateDropdown = () => {
  const startDateDropdown = document.getElementById('startDate');
  const endDateDropdown = document.getElementById('endDate');
  const selectedStartDate = startDateDropdown.value;
  
  // Get all unique dates and sort them
  const uniqueDates = [...new Set(tasks.map(obj => obj.date.split('_')[0]))].sort();
  
  // Filter dates that are equal to or after the selected start date
  const availableEndDates = uniqueDates.filter(date => date >= selectedStartDate);
  
  // Store current end date selection
  const currentEndDate = endDateDropdown.value;
  
  // Clear and repopulate end date dropdown
  endDateDropdown.innerHTML = '';
  availableEndDates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = formatDateDisplay(date);
    endDateDropdown.appendChild(option);
  });
  
  // Try to maintain previous selection if still valid
  if (availableEndDates.includes(currentEndDate)) {
    endDateDropdown.value = currentEndDate;
  } else {
    // Otherwise select the last available date
    endDateDropdown.value = availableEndDates[availableEndDates.length - 1];
  }
  
  // Update the graph with new date range
  updateGraphData();
};

// Function to format date for display
const formatDateDisplay = (dateString) => {
  // Convert from "FriMar072025" format to "Fri Mar 07, 2025"
  const day = dateString.slice(0, 3);
  const month = dateString.slice(3, 6);
  const date = dateString.slice(6, 8);
  const year = dateString.slice(8);
  return `${day} ${month} ${date}, ${year}`;
};

// Updated graphData function with date range filtering
const graphData = (startDate, endDate) => {
  // If no dates provided, use the dropdown values
  if (!startDate || !endDate) {
    const startDropdown = document.getElementById('startDate');
    const endDropdown = document.getElementById('endDate');
    startDate = startDropdown ? startDropdown.value : null;
    endDate = endDropdown ? endDropdown.value : null;
  }
  
  let y_tasks = {};
  
  tasks.map(obj => {
    let val = obj.date.split('_')[0];
    
    // Only include tasks within the selected date range
    if ((!startDate || val >= startDate) && (!endDate || val <= endDate)) {
      if (!Object.keys(y_tasks).includes(val)) {
        y_tasks[val] = [0, 0];
      }
      
      y_tasks[val][0] = tasks.filter(task => task.date.includes(val)).length;
      y_tasks[val][1] = tasks.filter(task => task.date.includes(val) && task.status == 'done').length;
    }
  });
  
  // Sort the dates for proper display
  const sortedDates = Object.keys(y_tasks).sort();
  const sortedValues = sortedDates.map(date => y_tasks[date]);
  
  var trace1 = {
    mode: "lines+markers",
    name: 'Quality',
    x: sortedDates,
    y: sortedValues.map(arr => arr[0] / 9 * 100),
    line: { color: 'red' }
  }
  
  var trace2 = {
    mode: "bars",
    name: 'Efficiency',
    x: sortedDates,
    y: sortedValues.map(arr => arr[1] / 9 * 100),
    line: { color: 'green' }
  }
  
  var data = [trace1, trace2];
  
  var layout = {
    autosize: true,
    margin: { l: 75, r: 50, t: 20, b: 130 },
    width: 600,
    height: 300
  };
  
  Plotly.newPlot('graph01', data, layout);
};

// Function to update graph when date selection changes
const updateGraphData = () => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  graphData(startDate, endDate);
};

// Updated analysisGraph function with proper dropdowns
const analysisGraph = () => {
  main.innerHTML = `
    <div>
      <div id='control01'>
        <h2>Time Analysis</h2>
        <select id="startDate" onchange="updateEndDateDropdown()">
        </select>
        <select id="endDate" onchange="updateGraphData()">
        </select>
      </div>
      <div id='graph01'></div>
    </div>`;
  
  // Initialize dropdowns and graph
  populateDateDropdowns();
  updateGraphData();
};