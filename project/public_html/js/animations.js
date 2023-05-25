var checkbox = document.getElementById('checkbox');
var nav = document.getElementById('ul-navigation');
var body = document.body;

const togglenav = () =>{
    body.style.backgroundColor = 'black'
}

checkbox.addEventListener ("click", togglenav)
