import React from "react";
import {Bar} from "react-chartjs-2";

function ProgressChart(){

const data={
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{
label:"Habit Completion",
data:[2,3,4,5,6,3,2]
}]
};

return(

<div>

<h2>Weekly Progress</h2>

<Bar data={data}/>

</div>

)

}

export default ProgressChart;