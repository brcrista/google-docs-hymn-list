/**
 * .4ss files are a gzipped binary plist.
 * To see this for a file setlist.4ss, run on macOS:
 *   $ gunzip setlist.4ss --keep --suffix .4ss
 *   $ file setlist
 */
export function pdfFilesInBlob(blob) {
  const bplist = Utilities.ungzip(blob);
  const dataAsUtf8 = bplist.getDataAsString();

  // Samples:
  //   Hymn List _ 10am.pdf
  //   Here At This Table CHOIR.pdf
  //   Ps 40_ Here I am, Lord (Navarro).pdf
  //   Go Now In Peace (JON) PV 3.17.25.pdf
  //   Precious Lord, Take My Hand _ Choir.pdf
  //   Here I Am, Lord _ Choir.pdf
  //   Take and Eat.pdf
  //   Lift Every Voice and Sing CHOIR.PV.pdf
  //   MassofRenewalPacket-JLCEdits-2024-10am.pdf
  //   Mass o.t Transfiguration (Gouin) JLC Complete 11.28.25.pdf
  const regex = /[a-zA-Z][\w\s\.,\-\(\)]*\.pdf/g;
  const matches = dataAsUtf8.matchAll(regex);

  const filenames = [];
  for (const match of matches) {
      filenames.push(match[0]);
  }
  return filenames;
}