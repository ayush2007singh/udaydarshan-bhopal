// Updated JavaScript for Uday Darshan Bhopal Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    updateDateTime();
    setupMobileMenu();
    setupSearch();
    setupNewsInteractions();
    updateWeather();
    setupEpaperPreview();

    // Update time every minute
    setInterval(updateDateTime, 60000);

    // Update weather every 30 minutes
    setInterval(updateWeather, 1800000);

    console.log('🚀 उदय दर्शन भोपाल website initialized successfully!');
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();

    // Date in Hindi format
    const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
    const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 
                   'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];

    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const dateString = `${dayName}, ${date} ${month} ${year}`;

    // Time format
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} IST`;

    // Update DOM elements
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('updateTime');

    if (dateElement) {
        dateElement.textContent = dateString;
    }

    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking on nav links
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
}

// Enhanced Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        // Search on Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });

        // Real-time search suggestions
        searchInput.addEventListener('input', function() {
            showSearchSuggestions(this.value);
        });
    }
}

function performSearch(query) {
    if (query.trim() === '') {
        showNotification('कृपया खोजने के लिए कुछ लिखें', 'warning');
        return;
    }

    // Search in cached news
    if (window.newsFetcher && window.newsFetcher.newsCache) {
        const results = window.newsFetcher.newsCache.filter(news => 
            news.title.toLowerCase().includes(query.toLowerCase()) ||
            news.content.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            displaySearchResults(results, query);
        } else {
            showNotification(`"${query}" के लिए कोई परिणाम नहीं मिला`, 'info');
        }
    }
}

function showSearchSuggestions(query) {
    if (query.length < 2) return;

    // This could be expanded with a proper suggestion system
    console.log('Search suggestions for:', query);
}

function displaySearchResults(results, query) {
    // Create search results modal
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h3>"${query}" के लिए खोज परिणाम (${results.length})</h3>
                <button class="close-modal" onclick="closeSearchModal()">&times;</button>
            </div>
            <div class="search-results">
                ${results.map(news => `
                    <div class="search-result-item" onclick="openNewsDetail(${news.id}); closeSearchModal();">
                        <img src="${news.image}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/100x80/2d3748/ffffff?text=समाचार'">
                        <div class="search-result-content">
                            <h4>${news.title}</h4>
                            <p>${news.content.substring(0, 120)}...</p>
                            <span class="search-result-meta">${news.category} • ${news.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        .search-modal-content {
            background: white;
            border-radius: 10px;
            max-width: 600px;
            max-height: 80vh;
            width: 90%;
            overflow: hidden;
        }
        .search-modal-header {
            background: #c53030;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        .search-results {
            max-height: 400px;
            overflow-y: auto;
            padding: 20px;
        }
        .search-result-item {
            display: flex;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid #e2e8f0;
            cursor: pointer;
            transition: background 0.3s;
        }
        .search-result-item:hover {
            background: #f7fafc;
        }
        .search-result-item img {
            width: 100px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
        }
        .search-result-content h4 {
            font-size: 1rem;
            margin-bottom: 8px;
            color: #2d3748;
        }
        .search-result-content p {
            font-size: 0.9rem;
            color: #718096;
            margin-bottom: 8px;
        }
        .search-result-meta {
            font-size: 0.8rem;
            color: #c53030;
        }
    `;

    // Add styles if not already added
    if (!document.getElementById('search-modal-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'search-modal-styles';
        styleEl.textContent = modalStyles;
        document.head.appendChild(styleEl);
    }

    document.body.appendChild(modal);
}

function closeSearchModal() {
    const modal = document.querySelector('.search-modal');
    if (modal) {
        modal.remove();
    }
}

// News Interactions
function setupNewsInteractions() {
    // Add click tracking to news items
    document.addEventListener('click', function(e) {
        const newsItem = e.target.closest('.news-item, .news-list-item, .popular-item');
        if (newsItem) {
            // Add click animation
            newsItem.style.transform = 'scale(0.98)';
            setTimeout(() => {
                newsItem.style.transform = '';
            }, 150);
        }
    });

    // Setup social share
    setupSocialShare();
}

// Social Share Setup
function setupSocialShare() {
    // Add share functionality to news items
    document.addEventListener('contextmenu', function(e) {
        const newsItem = e.target.closest('.news-item, .news-list-item');
        if (newsItem) {
            e.preventDefault();
            showShareMenu(e.pageX, e.pageY, newsItem);
        }
    });
}

function showShareMenu(x, y, newsElement) {
    // Remove existing share menu
    const existingMenu = document.querySelector('.share-menu');
    if (existingMenu) {
        existingMenu.remove();
    }

    const shareMenu = document.createElement('div');
    shareMenu.className = 'share-menu';
    shareMenu.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 150px;
    `;

    const title = newsElement.querySelector('h3, h4')?.textContent || '';
    const url = window.location.href;

    shareMenu.innerHTML = `
        <div class="share-option" onclick="shareToSocialMedia('facebook', '${url}', '${title}')">
            <i class="fab fa-facebook"></i> Facebook
        </div>
        <div class="share-option" onclick="shareToSocialMedia('twitter', '${url}', '${title}')">
            <i class="fab fa-twitter"></i> Twitter
        </div>
        <div class="share-option" onclick="shareToSocialMedia('whatsapp', '${url}', '${title}')">
            <i class="fab fa-whatsapp"></i> WhatsApp
        </div>
        <div class="share-option" onclick="copyToClipboard('${url}'); closeShareMenu();">
            <i class="fas fa-copy"></i> Copy Link
        </div>
    `;

    document.body.appendChild(shareMenu);

    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeShareMenu, { once: true });
    }, 100);
}

function closeShareMenu() {
    const shareMenu = document.querySelector('.share-menu');
    if (shareMenu) {
        shareMenu.remove();
    }
}

function shareToSocialMedia(platform, url, title) {
    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        closeShareMenu();
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('लिंक कॉपी हो गया!', 'success');
    }).catch(() => {
        showNotification('लिंक कॉपी नहीं हो सका', 'error');
    });
}

// Weather Update
function updateWeather() {
    // Enhanced weather with more realistic data
    const weatherElement = document.getElementById('weather');

    if (weatherElement) {
        const weatherData = {
            temperatures: [25, 26, 27, 28, 29, 30, 31],
            conditions: [
                { icon: 'fa-sun', temp: [28, 30, 32] },
                { icon: 'fa-cloud-sun', temp: [25, 27, 29] },
                { icon: 'fa-cloud', temp: [22, 24, 26] },
                { icon: 'fa-cloud-rain', temp: [18, 20, 22] }
            ]
        };

        const randomCondition = weatherData.conditions[Math.floor(Math.random() * weatherData.conditions.length)];
        const randomTemp = randomCondition.temp[Math.floor(Math.random() * randomCondition.temp.length)];

        const tempSpan = weatherElement.querySelector('span:last-child');
        const iconElement = weatherElement.querySelector('.fas');

        if (tempSpan) {
            tempSpan.textContent = `${randomTemp}°C`;
        }

        if (iconElement) {
            iconElement.className = `fas ${randomCondition.icon}`;
        }
    }
}

// ePaper Preview Setup
function setupEpaperPreview() {
    const epaperPreview = document.getElementById('epaperPreview');
    if (epaperPreview) {
        // Set a preview image for the ePaper
        epaperPreview.src = 'https://via.placeholder.com/250x300/1a202c/ffffff?text=उदय+दर्शन+ई-पेपर';
        epaperPreview.onerror = function() {
            this.src = 'https://via.placeholder.com/250x300/1a202c/ffffff?text=आज+का+ई-पेपर';
        };
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const colors = {
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        info: '#4299e1'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .share-option {
        padding: 10px 15px;
        cursor: pointer;
        transition: background 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .share-option:hover {
        background: #f7fafc;
    }
    .share-option i {
        width: 16px;
    }
`;

// Add styles to document
const styleElement = document.createElement('style');
styleElement.textContent = notificationStyles;
document.head.appendChild(styleElement);

// Scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #c53030;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// News Ticker Animation Control
function controlNewsTicker() {
    const ticker = document.querySelector('.ticker-content');

    if (ticker) {
        // Pause animation on hover
        ticker.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        // Resume animation when mouse leaves
        ticker.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// Performance monitoring
function monitorPerformance() {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`📊 Page load time: ${loadTime}ms`);

        if (loadTime > 3000) {
            console.warn('⚠️ Slow page load detected. Consider optimizing images and scripts.');
        }
    });
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Website error:', e.error);
        showNotification('कुछ गलत हुआ है। पृष्ठ को रिफ्रेश करें।', 'error');
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Initialize additional features
setTimeout(() => {
    addScrollToTop();
    controlNewsTicker();
    monitorPerformance();
    setupErrorHandling();
}, 1000);

// Utility functions
const Utils = {
    formatNumber: function(num) {
        return num.toLocaleString('hi-IN');
    },

    timeAgo: function(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'अभी';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} मिनट पहले`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} घंटे पहले`;

        return `${Math.floor(diffInSeconds / 86400)} दिन पहले`;
    },

    truncateText: function(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    formatHindiNumber: function(num) {
        if (num >= 10000000) return (num / 10000000).toFixed(1) + ' करोड़';
        if (num >= 100000) return (num / 100000).toFixed(1) + ' लाख';
        if (num >= 1000) return (num / 1000).toFixed(1) + ' हजार';
        return num.toString();
    }
};

// Export utils globally
window.UdayDarshanUtils = Utils;

console.log('🌟 उदय दर्शन भोपाल - सभी फीचर्स सक्रिय हैं!');