/**
 * .4ss files are a gzipped binary plist.
 * To see this for a file setlist.4ss, run on macOS:
 *   $ gunzip setlist.4ss --keep --suffix .4ss
 *   $ file setlist
 */
export function forscoreSetlist(setlist, name) {
  return gzip(bplist(setlist), name);
}

function bplist(setlist) {
  // TODO write a binary plist
  return setlist.join("\n");
}

function gzip(data, name) {
  return Utilities.gzip(
    Utilities.newBlob(data),
    name
  );
}
