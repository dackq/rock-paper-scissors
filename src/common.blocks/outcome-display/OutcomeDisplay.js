import { html, css, LitElement } from "lit-element";

customElements.define(
	"outcome-display",
	class OutputDisplay extends LitElement {
		static get properties() {
			return {
				outcome: { type: String }
			};
		}
		static get styles() {
			return css`
				.outcome {
					text-align: center;
					color: white;
				}
			`;
		}
		render() {
			return html`
				<div>
					<h2 class="outcome">
						${this.outcome}
					</h2>
				</div>
			`;
		}
	}
);
