/**
 * Load the Google Visualization API and the corechart package.
 */
google.charts.load("current", { packages: ["corechart"] });

/**
 * Set a callback to run when the Google Visualization API is loaded.
 */
google.charts.setOnLoadCallback(fetchAndDrawCharts);

/**
 * Defines a Task type.
 * @typedef {Object} Task
 * @property {number} userId - The ID of the user.
 * @property {boolean} completed - The completion status of the task.
 */
type Task = {
  userId: number;
  completed: boolean;
};

/**
 * Fetch data from a JSON file and draw charts.
 * @async
 * @function fetchAndDrawCharts
 * @throws {Error} If there is an error fetching or parsing the data.
 */
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

/**
 * Process data to count the number of tasks per user.
 * @param {Task[]} data - The array of task objects.
 * @returns {[string, number][]} An array of tuples where the first element is the user and the second is the task count.
 */
const processDataUser = (data: Task[]): [string, number][] => {
  const userTaskCount: Record<string, number> = {};
  data.forEach((task) => {
    const userIdKey = `User ${task.userId}`;
    userTaskCount[userIdKey] = (userTaskCount[userIdKey] || 0) + 1;
  });

  return Object.entries(userTaskCount);
};

/**
 * Process data to count the number of completed and not completed tasks.
 * @param {Task[]} data - The array of task objects.
 * @returns {[string, number][]} An array of tuples where the first element is the completion status and the second is the count.
 */
const processDataCompletion = (data: Task[]): [string, number][] => {
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

/**
 * Draw a chart in a specified container.
 * @param {string} containerId - The ID of the container element to draw the chart in.
 * @param {google.visualization.DataTable} dataTable - The data table to use for the chart.
 * @param {string} chartType - The type of chart to draw (e.g., "ColumnChart", "LineChart", "PieChart").
 * @param {string} title - The title of the chart.
 */
const drawCharts = (
  containerId: string,
  dataTable: google.visualization.DataTable,
  chartType: string,
  title: string
) => {
  // Set chart options
  const options = {
    title: title,
    width: "100%", // Full width for better visibility in each column
    height: 300, // Height adjusted for visibility
  };

  // Instantiate and draw the chart
  const chart = new google.visualization.ChartWrapper({
    chartType: chartType,
    containerId: containerId,
    dataTable: dataTable,
    options: options,
  });
  chart.draw();
};

/**
 * Draw charts for user data.
 * @param {[string, number][]} processedUserData - The processed user data to be displayed in the charts.
 */
const drawUserCharts = (processedUserData: [string, number][]) => {
  // Create data table for user charts
  const userData = new google.visualization.DataTable();
  userData.addColumn("string", "User");
  userData.addColumn("number", "Tasks");
  userData.addRows(processedUserData);

  // Draw different types of charts for users
  drawCharts(
    "column_chart_user_div",
    userData,
    "ColumnChart",
    "Tasks per User"
  );
  drawCharts("line_chart_user_div", userData, "LineChart", "Tasks per User");
  drawCharts("pie_chart_user_div", userData, "PieChart", "Tasks per User");
};

/**
 * Draw charts for task completion status.
 * @param {[string, number][]} processedCompletionData - The processed completion data to be displayed in the charts.
 */
const drawCompletionCharts = (processedCompletionData: [string, number][]) => {
  // Create data table for completion status charts
  const dataCompleted = new google.visualization.DataTable();
  dataCompleted.addColumn("string", "Status");
  dataCompleted.addColumn("number", "Count");
  dataCompleted.addRows(processedCompletionData);

  // Draw different types of charts for completion status
  drawCharts(
    "column_chart_completed_div",
    dataCompleted,
    "ColumnChart",
    "Task Completion Status"
  );
  drawCharts(
    "line_chart_completed_div",
    dataCompleted,
    "LineChart",
    "Task Completion Status"
  );
  drawCharts(
    "pie_chart_completed_div",
    dataCompleted,
    "PieChart",
    "Task Completion Status"
  );
};
