import { html, css, LitElement } from "lit-element";

customElements.define(
	"outcome-display",
	class OutputDisplay extends LitElement {
		static get properties() {
			return {
				outcome: { type: String },
				hidden: { type: String }
			};
		}

		constructor() {
			super();
			this.hidden = "hidden";
		}

		attributeChangedCallback(name, oldVal, newVal) {
			if (name === "outcome") {
				if (newVal !== "") {
					this.hidden = "";
				} else {
					this.hidden = "hidden";
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
					height: 6rem;
				}
				.outcome__label {
					text-align: center;
					color: white;
				}
				.hidden {
					opacity: 0;
				}
			`;
		}
		render() {
			return html`
				<div class="outcome">
					<h2 class="outcome__label">
						${this.outcome}
					</h2>
					<button
						class="${this.hidden}"
						@click="${this.dispatchReset}"
					>
						Reset
					</button>
				</div>
			`;
		}
	}
);
