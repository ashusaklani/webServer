
const initApp = ()=>{
    const redDial = document.getElementById('redDial');
    const greenDial = document.getElementById('greenDial');
    const blueDial = document.getElementById('blueDial');
    const rgbForm=document.getElementById('rgbForm');
    const hiddenLedDiv=document.getElementById('hiddenLedDiv');
    const ledSvg=document.getElementById('ledSvg');
    const ledControlInput=document.getElementById('ledControlInput');
    const ledControlForm=document.getElementById('ledControlForm');
    const rgbSvg=document.getElementById('rgbSvg')
    const hiddenRGBDiv=document.getElementById('hiddenRGBDiv');
    const ultrasonicBtn=document.getElementById('ultrasonicBtn');
    const ultrasonicDiv=document.getElementById('ultrasonicDiv');
    const hamburgerBtn = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let rVal=0;
    let gVal=0;
    let bVal=0;
    let ledControlVal=0;
    let rgbState=0;
    let ledState=0;
    let ultrasonicState=0;
    let response;
    
    const toggleMenu = () => {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("flex");
        hamburgerBtn.classList.toggle("toggle-btn");
    }
    
    hamburgerBtn.addEventListener("click", toggleMenu);
    
    async function startFetchingData() {
        intervalId = setInterval(()=>{
            fetch('/data')
        },3000)
    }
    ultrasonicBtn.addEventListener('click',()=>{
        if(ultrasonicState===0){
            ultrasonicBtn.innerHTML="Stop"
            
            response=sendData('application/ultrasonicStateControl',{val:1})
            ultrasonicDiv.innerText="Scanning ..."
            setTimeout({
                pass
            },1000)

            console.log(response);
            startFetchingData();
            ultrasonicState=1;
        }
        else{
            ultrasonicBtn.innerHTML=`Start`
            response=sendData('application/ultrasonicStateControl',{val:1})
            ultrasonicDiv.innerHTML="click here to start ULTRASONIC sensor";
        }
    })
    rgbSvg.addEventListener('click',async()=>{
        if(rgbState===0){
            response=await sendData('application/rgbStateControl',{val:1})
            console.log(response)
            rgbSvg.setAttribute('fill',"#FFFFFF")
            hiddenRGBDiv.classList.remove('hidden')
            rgbState=1
        }
        else{
            response=await sendData('application/rgbStateControl',{val:0})
            console.log(response)
            hiddenRGBDiv.classList.add('hidden');
            rgbSvg.setAttribute('fill',"#   ");
            rgbState=0;
        }
    })
    ledSvg.addEventListener('click',async ()=>{
        if(ledState===0){
            response=await sendData('application/ledStateControl',{val:1})
            console.log(response);
            hiddenLedDiv.classList.remove('hidden');
            ledSvg.setAttribute('fill',"#FFFF00");
            ledState=1;
        }
        else{
            // console.log(ledState);
            response=await sendData('application/ledStateControl',{val:0})
            console.log(response)
            hiddenLedDiv.classList.add('hidden');
            ledSvg.setAttribute('fill',"#000000");
            ledState=0;
        }
    })
    ledControlForm.addEventListener('submit',async(event)=>{
        event.preventDefault();
        ledValControl=ledControlInput.value;
        response=await sendData('application/ledValControl',{val:ledValControl})
        console.log(response);
    })
    rgbForm.addEventListener('submit',async(event)=>{
        event.preventDefault();
        rVal=redDial.value;
        gVal=greenDial.value;
        bVal=blueDial.value;
        const rgb={
            rVal,
            gVal,
            bVal
        }
        response=await sendData("application/rgbValControl",rgb);
        console.log(response);
        console.log(rgb);
    })
    async function sendData(path,data) {
        let submitResponse=await fetch(path,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
          })
        return await submitResponse.json();
    }
}

document.addEventListener("DOMContentLoaded", initApp);