"use strict";

window.addEventListener("DOMContentLoaded", start)


function start(){
    let colorPicker = document.querySelector("input")
    let harmonyPicker = document.querySelector("#armony-selector");
    harmonyPicker.addEventListener("change", trackChoices)
colorPicker.addEventListener("input", trackChoices);
  }
   
function trackChoices(event) {
    let currentColor = document.querySelector("input").value
    let currentHarmony = document.querySelector("#armony-selector").value;
    let chosenElements = {currentColor, currentHarmony}
    handleChoices(chosenElements)
}

//we pass the chosen values to the next funtion to handle
function handleChoices(chosenElements) {

let chosenHexNum = chosenElements.currentColor
let chosenRgbNum = transformColorRgb(chosenElements.currentColor);
let chosenHslNum = transformColorHsl(chosenRgbNum);
let harmony = chosenElements.currentHarmony;
let arrayColorsHsl;
let arrayColorsRgb;
let arrayColorsHex;

//set if statements and functions to get the additional colors depending on the harmony selected
if (harmony == "Analogous"){
//H is shifted some degrees dor each color
arrayColorsHsl = getAnalogousColors(chosenHslNum);
arrayColorsRgb = transformHslToRgb(arrayColorsHsl);
arrayColorsHex = transformRgbToHex(arrayColorsRgb);

//console.log(analogousColors)
}
else if (harmony == "Monochromatic"){console.log(`Harmony is ${harmony}`)}
else if (harmony == "Triad"){console.log(`Harmony is ${harmony}`)}
else if (harmony == "Complementary"){console.log(`Harmony is ${harmony}`)}
else if (harmony == "Compound"){console.log(`Harmony is ${harmony}`)}
else if (harmony == "Shades"){console.log(`Harmony is ${harmony}`)}


  displayHex(chosenHexNum, arrayColorsHex);
  displayRgb(chosenRgbNum, arrayColorsRgb);
  displayHsl(chosenHslNum, arrayColorsHsl);
  displayColor(chosenRgbNum, arrayColorsRgb);
  start()
}

function transformColorRgb(hexNum) {
//setting the variables
    let hexNumberOnly = hexNum.substring(1) //we remove the hashtag and divide the string into three rgb components
    let redPart = hexNumberOnly.substring(0,2);
    let greenPart = hexNumberOnly.substring(2,4);
    let bluePart = hexNumberOnly.substring(4);
 
    // actual format transformation
    let r = parseInt(redPart, 16);
    let g = parseInt(greenPart, 16);
    let b = parseInt(bluePart, 16);

    return {r, g, b} 
}

function transformColorHsl(rgbNum) {
   
   let r = rgbNum.r
   let g = rgbNum.g
   let b = rgbNum.b
   console.log("R is " + r)
   console.log("G is " + g)
   console.log("B is " + b)

   r/= 255;
   g /= 255;
   b /= 255;
 
   let h, s, l;
 
   const min = Math.min(r,g,b);
   const max = Math.max(r,g,b);
  
   if( max === min ) {
     h = 0;
   } else
   if (max === r) {
     h = 60 * (0 + (g - b) / (max - min) );
   } else
   if (max === g) {
     h = 60 * (2 + (b - r) / (max - min) );
   } else
   if (max === b) {
     h = 60 * (4 + (r - g) / (max - min) );
   }
  
   if (h < 0) {h = h + 360; }
  
   l = (min + max) / 2;
  
   if (max === 0 || min === 1 ) {
     s = 0;
   } else {
     s = (max - l) / ( Math.min(l,1-l));
   }
   // multiply s and l by 100 to get the value in percent, rather than [0,1]
   s *= 100;
   l *= 100;
   //avoid too many decimals
   h = Math.round(h)
   s = Math.round(s)
   l = Math.round(l)

   return {h, s, l}
}

function transformHslToRgb(analogousColorsHSL){
let analogousArray =[]
analogousColorsHSL.forEach(function(object){
    let h = object.h
    let s = object.s
    let l = object.l
h = h;
s = s / 100;
l = l / 100;
 
let c = (1 - Math.abs(2 * l - 1)) * s,
x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
m = l - c / 2,
r = 0,
g = 0,
b = 0;
if (0 <= h && h < 60) {
r = c;
g = x;
b = 0;
} else if (60 <= h && h < 120) {
r = x;
g = c;
b = 0;
} else if (120 <= h && h < 180) {
r = 0;
g = c;
b = x;
} else if (180 <= h && h < 240) {
r = 0;
g = x;
b = c;
} else if (240 <= h && h < 300) {
r = x;
g = 0;
b = c;
} else if (300 <= h && h < 360) {
r = c;
g = 0;
b = x;
}
r = Math.round((r + m) * 255);
g = Math.round((g + m) * 255);
b = Math.round((b + m) * 255);

let rgbObject = {r,g,b}
analogousArray.push(rgbObject)
  })
  return analogousArray
}

function transformRgbToHex(analogousColorsRgb) {
  let hexAnalogous = []
  analogousColorsRgb.forEach(function(rgbColor){
  let r = rgbColor.r.toString(16);
  let g = rgbColor.g.toString(16);
  let b = rgbColor.b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  let hex = `#${r+g+b}`
  hexAnalogous.push(hex)
  })
  return hexAnalogous
}

//functions for getting additional colors
function getAnalogousColors(chosenHslNum){
  let arrayOfColors = []
  let hNum = chosenHslNum.h
 
  for( let i=0; i<4; i++){
    hNum = hNum +7
    if (hNum>360){hNum = bringIntoInterval(hNum, 360)}
    console.log(hNum)
    arrayOfColors[i] =Object.assign({}, chosenHslNum)
    arrayOfColors[i].h = hNum;
  }
 return arrayOfColors
}

function bringIntoInterval(number, max) {
  while (number < 0) {
  number = number + max //it means that if the number is below 0 its adding the max number to it; then we return the remaining of the division.
  }
  return number % max
  }


function displayHex(hexNum, hexColors) {
  let hex1 = hexColors[0];
  let hex2 = hexColors[1];
  let hex3 = hexColors[2];
  let hex4 = hexColors[3]
 
    document.querySelector("#mainColorNumbers .hex p").textContent = hexNum;
    document.querySelector("#color1Numbers .hex p").textContent = hex1;
    document.querySelector("#color2Numbers .hex p").textContent = hex2;
    document.querySelector("#color3Numbers .hex p").textContent = hex3;
    document.querySelector("#color4Numbers .hex p").textContent = hex4;

}

function displayRgb(rgbNum, arrayRgb) {
  let color1 = arrayRgb[0];
  let color2 = arrayRgb[1];
let color3 = arrayRgb[2];
let color4 = arrayRgb[3]

  document.querySelector("#mainColorNumbers .rgb p").textContent = `${rgbNum.r}, ${rgbNum.g},${rgbNum.b}`;
  document.querySelector("#color1Numbers .rgb p").textContent = `${rgbNum.r}, ${rgbNum.g},${rgbNum.b}`;
  document.querySelector("#color2Numbers .rgb p").textContent = `${rgbNum.r}, ${rgbNum.g},${rgbNum.b}`;
  document.querySelector("#color3Numbers .rgb p").textContent = `${rgbNum.r}, ${rgbNum.g},${rgbNum.b}`;
  document.querySelector("#color4Numbers .rgb p").textContent = `${rgbNum.r}, ${rgbNum.g},${rgbNum.b}`;

}

function displayHsl(hslNum, arrayHsl) {
  console.log(hslNum)
  document.querySelector("#mainColorNumbers .hsl p").textContent = `${hslNum.h}, ${hslNum.s}%, ${hslNum.l}%`;  
}

function displayColor(rgbNum, rgbArray){
let color1 = rgbArray[0];
let color2 = rgbArray[1];
let color3 = rgbArray[2];
let color4 = rgbArray[3]
console.log(color1)
console.log(rgbNum, rgbArray)
document.querySelector("#mainColor").style.backgroundColor = `rgb(${rgbNum.r}, ${rgbNum.g}, ${rgbNum.b})`;
document.querySelector("#color1").style.backgroundColor = `rgb(${color1.r}, ${color1.g}, ${color1.b})`;
document.querySelector("#color2").style.backgroundColor = `rgb(${color2.r}, ${color2.g}, ${color2.b})`;
document.querySelector("#color3").style.backgroundColor = `rgb(${color3.r}, ${color3.g}, ${color3.b})`;
document.querySelector("#color4").style.backgroundColor = `rgb(${color4.r}, ${color4.g}, ${color4.b})`;
}

