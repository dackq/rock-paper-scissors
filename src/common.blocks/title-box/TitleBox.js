import { html, css, LitElement } from "lit-element";
import colors from "../base/colors";

customElements.define(
	"title-box",
	class TitleBox extends LitElement {
		static get properties() {
			return {
				score: { type: Number }
			};
		}

		constructor() {
			super();
		}

		static get styles() {
			return css`
				* {
					box-sizing: border-box;
				}
				.title-box {
					border: 3px solid;
					border-color: ${colors.headerOutline};
					border-radius: 8px;
					padding: 0.65rem;
				}

				.title {
					display: inline-block;
					color: white;
					width: 50px;
					margin: 0.75rem 0;
					margin-left: 0.65rem;
					font-size: 1.3rem;
					font-weight: 600;
					line-height: 1rem;
				}
				.score-box {
					float: right;
					background-color: white;
					text-align: center;
					height: 4.5rem;
					width: 5rem;
					padding: 0.7rem;
					border-radius: 8px;
				}
				.score-box__title {
					color: hsl(229, 64%, 46%);
					margin: 0;
					font-size: 0.6rem;
					font-weight: 600;
					letter-spacing: 1.5px;
				}
				.score-box__number {
					margin: 0;
					font-size: 2.35rem;
					font-weight: 600;
					color: ${colors.darkText};
				}
			`;
		}

		render() {
			return html`
				<div class="title-box">
					<h1 class="title">
						ROCK PAPER SCISSORS
					</h1>
					<div class="score-box">
						<p class="score-box__title">SCORE</p>
						<p class="score-box__number">${this.score}</p>
					</div>
				</div>
			`;
		}
	}
);
