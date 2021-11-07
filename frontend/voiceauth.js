const meyda= require("meyda");

//own signal for the input 

// function inputter()


var signal = new Array(32).fill(0).map((element, index) => {
    const remainder = index % 3;
    if (remainder === 0) {
      return 0;
    } else if (remainder === 1) {
      return 1;
    }
    return -1;
  });
//extraction of features
//console.log(signal);
console.log(meyda.extract("rms", signal));
