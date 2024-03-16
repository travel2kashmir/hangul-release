import { useEffect } from "react"
import { Chart } from "chart.js";
function Piechart({ color, labels, data, title, bgcolors, id, chartLabel }) {
  useEffect(() => {
    if (id) {
      var ctx = document.getElementById(id).getContext('2d');
      var myBarGraph = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            label: chartLabel,
            borderColor: bgcolors,
            borderWidth: 0.5,
            backgroundColor: bgcolors,

          }
          ]
        },
      });
    }
  }, [data])
  return (
    <div className={`py-4 my-2 w-full lg:w-5/12 h-1/2 ${color?.whitebackground} rounded-lg shadow`}>
      {/* line chart */}
      <h1 className={`flex justify-center ${color?.text} mx-auto mt-2 text-xl font-semibold capitalize`} >{title}</h1>
      <div className="flex">
        <div className={`${color?.whitebackground}  pt-0  w-full h-fit my-auto `}>
          <canvas id={id}></canvas>
        </div>
      </div>
    </div>
  )
}

export default Piechart;