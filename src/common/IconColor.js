const IconColor = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
const randomIconColor = () => IconColor[Math.floor(Math.random() * IconColor.length + 1)];

export default randomIconColor;