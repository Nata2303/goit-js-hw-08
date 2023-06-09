import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);

const saveCurrentTime = (time) => {
  localStorage.setItem("videoplayer-current-time", JSON.stringify(time));
};

player.on("play", () => {
  console.log("played the video!");
});

player.getVideoTitle().then((title) => {
  console.log("title:", title);
});

const currentTime = localStorage.getItem("videoplayer-current-time");
if (currentTime) {
  player.setCurrentTime(JSON.parse(currentTime));
}

player.on(
  "timeupdate",
  throttle((event) => {
    const currentTime = event.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);
