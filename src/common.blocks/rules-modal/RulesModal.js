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
				height: 100%;
				width: 100%;
				transition: opacity, height 0.5s, 0.5s;
				text-align: center;
				z-index: 20;
			}
			.rules__content {
				height: 85%;
			}
			.rules_hidden {
				height: 0;
				opacity: 0;
			}
			.button {
				display: block;
				padding: 0.65rem 2.2rem;
				margin: 0.5rem auto;
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
			.image {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			@media screen and (min-width: 1024px) {
				.button_rules {
					position: absolute;
					bottom: 1rem;
					right: 1rem;
				}
				.button_close {
					position: absolute;
					top: 0.5rem;
					right: 0;
				}
				.rules {
					width: 25rem;
					height: 25rem;
					position: absolute;
					text-align: left;
					bottom: 50%;
					left: 50%;
					transform: translate(-50%, 50%);
					border-radius: 5px;
				}
				.rules_title {
					margin: 1rem 2.5rem;
					font-size: 2rem;
				}
				.rules_hidden {
					opacity: 0;
					visibility: hidden;
				}
				.image {
					top: 60%;
				}
			}
		`;
	}

	render() {
		return html`
			<div class="rules${this.modalVisibility}">
				<div class="rules__content">
					<h2 class="rules_title">RULES</h2>
					<img
						class="image"
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
