# Weather Application

A modern weather web application with authentication, smart search, and real-time weather updates using API.

---

# Tech Stack Used

1. HTML  
2. CSS  
3. JavaScript  

---

#  Work Flow

I divided this application into two major parts:

### 1) Login & Signup UI
- Handles user authentication
- Stores credentials using LocalStorage

### 2) Weather Dashboard
- Displays weather data using API
- Allows searching cities
- Provides suggestions using Binary Search

---

#  Authentication

### Signup → `localStorage.setItem()`
Stores username and password in browser storage.

### Login → `localStorage.getItem()`
Retrieves stored data and validates user credentials.

---

#  Architecture

1. After login → Dashboard UI is rendered  
2. User types in search box  
3. Suggestions appear based on prefix  
4. If city found in array → use Binary Search  
5. Otherwise → fetch directly from API  
6. UI updates dynamically  

---

#  Functions & Event Handling

---

##  `showDashboard()`

**Explanation:**
- Replaces entire page UI using `document.body.innerHTML`
- Builds dashboard layout
- Creates search box, suggestion area, and weather display
- Attaches all required event listeners
- Acts as the main entry point after login

---

##  `fetchWeather(city)`

**Explanation:**
- Makes API request using `fetch()` to get data
- Retrieves real-time weather data
- Extracts values like temperature, humidity, wind, etc.
- Updates UI elements dynamically
- Handles API errors using `try-catch`

---

##  `getMatches(arr, prefix)`

**Explanation:**
- Calls `binarySearchPrefix()` to find a matching index
- Expands left and right from that index
- Collects all cities starting with the given prefix
- Returns an array of matched cities

---

##  `binarySearchPrefix(arr, prefix)`

**Explanation:**
- Performs Binary Search on sorted array
- Finds one city that starts with given prefix
- Uses `startsWith()` for matching
- Returns index or `-1` if not found
- Improves search performance to O(log n)

---

# 🎧 Event Handling

---

##  `signButton[0].addEventListener("click")`

**Explanation:**
- Displays signup form dynamically
- Takes user input (username & password)
- Stores data in LocalStorage
- Confirms successful signup

---

## `loginButton[0].addEventListener("click")`

**Explanation:**
- Displays login form
- Reads user input
- Compares with stored credentials
- If valid → calls `showDashboard()`
- If invalid → shows error alert

---

##  `searchInput.addEventListener("input")`

**Explanation:**
- Triggers on every keystroke
- Calls `getMatches()` to find suggestions
- Dynamically creates dropdown items
- Allows user to click and select city

---

##  `searchInput.addEventListener("keydown")`

**Explanation:**
- Detects when user presses Enter key
- Fetches weather for typed city
- Provides keyboard-based search support

---

##  `searchBtn.addEventListener("click")`

**Explanation:**
- Triggered when search button is clicked
- Reads input value
- Calls `fetchWeather(city)`
- Provides mouse-based interaction

---

# Data Structure

```js
const cities = ["London", "Los Angels", "Lahore", "Lisbon", "New York", "Lucknow"];
cities.sort();
