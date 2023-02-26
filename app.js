
linkedin.addEventListener("click", function () {
    let linkedin = document.getElementById("linkedin");
    window.open("https://www.linkedin.com/in/ian-gabriel-rojas-sequeira-303643258/");
}); 

instagram.addEventListener("click", function () {
    let instagram = document.getElementById("instagram");
    window.open("https://www.instagram.com/ianrs.dev/");
}); 


github.addEventListener("click", function () {
    let github = document.getElementById("github");
    window.open("https://github.com/ianrojas19");
}); 

function copyEmail() {
    let email = "ian.rsq@gmail.com"
    navigator.clipboard.writeText(email);
    let notification = document.createElement("div");
    notification.textContent = "¡Dirección de correo electrónico copiada!";
    notification.style.backgroundColor = "#7e2fbb";
    notification.style.color = "white";
    notification.style.position = "fixed";
    notification.style.top = "0";
    notification.style.left = "47%";
    notification.style.transform = "translateX(-50%)";
    notification.style.padding = "14px";
    notification.style.borderRadius = "0px 0px 20px 19px";
    notification.style.width = "160px";
    notification.style.textAlign = "center";
    document.body.appendChild(notification);
    setTimeout(function(){
      notification.parentNode.removeChild(notification);
    }, 2000);
  }