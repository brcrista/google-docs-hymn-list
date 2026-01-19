const { rows } = require('./gdoc');

export function readPropers(table) {
  return rows(table)
    .filter(row => isProper(row.getCell(0).getText()))
    .map(row => row.getCell(1).getText())
    // Some names look like
    // Here At This Table | Anthology 8.2
    // Psalm 40: Here am I, Lord; I come to do your will.
    // Take just the first part.
    .map(name => name.split("|")[0].trim())
    .map(name => name.split(":")[0].trim());
}

/**
 * Music in the Mass that changes from week to week.
 */
function isProper(rite) {
  return [
    "Opening",
    "Responsorial Psalm",
    "Offertory",
    "Communion",
    "2nd Communion",
    "Meditation",
    "Closing"
  ].includes(rite);
}
