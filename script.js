// script.js

// Date & Time
function updateDateTime() {
  const now=new Date();
  const days=['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'];
  const months=['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
  document.getElementById('currentDate').textContent=`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById('updateTime').textContent=`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} IST`;
}
updateDateTime();
setInterval(updateDateTime,60000);

// Mobile Menu
const mobileBtn=document.querySelector('.mobile-menu-btn');
const navLinks=document.querySelector('.nav-links');
mobileBtn.onclick=()=>navLinks.classList.toggle('active');

// Weather (static)
setInterval(()=>{
  const temps=[25,26,27,28,29,30];
  document.getElementById('weather').innerHTML=`<i class="fas fa-map-marker-alt"></i> भोपाल <i class="fas fa-cloud-sun"></i> ${temps[Math.floor(Math.random()*temps.length)]}°C`;
},1800000);

// Download ePaper PDF
function downloadEpaper() {
  const link = document.createElement('a');
  link.href = '26sept-tuday25.pdf'; // Path to your PDF file
  link.download = 'uday-darshan-epaper-today.pdf';
  link.click();
}

// View ePaper PDF online
function viewEpaper() {
  window.open('26sept-tuday25.pdf', '_blank'); // Open PDF in new tab/window
}
