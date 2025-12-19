let myicon = document.getElementById("themeToggle");
let body = document.body;

myicon.addEventListener( "click" , function(){
    if( body.classList.contains("light") ){
        body.classList.replace("light" , "dark")
        myicon.classList.contains("bi-moon-fill")
        myicon.classList.replace("bi-moon-fill" , "bi-sun-fill")
    } else {
        body.classList.replace("dark" , "light")
        myicon.classList.replace("bi-sun-fill" , "bi-moon-fill")
    }
})