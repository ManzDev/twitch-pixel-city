import { COLUMNS, ROWS, PIXEL_SIZE, SCALE } from "@/modules/Constants.js";
import { playSound } from "@/modules/Sounds.js";
import "@/components/BaseCell.js";

class TileMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        display: grid;
        grid-template-columns: repeat(${COLUMNS}, ${PIXEL_SIZE * SCALE}px);
        grid-template-rows: repeat(${ROWS}, ${PIXEL_SIZE * SCALE}px);
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.createInitialMap();
    this.tileset = document.querySelector("tile-set");
  }

  createInitialMap() {
    const container = this.shadowRoot.querySelector(".container");
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLUMNS; x++) {
        const cell = /* html */"<base-cell></base-cell>";
        container.insertAdjacentHTML("beforeend", cell);
      }
    }

    container.addEventListener("click", (ev) => {
      const cell = ev.target;
      const isCell = cell.nodeName === "BASE-CELL";

      if (isCell) {
        playSound("click-1");
        const { x, y } = this.tileset.selected;
        cell.setTile(x, y);
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TileMap.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("tile-map", TileMap);
