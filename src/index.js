/**
 * @OnlyCurrentDoc
 */

const { forscoreSetlist } = require('./forscore');
const { loadHymnTable } = require('./gdoc');
const { readPropers } = require('./mass');

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
    .addItem("Export to forScore setlist (.4ss)", exportToFourscore.name)
    .addToUi();
}

/**
 * Assume the doc has one tab with a table with 3 columns.
 * Produce a forScore setlist (.4ss) file by extracting the hymns from this table.
 * Hymns are recognized based on a list of hymn types
 */
function exportToFourscore() {
  const document = DocumentApp.getActiveDocument();
  const title = document.getName();
  const table = loadHymnTable(document);
  const propers = readPropers(table);
  const contents = forscoreSetlist([title, ...propers, "Mass Parts"]);
  DriveApp.createFile(`${title}.4ss`, contents);
}
