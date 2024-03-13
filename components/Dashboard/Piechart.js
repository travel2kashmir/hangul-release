import { useEffect } from "react"
import { Chart } from "chart.js";
function Piechart() {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Referal Traffic", "Direct Traffic", "Organic Traffic"],
            datasets: [{
                data: [40,100, 34],
                borderColor: [
                    "rgb(255, 255, 0)",
                    "rgb(0, 255, 0)",
                    "rgb(255,0, 0)",
                    
                ],
                backgroundColor: [
                    "rgb(255, 165, 0)",
                    "rgb(34, 139, 34)",
                    "rgb(106, 90, 205)",
                ],
                borderWidth: 2,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false,
                }],
            }
        },
    });
}, [])
  return (
    <div className="py-4 w-1/2 h-1/2 bg-white rounded-lg shadow">
      {/* line chart */}
      <h1 className="flex justify-center mx-auto mt-2 text-xl font-semibold capitalize ">Traffic Distribution</h1>
      <div className="flex">
        <div className='bg-white  pt-0  w-full h-fit my-auto '>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </div>
  )
}

export default Piechart;