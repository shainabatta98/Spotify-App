console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Majhail - Ap Dhillon", filePath: "Songs/1.mp3", coverPath: "Covers/1.jpg"},
    {songName: "Excuses - Ap Dhillon", filePath: "Songs/2.mp3", coverPath: "Covers/2.jpg"},
    {songName: "Brown Munde - Ap Dhillon", filePath: "Songs/3.mp3", coverPath: "Covers/3.jpg"},
    {songName: "Toxic - Ap Dhillon", filePath: "Songs/4.mp3", coverPath: "Covers/4.jpg"},
    {songName: "Arrogant - Ap Dhillon", filePath: "Songs/5.mp3", coverPath: "Covers/5.jpg"},
    {songName: "Fake - Ap Dhillon", filePath: "Songs/6.mp3", coverPath: "Covers/6.jpg"},
    {songName: "Desires - Ap Dhillon", filePath: "Songs/7.mp3", coverPath: "Covers/7.jpg"},
    {songName: "Insane - Ap Dhillon", filePath: "Songs/8.mp3", coverPath: "Covers/8.jpg"},
    {songName: "DropTop - Ap Dhillon", filePath: "Songs/9.mp3", coverPath: "Covers/9.jpg"},
    {songName: "Foreigns - Ap Dhillon", filePath: "Songs/10.mp3", coverPath: "Covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    // if(songIndex>=9){
    //     songIndex = 0
    // }
    // else{
    //     songIndex += 1;
    // }
    songIndex=(songIndex+1)%songs.length;
    console.log(songIndex);
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
