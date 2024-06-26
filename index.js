var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Load the Google Visualization API and the corechart package.
 */
google.charts.load("current", { packages: ["corechart"] });
/**
 * Set a callback to run when the Google Visualization API is loaded.
 */
google.charts.setOnLoadCallback(fetchAndDrawCharts);
/**
 * Fetch data from a JSON file and draw charts.
 * @async
 * @function fetchAndDrawCharts
 * @throws {Error} If there is an error fetching or parsing the data.
 */
function fetchAndDrawCharts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, processedUserData, processedCompletionData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("data.json")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    processedUserData = processDataUser(data);
                    processedCompletionData = processDataCompletion(data);
                    // Draw charts
                    drawUserCharts(processedUserData);
                    drawCompletionCharts(processedCompletionData);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching or parsing data:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Process data to count the number of tasks per user.
 * @param {Task[]} data - The array of task objects.
 * @returns {Array<(string | number)[]>} An array of arrays where the first element is the user and the second is the task count.
 */
var processDataUser = function (data) {
    var userTaskCount = {};
    data.forEach(function (_a) {
        var userId = _a.userId;
        var userIdKey = "User ".concat(userId);
        userTaskCount[userIdKey] = (userTaskCount[userIdKey] || 0) + 1;
    });
    return Object.keys(userTaskCount).map(function (userIdKey) { return [
        userIdKey,
        userTaskCount[userIdKey],
    ]; });
};
/**
 * Process data to count the number of completed and not completed tasks.
 * @param {Task[]} data - The array of task objects.
 * @returns {Array<(string | number)[]>} An array of arrays where the first element is the completion status and the second is the count.
 */
var processDataCompletion = function (data) {
    var completedCount = 0;
    var notCompletedCount = 0;
    data.forEach(function (task) {
        if (task.completed) {
            completedCount++;
        }
        else {
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
var drawCharts = function (containerId, dataTable, chartType, title) {
    // Set chart options
    var options = {
        title: title,
        width: "100%", // Full width for better visibility in each column
        height: 300, // Height adjusted for visibility
    };
    // Instantiate and draw the chart
    var chart = new google.visualization.ChartWrapper({
        chartType: chartType,
        containerId: containerId,
        dataTable: dataTable,
        options: options,
    });
    chart.draw();
};
/**
 * Draw charts for user data.
 * @param {Array<(string | number)[]>} processedUserData - The processed user data to be displayed in the charts.
 */
var drawUserCharts = function (processedUserData) {
    // Create data table for user charts
    var userData = new google.visualization.DataTable();
    userData.addColumn("string", "User");
    userData.addColumn("number", "Tasks");
    userData.addRows(processedUserData);
    // Draw different types of charts for users
    drawCharts("column_chart_user_div", userData, "ColumnChart", "Tasks per User");
    drawCharts("line_chart_user_div", userData, "LineChart", "Tasks per User");
    drawCharts("pie_chart_user_div", userData, "PieChart", "Tasks per User");
};
/**
 * Draw charts for task completion status.
 * @param {Array<(string | number)[]>} processedCompletionData - The processed completion data to be displayed in the charts.
 */
var drawCompletionCharts = function (processedCompletionData) {
    // Create data table for completion status charts
    var dataCompleted = new google.visualization.DataTable();
    dataCompleted.addColumn("string", "Status");
    dataCompleted.addColumn("number", "Count");
    dataCompleted.addRows(processedCompletionData);
    // Draw different types of charts for completion status
    drawCharts("column_chart_completed_div", dataCompleted, "ColumnChart", "Task Completion Status");
    drawCharts("line_chart_completed_div", dataCompleted, "LineChart", "Task Completion Status");
    drawCharts("pie_chart_completed_div", dataCompleted, "PieChart", "Task Completion Status");
};
