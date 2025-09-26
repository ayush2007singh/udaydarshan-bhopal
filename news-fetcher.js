// news-fetcher.js
document.addEventListener('DOMContentLoaded', () => {
  const sampleNews = [
    { id:1, title:"UP उपचुनाव में मीरापुर बवाल", content:"पुलिस टीम पर पथराव...", image:"sample1.jpg", time:"10 मिनट पहले" },
    { id:2, title:"बिटकॉइन विवाद महाराष्ट्र", content:"वोटिंग में बिटकॉइन...", image:"sample2.jpg", time:"20 मिनट पहले" },
    { id:3, title:"भोपाल बारिश से जलमग्न", content:"तीव्र बारिश से यातायात...", image:"sample3.jpg", time:"30 मिनट पहले" },
    { id:4, title:"दिल्ली प्रदूषण स्तर हाई", content:"AQI 350 पार...", image:"sample4.jpg", time:"40 मिनट पहले" },
    { id:5, title:"तीर्थयात्रा मार्ग बंद", content:"बर्फबारी के चलते बंद...", image:"sample5.jpg", time:"50 मिनट पहले" },
    { id:6, title:"पंजाब फसल मुआवजा", content:"किसानों को मुआवजा...", image:"sample6.jpg", time:"1 घंटे पहले" },
    { id:7, title:"सीमा विवाद पर बैठक", content:"तनाव कम करने पर सहमति...", image:"sample7.jpg", time:"1 घंटे 10 मिनट पहले" },
    { id:8, title:"मुंबई लोकल ट्रेन बाधित", content:"बाढ़ से ट्रेन रद्द...", image:"sample8.jpg", time:"1 घंटे 20 मिनट पहले" },
    { id:9, title:"कोलकाता पुस्तक मेला", content:"10 दिवसीय मेला शुरू...", image:"sample9.jpg", time:"1 घंटे 30 मिनट पहले" },
    { id:10, title:"चेन्नई में ठंड", content:"तापमान गिरकर 5°C...", image:"sample10.jpg", time:"1 घंटे 40 मिनट पहले" }
  ];

  const grid = document.getElementById('newsGrid');
  if(!grid) return;
  grid.innerHTML = sampleNews.map(item => `
    <div class="news-item">
      <img src="${item.image}" alt="${item.title}" onerror="this.src='logo.jpg'">
      <div class="news-content">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <span class="news-time">${item.time}</span>
      </div>
    </div>
  `).join('');

  // Featured
  const featured = document.getElementById('featuredNews');
  if(featured) {
    featured.innerHTML = grid.firstElementChild.outerHTML;
  }
  
  // Hide spinner
  document.getElementById('loadingSpinner').style.display='none';
});
