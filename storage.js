
window.addEventListener('load',() => {
  let lon;
  let lat;

  const data = document.querySelector(".date");
  const location = document.querySelector(".location");
  const icon = document.querySelector(".center");
  const desc = document.querySelector("#desc");
  const degree = document.querySelector("#degree");
  

  const date1 = new Date().toLocaleDateString();
  const replace =  date1.split("/").join("-");
  data.textContent = replace;
 

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const key = "0c90c1c82e955c0ee24e680e822eb998";
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`; 
      console.log(api)
      fetch(api).then(response => {
        return response.json();
      }).then(data => {
        console.log(data)
        const desc1 = (data.weather[0].description).toUpperCase();
        location.innerHTML = `<span>${data.name}, ${data.sys.country}</span>`;
        const url_img = ` http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        icon.innerHTML = `<img src="${url_img}" alt="Icon" width="100%" height="100%" />`;
        desc.innerHTML = `<h2>${desc1}</h2>`;
        degree.innerHTML = `<h2>${(Math.floor((data.main.temp)/10))}°C</h2>`;
        
      })
      
    })
  }
});