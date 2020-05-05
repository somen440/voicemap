function __log(e, data) {
  log.innerHTML += "\n" + e + " " + (data || '');
}

var audio_context;
var recorder;

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = new Float32Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  __log('Media stream created.');

  recorder = new Recorder(input);
  __log('Recorder initialised.');
}

function startRecording(button) {
  recorder && recorder.record();
  button.disabled = true;
  button.nextElementSibling.disabled = false;
  __log('Recording...');
}

function stopRecording(button) {
  recorder && recorder.stop();
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  __log('Stopped recording.');
  createDownloadLink();
  recorder.clear();
}

function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    let reader = new FileReader();
    reader.onload = function () {
      let result = new Uint8Array(reader.result); // reader.result is ArrayBuffer
      let data = {
          "config": {
              "encoding": "LINEAR16",
              "sampleRateHertz": 44100,
              "languageCode": "ja-JP",
              "audioChannelCount": 2
          },
          "audio": {
              "content": arrayBufferToBase64(result)
          }
      };
      __log('audio send...');
      fetch('https://speech.googleapis.com/v1/speech:recognize', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(data)
      }).then(function (response) {
          return response.text();
      }).then(function (text) {
          let result_json = JSON.parse(text);
          //テキストデータ自体はresult_json.results[0].alternatives[0].transcriptに格納
          console.log("RESULT: " + text);
          console.log(data)
          // console.log(result_json.results[0].alternatives[0].transcript);

          var li = document.createElement('li');

          li.innerHTML(text);
          recordingslist.appendChild(li);
      });
    };
    reader.readAsArrayBuffer(blob);
  });
}

window.onload = function init() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });
};

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
