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

  @property({ type: String }) output = '';

  private _handleClick(event: Event) {
    if (event.target) {
      const element = event.target as TelephoneKey;
      this.output = element.currentCharacter;
    }
  }

  render() {
    return html`
    `;
  }
}
