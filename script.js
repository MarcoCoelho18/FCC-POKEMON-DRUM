let currentAudio = null;
let powerOn = true; // Track power state

// Power button functionality
const powerButton = document.getElementById('power-button');
powerButton.addEventListener('click', () => {
    powerOn = !powerOn; // Toggle power state
    powerButton.textContent = powerOn ? 'Power On' : 'Power Off';
    powerButton.style.backgroundColor = powerOn ? '#4CAF50' : '#ff4444'; // Green when on, red when off

    // Enable/disable buttons and volume slider
    const buttons = document.querySelectorAll('.button');
    const volumeSlider = document.getElementById('volume-slider');
    buttons.forEach(button => {
        button.style.pointerEvents = powerOn ? 'auto' : 'none';
        button.style.opacity = powerOn ? '1' : '0.5';
    });
    volumeSlider.disabled = !powerOn;
});

// Play sound function
function playSound(id) {
    if (!powerOn) return; // Do nothing if power is off
    const audio = document.getElementById(`sound${id}`);
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset to start
    }
    currentAudio = audio;
    audio.play();
}

// Volume control
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');
const audios = document.querySelectorAll('audio');

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    audios.forEach(audio => {
        audio.volume = volume;
    });
    volumeValue.textContent = `${Math.round(volume * 100)}%`; // Display percentage
});