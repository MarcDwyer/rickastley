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


const onPlayerReady = (event) => {
    console.log(window["yPlayer"])
    event.target.setVolume(4)
    button.addEventListener('click', () => {
        const playerVolume = event.target.getVolume()
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
            case 4:
                centerDiv.style.display = "none"
                count++
                break
            case 1:
                const volumeDown = document.createElement('i')
                volumeDown.className = "fas fa-volume-up"
                document.body.appendChild(volumeDown)
                document.querySelector('.fa-volume-up').addEventListener('click', () => changeVolume(event))
                event.target.playVideo();
                event.target.setVolume(playerVolume + 20    )
                opacity = .8
                setHeader("What have you done")
            default:
                const str = count >= 2 ? "You just keep clicking..." : "You did it again..."
                setHeader(str)
                root.style.opacity = opacity
                opacity -= .35
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

const setHeader = (str) => {
    header.textContent = str
}