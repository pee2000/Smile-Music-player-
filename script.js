const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const trackTitle = document.getElementById("trackTitle");
const albumArt = document.getElementById("albumArt");
const fileInput = document.getElementById("fileInput");
const addMusic = document.getElementById("addMusic");
const favoritesList = document.getElementById("favoritesList");
const lastPlayedList = document.getElementById("lastPlayedList");
const recentlyAddedList = document.getElementById("recentlyAddedList");

// Load from local storage
let songs = JSON.parse(localStorage.getItem("songs")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let lastPlayed = JSON.parse(localStorage.getItem("lastPlayed")) || [];
let recentlyAdded = JSON.parse(localStorage.getItem("recentlyAdded")) || [];

let currentTrack = 0;

function loadTrack(index) {
    if (songs.length > 0) {
        audioPlayer.src = songs[index].src;
        trackTitle.textContent = songs[index].name;
        albumArt.src = "default.jpg"; // Change this if you have album art
    }
}

function updateStorage() {
    localStorage.setItem("songs", JSON.stringify(songs));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("lastPlayed", JSON.stringify(lastPlayed));
    localStorage.setItem("recentlyAdded", JSON.stringify(recentlyAdded));
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

function addFavorite() {
    let song = songs[currentTrack];
    if (!favorites.some(fav => fav.src === song.src)) {
        favorites.push(song);
        updateStorage();
        displayFavorites();
    }
}

function addLastPlayed() {
    let song = songs[currentTrack];
    lastPlayed = [song, ...lastPlayed.filter(s => s.src !== song.src)].slice(0, 5);
    updateStorage();
    displayLastPlayed();
}

function displayFavorites() {
    favoritesList.innerHTML = "";
    favorites.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.name;
        li.addEventListener("click", () => {
            currentTrack = songs.findIndex(s => s.src === song.src);
            loadTrack(currentTrack);
            audioPlayer.play();
        });
        favoritesList.appendChild(li);
    });
}

function displayLastPlayed() {
    lastPlayedList.innerHTML = "";
    lastPlayed.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.name;
        li.addEventListener("click", () => {
            currentTrack = songs.findIndex(s => s.src === song.src);
            loadTrack(currentTrack);
            audioPlayer.play();
        });
        lastPlayedList.appendChild(li);
    });
}

function displayRecentlyAdded() {
    recentlyAddedList.innerHTML = "";
    recentlyAdded.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.name;
        li.addEventListener("click", () => {
            currentTrack = songs.findIndex(s => s.src === song.src);
            loadTrack(currentTrack);
            audioPlayer.play();
        });
        recentlyAddedList.appendChild(li);
    });
}

function handleFileUpload(event) {
    let files = event.target.files;
    for (let file of files) {
        let url = URL.createObjectURL(file);
        let newSong = { name: file.name, src: url };
        songs.push(newSong);
        recentlyAdded.push(newSong);
    }
    updateStorage();
    displayRecentlyAdded();
}

audioPlayer.addEventListener("play", addLastPlayed);
playPauseBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
favoriteBtn.addEventListener("click", addFavorite);
addMusic.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", handleFileUpload);

loadTrack(currentTrack);
displayFavorites();
displayLastPlayed();
displayRecentlyAdded();
