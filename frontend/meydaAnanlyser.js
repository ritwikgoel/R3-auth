const fs = require('fs')

let value=fs.readFile('/Users/ritwikgoel/Downloads/output.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})


// const name = "Bentley";

// const lastFour =  name.slice(-4)

// console.log(lastFour); // "tley"