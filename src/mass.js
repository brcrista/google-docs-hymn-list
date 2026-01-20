/**
 * Music in the Mass that changes from week to week.
 */
export function isProper(rite) {
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

export function guessTitles(pdfs) {
  return pdfs.map(pdf =>
    pdf
      .slice(0, -".pdf".length)
      .replaceAll("_", "")
      .replaceAll(/choir/gi, "")
      .trim()
  );
}