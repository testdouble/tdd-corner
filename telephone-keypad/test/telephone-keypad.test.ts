import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKeypad } from '../src/TelephoneKeypad.js';
import { TelephoneKey } from '../src/TelephoneKey.js';
import '../src/telephone-keypad.js';
import '../src/telephone-key.js';

describe('TelephoneKeypad', () => {


  it('keypad can contain a key', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);

    await expect(el.querySelector('telephone-key')).to.exist;
  })

  it('clicks and we can know current character in our output property', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);
    const element = el.querySelector('telephone-key') as HTMLElement;

    element.click();

    await expect(el.output).to.equal("D");
  })

  it('if you have other elements in a keypad you can click it and it does not blow up', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><button>blah</button><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);

    const key = el.querySelector('telephone-key') as TelephoneKey;
    key.click();

    await expect(el.output).to.equal("D");

    const element = el.querySelector('button') as HTMLElement;
    element.click();

    await expect(el.output).to.equal("D");
  })

  it('after multiple clicks we know the current character in our output property', async () => {
    const el = await fixture<TelephoneKeypad>(html`
      <telephone-keypad>
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>`);
    const element = el.querySelector('telephone-key') as HTMLElement;

    element.click();
    element.click();

    await expect(el.output).to.equal("E");
  })

  it('tracks multiple telephone key clicks', async () => {
    const el = await fixture<TelephoneKeypad>(html`
      <telephone-keypad>
        <telephone-key options='["A", "B", "C", "1"]' ></telephone-key>
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>`);

    const keys = el.querySelectorAll('telephone-key');
    keys.forEach(key => (key as HTMLElement).click());

    await expect(el.output).to.equal("D");
  })

  it('restarts the cycle when coming back to a key', async () => {
    const el = await fixture<TelephoneKeypad>(html`
      <telephone-keypad>
        <telephone-key options='["A", "B", "C", "1"]' ></telephone-key>
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>`);

    const keys = el.querySelectorAll('telephone-key');
    const key1 = keys[0] as HTMLElement;
    const key2 = keys[1] as HTMLElement;

    key1.click();
    key2.click();

    await expect(el.output).to.equal("D");
  })

  it('handles returning to the first key', async () => {
    const el = await fixture<TelephoneKeypad>(html`
      <telephone-keypad>
        <telephone-key options='["A", "B", "C", "1"]' ></telephone-key>
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>`);

    const keys = el.querySelectorAll('telephone-key');
    const key1 = keys[0] as HTMLElement;
    const key2 = keys[1] as HTMLElement;

    key1.click();
    key2.click();
    key1.click();

    await expect(el.output).to.equal("A");
  })

  it('has a textbox sibling', async () => {
    const el = await fixture<TelephoneKeypad>(html`<input type="text"></input><telephone-keypad><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);

    const key = el.querySelectorAll('telephone-key')[0] as HTMLElement;
    key.click();

    const input = el.querySelector('input');
    await expect(input.value).to.equal("D");
  })

});
