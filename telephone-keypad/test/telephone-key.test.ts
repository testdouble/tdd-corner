import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKey } from '../src/TelephoneKey.js';
import '../src/telephone-key.js';

describe('TelephoneKey', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<TelephoneKey>(html`<telephone-keypad></telephone-keypad>`);

    await expect(el).shadowDom.to.be.accessible();
  });

  it('displays a 1', () => {
    const el = await fixture<TelephoneKey>(html`<telephone-keypad></telephone-keypad>`);

    await expect(el).displayName.to.be(1)
  }
});
