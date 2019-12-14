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
				paper: "",
				rock: "",
				scissors: ""
			};
		}

		handleChoice(e) {
			this.registerChoice(e.target.dataset.shape);
			this.choices = {
				paper: "hidden",
				scissors: "hidden",
				rock: "hidden"
			};
			this.choices[this.playerChoice] = "";
		}

		registerChoice(choice) {
			this.playerChoice = choice;
		}

		reset() {
			this.choices = {
				paper: "",
				scissors: "",
				rock: ""
			};
		}

		static get styles() {
			return css`
				.hidden {
					opacity: 0;
					height: 0;
					overflow: hidden;
					background-color: red;
				}
			`;
		}

		render() {
			return html`
				<div>
					<choice-button
						@click="${this.handleChoice}"
						data-shape="paper"
						state="${this.choices.paper}"
					>
						<img src="${paper}" alt="Paper" data-shape="paper" />
					</choice-button>
					<choice-button
						@click="${this.handleChoice}"
						data-shape="scissors"
						state="${this.choices.scissors}"
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
						state="${this.choices.rock}"
					>
						<img src="${rock}" alt="Rock" data-shape="rock" />
					</choice-button>
					<button @click="${this.reset}">Reset</button>
				</div>
			`;
		}
	}
);
