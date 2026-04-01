// ==========================
// 1️⃣ Disease Detection
// ==========================

async function detectDisease(){

const fileInput = document.getElementById("leafImage");
const file = fileInput.files[0];

if(!file){
alert("Please upload a leaf image");
return;
}

const formData = new FormData();
formData.append("image", file);

try{

const response = await fetch("http://172.17.4.241:5000/predict-disease",{
method:"POST",
body:formData
});

const data = await response.json();

document.getElementById("diseaseResult").innerHTML =
data.disease + " (" + data.confidence + "% confidence)";

}catch(error){

console.log(error);
alert("Error connecting to backend");

}

}



// ==========================
// 2️⃣ Yield Prediction
// ==========================

async function predictYield(){

const ph = document.getElementById("ph").value;
const nitrogen = document.getElementById("nitrogen").value;
const phosphorus = document.getElementById("phosphorus").value;
const potassium = document.getElementById("potassium").value;

try{

const response = await fetch("http://172.17.4.241:5000/predict-yield",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
ph:ph,
nitrogen:nitrogen,
phosphorus:phosphorus,
potassium:potassium
})
});

const data = await response.json();

document.getElementById("yieldResult").innerHTML =
data.yield + " tons/ha <br> Quality: " + data.quality;

}catch(error){

console.log(error);
alert("Error connecting to backend");

}

}



// ==========================
// 3️⃣ Fertilizer Recommendation
// ==========================

async function recommendFertilizer(){

const nitrogen = document.getElementById("nitrogen").value;
const phosphorus = document.getElementById("phosphorus").value;
const potassium = document.getElementById("potassium").value;

try{

const response = await fetch("http://172.17.6.186:5000/fertilizer",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
nitrogen:nitrogen,
phosphorus:phosphorus,
potassium:potassium
})
});

const data = await response.json();

let html = "";

data.fertilizers.forEach(f => {

if(f.includes("Urea")){
html += `
<div class="fert-card">
<h3>Urea (46-0-0)</h3>
<p>Rice, Wheat • 120 kg/ha • Apply 30 days after sowing</p>
<span class="tag nitrogen">Nitrogen</span>
</div>`;
}

if(f.includes("DAP")){
html += `
<div class="fert-card">
<h3>DAP (18-46-0)</h3>
<p>All crops • 100 kg/ha • Apply at sowing</p>
<span class="tag phosphorus">Phosphorus</span>
</div>`;
}

if(f.includes("MOP")){
html += `
<div class="fert-card">
<h3>MOP (0-0-60)</h3>
<p>Corn, Soybean • 80 kg/ha • Apply before sowing</p>
<span class="tag potassium">Potassium</span>
</div>`;
}

if(f.includes("NPK")){
html += `
<div class="fert-card">
<h3>NPK (10-26-26)</h3>
<p>Vegetables • 150 kg/ha • Apply at planting</p>
<span class="tag complex">Complex</span>
</div>`;
}

});

document.getElementById("fertilizerResult").innerHTML = html;

}catch(error){

console.log(error);
alert("Error connecting to backend");

}

}