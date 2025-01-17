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

  @property({ type: Array }) options = [];

  public optionAt(index: number) {
    return this.options[index % this.options.length];
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