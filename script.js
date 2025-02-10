const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const repeatBtn = document.getElementById("repeatBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const trackTitle = document.getElementById("trackTitle");
const albumArt = document.getElementById("albumArt");
const fileInput = document.getElementById("fileInput");
const addMusic = document.getElementById("addMusic");

let repeatMode = false;
let songs = [];
let currentTrack = 0;

function loadTrack(index) {
    if (songs.length > 0) {
        audioPlayer.src = songs[index].src;
        trackTitle.textContent = songs[index].name;
        albumArt.src = "default.jpg"; 
    }
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶️";
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % songs.length;
    loadTrack(currentTrack);
    audioPlayer.play();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + songs.length) % songs.length;
    loadTrack(currentTrack);
    audioPlayer.play();
}

function toggleRepeat() {
    repeatMode = !repeatMode;
    repeatBtn.style.color = repeatMode ? "#1abc9c" : "white";
}

function handleFileUpload(event) {
    let files = event.target.files;
    for (let file of files) {
        let url = URL.createObjectURL(file);
        let newSong = { name: file.name, src: url };
        songs.push(newSong);
    }
    loadTrack(0);
}

audioPlayer.addEventListener("ended", () => {
    if (repeatMode) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        nextTrack();
    }
});

playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
repeatBtn.addEventListener("click", toggleRepeat);
addMusic.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", handleFileUpload);
