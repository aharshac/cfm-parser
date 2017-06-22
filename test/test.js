import assert from 'power-assert';
import jsonfile from 'jsonfile';
import path from 'path';

import { cfmToHtml } from '../src/';

import { atProfile, atProject, hashTag, adHocHashTag, czmImage, youTube, soundCloud, cfmRef, customUiClass } from './cfm_ref_md';

let stdHtml = {};

describe('cfm-parser', function() {
  it('loads test standard output', () => {
    const filePath = path.resolve(__dirname, `./cfm_ref_html.json`);
    stdHtml = jsonfile.readFileSync(filePath);
  });

  it('parses CFM without crashing', () => {
    cfmToHtml(cfmRef);
  });

  it('parses At profile tag', function() {
    const html = cfmToHtml(atProfile);
    assert.equal(html, stdHtml.atProfile);
  });

  it('parses At project tag', function() {
    const html = cfmToHtml(atProject);
    assert.equal(html, stdHtml.atProject);
  });

  it('parses hash tag', function() {
    const html = cfmToHtml(hashTag);
    assert.equal(html, stdHtml.hashTag);
  });

  it('parses user-defined hash tag', function() {
    const html = cfmToHtml(adHocHashTag);
    assert.equal(html, stdHtml.adHocHashTag);
  });

  it('parses Collaborizm-hosted image', function() {
    const html = cfmToHtml(czmImage);
    assert.equal(html, stdHtml.czmImage);
  });

  it('parses YouTube', function() {
    const html = cfmToHtml(youTube);
    assert.equal(html, stdHtml.youTube);
  });

  it('parses soundCloud', function() {
    const html = cfmToHtml(soundCloud);
    assert.equal(html, stdHtml.soundCloud);
  });

  it('parses CFM reference standard', function() {
    const html = cfmToHtml(cfmRef);
    assert.equal(html, stdHtml.cfmRef);
  });

  it('parses custom UI classes', function() {
    const html = cfmToHtml(cfmRef, true, customUiClass, 'https://collaborizm.com');
    assert.equal(html, stdHtml.customUi);
  });
});
