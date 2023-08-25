import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKeypad } from '../src/TelephoneKeypad.js';
import '../src/telephone-keypad.js';

describe('TelephoneKeypad', () => {
  

  it('keypad can contain a key', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' /></telephone-keypad>`);

    await expect(el.querySelector('telephone-key')).to.exist;
  })

  it('clicks and we can see current character in our output property', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' /></telephone-keypad>`);

    el.querySelector('telephone-key')?.click();

    await expect(el.output).to.equal("D");
  })
});
