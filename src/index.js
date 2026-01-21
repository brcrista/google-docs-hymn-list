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
  const document = DocumentApp.getActiveDocument();
  const forscoreFile = `${document.getName()}.4ss`;
  const files = DriveApp.getFilesByName(forscoreFile);
  if (!files.hasNext()) {
    throw new Error(
        `Could not find a file in this Google Drive with the name '${forscoreFile}'`
    );
  }

  const file = files.next();
  const blob = file.getBlob();
  const pdfFiles = pdfFilesInBlob(blob);
  const titles = guessTitles(pdfFiles);
  const hymnTable = loadHymnTable(document);
  insertHymns(hymnTable, titles);
}
