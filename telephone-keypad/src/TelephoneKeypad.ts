import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { TelephoneKey } from './TelephoneKey';

export class TelephoneKeypad extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--telephone-keypad-text-color, #000);
    }
  `;

  constructor() {
    super();
    this.addEventListener('click', this._handleClick);
  }

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

  @property({ type: String }) testOutput = '';

  @property({ type: String }) for = '';

  @property({ type: Number }) delay = 1;

  private pendingTimeout: ReturnType<typeof setTimeout>|null = null;

  private lastKeyClicked: TelephoneKey|any = undefined;

  private optionIndex = 0;

  private _handleClick(event: Event) {
    if (!(event.target instanceof TelephoneKey)) return;

    const output = this._determineKeyOutput(event.target);

    // Hook for testing - TODO be better
    this.testOutput = output;

    const commit = () => {
      console.log('commit')
      const inputs = this._findInput();
      for(const input of inputs as HTMLInputElement[]) {
        input.value += output;
      }
    }

    if(this.pendingTimeout) {
      clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;
    }

    if(this.delay) {
      console.log('here one', this.delay)
      console.log('setTimeout', setTimeout)
      console.log('window.setTimeout', window.setTimeout)
      this.pendingTimeout = setTimeout(commit, this.delay);
    } else {
      console.log('here two')
      commit();
    }
  }

  private _determineKeyOutput = (key: TelephoneKey) => {
    if (this.lastKeyClicked === key) {
      this.optionIndex += 1;
    } else {
      this.optionIndex = 0;
    }
    this.lastKeyClicked = key;

    return key.optionAt(this.optionIndex);
  }


  private _findInput() {
    return Array.from(document.querySelectorAll(`input[name="${this.for}"]`));
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
