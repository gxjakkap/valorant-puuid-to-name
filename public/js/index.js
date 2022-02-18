var lastclick = 0;
var delay = 5000;
var button = document.getElementById("button");
var inputField = document.getElementById("input");
var regDrop = document.getElementById("reg");

button.addEventListener("click",function(event, input){
  event.preventDefault();
  var userInput = inputField.value;
  var reg = regDrop.value;
  if(inputField && userInput){
    if (lastclick >= (Date.now() - delay)){
      var textdisplay = document.getElementById("display");
      textdisplay.classList.remove('hidden');
      textdisplay.innerText = "Please wait before you click again! (to avoid rate limiting)";
    } else{
      var textdisplay = document.getElementById("display");
      textdisplay.innerText = "Loading...";
      lastclick = Date.now();
      var url = "https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/"+reg+"/"+userInput;
      fetch(url, {method:"GET"})
      .then(function(response){
      if(response.status==200){
        return response.json();
      }
      else{
        throw new Error(Error);
      }
      }).then(function(data){
      textdisplay.classList.remove('hidden');
      textdisplay.innerText = "Player's name: "+data.data.name+"#"+data.data.tag;
    })
    }
  } else {
    var textdisplay = document.getElementById("display");
    textdisplay.classList.remove('hidden');
    textdisplay.innerText = "Input is blank!";
  }
})

input.addEventListener("keyup", function(event){
  if (event.keyCode === 13){
    event.preventDefault()
    button.click()
  }
})

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});