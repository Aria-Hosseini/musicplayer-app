const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const playBtn = document.getElementById("playbtn");
const prevBtn = document.getElementById("previewbtn");
const nextBtn = document.getElementById("forwardbtn");
const background = document.getElementById("background");

const music = new Audio();

const songs = [
  {
    path: "/songs/1_1 - spection 2.0 - Sudan (320).mp3", 
    name: "spection 2.0",
    cover: "/img/spection 2.0 - Sudan.jpg",
    artist: "Sudan",
  },
  {
    path: "/songs/1_4 - Yes I'm Changing - Tame Impala (320).mp3", 
    name: "Yes I'm Changing",
    cover: "/img/8d7b4ce1c933fae872d1d2473018d4dc.639x639x1.png",
    artist: "Tame Impala",
  },
  {
    path: "/songs/1_1 - Nightcrawler (Instrumental) - Mckyyy (320).mp3", 
    name: "Nightcrawler (Instrumental)",
    cover: "/img/2.jpg",
    artist: "Mckyyy",
  }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path; 
  title.textContent = song.name;
  artist.textContent = song.artist;
  cover.src = song.cover;
  background.style.backgroundImage = `url('${song.cover}')`;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  durationEl.textContent = formatTime(duration);
  currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1)); 
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
