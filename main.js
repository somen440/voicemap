let allSpaceList = [
  { key: 'たくさんの星', value: '',  presets: null, enabled: false, },
  { key: '隕石', value: '',  presets: null, enabled: false, },
  { key: '太陽', value: 'sun',  presets: Spacekit.SpaceObjectPresets.SUN, enabled: false, },
  { key: '水星', value: 'mercury',  presets: Spacekit.SpaceObjectPresets.MERCURY, enabled: false, },
  { key: '金星', value: 'venus',  presets: Spacekit.SpaceObjectPresets.VENUS, enabled: false, },
  { key: '地球', value: 'earth',  presets: Spacekit.SpaceObjectPresets.EARTH, enabled: false, },
  { key: '火星', value: 'mars',  presets: Spacekit.SpaceObjectPresets.MARS, enabled: false, },
  { key: '木星', value: 'jupiter',  presets: Spacekit.SpaceObjectPresets.JUPITER, enabled: false, },
  { key: '土星', value: 'saturn',  presets: Spacekit.SpaceObjectPresets.SATURN, enabled: false, },
  { key: '天王星', value: 'uranus',  presets: Spacekit.SpaceObjectPresets.URANUS, enabled: false, },
  { key: '海王星', value: 'neptune',  presets: Spacekit.SpaceObjectPresets.NEPTUNE, enabled: false, },
];

const viz = new Spacekit.Simulation(document.getElementById('main'), {
  basePath: 'https://typpo.github.io/spacekit/src',
});

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onresult = (event) => {
  const text = event.results[0][0].transcript
  const li = document.createElement('li');
  li.innerText = text;
  recordingslist.appendChild(li);

  allSpaceList.map(value => {
    if (value.key === text) {
      value.enabled = true;
    }
    return value;
  });
  createList();
}

function start() {
  recognition.start();
}

function allSpaces() {
  allSpaceList = allSpaceList.map(value => {
    value.enabled = true;
    return value;
  });
  createList();
}

function resetSpaces() {
  location.reload();
}

function createList() {
  allSpaceList.filter(value => value.enabled)
    .forEach(value => {
      if (value.key === 'たくさんの星') {
        viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);
      } else if (value.key === '隕石') {
        meteor();
      } else {
        viz.createObject(value.key, value.presets);
      }
    });
}

function meteor() {
  window.PERSEIDS_EPHEM.forEach((rawEphem, idx) => {
    const ephem = new Spacekit.Ephem({
      a: rawEphem.a,
      e: rawEphem.e,
      i: (rawEphem.i * Math.PI) / 180,
      om: (rawEphem.om * Math.PI) / 180,
      w: (rawEphem.w * Math.PI) / 180,
      ma: 0,
      epoch: Math.random() * 2500000,
    });

    viz.createObject(`perseids_${idx}`, {
      hideOrbit: true,
      particleSize: 10,
      textureUrl: '{{assets}}/sprites/fuzzyparticle.png',
      ephem,
    });
  });
}
