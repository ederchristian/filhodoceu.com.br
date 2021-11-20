function playAudios() {
  document
    .querySelectorAll("audio")
    .forEach((audio) =>
      elementIsVisible(audio) ? audio.play() : audio.pause()
    );
}

function elementIsVisible(element) {
  let rect = element.getBoundingClientRect();
  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function muteAndUnmuteAudios() {
  let muteButton = document.querySelector("#mute-button-icon");
  let unmutedIcon = document.createTextNode("🔈");
  let mutedIcon = document.createTextNode("🔇");

  document
    .querySelectorAll("audio")
    .forEach((audio) => (audio.muted = !audio.muted));

  document.querySelectorAll("audio").forEach((audio) => {
    if (audio.muted) {
      muteButton.replaceChild(unmutedIcon, muteButton.firstChild);
    } else {
      muteButton.replaceChild(mutedIcon.cloneNode(), muteButton.firstChild);
    }
  });
}

let playAudiosTimeout;

window.addEventListener("scroll", () => {
  clearTimeout(playAudiosTimeout);
  playAudiosTimeout = setTimeout(playAudios, 10);
});

window.addEventListener("resize", playAudios);
window.addEventListener("DOMContentLoaded", playAudios);
