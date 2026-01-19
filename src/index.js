/**
 * @OnlyCurrentDoc
 */

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Export to forScore setlist (.4ss)", "exportToFourscore")
    .addToUi();
}

/**
 * Assume the doc has one tab with a table with 3 columns.
 * Produce a forScore setlist (.4ss) file by extracting the hymns from this table.
 * Hymns are recognized based on a list of hymn types
 */
function exportToFourscore() {
  // Get the document's title
  const document = DocumentApp.getActiveDocument();
  const title = document.getName();
  const table = loadHymnTable(document);

  const propers = rows(table)
    .filter(row => isProper(row.getCell(0).getText()))
    .map(row => row.getCell(1).getText())
    // Some names look like
    // Here At This Table | Anthology 8.2
    // Psalm 40: Here am I, Lord; I come to do your will.
    // Take just the first part.
    .map(name => name.split("|")[0].trim())
    .map(name => name.split(":")[0].trim());

  const contents = forScoreSetlist([title, ...propers, "Mass Parts"]);

  // Write the file to Drive
  DriveApp.createFile(`${title}.4ss`, contents);
}

function loadHymnTable(document) {
  const tables = document.getActiveTab().asDocumentTab().getBody().getTables();
  // TODO raise an error if no table exists
  const table = tables[0];
  // TODO raise an error if any row does not have exactly 3 columns
  return table;
}

function rows(table) {
  const result = [];
  for (let i = 0; i < table.getNumRows(); ++i) {
    result.push(table.getRow(i));
  }
  return result;
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

/**
 * .4ss files are a gzipped binary plist.
 * To see this for a file setlist.4ss, run on macOS:
 *   $ gunzip setlist.4ss --keep --suffix .4ss
 *   $ file setlist
 */
function forScoreSetlist(setlist) {
  return gzip(bplist(setlist));
}

function bplist(setlist) {
  // TODO write a binary plist
  return setlist.join("\n");
}

function gzip(text) {
  const compressedStream = ReadableStream
    .from([text])
    .pipeThrough(new CompressionStream("gzip"));

  const reader = compressedStream.getReader();
  let finishedStreaming = false;
  let result = "";

  while (!finishedStreaming) {
    reader.read().then(function (done, value) {
      if (done) {
        finishedStreaming = true;
      } else {
        result += value;
      }
    });

    return result;
  }
}
