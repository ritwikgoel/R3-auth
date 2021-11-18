const meyda= require("meyda");

//own signal for the input 

// function inputter()


var signal = new Array(32).fill(0).map((element, index) => {
    const remainder = index % 3;
    if (remainder === 0) {
      return 1;
    } else if (remainder === 1) {
      return 0;
    }
    return -1;
  });
//extraction of features
//console.log(signal);
console.log(meyda.extract(["rms","zcr"], signal));
//own signal for the input 
let fs = require("fs");
let wav = require("node-wav");

let buffer = fs.readFileSync("/Users/anitejsrivastava/Desktop/banana-auth/frontend/CantinaBand3.wav");
let result = wav.decode(buffer);
console.log(result.sampleRate);
console.log(result.channelData)
var arrayFloat32 = new Float32Array(result);
// function inputter()

// const TARGET_SAMPLE_RATE = 41000;
// var offlineCtx = new OfflineAudioContext(result.numberOfChannels,
//   result.duration * TARGET_SAMPLE_RATE,
//   TARGET_SAMPLE_RATE);
//   var offlineSource = offlineCtx.createBufferSource();
//   offlineSource.buffer = result;
//   offlineSource.connect(offlineCtx.destination);
//   offlineSource.start();
//   offlineCtx.startRendering().then((resampled) => {
//     // `resampled` contains an AudioBuffer resampled at 16000Hz.
//     // use resampled.getChannelData(x) to get an Float32Array for channel x.
//     console.log(resampled.getChannelData(x));
//   });

//extraction of features
//console.log(signal);


function chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  
  return chunked_arr;
}
let arrfinal=chunk(result.channelData,512);
// console.log(arrfinal);

var convJson = meyda.extract(["rms","zcr","energy"],result.channelData);
console.log(convJson);

