// const { ReadableStream } = require('web-streams-polyfill');
// const { CompressionStream } = require('compression-streams-polyfill');

/**
 * .4ss files are a gzipped binary plist.
 * To see this for a file setlist.4ss, run on macOS:
 *   $ gunzip setlist.4ss --keep --suffix .4ss
 *   $ file setlist
 */
export function forscoreSetlist(setlist) {
  return gzip(bplist(setlist));
}

function bplist(setlist) {
  // TODO write a binary plist
  return setlist.join("\n");
}

function gzip(text) {
//   const compressedStream = ReadableStream
//     .from([text])
//     .pipeThrough(new CompressionStream("gzip"));

//   const reader = compressedStream.getReader();
//   let finishedStreaming = false;
//   let result = "";

//   while (!finishedStreaming) {
//     reader.read().then(function (done, value) {
//       if (done) {
//         finishedStreaming = true;
//       } else {
//         result += value;
//       }
//     });

//     return result;
//   }
  return text;
}
