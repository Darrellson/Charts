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
// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(fetchAndDrawCharts);
// Fetch data from JSON file
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
// Function to process data for user charts
function processDataUser(data) {
    var userTaskCount = {};
    data.forEach(function (task) {
        var userIdKey = "User ".concat(task.userId);
        userTaskCount[userIdKey] = (userTaskCount[userIdKey] || 0) + 1;
    });
    return Object.entries(userTaskCount);
}
// Function to process data for completion status charts
function processDataCompletion(data) {
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
}
// Function to draw charts for user data
function drawUserCharts(processedUserData) {
    // Create data table for user charts
    var userData = new google.visualization.DataTable();
    userData.addColumn("string", "User");
    userData.addColumn("number", "Tasks");
    userData.addRows(processedUserData);
    // Set chart options
    var options = {
        title: "Tasks per User",
        width: "100%", // Full width for better visibility in each column
        height: 300, // Height adjusted for visibility
    };
    // Instantiate and draw the column chart for users
    var columnChartUser = new google.visualization.ChartWrapper({
        chartType: "ColumnChart",
        containerId: "column_chart_user_div",
        dataTable: userData,
        options: options,
    });
    columnChartUser.draw();
    // Instantiate and draw the line chart for users
    var lineChartUser = new google.visualization.ChartWrapper({
        chartType: "LineChart",
        containerId: "line_chart_user_div",
        dataTable: userData,
        options: options,
    });
    lineChartUser.draw();
    // Instantiate and draw the pie chart for users
    var pieChartUser = new google.visualization.ChartWrapper({
        chartType: "PieChart",
        containerId: "pie_chart_user_div",
        dataTable: userData,
        options: options,
    });
    pieChartUser.draw();
}
// Function to draw charts for completion status
function drawCompletionCharts(processedCompletionData) {
    // Create data table for completion status charts
    var dataCompleted = new google.visualization.DataTable();
    dataCompleted.addColumn("string", "Status");
    dataCompleted.addColumn("number", "Count");
    dataCompleted.addRows(processedCompletionData);
    // Set chart options
    var options = {
        title: "Task Completion Status",
        width: "100%", // Full width for better visibility in each column
        height: 300, // Height adjusted for visibility
    };
    // Instantiate and draw the column chart for completion status
    var columnChartCompleted = new google.visualization.ChartWrapper({
        chartType: "ColumnChart",
        containerId: "column_chart_completed_div",
        dataTable: dataCompleted,
        options: options,
    });
    columnChartCompleted.draw();
    // Instantiate and draw the line chart for completion status
    var lineChartCompleted = new google.visualization.ChartWrapper({
        chartType: "LineChart",
        containerId: "line_chart_completed_div",
        dataTable: dataCompleted,
        options: options,
    });
    lineChartCompleted.draw();
    // Instantiate and draw the pie chart for completion status
    var pieChartCompleted = new google.visualization.ChartWrapper({
        chartType: "PieChart",
        containerId: "pie_chart_completed_div",
        dataTable: dataCompleted,
        options: options,
    });
    pieChartCompleted.draw();
}
