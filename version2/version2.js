let loginButton = document.getElementsByClassName("login");
let signButton = document.getElementsByClassName("signup");
let root = document.getElementById("root");

const cities = ["London", "Los Angels", "Lahore", "Lisbon", "New York","Lucknow"];
cities.sort()

//signup
signButton[0].addEventListener("click", () => {

    let signBox = document.createElement("div");
    signBox.classList.add("loginBox"); // reuse same style

    signBox.innerHTML = `
        <h2>Signup</h2>

        <label>Username</label><br>
        <input id="signupUsername" type="text" placeholder="Enter username" /><br><br>

        <label>Password</label><br>
        <input id="signupPassword" type="password" placeholder="Enter password" /><br><br>

        <button id="signupbtn">Signup</button>
    `;

    document.querySelector(".card").style.display = "none";
    root.appendChild(signBox);
    let signbtn=document.getElementById("signupbtn");
    signbtn.addEventListener("click", () => {

        let username = document.getElementById("signupUsername").value;
        let password = document.getElementById("signupPassword").value;

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("Signup successful");
    });
});
let signBox = document.createElement("div");

//login

let loginBox = document.createElement("div");
loginBox.classList.add("loginBox");
loginButton[0].addEventListener("click", () => {
    loginBox.innerHTML = `<h2>Login</h2>
        
        <label>Username</label><br>
        <input type="text" placeholder="Enter username" id="username"/><br><br>

        <label>Password</label><br>
        <input type="password" placeholder="Enter password" id="password"/><br><br>

        <button id="loginbtn">Login</button>`;


    document.querySelector(".card").style.display = "none";
    root.appendChild(loginBox);
    //login button
    let loginbtn = document.getElementById("loginbtn");
    loginbtn.addEventListener("click", () => {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let localUser = localStorage.getItem("username");
    let localPassword = localStorage.getItem("password");

    if (username === localUser && password === localPassword) {
        alert("Login successful");
        showDashboard();
    } else {
        alert("Invalid credentials");
    }
});
});

function showDashboard() {
    document.body.innerHTML = `
        <div class="dashboard">

            <!-- LEFT PANEL -->
            <div class="leftPanel">
                <div class="searchBox">
                    <input type="text" id="searchInput" placeholder="Search city..." />
                    <button id="searchBtn">🔍</button>
                </div>
                <div id="suggestions"></div>

                <p id="day">Monday</p>

                <div class="extraInfo">
                    <p id="condition">Light Rain</p>
                    <p>Min: <span id="minTemp">28°C</span></p>
                    <p>Max: <span id="maxTemp">31°C</span></p>
                </div>

                <div class="bottomStats">
                    <div>
                        <p id="humidity">83%</p>
                        <span>Humidity</span>
                    </div>
                    <div>
                        <p id="wind">6 km/h</p>
                        <span>Wind</span>
                    </div>
                </div>
            </div>

            <!-- RIGHT PANEL -->
            <div class="rightPanel">

                <!-- TOP ROW -->
                <div class="topRow">
                    <div class="topLeft">
                        <h1 id="temperature">30°C</h1>
                        <p id="conditionTop">Clear</p>
                        <p id="location">City Name</p>
                    </div>

                    <div class="topRight">
                        <img id="weatherIcon" src="" alt="weather">
                    </div>
                </div>

                <h2>Today's Overview</h2>

                <div class="cards">
                    <div class="card">
                        <h4>Air Quality</h4>
                        <p id="aqi">53</p>
                        <span id="aqiText">Good</span>
                    </div>

                    <div class="card">
                        <h4>UV Index</h4>
                        <p id="uv">3</p>
                    </div>

                    <div class="card">
                        <h4>Pressure</h4>
                        <p id="pressure">1006 hPa</p>
                    </div>

                    <div class="card">
                        <h4>Precipitation</h4>
                        <p id="precip">0 mm</p>
                    </div>

                    <div class="card">
                        <h4>Feels Like</h4>
                        <p id="feelslike">--°C</p>
                    </div>

                    <div class="card">
                        <h4>Cloud Cover</h4>
                        <p id="cloud">--%</p>
                    </div>

                    <div class="card">
                        <h4>Dew Point</h4>
                        <p id="dew">--°C</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    //search button
    document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("searchInput").value;

        if (city.trim() !== "") {
            fetchWeather(city);
        }
});

    //  Enter key
    document.getElementById("searchInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const city = e.target.value;
            if (city.trim() !== "") {
                fetchWeather(city);
            }
        }
    });
    const input = document.getElementById("searchInput");
    const suggestionBox = document.getElementById("suggestions");

// typing listener or debounce effect
input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (value === "") return;

    let matches = getMatches(cities, value);

    if (matches.length === 0) return;

    matches.forEach(city => {
        let div = document.createElement("div");
        div.classList.add("suggestionItem");
        div.innerText = city;

        div.addEventListener("click", () => {
            input.value = city;
            suggestionBox.innerHTML = "";
            fetchWeather(city);
        });

        suggestionBox.appendChild(div);
    });
});
}

async function fetchWeather(city) {
    try {
        let arrayOfCities=["london","kadapa","bengaluru","pune","araku"]
        arrayOfCities.sort();

        
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9f5412fa8d8b4df0ad441726262204&q=${city}&aqi=yes`);
        const data = await response.json();
        
        document.getElementById("location").innerText = data.location.name;

        
        const date = new Date(data.location.localtime);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        document.getElementById("day").innerText = day;
        document.getElementById("temperature").innerText = Math.round(data.current.temp_c) + "°C";
        document.getElementById("condition").innerText = data.current.condition.text;
        const iconUrl = data.current.condition.icon;
        document.getElementById("weatherIcon").src =iconUrl.startsWith("//") ? "https:" + iconUrl : iconUrl;
        document.getElementById("humidity").innerText = data.current.humidity + "%";
        document.getElementById("wind").innerText = Math.round(data.current.wind_kph) + " km/h";
        document.getElementById("minTemp").innerText =Math.round(data.current.feelslike_c - 2) + "°C";
        document.getElementById("maxTemp").innerText =Math.round(data.current.feelslike_c + 2) + "°C";
        document.getElementById("uv").innerText = data.current.uv;
        document.getElementById("pressure").innerText=data.current.pressure_mb + " hPa";
        document.getElementById("precip").innerText =data.current.precip_mm + " mm";
        document.getElementById("aqi").innerText =data.current.air_quality["us-epa-index"];
        document.getElementById("feelslike").innerText =Math.round(data.current.feelslike_c) + "°C"
        document.getElementById("cloud").innerText =data.current.cloud + "%";
        document.getElementById("dew").innerText =Math.round(data.current.dewpoint_c) + "°C"
        document.getElementById("wind").innerText =Math.round(data.current.wind_kph) + " km/h " + data.current.wind_dir;

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("City not found or API error");
    }
}
function getMatches(arr, prefix) {
    let index = binarySearchPrefix(arr, prefix);
    if (index === -1) return [];

    let results = [];
    prefix = prefix.toLowerCase();

    //go left
    let i = index;
    while (i >= 0 && arr[i].toLowerCase().startsWith(prefix)) {
        results.unshift(arr[i]);
        i--;
    }

    //go right
    i = index + 1;
    while (i < arr.length && arr[i].toLowerCase().startsWith(prefix)) {
        results.push(arr[i]);
        i++;
    }

    return results;
}
function binarySearchPrefix(arr, prefix) {
    let left = 0;
    let right = arr.length - 1;
    let resultIndex = -1;
    prefix = prefix.toLowerCase();

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let value = arr[mid].toLowerCase();

        if (value.startsWith(prefix)) {
            resultIndex = mid;
            break;
        } else if (value < prefix) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return resultIndex;
}