// setup block
const data = {
  labels: [],
  datasets: [
    {
      label: "Blue dollar",
      data: [],
      borderColor: ["#36a2eb"],
      backgroundColor: ["#36a2eb"],
    },
    {
      label: "Dollar",
      data: [],
      borderColor: ["rgba(75, 192, 192, 1)"],
      backgroundColor: ["rgba(75, 192, 192, 1)"],
    },
  ],
};

// config block
const config = {
  type: "line",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render / init block
const myChart = new Chart(document.getElementById("blueGraph"), config);

function getChart() {
  async function fetchdata() {
    const url = "https://api.bluelytics.com.ar/v2/evolution.json";
    const res = await fetch(url);
    // wait until the request has been completed
    const datapoints = await res.json();
    return datapoints;
  }

  fetchdata().then((datapoints) => {
    const date = datapoints
      .slice(0)
      .reverse()
      .map(function (index) {
        return index.date;
      });

    const blueValue = datapoints
      .slice(0)
      .reverse()
      .map(function (index) {
        if (index.source == "Blue") {
          return index.value_sell;
        }
      });

    const value = datapoints
      .slice(0)
      .reverse()
      .map(function (index) {
        if (index.source == "Oficial") {
          return index.value_sell;
        }
      });

    myChart.config.data.labels = date;
    myChart.config.data.datasets[0].data = blueValue;
    myChart.config.data.datasets[1].data = value;
    myChart.update();
  });
}

function getChartInterval(days) {
  async function fetchdata() {
    const url = `https://api.bluelytics.com.ar/v2/evolution.json?days=${days}`;
    const res = await fetch(url);
    // wait until the request has been completed
    const datapoints = await res.json();
    return datapoints;
  }

  fetchdata().then((datapoints) => {
    const date = datapoints
      .slice(0)
      .reverse()
      .map(function (index) {
        return index.date;
      });

    const blueValue = datapoints
      .slice(0)
      .reverse()
      .map(function (index) {
        if (index.source == "Blue") {
          return index.value_sell;
        }
      });

    const value = datapoints
      .slice(0)
      .reverse()
      .map(function (index) {
        if (index.source == "Oficial") {
          return index.value_sell;
        }
      });

    myChart.config.data.labels = date;
    myChart.config.data.datasets[0].data = blueValue;
    myChart.config.data.datasets[1].data = value;
    myChart.update();
  });
}

const listenToMaxButton = document.getElementById("MaxButton");
listenToMaxButton.onclick = () => getChart();

const listenTo5YButton = document.getElementById("5YButton");
listenTo5YButton.onclick = () => getChartInterval(1825);

const listenTo1YButton = document.getElementById("1YButton");
listenTo1YButton.onclick = () => getChartInterval(365);

const listenTo6MButton = document.getElementById("6MButton");
listenTo6MButton.onclick = () => getChartInterval(180);

const listenTo1MButton = document.getElementById("1MButton");
listenTo1MButton.onclick = () => getChartInterval(30);

const listenTo5DButton = document.getElementById("5DButton");
listenTo5DButton.onclick = () => getChartInterval(7);
