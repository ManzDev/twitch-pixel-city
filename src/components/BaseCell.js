import { PIXEL_SIZE, SCALE, TILESET_COLUMNS, TILESET_ROWS, TILESET_URL } from "@/modules/Constants.js";
import { getRandom } from "@/modules/Utils.js";

class BaseCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        width: 100%;
        height: 100%;
        background: #000;
        image-rendering: pixelated;
        background: url(${TILESET_URL});
        background-size: ${TILESET_COLUMNS * PIXEL_SIZE * SCALE}px ${TILESET_ROWS * PIXEL_SIZE * SCALE}px;
        background-position: var(--x) var(--y);
      }
    `;
  }

  setTile(x, y) {
    this.setAttribute("x", x);
    this.setAttribute("y", y);
    this.x = x;
    this.y = y;
    this.renderCell();
  }

  renderCell() {
    this.style.setProperty("--x", `${-1 * this.x * PIXEL_SIZE * SCALE}px`);
    this.style.setProperty("--y", `${-1 * this.y * PIXEL_SIZE * SCALE}px`);
  }

  connectedCallback() {
    this.x = Number(this.getAttribute("x") ?? getRandom(TILESET_COLUMNS));
    this.y = Number(this.getAttribute("y") ?? getRandom(TILESET_ROWS));
    this.render();
    this.renderCell();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BaseCell.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("base-cell", BaseCell);
