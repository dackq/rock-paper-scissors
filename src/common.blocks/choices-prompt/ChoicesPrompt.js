import { html, css, LitElement } from "lit-element";
import scissors from "../../img/icon-scissors.svg";
import paper from "../../img/icon-paper.svg";
import rock from "../../img/icon-rock.svg";

customElements.define(
	"choices-prompt",
	class ChoicesPrompt extends LitElement {
		static get properties() {
			return {
				playerChoice: { type: String },
				choices: { type: Object }
			};
		}

		constructor() {
			super();
			this.choices = {
				paper: {
					state: "",
					position: "paper"
				},
				rock: {
					state: "",
					position: "rock"
				},
				scissors: {
					state: "",
					position: "scissors"
				}
			};
		}

		handleChoice(e) {
			this.playerChoice = e.target.dataset.shape;
			let newChoices = {};
			for (let choice in this.choices) {
				newChoices[choice] = {};
				newChoices[choice].state = "hidden";
				newChoices[choice].position = "center";
			}
			this.choices = newChoices;
			this.choices[this.playerChoice].state = "focus";
		}

		resetChoices() {
			let newChoices = {};
			for (let choice in this.choices) {
				newChoices[choice] = {};
				newChoices[choice].state = "";
				newChoices[choice].position = `${choice}`;
			}
			this.choices = newChoices;
		}

		static get styles() {
			return css`
				.choice-prompt {
					position: relative;
					width: 100%;
					max-width: 20rem;
					margin: 6.25rem auto 8.75rem auto;
					overflow: hidden;
				}
				.choice-prompt::before {
					content: "";
					float: left;
					padding-top: 86.6025%;
				}
				.choice-button {
					transition: 0.5s;
					display: inline-block;
				}
				.paper {
					position: absolute;
					top: 0;
					left: 0;
				}
				.rock {
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translate(-50%, -100%);
				}
				.scissors {
					position: absolute;
					top: 0;
					left: 100%;
					transform: translateX(-100%);
				}
				.center {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				.focus {
					z-index: 10;
				}
				.hidden {
					opacity: 0;
					visibility: hidden;
				}
			`;
		}

		render() {
			return html`
				<div class="choice-prompt">
					<choice-button
						class="choice-button ${this.choices.paper
							.position} ${this.choices.paper.state}"
						@click="${this.handleChoice}"
						data-shape="paper"
						picture="${paper}"
					></choice-button>
					<choice-button
						class="choice-button ${this.choices.scissors
							.position} ${this.choices.scissors.state}"
						@click="${this.handleChoice}"
						data-shape="scissors"
						picture="${scissors}"
					></choice-button>
					<choice-button
						class="choice-button ${this.choices.rock
							.position} ${this.choices.rock.state}"
						@click="${this.handleChoice}"
						data-shape="rock"
						picture="${rock}"
					></choice-button>
				</div>
			`;
		}
	}
);
