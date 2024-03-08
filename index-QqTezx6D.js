(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const y=10,m=10,l=5,a=24,u=15,i=8,b="images/tileset.png",g={"click-1":new Audio("sounds/click-1.mp3"),"click-2":new Audio("sounds/click-2.mp3"),"click-3":new Audio("sounds/click-3.mp3")},x=n=>{g[n].currentTime=0,g[n].play()},d=3;class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.selected={x:0,y:0}}static get styles(){return`
      .container {
        border: 2px solid #fff;
        display: grid;
        grid-template-columns: repeat(${a}, ${i*d}px);
        grid-template-rows: repeat(${u}, ${i*d}px);
        background: url(${b});
        background-size: cover;
        image-rendering: pixelated;
      }

      .cell.selected {
        border: 1px solid #fff;
        background: #0008;
      }
    `}connectedCallback(){this.render(),this.createTiles()}createTiles(){const t=this.shadowRoot.querySelector(".container");for(let c=0;c<u;c++)for(let s=0;s<a;s++)t.insertAdjacentHTML("beforeend",'<div class="cell"></div>');t.querySelector(".cell").classList.add("selected"),t.addEventListener("click",c=>{const s=c.target;if(s.classList.contains("cell")){x("click-3"),this.resetSelectedCells(),s.classList.add("selected");const r=~~((s.offsetLeft-t.offsetLeft)/(i*d)),o=~~((s.offsetTop-t.offsetTop)/(i*d));this.selected={x:r,y:o}}})}resetSelectedCells(){this.shadowRoot.querySelector(".container .cell.selected").classList.remove("selected")}render(){this.shadowRoot.innerHTML=`
    <style>${p.styles}</style>
    <div class="container">
    </div>`}}customElements.define("tile-set",p);const L=(n=5)=>~~(Math.random()*n);class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      .container {
        width: 100%;
        height: 100%;
        background: #000;
        image-rendering: pixelated;
        background: url(${b});
        background-size: ${a*i*l}px ${u*i*l}px;
        background-position: var(--x) var(--y);
      }
    `}setTile(t,c){this.setAttribute("x",t),this.setAttribute("y",c),this.x=t,this.y=c,this.renderCell()}renderCell(){this.style.setProperty("--x",`${-1*this.x*i*l}px`),this.style.setProperty("--y",`${-1*this.y*i*l}px`)}connectedCallback(){this.x=Number(this.getAttribute("x")??L(a)),this.y=Number(this.getAttribute("y")??L(u)),this.render(),this.renderCell()}render(){this.shadowRoot.innerHTML=`
    <style>${h.styles}</style>
    <div class="container">
    </div>`}}customElements.define("base-cell",h);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      .container {
        display: grid;
        grid-template-columns: repeat(${y}, ${i*l}px);
        grid-template-rows: repeat(${m}, ${i*l}px);
      }
    `}connectedCallback(){this.render(),this.createInitialMap(),this.tileset=document.querySelector("tile-set")}createInitialMap(){const t=this.shadowRoot.querySelector(".container");for(let c=0;c<m;c++)for(let s=0;s<y;s++)t.insertAdjacentHTML("beforeend","<base-cell></base-cell>");t.addEventListener("click",c=>{const s=c.target;if(s.nodeName==="BASE-CELL"){x("click-1");const{x:r,y:o}=this.tileset.selected;s.setTile(r,o)}})}render(){this.shadowRoot.innerHTML=`
    <style>${f.styles}</style>
    <div class="container">
    </div>`}}customElements.define("tile-map",f);
