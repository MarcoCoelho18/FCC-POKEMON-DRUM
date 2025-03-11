let currentAudio = null;
let powerOn = true; // Track power state

// Power button functionality
const powerButton = document.getElementById('power-button');
powerButton.addEventListener('click', () => {
    powerOn = !powerOn; // Toggle power state
    powerButton.textContent = powerOn ? 'Power On' : 'Power Off';
    powerButton.style.backgroundColor = powerOn ? '#4CAF50' : '#ff4444'; // Green when on, red when off

    // Enable/disable buttons and volume slider
    const buttons = document.querySelectorAll('.drum-pad');
    const volumeSlider = document.getElementById('volume-slider');
    buttons.forEach(button => {
        button.style.pointerEvents = powerOn ? 'auto' : 'none';
        button.style.opacity = powerOn ? '1' : '0.5';
    });
    volumeSlider.disabled = !powerOn;
});

// Play sound function
function playSound(key) {
    if (!powerOn) return; // Do nothing if power is off

    const audio = document.getElementById(key); // Get the audio element by its ID
    const drumPad = document.querySelector(`.drum-pad[data-key="${key}"]`); // Get the drum pad
    const pokemonDisplay = document.getElementById('display'); // Get the new display element

    if (audio && drumPad) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset to start
        }
        currentAudio = audio;
        audio.play();

        // Update the new display with the Pokémon's name
        const description = drumPad.getAttribute('data-description');
        pokemonDisplay.innerText = description;

    }
}

// Add click event listeners to drum pads
const drumPads = document.querySelectorAll('.drum-pad');
drumPads.forEach(pad => {
    pad.addEventListener('click', () => {
        const key = pad.getAttribute('data-key'); // Get the data-key attribute
        console.log("Clicked:", key); // Debugging
        playSound(key); // Play the sound associated with the key
    });
});



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

// Keyboard event listener
document.addEventListener('keydown', (event) => {
    if (!powerOn) return; // Do nothing if power is off
    const key = event.key.toUpperCase(); // Get the pressed key (uppercase)
    playSound(key); // Play the sound
});