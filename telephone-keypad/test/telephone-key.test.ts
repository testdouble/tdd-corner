import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKey } from '../src/TelephoneKey.js';
import '../src/telephone-key.js';

describe('TelephoneKey', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<TelephoneKey>(html`<telephone-key options='["A","B","C","1"]'></telephone-key>`);

    await expect(el).shadowDom.to.be.accessible();
  });

  it('displays the last option', async() => {
    const el = await fixture<TelephoneKey>(html`<telephone-key options='["A","B","C","1"]'></telephone-key>`);

    await expect(el.shadowRoot?.querySelector('h2')?.textContent?.trim()).to.equal('1');
  });

  it('displays the other options as little text', async () => {
    const el = await fixture<TelephoneKey>(html`<telephone-key options='["A","B","C","1"]'></telephone-key>`);

    await expect(el.shadowRoot?.querySelector('small')?.textContent?.trim()).to.equal('ABC');
  })

  it('wraps around if given an out of bounds index', async () => {
    const el = await fixture<TelephoneKey>(html`<telephone-key options='["A","B"]'></telephone-key>`);

    expect(el.optionAt(2)).to.equal('A');
  })
});
