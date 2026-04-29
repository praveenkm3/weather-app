let userInput = document.getElementById("city");
let city = document.getElementById("city-name");
let image = document.getElementById("image");
let list = document.getElementById("list");

btn.addEventListener("click", run);
async function run(){
     
    let collect = userInput.value;
    if (collect == "") {
        alert("Enter city first")
    } else {
        try {
            let resultAPI = await fetch(`https://api.weatherapi.com/v1/current.json?key=9f5412fa8d8b4df0ad441726262204&q=${collect}&aqi=yes`)
            let data = await resultAPI.json();
            city.textContent = data.location.name;
            image.src = "https:" + data.current.condition.icon;
            
            let res="";
            res+=`<li>Temparature is ${data.current.temp_c}</li>
                <li>Weather Conditon is ${data.current.condition.text}</li>
                <li>Humidity ${data.current.humidity}</li>
                <li>Location ${data.location.region}</li>
                <li>Date & Time is ${data.location.localtime}</li>`
            list.innerHTML=res;

            userInput.value = "";
        } catch (error) {
            console.log("Somthing is Interrupted" + error);
        }

    }


}
