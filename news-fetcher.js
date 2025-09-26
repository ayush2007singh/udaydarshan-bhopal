// News Fetcher for Uday Darshan Bhopal - Auto-fetch from Jagran.com

class NewsFetcher {
    constructor() {
        this.newsCache = {};
        this.lastFetchTime = 0;
        this.fetchInterval = 300000; // 5 minutes
        this.initialize();
    }

    initialize() {
        this.showLoadingSpinner();
        this.loadCachedNews();
        this.fetchLatestNews();

        // Auto-refresh news every 5 minutes
        setInterval(() => {
            this.fetchLatestNews();
        }, this.fetchInterval);
    }

    showLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'flex';
        }
    }

    hideLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    // Simulate fetching news from Jagran.com (in real implementation, you'd use server-side proxy)
    async fetchLatestNews() {
        try {
            // Since direct cross-origin requests aren't possible, we'll use sample data
            // In production, you'd need a backend server to fetch from Jagran.com

            const sampleNews = [
                {
                    id: 1,
                    title: "UP उपचुनाव के दौरान मीरापुर और कुंदरकी सीट पर बवाल, पुलिस टीम पर पथराव",
                    content: "यूपी उपचुनाव के दौरान मीरापुर में बवाल, मुस्लिम बाहुल्य इलाके में पुलिस टीम पर पथराव, थाना प्रभारी समेत कई चोटिल...",
                    image: "https://images.unsplash.com/photo-1586339949216-35c890096e40?w=400&h=300&fit=crop",
                    category: "राजनीति",
                    time: "28 मिनट पहले",
                    isBreaking: true
                },
                {
                    id: 2,
                    title: "महाराष्ट्र चुनाव: वोटिंग के बीच बिटकॉइन हेरफेर पर गरमाई सियासत",
                    content: "महाराष्ट्र में वोटिंग के बीच बिटकॉइन हेरफेर का मामला सामने आया, सुबह 11 बजे तक 18.14% मतदान...",
                    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
                    category: "राजनीति",
                    time: "23 मिनट पहले",
                    isBreaking: true
                },
                {
                    id: 3,
                    title: "झारखंड में दो पीठासीन अधिकारी के खिलाफ एक्शन, एक को हिरासत में लिया गया",
                    content: "झारखंड चुनाव के दूसरे चरण में वोटिंग के दौरान दो पीठासीन अधिकारियों के खिलाफ कार्रवाई...",
                    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=300&fit=crop",
                    category: "राजनीति",
                    time: "2 मिनट पहले",
                    isBreaking: false
                },
                {
                    id: 4,
                    title: "अक्षय कुमार से लेकर राजकुमार राव तक, बॉलीवुड सितारों ने किया वोट",
                    content: "महाराष्ट्र चुनाव 2024 में बॉलीवुड के कई सितारों ने अपने वोट डाले और लोगों से मतदान की अपील की...",
                    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
                    category: "मनोरंजन",
                    time: "1 घंटे पहले",
                    isBreaking: false
                },
                {
                    id: 5,
                    title: "पंजाब की चार सीटों पर वोटिंग जारी, दिग्गजों की प्रतिष्ठा दांव पर",
                    content: "पंजाब उपचुनाव में चार सीटों पर मतदान जारी, कई दिग्गज नेताओं की प्रतिष्ठा दांव पर लगी है...",
                    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                    category: "राजनीति",
                    time: "11 मिनट पहले",
                    isBreaking: false
                },
                {
                    id: 6,
                    title: "सुधा मूर्ति ने बांधे अपने दमाद ऋषि सुनक की तारीफों के पुल",
                    content: "राज्यसभा सांसद सुधा मूर्ति ने अपने दामाद और पूर्व ब्रिटिश PM ऋषि सुनक की जमकर तारीफ की...",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                    category: "विदेश",
                    time: "24 मिनट पहले",
                    isBreaking: false
                },
                {
                    id: 7,
                    title: "मुख्यमंत्री डॉ. मोहन यादव- सोयाबीन की फसल क्षति का सर्वे",
                    content: "मध्य प्रदेश के मुख्यमंत्री डॉ. मोहन यादव ने सोयाबीन की फसल क्षति का सर्वे कराने के निर्देश दिए...",
                    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
                    category: "मध्य प्रदेश",
                    time: "45 मिनट पहले",
                    isBreaking: false
                },
                {
                    id: 8,
                    title: "लाडली बहनों को दीपावली की भाईदूज से हर माह 1250 रुपये की राशि",
                    content: "मध्य प्रदेश में लाडली बहन योजना के तहत अब महिलाओं को हर माह 1250 रुपये मिलेंगे...",
                    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop",
                    category: "मध्य प्रदेश",
                    time: "1 घंटे पहले",
                    isBreaking: false
                }
            ];

            this.newsCache = sampleNews;
            this.renderNews();
            this.hideLoadingSpinner();

        } catch (error) {
            console.error('Error fetching news:', error);
            this.loadFallbackNews();
        }
    }

    loadCachedNews() {
        const cached = localStorage.getItem('udayDarshanNews');
        if (cached) {
            this.newsCache = JSON.parse(cached);
            this.renderNews();
        }
    }

    loadFallbackNews() {
        // Fallback news if fetching fails
        const fallbackNews = [
            {
                id: 1,
                title: "उदय दर्शन भोपाल में आपका स्वागत है",
                content: "भोपाल की सबसे तेज़ और विश्वसनीय खबरों के लिए बने रहें हमारे साथ...",
                image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&h=300&fit=crop",
                category: "सामान्य",
                time: "अभी",
                isBreaking: false
            }
        ];

        this.newsCache = fallbackNews;
        this.renderNews();
        this.hideLoadingSpinner();
    }

    renderNews() {
        this.renderBreakingNews();
        this.renderFeaturedNews();
        this.renderNewsGrid();
        this.renderMPNews();
        this.renderPopularNews();
        this.renderLiveUpdates();
        this.updateCategoryCounts();

        // Cache the news
        localStorage.setItem('udayDarshanNews', JSON.stringify(this.newsCache));
    }

    renderBreakingNews() {
        const ticker = document.getElementById('breakingNewsTicker');
        if (!ticker) return;

        const breakingNews = this.newsCache.filter(news => news.isBreaking);
        const tickerHTML = breakingNews.map(news => 
            `<span>${news.title}</span>`
        ).join('<span class="separator">•</span>');

        ticker.innerHTML = tickerHTML;
    }

    renderFeaturedNews() {
        const container = document.getElementById('featuredNews');
        if (!container || !this.newsCache.length) return;

        const featured = this.newsCache[0];
        container.innerHTML = `
            <img src="${featured.image}" alt="${featured.title}" onerror="this.src='https://via.placeholder.com/600x300/1a365d/ffffff?text=समाचार'">
            <div class="story-content">
                <h2>${featured.title}</h2>
                <p>${featured.content}</p>
                <div class="story-meta">
                    <span class="time">${featured.time}</span>
                    <span class="category">${featured.category}</span>
                </div>
            </div>
        `;
        container.classList.add('fade-in');
    }

    renderNewsGrid() {
        const container = document.getElementById('newsGrid');
        if (!container) return;

        const gridNews = this.newsCache.slice(1, 5);
        const gridHTML = gridNews.map(news => `
            <div class="news-item" onclick="openNewsDetail(${news.id})">
                <img src="${news.image}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/200x120/2d3748/ffffff?text=समाचार'">
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p>${news.content.substring(0, 100)}...</p>
                    <span class="news-time">${news.time}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = gridHTML;
    }

    renderMPNews() {
        const container = document.getElementById('mpNewsList');
        if (!container) return;

        const mpNews = this.newsCache.filter(news => 
            news.category === 'मध्य प्रदेश' || news.title.includes('मध्य प्रदेश') || news.title.includes('भोपाल')
        );

        const mpHTML = mpNews.map(news => `
            <div class="news-list-item" onclick="openNewsDetail(${news.id})">
                <img src="${news.image}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/150x100/4a5568/ffffff?text=MP+न्यूज़'">
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p>${news.content}</p>
                    <span class="news-time">${news.time}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = mpHTML || '<p>मध्य प्रदेश की खबरें जल्द ही उपलब्ध होंगी...</p>';
    }

    renderPopularNews() {
        const container = document.getElementById('popularNewsList');
        if (!container) return;

        const popular = this.newsCache.slice(0, 3);
        const popularHTML = popular.map((news, index) => `
            <div class="popular-item" onclick="openNewsDetail(${news.id})">
                <span class="rank">${index + 1}</span>
                <div class="popular-content">
                    <h4>${news.title.substring(0, 60)}...</h4>
                    <span class="time">${news.time}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = popularHTML;
    }

    renderLiveUpdates() {
        const container = document.getElementById('liveUpdates');
        if (!container) return;

        const liveNews = this.newsCache.filter(news => news.isBreaking).slice(0, 3);
        const liveHTML = liveNews.map(news => `
            <div class="live-update-item">
                <span class="live-time">${news.time}</span>
                <p>${news.title}</p>
            </div>
        `).join('');

        container.innerHTML = liveHTML || '<p>लाइव अपडेट्स जल्द ही...</p>';
    }

    updateCategoryCounts() {
        const categories = {
            'bhopalCount': this.newsCache.filter(n => n.title.includes('भोपाल')).length,
            'politicsCount': this.newsCache.filter(n => n.category === 'राजनीति').length,
            'sportsCount': this.newsCache.filter(n => n.category === 'खेल').length,
            'entertainmentCount': this.newsCache.filter(n => n.category === 'मनोरंजन').length,
            'businessCount': this.newsCache.filter(n => n.category === 'व्यापार').length,
            'techCount': this.newsCache.filter(n => n.category === 'तकनीक').length
        };

        Object.keys(categories).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `(${categories[id]})`;
            }
        });
    }
}

// Global functions
function openNewsDetail(newsId) {
    const news = newsFetcher.newsCache.find(n => n.id === newsId);
    if (news) {
        // In a real implementation, this would open a full news page
        alert(`समाचार: ${news.title}\n\n${news.content}\n\nकैटेगरी: ${news.category}\nसमय: ${news.time}`);
    }
}

// PDF Download Functions
function downloadEpaper() {
    // In production, this would download the actual PDF
    const link = document.createElement('a');
    link.href = '26sept-tuday25.pdf'; // Your uploaded PDF
    link.download = 'uday-darshan-epaper-today.pdf';
    link.click();

    // Track download
    console.log('ePaper downloaded');

    // Show success message
    showNotification('ई-पेपर डाउनलोड शुरू हो गया!', 'success');
}

function viewEpaper() {
    // Open PDF in new window
    window.open('26sept-tuday25.pdf', '_blank');

    // Track view
    console.log('ePaper viewed online');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#4299e1'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize news fetcher when page loads
let newsFetcher;
document.addEventListener('DOMContentLoaded', function() {
    newsFetcher = new NewsFetcher();
});

// Add slideIn animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);