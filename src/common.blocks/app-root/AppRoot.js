import { html, css, LitElement } from "lit-element";

customElements.define(
	"app-root",
	class AppRoot extends LitElement {
		static get properties() {
			return {
				score: { type: Number }
			};
		}

		constructor() {
			super();
			this.score = 0;
		}

		resetScore() {
			this.score = 0;
		}

		changeScore() {
			this.score += 1;
		}

		static get styles() {
			return css`
				* {
					box-sizing: border-box;
				}
				.app-root {
					max-width: 43.75rem;
					margin: 0 auto;
					padding: 1.9rem;
					height: 100vh;
				}
			`;
		}

		render() {
			return html`
				<div class="app-root">
					<title-box score="${this.score}"></title-box>
					<button @click="${this.resetScore}">
						Reset Score
					</button>
					<button @click="${this.changeScore}">
						Increase Score
					</button>
					<choices-prompt></choices-prompt>
					<rules-modal></rules-modal>
				</div>
			`;
		}
	}
);
