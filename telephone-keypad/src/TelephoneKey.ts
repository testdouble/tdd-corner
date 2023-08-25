import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class TelephoneKey extends LitElement {
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

  @property({ type: Array }) options = [];

  @property({ type: String }) currentCharacter = "";

  private index = 0;

  private _handleClick(event: Event) {
    this.currentCharacter = this.options[this.index];
    this.index = (this.index + 1) % this.options.length;
  }

  render() {
    return html`
      <button>
        <h2>${ this.options[this.options.length - 1] }</h2>
        <small> ${ this.options.slice(0, 3).join('') }</small>
      </button>
    `;
  }
}