let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [{
    name: "Be Alright", path: "music/song1.mp3", img: "img/img1.jpg", singer: "Dean Lewis"
}

    ,
{
    name: "Love Me Like You Do", path: "music/song2.mp3", img: "img/img2.jpg", singer: "Ellie Goulding"
}

    ,
{
    name: "Lily", path: "music/song3.mp3", img: "img/img3.jpg", singer: "Alan Walker"
}

    ,
{
    name: "Helplessly", path: "music/song4.mp3", img: "img/img4.jpg", singer: "Tatiana Manaois"
}

    ,
{
    name: "Dance Monkey", path: "music/song5.mp3", img: "img/img5.jpg", singer: "Tones and I"
}

];


// All functions


// function load the track
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
    if (Playing_song == false) {
        playsong();
    }

    else {
        pausesong();
    }

}


// reset song slider
function reset_slider() {
    slider.value = 0;
}

// play song
function playsong() {
    track.play();
    Playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
    track.pause();
    Playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    }

    else {
        index_no = 0;
        load_track(index_no);
        playsong();
    }

}


// previous song
function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    }

    else {
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }

}


// change volume
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// change slider position
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }

    else {
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }

}


function range_slider() {
    let position = 0;
    // update slider position if(!isNaN(track.duration))

    {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }


    // function will run when the song is over
    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }

    }
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(track.duration)) {
        seekPosition = track.currentTime * (100 / track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(track.currentTime / 60);
        let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(track.duration / 60);
        let durationSeconds = Math.floor(track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);

    // Apply a random background color
    random_bg_color();
}

function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color withe the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    // Set the background to the new color
    document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}