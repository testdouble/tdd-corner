import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKeypad } from '../src/TelephoneKeypad.js';
import '../src/telephone-keypad.js';
import '../src/telephone-key.js';

describe('TelephoneKeypad', () => {
  

  it('keypad can contain a key', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' /></telephone-keypad>`);

    await expect(el.querySelector('telephone-key')).to.exist;
  })

  it('clicks and we can know current character in our output property', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' /></telephone-keypad>`);
    const element = el.querySelector('telephone-key') as HTMLElement;

    element.click();

    await expect(el.output).to.equal("D");
  })

  it('if you have other elements in a keypad you can click it and it does not blow up', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><button>blah</button></telephone-keypad>`);
    const element = el.querySelector('button') as HTMLElement;

    element.click();

    await expect(true).to.equal(false);
  })
});
