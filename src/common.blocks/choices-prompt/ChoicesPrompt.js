import { html, css, LitElement } from "lit-element";
import scissors from "../../img/icon-scissors.svg";
import paper from "../../img/icon-paper.svg";
import rock from "../../img/icon-rock.svg";

// height of an equilateral triangle sqrt(3)/2 * side length
const equilateralTriangleHeight = 100 * (Math.sqrt(3) / 2);

customElements.define(
	"choices-prompt",
	class ChoicesPrompt extends LitElement {
		static get properties() {
			return {
				choicePromptHeight: { type: String },
				playerChoice: { type: String },
				houseChoice: { type: String },
				houseChoiceRender: { type: String },
				choices: { type: Object },
				images: { type: Object },
				triangleRevealState: { type: String },
				houseChoiceBlockRevealState: { type: String },
				houseChoiceRevealState: { type: String },
				disableClick: { type: Boolean }
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
			this.images = {
				paper,
				rock,
				scissors
			};
			this.choicePromptHeight = "choice-prompt_eq-triangle";
			this.triangleRevealState = "";
			this.houseChoiceBlockRevealState = "hidden";
			this.houseChoiceRevealState = "hidden";
			this.gameOutcome = "";
		}

		handleChoice(event) {
			if (!this.disableClick) {
				this.disableClick = true;
				this.registerPlayerChoice(event);
				this.registerHouseChoice();
				this.closeChoices();
				this.choicePromptHeight = "choice-prompt_smaller-height";
				this.revealHouseChoiceBlock();
				setTimeout(() => {
					this.revealHouseChoice();
					setTimeout(() => {
						this.gameOutcome = this.judgeWinner();
					}, 500);
				}, 700);
			}
		}

		registerPlayerChoice(event) {
			this.playerChoice = event.target.dataset.shape;
		}

		registerHouseChoice() {
			const choices = ["rock", "paper", "scissors"];
			const randomNumberOneToThree = Math.floor(Math.random() * 3);
			const choice = choices[randomNumberOneToThree];
			this.houseChoice = choice;
			this.houseChoiceRender = html`
				<choice-button
					class="choice-button"
					data-shape="${choice}"
					picture="${this.images[choice]}"
				></choice-button>
			`;
		}

		closeChoices() {
			let newChoices = {};
			for (let choice in this.choices) {
				newChoices[choice] = {};
				newChoices[choice].state = "hidden";
				newChoices[choice].position = "center";
			}
			this.choices = newChoices;
			this.triangleRevealState = "hidden";
			this.choices[this.playerChoice].state = "focus";
		}

		revealHouseChoiceBlock() {
			this.houseChoiceBlockRevealState = "";
		}

		revealHouseChoice() {
			this.houseChoiceRevealState = "";
		}

		resetChoices() {
			let newChoices = {};
			for (let choice in this.choices) {
				newChoices[choice] = {};
				newChoices[choice].state = "";
				newChoices[choice].position = `${choice}`;
			}
			this.choicePromptHeight = "choice-prompt_eq-triangle";
			this.choices = newChoices;
			this.houseChoiceBlockRevealState = "hidden";
			this.houseChoiceRevealState = "hidden";
			this.dispatchOutcomeChangedEvent("");
			this.houseChoiceRender = "";
			setTimeout(() => {
				this.triangleRevealState = "";
				this.disableClick = false;
			}, 500);
		}

		judgeWinner() {
			const values = {
				paper: 0,
				scissors: 1,
				rock: 2
			};
			let increaseEvent = new CustomEvent("score-increased");

			const difference =
				values[this.playerChoice] - values[this.houseChoice];

			if (difference > 0 && difference !== 2) {
				this.dispatchEvent(increaseEvent);
				this.dispatchOutcomeChangedEvent("Player Won");
			} else if (difference === -2) {
				this.dispatchEvent(increaseEvent);
				this.dispatchOutcomeChangedEvent("Player Won");
			} else if (difference === 0) {
				this.dispatchOutcomeChangedEvent("Draw");
			} else {
				this.dispatchOutcomeChangedEvent("Player Lost");
			}
		}

		dispatchOutcomeChangedEvent(outcome) {
			let event = new CustomEvent("outcome-changed", {
				detail: {
					outcome
				}
			});
			this.dispatchEvent(event);
		}

		static get styles() {
			return css`
				.choice-prompt {
					position: relative;
					width: 100%;
					max-width: 20rem;
					margin: 6.25rem auto 0 auto;
					overflow: hidden;
				}
				.choice-prompt_eq-triangle::before {
					content: "";
					float: left;
					padding-top: ${equilateralTriangleHeight}%;
				}
				.choice-prompt_smaller-height {
					height: 13rem;
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
					transition: 0.3s;
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
					width: 8.125rem;
					height: 8.125rem;
					z-index: 0;
					border-radius: 50%;
					transition: 1s;
					position: absolute;
					top: 0;
					right: 0;
				}
				.house__inner-circle {
					width: 6.25rem;
					height: 6.25rem;
					z-index: 0;
					background-color: #16243e;
					border-radius: 50%;
					transition: 0.5s;
					position: absolute;
					top: 0.9375rem;
					right: 0.9375rem;
				}
				.label {
					color: white;
					transition: 1s;
					font-size: 1.1rem;
					position: absolute;
					top: 9rem;
				}
				.label_house {
					right: 0;
				}
				.label_player {
					left: 1.5rem;
				}
			`;
		}

		render() {
			return html`
				<div class="choice-prompt ${this.choicePromptHeight}">
					<choice-button
						class="choice-button ${this.choices.paper
							.position} ${this.choices.paper.state}"
						@click="${this.handleChoice}"
						data-shape="paper"
						picture="${paper}"
					></choice-button>
					<p
						class="label label_player ${this
							.houseChoiceBlockRevealState}"
					>
						YOU PICKED
					</p>
					<div
						class="choice-button__connection choice-button__connection_top ${this
							.triangleRevealState}"
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
							.triangleRevealState}"
					></div>
					<choice-button
						class="choice-button ${this.choices.rock
							.position} ${this.choices.rock.state}"
						@click="${this.handleChoice}"
						data-shape="rock"
						picture="${rock}"
					></choice-button>
					<div class="house ${this.houseChoiceBlockRevealState}">
						<div class="house__inner-circle"></div>
						<div
							class=" choice-button ${this
								.houseChoiceRevealState}"
						>
							${this.houseChoiceRender}
						</div>
					</div>
					<p
						class="label label_house ${this
							.houseChoiceBlockRevealState}"
					>
						THE HOUSE PICKED
					</p>
					<div
						class="choice-button__connection choice-button__connection_right ${this
							.triangleRevealState}"
					></div>
				</div>
				<button @click="${this.resetChoices}">Reset</button>
			`;
		}
	}
);
