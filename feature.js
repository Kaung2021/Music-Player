//let makes an array
let tracklist = [{
        path: 'Bad Company  Ready for Love  Supernatural  4x10.mp3',
        name: 'Ready for Love',
        img: 'Image1.jpg',
        singer: 'Bad Company'
    },
    {
        path: 'The Kinks  A Well Respected Man  Supernatural  4x17.mp3',
        name: 'A Well Respected Man',
        img: 'Image3.jpg',
        singer: 'The Kinks'
    },
    {
        path: 'Survivor  Eye of the Tiger  Supernatural  4x06.mp3',
        name: 'Eye of the Tiger',
        img: 'Image2.jpg',
        singer: 'Survivor'
    },
];
//Define
const playBtn = document.querySelector('.play');
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');
//
let TrackImage = document.querySelector('.trackImage');
let title = document.querySelector('.title');
let artist = document.querySelector('.artist');
//
let currentTime = document.querySelector('.songTime');
let durationTime = document.querySelector('.durationTime');
let slider = document.querySelector('.slider');
//
let volumeText = document.querySelector('.volumeShow');
let volumeIcon = document.querySelector('#volumeIcon');
let volumeSlider = document.querySelector('.volumeslider');
//
let autoPlayBtn = document.querySelector('.playAuto');
let musicIcon = document.querySelector('#music');
let hamburger = document.querySelector('.fa-bars');
let closeBtn = document.querySelector('.fa-times');
//
let musicPlaylist = document.querySelector('.playlist');
let musicDiv = document.querySelector('.playlist-div');
let musicItem = document.querySelector('.playlist-item');
//let define a variables
let timer;
let autoplay = 0;
let SongisPlaying = false;
let indexTrack = 0;
let track = document.createElement('audio');

//All AddeventListener() methods
playBtn.addEventListener("click", justPlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
volumeIcon.addEventListener('click', muteSound);
volumeSlider.addEventListener('change', changeSlider);
slider.addEventListener('change', updateSlider);
autoPlayBtn.addEventListener('click', AutoplaySong);
track.addEventListener('timeupdate', updateSongTime);
hamburger.addEventListener('click', showPlaylist);
closeBtn.addEventListener('click', hidePlaylist);
//function about loadTrack()
function loadTrack(indexTrack) {
    clearInterval(timer);
    reserSLider();
    track.src = tracklist[indexTrack].path;
    TrackImage.src = tracklist[indexTrack].img;
    title.innerHTML = tracklist[indexTrack].name;
    artist.innerHTML = tracklist[indexTrack].singer;
    track.load();
    timer = setInterval(updateCurrentSlider, 1000);
}
loadTrack(indexTrack);
//function about justPlay
function justPlay() {
    if (SongisPlaying == false) {
        playSong()
    } else {
        pauseSong()
    };
    musicIcon.style.transform = "rotate(100deg)"
}
//function about playSong()
function playSong() {
    track.play()
    playBtn.innerHTML = '<i class="fas fa-pause">';
    playBtn.style.background = "darkred"
    SongisPlaying = true;

}
//function about pauseSong()
function pauseSong() {
    track.pause()
    playBtn.innerHTML = '<i class="fas fa-play">';
    playBtn.style.background = "rgb(31, 102, 160)"
    SongisPlaying = false;

};
//nextSong()
function nextSong() {
    if (indexTrack < tracklist.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playSong()
    } else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong()
    }
};
//Previous Song
function prevSong() {
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playSong()
    } else {
        indexTrack = tracklist.length - 1;
        loadTrack(indexTrack);
        playSong()
    }
}
//MuteSound()
function muteSound() {
    track.volume = 0;
    volumeText.innerHTML = 0;
    volumeSlider.value = 0
}
//Change the Volume value via SLider
function changeSlider() {
    volumeText.innerHTML = volumeSlider.value;
    track.volume = volumeSlider.value / 100;
}
//UpDate slider duration
function updateSlider() {
    let sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition

}
//Function about autoPlay
function AutoplaySong() {
    if (autoplay == 0) {
        autoplay = 1;
        autoPlayBtn.style.background = "rgb(85, 160, 221)";
        autoPlayBtn.style.color = "whitesmoke";

    } else {
        autoPlayBtn.style.background = "rgb(31, 102, 160)";
        autoPlayBtn.style.color = "whitesmoke";

    }
}
//function about reset Slider
function reserSLider() {
    slider.value = 0
};
//function about autoPlay and UpdateCurrentTime on slider
function updateCurrentSlider() {
    let position = 0;
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position
    }
    //autoPlay
    if (track.ended) {
        if (autoPlayBtn = 1 && indexTrack < tracklist.length - 1) {
            indexTrack++;
            loadTrack(indexTrack);
            playSong();
        } else if (autoPlayBtn = 1 && indexTrack == tracklist.length - 1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong();
        }
    }
};
//SongTimeUPdate
function updateSongTime() {
    if (track.duration) {
        let currentMins = Math.floor(track.currentTime / 60);
        let currentSec = Math.floor(track.currentTime - currentMins * 60);
        let durationMins = Math.floor(track.duration / 60);
        let durationSec = Math.floor(track.duration - durationMins * 60);
        if (currentMins < 10) {
            currentMins = "0" + currentMins
        };
        if (currentSec < 10) {
            currentSec = "0" + currentSec
        };
        if (durationMins < 10) {
            durationMins = "0" + durationMins
        };
        if (durationSec < 10) {
            durationSec = "0" + durationSec
        };
        currentTime.innerHTML = currentMins + ":" + currentSec;
        durationTime.innerHTML = durationMins + ":" + durationSec;
    } else {
        currentTime.innerHTML = "00 " + ":" + "00 ";
        durationTime.innerHTML = "00 " + ":" + "00 ";
    }

};
//showPlaylist
function showPlaylist() {
    musicPlaylist.style.transform = "translateX(0)"
}
//HidePlaylist
function hidePlaylist() {
    musicPlaylist.style.transform = "translateX(-100%)"
}
//Display the track
let conter = 1;

function dispalyThetrack() {
    for (let i = 0; i < tracklist.length; i++) {
        //first console log to this ,it works(or)not
        console.log(tracklist[i].name);
        let div = document.createElement('div');
        div.classList.add('playlist-item');
        div.innerHTML = `<div class="playlist-item">
                <span class="song-index">${conter++}</span>
                <p class="single-song">${tracklist[i].name}</p>
            </div>`;
        musicDiv.appendChild(div)

    }
}
//call the function
dispalyThetrack();
//play the track from the Playlist
function playFromPlaylist() {
    musicDiv.addEventListener('click', (element) => {
        if (element.target.classList.contains('single-song')) {
            const indexNum = tracklist.findIndex((item, index) => {
                if (item.name === element.target.innerHTML) {
                    return true
                }
            });
            loadTrack(indexNum);
            playSong();
            hidePlaylist()
        }
    })
};
//call
playFromPlaylist()