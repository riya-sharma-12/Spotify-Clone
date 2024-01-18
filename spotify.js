let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName: "Aashayein - Iqbal", filePath: "1.mp3", coverPath: "1.jpeg"},
    {songName: "Badal Pe Paon Hain - Chak De India", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Chak De India Title Song", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Chak Lein De - Chandni Chowk To China", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Chale Chalo - Lagaan", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Kar Har Maidaan Fateh - Sanju", filePath: "6.mp3", coverPath: "6.jpg"},
    {songName: "Sultan Title Song", filePath: "7.mp3", coverPath: "7.jpg"},
    {songName: "Zinda - Bhaag Milkha Bhaag", filePath: "9.mp3", coverPath: "8.jpg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


masterPlay.addEventListener("click",() => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

const makeAllPlays= () => {
    songItemPlays.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


songItemPlays.forEach((element, index) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        let songIndex = index; // Assuming you want to update the global songIndex

        myProgressBar.value = 0;
        myProgressBar.max = audioElement.duration;

        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');

        audioElement.src = `${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;


        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        

    });
});



audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});




document.getElementById('next').addEventListener('click',()=> {
    if (songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        playSelectedSong(songIndex);


})

document.getElementById('previous').addEventListener('click',()=> {
    if (songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');



})
