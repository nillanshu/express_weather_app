const submitBtn = document.getElementById('submitBtn');

const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');

const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');

const day = document.getElementById('day');
const today_data = document.getElementById('today_data');




const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal === '') {
        city_name.innerText = 'Please enter a city name before search';
        datahide.classList.add('data_hide');

    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=626e22e9d3f5a7bf41b8a61964ae9871`;
            const response = await fetch(url);     //fetching api
            const objData = await response.json();   //converting json to obj 
            const arrData = [objData];              //converting obj in to array of an object for convenience of accessing the data
            // console.log(arrData);

            temp_real_val.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #0097e6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }

            datahide.classList.remove('data_hide');



        } catch {
            city_name.innerText = `Oops! Maybe name entered is not correct...`;
            datahide.classList.add('data_hide');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);


const getCurrentDay = () => {
    let weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";

    let currentTime = new Date();
    let day = weekDay[currentTime.getDay()];

    return day;
};

const getCurrentDate = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    var now = new Date();
    var date = now.getDate();
    var month = months[now.getMonth()];

    var dataObj = {date, month};

    return dataObj;
};

const currentDay = getCurrentDay();
const currentDate = getCurrentDate();


day.innerText = `${currentDay}`;
today_data.innerText = `${currentDate.date} ${currentDate.month}`;
