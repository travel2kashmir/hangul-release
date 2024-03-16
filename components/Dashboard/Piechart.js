import { useEffect } from "react"
import { Chart } from "chart.js";
function Piechart({color, data, title, bgcolors, id }) {
  useEffect(() => {
    if (id) {
      // let finalData=data.reduce((acc, obj) => ({ ...acc, ...obj }), {});
      var ctx = document.getElementById(id).getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
         labels: Object.keys(data),
          datasets: [{
          data: Object.values(data),
            borderColor: bgcolors,
            backgroundColor: bgcolors,
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
    }
  }, [data])
  return (
    <div className={`py-4 my-2  w-full lg:w-5/12 h-1/2 ${color?.whitebackground} rounded-lg shadow`}>
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