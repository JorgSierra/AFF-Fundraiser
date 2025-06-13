const landing = document.getElementById('landingBox');
const content = document.getElementById('contentBox');
const clickOverlay = document.getElementById('clickOverlay');
const landingLogo = document.getElementById('landingLogo');
const landingPrompt = document.getElementById('clickPrompt');
const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('video');
const skipBtn = document.getElementById("skipBtn");


document.addEventListener('DOMContentLoaded', () => {
    landing.style.display = "none";
    // content.style.display = "none";
});

clickOverlay.addEventListener('click', () => {
    landingLogo.classList.add('video');
    landingPrompt.classList.add('video');
    videoContainer.classList.add('video')
    video.classList.add('video');
    video.play();
    video.muted = false;
});

let endTime;
video.addEventListener('loadedmetadata', () => {
    endTime = video.duration;
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
}