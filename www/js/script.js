var timeData = {
    labels: ["1/2", "2/2", "3/2", "4/2", "5/2", "6/2", "7/2"],
    datasets: [
        {
            label: "4L",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 70, 2]
        }
    ]
};
var ctx = document.getElementById("timeData").getContext("2d");
window.myLineChart = new Chart(ctx).Line(timeData, {responsive: true});
