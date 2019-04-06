var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.parentNode.insertBefore(tag, document.head);
window["yPlayer"] = null;

window["onYouTubeIframeAPIReady"] = function () {

    window["yPlayer"] = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'dQw4w9WgXcQ',
        events: {
            'onReady': onPlayerReady
        }
    });
};
const button = document.querySelector('.fa-circle');
const header = document.querySelector('h3')
const root = document.querySelector('.root')
const image = document.querySelector('img')
const centerDiv = document.querySelector('.centerme')

let count = 0
let opacity = 1


function onPlayerReady(event) {
    console.log(window["yPlayer"])
    event.target.setVolume(4)
    button.addEventListener('click', () => {
        const playerVolume = event.target.getVolume()
        console.log(playerVolume)
        switch (count) {
            case 0:
                event.target.setVolume(20)
                opacity = .85
                setBackground()
                setTimeout(() => {
                    opacity = 1
                    setBackground()
                    header.textContent = "Please dont press again"
                    image.style.display = "none"
                }, 250)
                count++
                break
            case 1:
                const volumeDown = document.createElement('i')
                volumeDown.className = "fas fa-volume-up"
                centerDiv.appendChild(volumeDown)
                document.querySelector('.fa-volume-up').addEventListener('click', () => changeVolume(event))
                event.target.playVideo();
                event.target.setVolume(playerVolume + 20)
                opacity = .8
            default:
                console.log('default ran')
                header.textContent = count === 1 ? "What have you done..." : "Wow you did it again"
                setTimeout(() => header.textContent = "Press again to turn off", 2000)
                root.style.opacity = opacity
                opacity -= .2
                event.target.setVolume(playerVolume + 20)
                count++
        }
    })
}

const changeVolume = (e) => {
    const playerVolume = e.target.getVolume()
    e.target.setVolume(playerVolume + 20)
}

const setBackground = () => {
    root.style.opacity = opacity
}