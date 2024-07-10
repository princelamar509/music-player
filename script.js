
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById('audio');
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const stopButton = document.getElementById('stop');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const muteButton = document.getElementById('mute');
  const unmuteButton = document.getElementById('unmute');
  const progressBar = document.getElementById('progress');
  const volumeControl = document.getElementById('volume');
  const currentTimeElement = document.getElementById('current-time');
  const durationElement = document.getElementById('duration');
  const playlistElement = document.getElementById('playlist');
  const albumArt = document.getElementById('album-art');
  const musicBars = document.querySelectorAll('.music-bar');


  const playlist  = [
    { title: 'Welcome to Hell,Kerry', src: 'songs/KERRY_-_Welcome_to_hell.mp3', image: 'https://usercontent.jamendo.com/?type=album&id=568513&width=300&trackid=2176441' },
    { title: 'Alone - Color Out,Unknown', src: 'songs/Alone_-_Color_Out.mp3' ,image: 'https://usercontent.jamendo.com/?type=album&id=262036&width=300&trackid=1847557'},
    { title: 'Leeona - DO I', src: 'songs/LEEONA_-_LEEONA_-_DO_I.mp3' ,image: 'https://usercontent.jamendo.com/?type=album&id=550243&width=300&trackid=2135375'},
    { title: 'The Deep Anitek ', src: 'songs/The_Deep_-_Anitek.mp3' ,image: 'https://usercontent.jamendo.com/?type=album&id=280815&width=300&trackid=1861493'},
    { title: 'Burn Bessonnitsa ', src: 'songs/B_U_R_N_-_bessonnitsa.mp3', image: 'https://usercontent.jamendo.com/?type=album&id=326129&width=300&trackid=1860716' },
    { title: 'Carbon Carbon ', src: 'songs/Carbon_Carbon.mp3' ,image: 'https://usercontent.jamendo.com/?type=album&id=447171&width=300&trackid=1863814'},
    { title: 'In my Mind ', src: 'songs/In_my_mind.mp3', image: 'https://usercontent.jamendo.com/?type=album&id=329599&width=300&trackid=1859928' },
    { title: 'Flowers ', src: 'songs/Flowers_Of.mp3', image: 'https://usercontent.jamendo.com/?type=album&id=196979&width=300&trackid=1800917' },
    { title: 'Constellate Fleurie', src: 'songs/Constellate_-_Fleurie.mp3', image: 'https://usercontent.jamendo.com/?type=album&id=222110&width=300&trackid=1549463' },
  ];
  let currentSongIndex = 0;
  let isPlaying = false;

  function loadAudio(index) {
    audio.src = playlist[index].src;
    albumArt.src = playlist[index].image;
    audio.load();
    updateDuration();
  }

  function playAudio() {
    audio.play();
    isPlaying = true;
    animateMusicBars(true);
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    animateMusicBars(false);
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    progressBar.value = 0;
    isPlaying = false;
    animateMusicBars(false);
  }

  function prevAudio() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadAudio(currentSongIndex);
    if (isPlaying) {
      playAudio();
    }
  }

  function nextAudio() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadAudio(currentSongIndex);
    if (isPlaying) {
      playAudio();
    }
  }

  function muteAudio() {
    audio.muted = true;
  }

  function unmuteAudio() {
    audio.muted = false;
  }

  function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    updateCurrentTime();
  }

  function setProgress() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }

  function updateCurrentTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function updateDuration() {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    durationElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function changeVolume() {
    audio.volume = volumeControl.value / 100;
  }

  function selectAudio(index) {
    currentSongIndex = index;
    loadAudio(currentSongIndex);
    playAudio();
  }

  function renderPlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = song.title;
      li.addEventListener('click', () => selectAudio(index));
      playlistElement.appendChild(li);
    });
  }

  function animateMusicBars(play) {
    if (play) {
      musicBars.forEach(bar => bar.style.animationPlayState = 'running');
    } else {
      musicBars.forEach(bar => bar.style.animationPlayState = 'paused');
    }
  }

  // Add event listeners
  playButton.addEventListener('click', playAudio);
  pauseButton.addEventListener('click', pauseAudio);
  stopButton.addEventListener('click', stopAudio);
  prevButton.addEventListener('click', prevAudio);
  nextButton.addEventListener('click', nextAudio);
  muteButton.addEventListener('click', muteAudio);
  unmuteButton.addEventListener('click', unmuteAudio);
  progressBar.addEventListener('input', setProgress);
  volumeControl.addEventListener('input', changeVolume);

  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', nextAudio);

  // Initial render and load first song
  renderPlaylist();
  loadAudio(currentSongIndex);
});

