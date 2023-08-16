import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKeypad } from '../src/TelephoneKeypad.js';
import '../src/telephone-keypad.js';

describe('TelephoneKeypad', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad></telephone-keypad>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad></telephone-keypad>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad header="attribute header"></telephone-keypad>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad></telephone-keypad>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
