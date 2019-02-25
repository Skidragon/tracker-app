export { greyLine, dashedLine, solidBlackLine };

// thin grey is not reached yet and the person has not started that path

const greyLine = {
  strokeWeight: 5,
  strokeColor: "#969696"
};
// a dashed line is in-progress, the person has started on that path
// Doc for dashed-line: https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-dashed
const lineSymbol = {
  path: "M 0,-1 0, 1",
  strokeOpacity: 1,
  scale: 4
};
const dashedLine = {
  strokeOpacity: 0,

  icons: [
    {
      icon: lineSymbol,
      offset: "0",
      repeat: "20px"
    }
  ]
};
// solid black line means the path was traversed
const solidBlackLine = {
  strokeWeight: 8,
  strokeColor: "#000000"
};
