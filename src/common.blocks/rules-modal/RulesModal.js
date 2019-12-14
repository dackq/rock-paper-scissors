import { html, css, LitElement } from "lit-element";
import colors from "../base/colors";

import rulesImage from "../../img/image-rules.svg";
import closeIcon from "../../img/icon-close.svg";

class RulesModal extends LitElement {
	static get properties() {
		return {
			modalVisibility: { type: String }
		};
	}

	constructor() {
		super();
		this.modalVisibility = " rules_hidden";
	}

	revealModal() {
		this.modalVisibility = "";
	}

	hideModal() {
		this.modalVisibility = " rules_hidden";
	}

	static get styles() {
		return css`
			.rules {
				position: absolute;
				color: ${colors.darkText};
				background-color: white;
				overflow: hidden;
				bottom: 0;
				left: 0;
				height: 100vh;
				width: 100%;
				transition: height 0.5s;
				text-align: center;
			}
			.rules__content {
				height: 85vh;
			}
			.rules_hidden {
				height: 0;
			}
			.button {
				display: block;
				padding: 0.5rem 2.2rem;
				margin: auto;
				background-color: transparent;
				cursor: pointer;
			}
			.button_rules {
				color: white;
				border: 1px solid white;
				border-radius: 8px;
				font-size: 1rem;
				font-weight: 200;
				letter-spacing: 1.5px;
			}
			.button:focus {
				outline: none;
			}
			.button_close {
				border: none;
			}
		`;
	}

	render() {
		return html`
			<div class="rules${this.modalVisibility}">
				<div class="rules__content">
					<h2>RULES</h2>
					<img
						src="${rulesImage}"
						alt="Rock beats scissors. Scissors beats paper. Paper beats rock."
					/>
				</div>
				<button class="button button_close" @click="${this.hideModal}">
					<img src="${closeIcon}" />
				</button>
			</div>
			<button class="button button_rules" @click="${this.revealModal}">
				RULES
			</button>
		`;
	}
}

customElements.define("rules-modal", RulesModal);
