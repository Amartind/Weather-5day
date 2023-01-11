var apiKey = 'db01dfdc34ac3747669ef86128e09030'
var lon = ''
var lat = ''
var limit = 1
var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`

cityName = $('#city-input').keyup(function(event) {
    if (event.keyCode === 13) {
        // Enter key was pressed
        if ($(this).val() === ''){
            return;
        } else{
            var citySearched = $(this).val();
            console.log(citySearched);
        }
        var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=${limit}&appid=${apiKey}`
        fetch(geocodeUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lonSearched = data[0].lon
            var latSearched = data[0].lat
            console.log(latSearched)
            console.log(lonSearched)
            lon = lonSearched
            lat = latSearched
            requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${apiKey}`
                        fetch (requestUrl)
                        .then (function(response2) {
                            console.log(response2);
                            return response2.json();
                        })
                        .then(function (data2) {
                            console.log(data2);
                            console.log(data2.city.name)
                            console.log(data2.list[0].weather[0].main)
                            console.log(data2.list[0].main.temp)
                        })
                       
                        
            }
)}})
    
    
    
       
    



