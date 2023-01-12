var apiKey = 'db01dfdc34ac3747669ef86128e09030'
var lon = ''
var lat = ''
var limit = 1
var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
var currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
// var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=${limit}&appid=${apiKey}`

//set up click listener on search button
cityName = $('.button').click(function(event) {
        event.preventDefault();
// clear previous results
        $(".card5day").remove();
        $(".citycurrent").remove();
// if no input in search bar then button clicked is not clicked
        if ($("#city-input").val() === ''){
            return;
        } else{
            var citySearched = $("#city-input").val();
            console.log($("#city-input").val())
        }
        var citySearchedLS = []
        
//make button basd off of text entered
        $("#city-input").val("")
        var cityList = $('<button class="row justify-space-between align-center p-3 m-2 bg-light text-dark citybutton btn-primary">');
        cityList.text(citySearched);
        $("#citylist").append(cityList);
//click event on button made
        $('.citybutton').click(function() {
            console.log("hello");
            // function(event);
        });

//get lon and lat from api results
        var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=${limit}&appid=${apiKey}`
        fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lonSearched = data[0].lon
            var latSearched = data[0].lat
            lon = lonSearched
            lat = latSearched
// get the current weather for found lon and lat coords
            currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
                fetch(currentUrl)
                .then (function(responseCurrent){
                    console.log(responseCurrent);
                    return responseCurrent.json();
                })
                .then (function (dataCurrent){
                    console.log(dataCurrent)
                    console.log(dataCurrent.name)
                    var time = dayjs().format(' M/DD/YYYY')
                    console.log(time)
                    console.log(dataCurrent.main.temp)    
                    console.log(dataCurrent.main.humidity)
                    console.log(dataCurrent.wind.speed)

//append results for current weather
                    var cityCInput = $("<div>")
                    cityCInput.addClass("row citycurrent")
                    cityCInput.html(dataCurrent.name + " " + time)
                    $('.cardcurrent').append(cityCInput)

                    var iconCInput = $("<img >")
                    iconCInput.addClass("row citycurrent bigboi")
                    iconCInput.attr("src" ,`https://openweathermap.org/img/w/${dataCurrent.weather[0].icon}.png`)
                    $('.cardcurrent').append(iconCInput)

                    var tempCInput = $("<div>")
                    tempCInput.addClass("row citycurrent")
                    tempCInput.html("Temp: " + dataCurrent.main.temp +" F")
                    $('.cardcurrent').append(tempCInput)

                    var windCInput = $("<div>")
                    windCInput.addClass("row citycurrent")
                    windCInput.html("Wind: " + dataCurrent.wind.speed + " mph")
                    $('.cardcurrent').append(windCInput)

                    var humidityCInput = $("<div>")
                    humidityCInput.addClass("row citycurrent")
                    humidityCInput.html("Humidity: " + dataCurrent.main.humidity +" %")
                    $('.cardcurrent').append(humidityCInput)
                })
//get results from API for 5 day
            requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=33&appid=${apiKey}`
                        fetch (requestUrl)
                        .then (function(response5day) {
                            console.log(response5day);
                            return response5day.json();
                        })
                        .then(function (data5day) {
                            // console.log(data5day);
                            // console.log(data5day.list)
                            // console.log(data5day.city.name)
                            // var city5day = data5day.city.name

//Seperate results into 5 different days in a array
                            var dayList = [0,8,16,24,32].map(i => data5day.list[i])
                            // console.log(dayList)
//Append results to page
                            for (let i = 0; i < dayList.length; i++) {
                                // console.log(dayList[i].weather[0].main)
                                var weather5day = dayList[i].weather[0].main
                                // console.log(weather5day)
                                // console.log(dayList[i].main.temp)
                                var temp5day = dayList[i].main.temp
                                // console.log(temp5day)
                                // console.log(dayList[i].wind.speed)
                                var wind5day = dayList[i].wind.speed
                                // console.log(wind5day)
                                // console.log(dayList[i].main.humidity)
                                var humidity5day = dayList[i].main.humidity
                                // console.log(humidity5day)
                                var icon5day = dayList[i].weather[0].icon
                                var dateUnix5 = dayList[i].dt_txt
                                var year = dateUnix5.slice(0,4);
                                var month = dateUnix5.slice(5,7);
                                var day = dateUnix5.slice(8,10);
                                var date5day = month + '/' + day + '/' + year;
                                // console.log(dateUnix)
                                // console.log(dayList[i])
                                // <img src=`https://openweathermap.org/img/wn/${icon5day}@2x.png`>
                                var card = $("<card>")
                                .addClass('card col-2 bg-info card5day')     
                                $('#5Day').append(card)
                                
                                var date5Input = $("<div>")
                                date5Input.addClass("row")
                                date5Input.html(date5day)
                                $(card).append(date5Input)
                                
                                var icon5Input = $("<img>")
                                icon5Input.addClass("row bigboi")
                                icon5Input.attr("src" ,`https://openweathermap.org/img/w/${icon5day}.png`)
                                $(card).append(icon5Input)
                                
                                var temp5Input = $("<div>")
                                temp5Input.addClass("row")
                                temp5Input.html("Temp: " + temp5day +" F")
                                $(card).append(temp5Input)
                                
                                var wind5Input = $("<div>")
                                wind5Input.addClass("row")
                                wind5Input.html("Wind: " + wind5day + " mph")
                                $(card).append(wind5Input)
                                
                                var humidity5Input = $("<div>")
                                humidity5Input.addClass("row")
                                humidity5Input.html("Humidity: " + humidity5day +" %")
                                $(card).append(humidity5Input)   
                            }
                            
                        })}
                        )}
                    )