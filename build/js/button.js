// Here I will be writing the javascript code to animate our haemburger button icon. 

const initApp = ()=>{
    const redDial = document.querySelector(".redDial");
    const greenDial = document.querySelector(".greenDial");
    const blueDial = document.querySelector(".blueDial");

    redDial.oninput = function () {
        const sliderVal = this.value;
        console.log("Red Value: " + sliderVal);
    }
    greenDial.oninput = function () {
        const sliderVal = this.value;
        console.log("Green Value: " + sliderVal);
    }
    blueDial.oninput = function () {
        const sliderVal = this.value;
        console.log("Blue Value: " + sliderVal);
    }

}

document.addEventListener("DOMContentLoaded", initApp);