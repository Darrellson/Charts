// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(fetchAndDrawCharts);

interface Task {
  userId: number;
  completed: boolean;
}

// Fetch data from JSON file
async function fetchAndDrawCharts() {
  try {
    const response = await fetch("data.json");
    const data: Task[] = await response.json();

    // Process data for charts
    const processedUserData = processDataUser(data);
    const processedCompletionData = processDataCompletion(data);

    // Draw charts
    drawUserCharts(processedUserData);
    drawCompletionCharts(processedCompletionData);
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

// Function to process data for user charts
function processDataUser(data: Task[]): [string, number][] {
  const userTaskCount: Record<string, number> = {};
  data.forEach((task) => {
    const userIdKey = `User ${task.userId}`;
    userTaskCount[userIdKey] = (userTaskCount[userIdKey] || 0) + 1;
  });

  return Object.entries(userTaskCount);
}

// Function to process data for completion status charts
function processDataCompletion(data: Task[]): [string, number][] {
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
}

// Function to draw charts for user data
function drawUserCharts(processedUserData: [string, number][]) {
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
  const columnChartUser = new google.visualization.ChartWrapper({
    chartType: "ColumnChart",
    containerId: "column_chart_user_div",
    dataTable: userData,
    options: options,
  });
  columnChartUser.draw();

  // Instantiate and draw the line chart for users
  const lineChartUser = new google.visualization.ChartWrapper({
    chartType: "LineChart",
    containerId: "line_chart_user_div",
    dataTable: userData,
    options: options,
  });
  lineChartUser.draw();

  // Instantiate and draw the pie chart for users
  const pieChartUser = new google.visualization.ChartWrapper({
    chartType: "PieChart",
    containerId: "pie_chart_user_div",
    dataTable: userData,
    options: options,
  });
  pieChartUser.draw();
}

// Function to draw charts for completion status
function drawCompletionCharts(processedCompletionData: [string, number][]) {
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
  const columnChartCompleted = new google.visualization.ChartWrapper({
    chartType: "ColumnChart",
    containerId: "column_chart_completed_div",
    dataTable: dataCompleted,
    options: options,
  });
  columnChartCompleted.draw();

  // Instantiate and draw the line chart for completion status
  const lineChartCompleted = new google.visualization.ChartWrapper({
    chartType: "LineChart",
    containerId: "line_chart_completed_div",
    dataTable: dataCompleted,
    options: options,
  });
  lineChartCompleted.draw();

  // Instantiate and draw the pie chart for completion status
  const pieChartCompleted = new google.visualization.ChartWrapper({
    chartType: "PieChart",
    containerId: "pie_chart_completed_div",
    dataTable: dataCompleted,
    options: options,
  });
  pieChartCompleted.draw();
}
