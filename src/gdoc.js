const { isProper } = require("./mass");

export function loadHymnTable(document) {
  const tables = document.getActiveTab().asDocumentTab().getBody().getTables();
  // TODO raise an error if no table exists
  const table = tables[0];
  // TODO raise an error if any row does not have exactly 3 columns
  return table;
}

export function rows(table) {
  const result = [];
  for (let i = 0; i < table.getNumRows(); ++i) {
    result.push(table.getRow(i));
  }
  return result;
}

export function writeToDocument(strings) {
  const body = DocumentApp.getActiveDocument().getActiveTab().asDocumentTab().getBody();
  const text = body.editAsText();
  text.appendText(strings.join("\n"));
}

/**
 * Insert hymns in the following rows:
 * - Opening
 * - Responsorial Psalm
 * - Offertory
 * - Communion
 * - 2nd Communion
 * - Closing
 */
export function insertHymns(hymnTable, hymns) {
  let hymnIdx = 0;
  for (const row of rows(hymnTable)) {
    if (hymnIdx === hymns.length) {
      return;
    }

    const rite = row.getCell(0).getText();
    if (isProper(rite)) {
      const hymn = hymns[hymnIdx++];
      row.getCell(1).editAsText().appendText(hymn);
    }
  }
}