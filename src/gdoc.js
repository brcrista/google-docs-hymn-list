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