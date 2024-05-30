function switchPanel(panelNumber) {
    var i;
    var panels = document.getElementsByClassName("panel");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    document.getElementById("panel" + panelNumber).style.display = "block";  
    dots[panelNumber - 1].className += " active";
}

switchPanel(1);

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  
  if (error === 'incorrectLogin') {
    alert('Incorrect Login'); 
  }
});

