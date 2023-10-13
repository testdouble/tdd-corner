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


  private lastKeyClicked: TelephoneKey|any = undefined;

  private optionIndex = 0;

  private _handleClick(event: Event) {
    if (event.target instanceof TelephoneKey) {
      const element = event.target;

      if (this.lastKeyClicked === element) {
        this.optionIndex += 1;
      } else {
        this.optionIndex = 0;
      }
      this.lastKeyClicked = element;

      this.output = element.optionAt(this.optionIndex);
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
