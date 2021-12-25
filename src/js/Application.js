import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

let _loading = document.querySelector("progress");
const box = document.querySelector(".box");
// const progresBar =
const div = document.querySelector(".main");

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name: "Placeholder",
      terrain: "placeholder",
      population: 0,
    });

    document.body.querySelector(".main").appendChild(box);

    this.emit(Application.events.READY);
  }

  async _load() {
    try {
      this._startLoading();

      const res = await fetch("https://swapi.boom.dev/api/planets");
      const data = await res.json();

      this._stopLoading();

      this._create(data);
      console.log(data);
      return data;
    } catch (err) {
      this._stopLoading();
      console.log(err);
    }
  }
  _create(data) {
    data.results.forEach((element) => {
      console.log(element.name);
    });
  }
  _startLoading() {
    div.appendChild(_loading);
  }
  _stopLoading() {
    div.removeChild(_loading);
  }

  _render({ name, terrain, population, image }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}

// const planet = new Application();
