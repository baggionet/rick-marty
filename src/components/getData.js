import { customElement, LitElement } from "lit-element";

export class getData extends LitElement{

    static get properties() {
        return {
            url: { typr: String},
            method: { type: String}
        }
    }

    firstUpdated(){
        this.getData();
    }

    _senData(data) {
        this.dispatchEvent(new CustomEvent('apiData', {
            detail: {data}, bubbles: true, composed: true, 
        }));
    }

    getData() {
        fetch(this.url, {metho: this.method})
        .then((response) => {
            if(response.ok) return response.json();
            return Promise.reject(response);
        })
        .then((data) =>{ this._senData(data);})
        .catch((error) => {console.warn('Algo salio mal', error);})
    }


}

customElements.define('get-data', getData);