const meyda= require("meyda");

//own signal for the input 

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
console.log(signal);
console.log(meyda.extract("zcr", signal));
