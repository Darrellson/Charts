// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(fetchAndDrawCharts);

function fetchAndDrawCharts() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Now you have the data, you can proceed with processing and visualizing it
      const processedData = processData(data);

      // Draw the charts
      drawCharts(processedData);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to process the data
const processData = (data) => {
  let userTaskCount = {};
  data.forEach((task) => {
    if (userTaskCount[task.userId]) {
      userTaskCount[task.userId]++;
    } else {
      userTaskCount[task.userId] = 1;
    }
  });

  let result = [];
  for (let userId in userTaskCount) {
    result.push([`User ${userId}`, userTaskCount[userId]]);
  }
  return result;
};

// Callback that creates and populates the data table,
// instantiates the charts, passes in the data and
// draws them.
const drawCharts = (processedData) => {
  // Create the data table.
  const data = new google.visualization.DataTable();
  data.addColumn("string", "User");
  data.addColumn("number", "Tasks");
  data.addRows(processedData);

  // Set chart options
  const options = {
    title: "Tasks per User",
    width: 600,
    height: 400,
  };

  // Instantiate and draw the column chart
  const columnChart = new google.visualization.ColumnChart(
    document.getElementById("column_chart_div")
  );
  columnChart.draw(data, options);

  // Instantiate and draw the line chart
  const lineChart = new google.visualization.LineChart(
    document.getElementById("line_chart_div")
  );
  lineChart.draw(data, options);

  // Instantiate and draw the pie chart
  const pieChart = new google.visualization.PieChart(
    document.getElementById("pie_chart_div")
  );
  pieChart.draw(data, options);
};
