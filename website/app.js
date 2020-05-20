 
/* Global Variables */
const generateBtn = document.getElementById('generate');
const apiKey = '55e902a33c27ef254437897e8888f021';
const dimmer = document.querySelector('.dimmer');
const form = document.querySelector('form');
const entriesList = document.querySelector('#entries');
const country = 'us';

// generates a new date string
function getNewDate(){
    let d = new Date();
    return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

// helper function for addEntriesFunction
function getEntryFragment(data){
    const fragment = document.createDocumentFragment();
    const classes = ['date', 'temp', 'content'];
    for (let i = 0; i < classes.length; i++){
        const div = document.createElement('div');
        // two elements cannot have the same id so classes are used instead
        div.classList.add(classes[i]);
        div.innerText = data[i];
        fragment.appendChild(div);
    }
    return fragment;
}

// adds entries to the Most Recent Entries section 
function addEntries(entries){
    entriesList.style.display = "none";
    entriesList.innerHTML = "";
    entries.forEach((entry)=>{
        let newEntry = document.createElement('div');
        newEntry.classList.add('entryHolder');
        newEntry.appendChild(getEntryFragment([entry.date, entry.temp, entry.feelings]));
        entriesList.appendChild(newEntry);
    });
    entriesList.style.display = "block";
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
      addEntries(resJson.posts);
    }  catch(error) {
        alert("incorrect US pincode, please try again");
      console.log("error", error);
      // appropriately handle the error
    }
    dimmer.classList.remove('active');
  }

// event listener added to form instead of generate button to ensure that zip code cannot be left blank
// easily with required attribute in the input element, the event object also encapsulates the input fields
form.addEventListener('submit', getTemp);

// makes a GET request to fetch the entries from our server when page loads
const getEntries = async ()=>{
    const res = await fetch('/data');
    const entries = await res.json();
    addEntries(entries.posts);
}

window.addEventListener('load', getEntries);