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
				choices: { type: Object },
				activeStage: { type: String },
				choiceStage: { type: String }
			};
		}

		constructor() {
			super();
			this.choices = {
				paper,
				scissors,
				rock
			};
			this.choiceStage = html`
				<div>
					<choice-button
						@click="${this.handleChoice}"
						data-shape="paper"
					>
						<img src="${paper}" alt="Paper" data-shape="paper" />
					</choice-button>
					<choice-button
						@click="${this.handleChoice}"
						data-shape="scissors"
					>
						<img
							src="${scissors}"
							alt="Scissors"
							data-shape="scissors"
						/>
					</choice-button>
					<choice-button
						@click="${this.handleChoice}"
						data-shape="rock"
					>
						<img src="${rock}" alt="Rock" data-shape="rock" />
					</choice-button>
				</div>
			`;
			this.activeStage = this.choiceStage;
		}

		handleChoice(e) {
			this.registerChoice(e.target.dataset.shape);
			this.activeStage = html`
				<div>
					<choice-button>
						<img
							src="${this.choices[this.playerChoice]}"
							alt="${this.playerChoice}"
						/>
					</choice-button>
					<button @click="${this.reset}"></button>
				</div>
			`;
		}

		registerChoice(choice) {
			this.playerChoice = choice;
		}

		reset() {
			this.activeStage = this.choiceStage;
		}

		render() {
			return this.activeStage;
		}
	}
);
