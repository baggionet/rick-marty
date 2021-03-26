import { LitElement, html, css } from 'lit-element';
import './components/getData';
import style from './style/rickiMartyStyle'
import './components/apiTemplate';

export class RickiMarty extends LitElement {
  static get properties() {
    return {
      wiki: { type: Array },
    };
  }

  static get styles() {
    return [style];
  }
  constructor() {
    super();

    this.wiki = [];
    this.addEventListener('apiData', (e) => {
      this._dataFormat(e.detail.data);
    });
  }

  _dataFormat(data) {
    let characters = [];

    data["results"].forEach((character) => {
      characters.push({
        img: character.image,
        name: character.name,
        species: character.species,
        status: character.status
      })
    });
    
    this.wiki = characters
    console.log(characters);
  }
  
  render() {
    return html`
      <api-template></api-template>
      <get-data url='https://rickandmortyapi.com/api/character' method='GET'></get-data>
      <div class="container">
        ${this.dataTemplate}
      </div>
    `;
  }
  get dataTemplate() {
    return html `
      ${this.wiki.map(character => html`
        <div class="card">
          <div class="card-content">
            <h2>${character.name}</h2>
            <img src="${character.img}" >
            <p>${character.species} | ${character.status}</p>
          </div>
        </div>
      `)}
    `;
  }
}
