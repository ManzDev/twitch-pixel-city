import { TILESET_COLUMNS, TILESET_ROWS, PIXEL_SIZE, TILESET_URL } from "@/modules/Constants.js";
import { playSound } from "@/modules/Sounds.js";

const SCALE = 3;

class TileSet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.selected = {
      x: 0,
      y: 0
    };
  }

  static get styles() {
    return /* css */`
      .container {
        border: 2px solid #fff;
        display: grid;
        grid-template-columns: repeat(${TILESET_COLUMNS}, ${PIXEL_SIZE * SCALE}px);
        grid-template-rows: repeat(${TILESET_ROWS}, ${PIXEL_SIZE * SCALE}px);
        background: url(${TILESET_URL});
        background-size: cover;
        image-rendering: pixelated;
      }

      .cell.selected {
        border: 1px solid #fff;
        background: #0008;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.createTiles();
  }

  createTiles() {
    const container = this.shadowRoot.querySelector(".container");
    for (let y = 0; y < TILESET_ROWS; y++) {
      for (let x = 0; x < TILESET_COLUMNS; x++) {
        const cell = /* html */"<div class=\"cell\"></div>";
        container.insertAdjacentHTML("beforeend", cell);
      }
    }
    container.querySelector(".cell").classList.add("selected");
    container.addEventListener("click", (ev) => {
      const cell = ev.target;
      const isCell = cell.classList.contains("cell");

      if (isCell) {
        playSound("click-3");
        this.resetSelectedCells();
        cell.classList.add("selected");
        const x = ~~((cell.offsetLeft - container.offsetLeft) / (PIXEL_SIZE * SCALE));
        const y = ~~((cell.offsetTop - container.offsetTop) / (PIXEL_SIZE * SCALE));
        this.selected = { x, y };
      }
    });
  }

  resetSelectedCells() {
    const selected = this.shadowRoot.querySelector(".container .cell.selected");
    selected.classList.remove("selected");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TileSet.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("tile-set", TileSet);
