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
  let completedCount = 0;
  let notCompletedCount = 0;

  data.forEach((task) => {
    if (task.completed) {
      completedCount++;
    } else {
      notCompletedCount++;
    }
  });

  return [
    ["Completed", completedCount],
    ["Not Completed", notCompletedCount],
  ];
};

// Callback that creates and populates the data table,
// instantiates the charts, passes in the data and
// draws them.
const drawCharts = (processedData) => {
  // Create the data table for completed tasks
  const dataCompleted = new google.visualization.DataTable();
  dataCompleted.addColumn("string", "Status");
  dataCompleted.addColumn("number", "Count");
  dataCompleted.addRows(processedData);

  // Set chart options
  const options = {
    title: "Task Completion Status",
    width: 600,
    height: 400,
  };

  // Instantiate and draw the completed tasks column chart
  const columnChartCompleted = new google.visualization.ColumnChart(
    document.getElementById("column_chart_completed_div")
  );
  columnChartCompleted.draw(dataCompleted, options);

  // Now let's assume `data` is the same as `dataCompleted` for the line and pie charts
  // (adjust this based on your actual data structure if it's different)

  // Instantiate and draw the line chart
  const lineChart = new google.visualization.LineChart(
    document.getElementById("line_chart_div")
  );
  lineChart.draw(dataCompleted, options); // Using dataCompleted for line chart

  // Instantiate and draw the pie chart
  const pieChart = new google.visualization.PieChart(
    document.getElementById("pie_chart_div")
  );
  pieChart.draw(dataCompleted, options); // Using dataCompleted for pie chart
};
