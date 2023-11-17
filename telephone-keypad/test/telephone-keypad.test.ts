import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { TelephoneKeypad } from '../src/TelephoneKeypad.js';
import { TelephoneKey } from '../src/TelephoneKey.js';
import '../src/telephone-keypad.js';
import '../src/telephone-key.js';
import * as sinon from 'sinon';

describe('TelephoneKeypad', () => {

  let clock:sinon.SinonFakeTimers;

  // beforeEach( () => {
  //   clock = sinon.useFakeTimers();
  // })

  // afterEach( () => {
  //   clock.restore();
  // })

  it('keypad can contain a key', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);

    await expect(el.querySelector('telephone-key')).to.exist;
  })

  it('clicks and we can know current character in our output property', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);
    const element = el.querySelector('telephone-key') as HTMLElement;

    element.click();

    await expect(el.testOutput).to.equal("D");
  })

  it('if you have other elements in a keypad you can click it and it does not blow up', async () => {
    const el = await fixture<TelephoneKeypad>(html`<telephone-keypad><button>blah</button><telephone-key options='["D", "E", "F", "2"]' ></telephone-key></telephone-keypad>`);

    const key = el.querySelector('telephone-key') as TelephoneKey;
    key.click();

    await expect(el.testOutput).to.equal("D");

    const element = el.querySelector('button') as HTMLElement;
    element.click();

    await expect(el.testOutput).to.equal("D");
  })

  it('after multiple clicks we know the current character in our output property', async () => {
    const el = await fixture<TelephoneKeypad>(html`
      <telephone-keypad>
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>`);
    const element = el.querySelector('telephone-key') as HTMLElement;

    element.click();
    element.click();

    await expect(el.testOutput).to.equal("E");
  })

  it('tracks multiple telephone key clicks', async () => {
    const el = await fixture<TelephoneKeypad>(html`
      <telephone-keypad>
        <telephone-key options='["A", "B", "C", "1"]' ></telephone-key>
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>`);

    const keys = el.querySelectorAll('telephone-key');
    keys.forEach(key => (key as HTMLElement).click());

    await expect(el.testOutput).to.equal("D");
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

    await expect(el.testOutput).to.equal("D");
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

    await expect(el.testOutput).to.equal("A");
  })

  it('commits the last value clicked when key clicked multiple times', async() => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <input type="text" name="something" />
        <telephone-keypad for="something">
          <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
        </telephone-keypad>
      </div>
    `);

    const key = el.querySelector('telephone-key') as HTMLElement;
    key.click();
    key.click();

    const input = el.querySelector('input');
    await expect(input?.value).to.equal("E");
  });

  it.only('sends value to associated text input after a delay', async () => {
    console.log('start test')
    const el = await fixture<HTMLElement>(html`
      <div>
        <input type="text" name="something" />
        <telephone-keypad for="something" delay="10" >
          <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
        </telephone-keypad>
      </div>
    `);

    const key = el.querySelectorAll('telephone-key')[0] as HTMLElement;
    const input = el.querySelector('input');

    clock = sinon.useFakeTimers();
    key.click();
    await expect(input?.value).to.equal("");

    // await new Promise((res) => {
    //       setTimeout(res, 12);
    // });
    console.log('tick')
    clock.tick(12);
    clock.runAll();
    clock.restore();

    await expect(input?.value).to.equal("D");

  })
});

it('records the second value when clicked after a delay', async () => {
  const el = await fixture<HTMLElement>(html`
    <div>
      <input type="text" name="something" />
      <telephone-keypad for="something" delay="10" >
        <telephone-key options='["D", "E", "F", "2"]' ></telephone-key>
      </telephone-keypad>
    </div>
  `);

  const key = el.querySelectorAll('telephone-key')[0] as HTMLElement;

  const input = el.querySelector('input');

  key.click();
  await new Promise((res) => {
    setTimeout(res, 12);
  });
  await expect(input?.value).to.equal("D");

  key.click();
  await new Promise((res) => {
    setTimeout(res, 12);
  });
  await expect(input?.value).to.equal("DE");
});
