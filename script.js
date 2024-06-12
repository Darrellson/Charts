// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(fetchAndDrawCharts);

function fetchAndDrawCharts() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Process data for charts
      const processedUserData = processDataUser(data);
      const processedCompletionData = processDataCompletion(data);

      // Draw charts
      drawUserCharts(processedUserData);
      drawCompletionCharts(processedCompletionData);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to process data for user charts
const processDataUser = (data) => {
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

// Function to process data for completion status charts
const processDataCompletion = (data) => {
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

// Function to draw charts for user data
const drawUserCharts = (processedUserData) => {
  // Create data table for user charts
  const userData = new google.visualization.DataTable();
  userData.addColumn("string", "User");
  userData.addColumn("number", "Tasks");
  userData.addRows(processedUserData);

  // Set chart options
  const options = {
    title: "Tasks per User",
    width: "100%", // Full width for better visibility in each column
    height: 300, // Height adjusted for visibility
  };

  // Instantiate and draw the column chart for users
  const columnChartUser = new google.visualization.ColumnChart(
    document.getElementById("column_chart_user_div")
  );
  columnChartUser.draw(userData, options);

  // Instantiate and draw the line chart for users
  const lineChartUser = new google.visualization.LineChart(
    document.getElementById("line_chart_user_div")
  );
  lineChartUser.draw(userData, options);

  // Instantiate and draw the pie chart for users
  const pieChartUser = new google.visualization.PieChart(
    document.getElementById("pie_chart_user_div")
  );
  pieChartUser.draw(userData, options);
};

// Function to draw charts for completion status
const drawCompletionCharts = (processedCompletionData) => {
  // Create data table for completion status charts
  const dataCompleted = new google.visualization.DataTable();
  dataCompleted.addColumn("string", "Status");
  dataCompleted.addColumn("number", "Count");
  dataCompleted.addRows(processedCompletionData);

  // Set chart options
  const options = {
    title: "Task Completion Status",
    width: "100%", // Full width for better visibility in each column
    height: 300, // Height adjusted for visibility
  };

  // Instantiate and draw the column chart for completion status
  const columnChartCompleted = new google.visualization.ColumnChart(
    document.getElementById("column_chart_completed_div")
  );
  columnChartCompleted.draw(dataCompleted, options);

  // Instantiate and draw the line chart for completion status
  const lineChartCompleted = new google.visualization.LineChart(
    document.getElementById("line_chart_completed_div")
  );
  lineChartCompleted.draw(dataCompleted, options);

  // Instantiate and draw the pie chart for completion status
  const pieChartCompleted = new google.visualization.PieChart(
    document.getElementById("pie_chart_completed_div")
  );
  pieChartCompleted.draw(dataCompleted, options);
};
