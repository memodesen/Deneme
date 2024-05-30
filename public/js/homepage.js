    

document.addEventListener("DOMContentLoaded", function() {
   const package = document.getElementById("pakett");
   const overlay = document.getElementById("overlay");
   const packagePage = document.getElementById("packagePage");
   const closeBtn = document.getElementById("closeBtn");
 
   package.addEventListener("click", function() {
     overlay.style.display = "block";
     packagePage.style.display = "block";
   });
 
   closeBtn.addEventListener("click", function() {
     overlay.style.display = "none";
     packagePage.style.display = "none";
   });
 });
 
 document.addEventListener("DOMContentLoaded", function() {
  var bubble = document.querySelector(".bubble"); 

  bubble.addEventListener("click", function() {
      window.location.href = "psysupport";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var bubble = document.querySelector(".bubble-2"); 

  bubble.addEventListener("click", function() {
      window.location.href = "donation";
  });
});

