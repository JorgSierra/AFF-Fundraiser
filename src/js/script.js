const landing = document.getElementById('landingBox');
const content = document.getElementById('contentBox');
const clickOverlay = document.getElementById('clickOverlay');
const landingLogo = document.getElementById('landingLogo');
const landingPrompt = document.getElementById('clickPrompt');
const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('video');
const skipBtn = document.getElementById("skipBtn");


document.addEventListener('DOMContentLoaded', () => {
    // landing.style.display = "none";
    // content.style.display = "flex";
    loadDonations();
});

let endTime;
video.addEventListener('loadedmetadata', () => {
    endTime = video.duration;
});

clickOverlay.addEventListener('click', () => {
    landingLogo.classList.add('video');
    landingPrompt.classList.add('video');
    videoContainer.classList.add('video')
    video.classList.add('video');
    video.play();
    video.muted = false;
});

const showAt = 3;
video.ontimeupdate = (e) => {
    if (video.currentTime >= showAt) {
        skipBtn.style.display = "block";
    }
};

skipBtn.addEventListener('click', () => {
    video.currentTime = endTime;
});

video.onended = (e) => {
    landing.style.display = "none";
    content.style.display = "flex";
}

async function loadDonations() {
    try {
        const response = await fetch('src/data/donations.json');
        if (!response.ok) throw new Error('Failed to load DB');
        
        const donations = await response.json();
        
        // Get goal from id=0 item
        const goalItem = donations.find(d => d.id === 0);
        if (!goalItem) {
            alert('Error: No goal item found');
            return;
        }
        const goal = goalItem.amount;

        // Sum all donations
        const current = donations
            .filter(d => d.id !== 0)
            .reduce((total, donation) => total + donation.amount, 0);

        // Update progress bar
        const percentage = Math.min((current / goal) * 100, 100);
        const scale = 1 - (percentage / 100);
        const overlay = document.getElementById('progress-overlay');
        overlay.style.transform = `scaleX(${scale})`;

        // Update info text
        const progressText = document.getElementById('progress-text');
        progressText.textContent = `$${current.toFixed(2)} / $${goal.toFixed(2)} (${percentage.toFixed(1)}%)`;
        
        // Update donation list
        const donationsList = document.getElementById('donations-list');
        donationsList.innerHTML = '<h3>Supporters</h3>';
        donations
            .filter(d => d.id !== 0)
            .sort((a, b) => b.id - a.id)
            .forEach(donation => {
                const item = document.createElement('div');
                item.className = 'donation-item';
                item.innerHTML = `
                    <div class="donor">${donation.donor}</div>
                    <div class="amount">$${donation.amount.toFixed(2)}</div>
                    <div class="message">${donation.message}</div>
                `;
                donationsList.appendChild(item);
            });
    } catch (err) {
        console.error('Error loading donations:', err);
        alert('Could not load DB');
    }
}