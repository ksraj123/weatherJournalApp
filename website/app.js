 
/* Global Variables */
const generateBtn = document.getElementById('generate');
const apiKey = '55e902a33c27ef254437897e8888f021';
const dimmer = document.querySelector('.dimmer');
const form = document.querySelector('form');
const country = 'us';

function getNewDate(){
    let d = new Date();
    return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

const getTemp = async (evt)=>{
    evt.preventDefault();
    const zip = evt.target.elements.zip.value;
    const feelings = evt.target.elements.feelings.value;
    dimmer.classList.add('active');
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}`)
    try {
      const data = await res.json();
      const response = await fetch('/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            temp: data.main.temp,
            date: getNewDate(),
            zip,
            feelings
        })
      });
      const resJson = await response.json();
      console.log(resJson);
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
    dimmer.classList.remove('active');
  }

form.addEventListener('submit', getTemp);