import jsonfile from 'jsonfile';
import path from 'path';

import { cfmToHtml } from '../src/';
import { atProfile, atProject, hashTag, adHocHashTag, czmImage, youTube, soundCloud, cfmRef } from './cfm_ref_md';

const writeToFile = (text) => {
  if (!text) return false;

  try {
    const filePath = path.resolve(__dirname, `./cfm_ref_html.json`);
    jsonfile.writeFileSync(filePath, text, {spaces: 2})
    return filePath;
  } catch (e) {
    return false;
  }
}

const output = {
  atProfile: cfmToHtml(atProfile),
  atProject: cfmToHtml(atProject),
  hashTag: cfmToHtml(hashTag),
  adHocHashTag: cfmToHtml(adHocHashTag),
  czmImage: cfmToHtml(czmImage),
  youTube: cfmToHtml(youTube),
  soundCloud: cfmToHtml(soundCloud),
  cfmRef: cfmToHtml(cfmRef),
};

const success = writeToFile(output);

console.log("Output = " + success)
