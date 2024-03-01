// we are not using backend this is client site 

async function getSongs() {
    let a = await fetch("http://192.168.0.119:8888/songs/");
    let responce = await a.text();
    console.log(responce);
    let div = document.createElement("div");
    div.innerHTML = responce;
    let tds = div.getElementsByTagName("td");
    let as = div.getElementsByTagName('a')
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }

    }
    return songs;
}
const playMusic = (track) => {
    let audio = new Audio("/song/" + track)
    audio.play();
}
// getSongs();

async function main() {

    // Get the songs list
    let songs = await getSongs();
    console.log(songs);
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
        <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>song artist</div>
        </div>
        <div class="playNow">
        <span>Play Now</span>
        <img src="play.svg" alt="">
        </ div>
        </li>
        </li>`;
    }
    let currentSong;
    // Play first song 
    // var audio = new Audio(songs[1])
    // // audio.play();  

    // audio.addEventListener("loadeddata",() => {
    //     let duration = audio.duration;
    //     console.log(duration);

    // })
    // Attach An Event Listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });
            // // add an event listner for hamburger
        document.querySelector(".hamburger").addEventListener("click", () => {
            document.querySelector(".left").style.left = "0"
        })
        document.querySelector(".close").addEventListener("click", () => {
            document.querySelector(".left").style.left = "-100%"
        })
}
   
        
        
main();
