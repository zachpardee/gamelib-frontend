class Game {
    constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.content = data.content;
      this.image_url = data.image_url;
      this.rating = data.rating;
      this.downloads = data.downloads;
      Game.all.push(this);
    }
   
    renderListItem() {
      return `
      <li class="card col-md-3 m-4 border border-dark rounded" id="${this.id}">
      <img class="card-img-top border border-dark rounded mt-2" src="${this.image_url}" alt="Card image cap">
      <h3 class="text-center">${this.title}</h3>
        <p>${this.content}</p>
        <p>Rating: ${this.rating}</p>
        <p>Downloads: ${this.downloads}</p>
        <button type="button" class="btn btn-info mt-auto mb-2" data-toggle="button" aria-pressed="false" autocomplete="off">Favorite</button>
        <button id="edit-button" data-id=${this.id} class="mt-auto mb-2">edit</button>
        <button id="delete-button" data-id=${this.id} class="mt-auto mb-2">delete</button>
      </li>`;
    }

    static findById(id) {
        return this.all.find(game => game.id === id);
    }

    renderUpdateForm() {
        return `
        <div id="update-card"class="card col-md-3 border border-dark rounded">
        <form data-id=${this.id}>
          <h2>Edit Game</h2>
          <label>Title</label>
          <p>
            <input type="text" value="${this.title}" />
          </p>
          <label>Content</label>
          <p>
            <textarea>${this.content}</textarea>
          </p>
          <label>Image URL</label>
          <p>
            <textarea>${this.image_url}</textarea>
          </p>
          <label>Rating</label>
          <p>
            <textarea>${this.rating}</textarea>
          </p>
          <label>Downloads</label>
          <p>
            <textarea>${this.downloads}</textarea>
          </p>
          <button type='submit' class="mb-2">Save Game</button>
        </form>
        </div>
      `;
      }

      static renderCreateForm() {
        return `
        <div id="new-form" class="card col-md-3 border border-dark rounded">
        <form id="create-form-id">

          <h2>New Game</h2>
          <label>Title</label>
          <p>
            <input id="title-text" type="text" value="" />
          </p>
          <label>Content</label>
          <p>
            <textarea id="content-text"></textarea>
          </p>
          <label>Rating</label>
          <p>
            <textarea id="rating-text"></textarea>
          </p>
          <label>Image URL</label>
          <p>
            <textarea id="image-url"></textarea>
          </p>
          <label>Downloads</label>
          <p>
            <textarea id="downloads-text"></textarea>
          </p>
          <button type='submit' class="mb-2">Save New Game</button>
        </form>
        </div>
      `;
      }

    update({ title, content, image_url, rating, downloads }) {
    this.title = title;
    this.content = content;
    this.image_url = image_url;
    this.rating = rating;
    this.downloads = downloads;
    }
  }

   
  Game.all = [];