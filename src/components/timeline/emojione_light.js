// @preval
// Force tree shaking on emojione by exposing just a subset of its functionality

import emojione from 'emojione';

const mappedUnicode = emojione.mapUnicodeToShort();
export const unicodeMapping = Object.keys(emojione.jsEscapeMap)
    .map(unicodeStr => [unicodeStr, mappedUnicode[emojione.jsEscapeMap[unicodeStr]]])
    .map(([unicodeStr, shortCode]) => ({
        [unicodeStr]: [emojione.emojioneList[shortCode].fname, shortCode.slice(1, shortCode.length - 1)]
    }))
    .reduce((x, y) => Object.assign(x, y), {});