import { useEffect } from "react"
import { Chart } from "chart.js";
function Piechart() {
  useEffect(() => {
    var ctx = document.getElementById('myBarGraph').getContext('2d');
    var myBarGraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Windows", "Mac", "Linux", "Other"],
            datasets: [{
                data: [60,47,56,43],
                label: "user per platform",
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
                backgroundColor: 
                ["aqua", "green", "red", "yellow"],
                
            }
            ]
        },
    });
}, [])
  return (
    <div className="py-4 w-1/2 h-1/2 bg-white rounded-lg shadow">
      {/* line chart */}
      <h1 className="flex justify-center mx-auto mt-2 text-xl font-semibold capitalize ">Traffic Source</h1>
      <div className="flex">
        <div className='bg-white  pt-0  w-full h-fit my-auto '>
          

          <canvas id='myBarGraph'></canvas>
        </div>
      </div>
    </div>
  )
}

export default Piechart;