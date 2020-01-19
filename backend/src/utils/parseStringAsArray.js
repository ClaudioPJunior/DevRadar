module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(skil => skil.trim());
}