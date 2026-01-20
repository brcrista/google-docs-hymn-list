/**
 * @OnlyCurrentDoc
 */

const { insertHymns, loadHymnTable } = require("./gdoc");
const { pdfFilesInBlob } = require("./forscore");
const { guessTitles } = require("./mass");

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
    .addItem("Import from forScore setlist (.4ss)", importFromForscore.name)
    .addToUi();
}

function importFromForscore() {
  // TODO make the name configurable
  const files = DriveApp.getFilesByName("Jan18.4ss");
  const file = getFirstFile(files);
  const blob = file.getBlob();
  const pdfFiles = pdfFilesInBlob(blob);
  const titles = guessTitles(pdfFiles);
  const document = DocumentApp.getActiveDocument();
  const hymnTable = loadHymnTable(document);
  insertHymns(hymnTable, titles);
}

function getFirstFile(files) {
  if (!files.hasNext()) {
    throw Error("no file");
  }
  return files.next();
}

