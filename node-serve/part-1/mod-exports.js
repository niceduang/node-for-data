let str = `exports str....`;
let say = (str) => {
    console.log(`exports say ${str}`);
}
// exports.str = str;
// exports.say = say;
module.exports = {
    str,
    say
}