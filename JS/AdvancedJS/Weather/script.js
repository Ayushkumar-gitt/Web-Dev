

async function getWeather(city) {
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b384f8e900cf31136854e36a85fc418`)
    //     .then((raw) => raw.json())
    //     .then((result) => { console.log(result) })

    try {
    let rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b384f8e900cf31136854e36a85fc418`)

    var data = await rawData.json()
    
    if(!rawData.ok){
        throw new Error("city not found")
    }else{
        console.log(data);
    }
    } catch (err) {
        console.log(err.message);
        
    }
    

}

getWeather("London")