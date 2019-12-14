import { html, css, LitElement } from "lit-element";

customElements.define(
	"choice-button",
	class ChoiceButton extends LitElement {
		static get properties() {
			return {
				state: { type: String }
			};
		}

		constructor() {
			super();
		}

		static get styles() {
			return css`
				* {
					box-sizing: border-box;
				}
				.choice-button {
					width: 5rem;
					height: 5rem;
					text-align: center;
					border-radius: 50%;
					background-color: white;
					cursor: pointer;
				}
				.hidden {
					opacity: 0;
					height: 0;
					overflow: hidden;
				}
			`;
		}

		render() {
			return html`
				<div class="choice-button ${this.state}">
					<slot></slot>
				</div>
			`;
		}
	}
);