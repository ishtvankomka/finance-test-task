export const data = (history, color) => {
    return {
        labels: Array(20).fill(""),
        datasets: [
            {
                data: history,
                borderColor: color,
                borderWidth: 1,
                fill: false,
            }
        ]
    }
};

export const options = {
    plugins: {
        legend: {
          display: false
        }
      },
    animation: {
        duration: 500,
        xAxis: true,
        yAxis: false,
    }
};