// news-fetcher.js

/**
 * Renders a grid of sample news items with local images.
 * Place sample1.jpg … sample10.jpg in the same folder as this script.
 */
document.addEventListener('DOMContentLoaded', () => {
  const sampleNews = [
    {
      id: 1,
      title: "UP उपचुनाव के दौरान मीरापुर में बवाल",
      content: "मीरापुर में पुलिस टीम पर पथराव, कई घायल...",
      image: "sample1.jpg",
      time: "10 मिनट पहले"
    },
    {
      id: 2,
      title: "महाराष्ट्र में बिटकॉइन हेरफेर का विवाद",
      content: "वोटिंग के बीच बिटकॉइन मैनिपुलेशन का आरोप...",
      image: "sample2.jpg",
      time: "20 मिनट पहले"
    },
    {
      id: 3,
      title: "भोपाल में बारिश से यातायात बाधित",
      content: "तीव्र बारिश के कारण शहर के कई हिस्से जलमग्न...",
      image: "sample3.jpg",
      time: "30 मिनट पहले"
    },
    {
      id: 4,
      title: "दिल्ली में प्रदूषण स्तर हाई",
      content: "वायु गुणवत्ता सूचकांक 350 के पार...",
      image: "sample4.jpg",
      time: "40 मिनट पहले"
    },
    {
      id: 5,
      title: "तीर्थयात्रा मार्ग बंद",
      content: "उज्जैन-नर्मदापुरम मार्ग पर भारी बर्फबारी के चलते बंद...",
      image: "sample5.jpg",
      time: "50 मिनट पहले"
    },
    {
      id: 6,
      title: "पंजाब में फसल मुआवजा घोषित",
      content: "किसानों को सोयाबीन फसल क्षति का मुआवजा दिया जाएगा...",
      image: "sample6.jpg",
      time: "1 घंटे पहले"
    },
    {
      id: 7,
      title: "भारत-चीन सीमा विवाद पर बैठक",
      content: "वार्ता के बाद दोनों देशों ने तनाव कम करने पर सहमति...",
      image: "sample7.jpg",
      time: "1 घंटे 10 मिनट पहले"
    },
    {
      id: 8,
      title: "मुंबई में लोकल ट्रेन बाढ़ से प्रभावित",
      content: "स्थानीय ट्रेन सेवाएं बाधित, यात्रियों को बसों से परिवहन...",
      image: "sample8.jpg",
      time: "1 घंटे 20 मिनट पहले"
    },
    {
      id: 9,
      title: "कोलकाता में पुस्तक मेले का उद्घाटन",
      content: "साहित्यिक कार्यक्रमों के साथ 10 दिवसीय पुस्तक मेला शुरू...",
      image: "sample9.jpg",
      time: "1 घंटे 30 मिनट पहले"
    },
    {
      id: 10,
      title: "चेन्नई में तापमान में गिरावट",
      content: "उत्तर-पश्चिमी हवाओं के चलते तापमान 5°C तक गिरा...",
      image: "sample10.jpg",
      time: "1 घंटे 40 मिनट पहले"
    }
  ];

  // Locate the grid container
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  // Inject HTML for each news card
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
});
