import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

const div = document.querySelector(".main");
const _loading = document.querySelector(".progress");


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
    const _loading = document.querySelector(".progress");
    try {
      this._startLoading();
      _loading.style.display = 'block';


      const res = await fetch("https://swapi.boom.dev/api/planets");
      const data = await res.json();
      const res1 = await fetch("https://swapi.boom.dev/api/planets?page=2");
      const data1 = await res1.json();
      const res2 = await fetch("https://swapi.boom.dev/api/planets?page=3");
      const data2 = await res2.json();
      const res3 = await fetch("https://swapi.boom.dev/api/planets?page=4");
      const data3 = await res3.json();
      const res4 = await fetch("https://swapi.boom.dev/api/planets?page=5");
      const data4 = await res4.json();
      const res5 = await fetch("https://swapi.boom.dev/api/planets?page=6");
      const data5 = await res5.json();
      
      this._stopLoading();
      _loading.style.display = 'none';

      this._create(data);
      console.log(data,data1,data2,data3,data4,data5);
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
