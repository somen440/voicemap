function __log(e, data) {
  log.innerHTML += "\n" + e + " " + (data || '');
}

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onresult = (event) => {
  const text = event.results[0][0].transcript
  const li = document.createElement('li');
  li.innerText = text;
  recordingslist.appendChild(li);
  __log('added');
}

window.onload = function () {
  __log('audio setup');
};

function start() {
  __log('recording start')
  recognition.start();
}

const viz = new Spacekit.Simulation(document.getElementById('main'), {
  basePath: '.',
});

viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

viz.createObject('mercury', Spacekit.SpaceObjectPresets.MERCURY);
viz.createObject('venus', Spacekit.SpaceObjectPresets.VENUS);
viz.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);
viz.createObject('mars', Spacekit.SpaceObjectPresets.MARS);
viz.createObject('jupiter', Spacekit.SpaceObjectPresets.JUPITER);
viz.createObject('saturn', Spacekit.SpaceObjectPresets.SATURN);
viz.createObject('uranus', Spacekit.SpaceObjectPresets.URANUS);
viz.createObject('neptune', Spacekit.SpaceObjectPresets.NEPTUNE);
