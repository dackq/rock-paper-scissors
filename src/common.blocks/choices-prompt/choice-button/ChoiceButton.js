import { html, css, LitElement } from "lit-element";

customElements.define(
	"choice-button",
	class ChoiceButton extends LitElement {
		static get properties() {
			return {};
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
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 6.25rem;
					height: 6.25rem;
					text-align: center;
					border-top: 5px solid #bbbdd3;
					border-radius: 50%;
					background: linear-gradient(#dadcd9, #f1eff0);
					cursor: pointer;
				}
				.choice-button__border {
					width: 8.125rem;
					height: 8.125rem;
					border-radius: 50%;
					background-color: hsl(39, 89%, 49%);
				}
			`;
		}

		render() {
			return html`
				<div class="choice-button__border">
					<div class="choice-button">
						<slot class="image"></slot>
					</div>
				</div>
			`;
		}
	}
);
