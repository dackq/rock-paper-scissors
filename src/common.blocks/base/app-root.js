import { html, css, LitElement } from "lit-element";

customElements.define(
	"app-root",
	class AppRoot extends LitElement {
		static get properties() {
			return {};
		}

		constructor() {
			super();
		}

		render() {
			return html`
				<p class="red">Hello Worlds</p>
			`;
		}
	}
);
