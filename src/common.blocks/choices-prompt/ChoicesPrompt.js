import { html, css, LitElement } from "lit-element";
import scissors from "../../img/icon-scissors.svg";
import paper from "../../img/icon-paper.svg";
import rock from "../../img/icon-rock.svg";

// height = height of an equilateral triangle sqrt(3)/2 * side length
const elementHeight = 100 * (Math.sqrt(3) / 2);

customElements.define(
	"choices-prompt",
	class ChoicesPrompt extends LitElement {
		static get properties() {
			return {
				playerChoice: { type: String },
				choices: { type: Object },
				triangleState: { type: String }
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
			this.triangleState = "";
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
			this.triangleState = "hidden";
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
			this.triangleState = "";
		}

		static get styles() {
			return css`
				.choice-prompt {
					position: relative;
					width: 100%;
					max-width: 30rem;
					margin: 6.25rem auto 8.75rem auto;
					overflow: hidden;
				}
				.choice-prompt::before {
					content: "";
					float: left;
					padding-top: ${elementHeight}%;
				}
				.choice-button {
					transition: 0.5s;
					display: inline-block;
					z-index: 5;
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
					top: 0;
					left: 0;
				}
				.focus {
					z-index: 10;
				}
				.hidden {
					opacity: 0;
					visibility: hidden;
				}
				.choice-button__connection {
					height: 0.9375rem;
					width: 100%;
					background-color: #16243e;
				}
				.choice-button__connection_top {
					position: absolute;
					top: 3.75rem;
				}
				.choice-button__connection_left {
					transform: rotate(60deg);
					width: 56.5%;
					position: absolute;
					top: 43.5%;
				}
				.choice-button__connection_right {
					transform: rotate(-60deg);
					width: 56.5%;
					position: absolute;
					top: 43.5%;
					right: 0;
				}
				.house {
					width: 6.25rem;
					height: 6.25rem;
					z-index: 0;
					background-color: #16243e;
					border-radius: 50%;
				}
				.house_position {
					position: absolute;
					top: 0.9375rem;
					right: 0.9375rem;
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
					<div
						class="choice-button__connection choice-button__connection_top ${this
							.triangleState}"
					></div>
					<choice-button
						class="choice-button ${this.choices.scissors
							.position} ${this.choices.scissors.state}"
						@click="${this.handleChoice}"
						data-shape="scissors"
						picture="${scissors}"
					></choice-button>
					<div
						class="choice-button__connection choice-button__connection_left ${this
							.triangleState}"
					></div>
					<choice-button
						class="choice-button ${this.choices.rock
							.position} ${this.choices.rock.state}"
						@click="${this.handleChoice}"
						data-shape="rock"
						picture="${rock}"
					></choice-button>
					<div class="house house_position"></div>
					<div
						class="choice-button__connection choice-button__connection_right ${this
							.triangleState}"
					></div>
				</div>
			`;
		}
	}
);
