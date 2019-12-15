import { html, css, LitElement } from "lit-element";

customElements.define(
	"choice-button",
	class ChoiceButton extends LitElement {
		static get properties() {
			return {
				shape: { type: String, attribute: "data-shape" }
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
					border-bottom: 5px solid;
				}
				.choice-button__border_scissors {
					border-color: #c26c21;
					background: linear-gradient(
						hsl(40, 84%, 53%),
						hsl(39, 89%, 49%)
					);
				}
				.choice-button__border_rock {
					border-color: #a31533;
					background: linear-gradient(
						hsl(349, 70%, 56%),
						hsl(349, 71%, 52%)
					);
				}
				.choice-button__border_paper {
					border-color: #2945c4;
					background: linear-gradient(
						hsl(230, 89%, 65%),
						hsl(230, 89%, 62%)
					);
				}
			`;
		}

		render() {
			return html`
				<div
					class="choice-button__border choice-button__border_${this
						.shape}"
				>
					<div class="choice-button">
						<slot class="image"></slot>
					</div>
				</div>
			`;
		}
	}
);
