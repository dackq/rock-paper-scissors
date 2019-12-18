import { html, css, LitElement } from "lit-element";

customElements.define(
	"outcome-display",
	class OutputDisplay extends LitElement {
		static get properties() {
			return {
				outcome: { type: String },
				hidden: { type: String },
				button: { type: String }
			};
		}

		constructor() {
			super();
			this.hidden = "hidden";
			this.button = "";
		}

		attributeChangedCallback(name, oldVal, newVal) {
			if (name === "outcome") {
				if (newVal !== "") {
					this.hidden = "";
					this.button = "outcome__button";
				} else {
					this.hidden = "hidden";
					this.button = "";
				}
			}
			super.attributeChangedCallback(name, oldVal, newVal);
		}

		dispatchReset() {
			this.dispatchEvent(new CustomEvent("reset-game"));
		}

		static get styles() {
			return css`
				.outcome {
					margin-top: -1.5rem;
					height: 10rem;
					transition: 0.5s;
				}
				.outcome__label {
					text-align: center;
					color: white;
					font-size: 3.4rem;
					margin: 0;
				}
				.outcome__button {
					display: block;
					margin: 1.1rem auto;
					padding: 1rem 3rem;
					background-color: white;
					border-radius: 8px;
					color: #16243e;
					font-size: 1rem;
					font-weight: 600;
					letter-spacing: 2px;
				}
				.hidden {
					opacity: 0;
				}
			`;
		}
		render() {
			return html`
				<div class="outcome  ${this.hidden}">
					<h2 class="outcome__label">
						${this.outcome}
					</h2>
					<button
						class="${this.button} ${this.hidden}"
						@click="${this.dispatchReset}"
					>
						PLAY AGAIN
					</button>
				</div>
			`;
		}
	}
);
