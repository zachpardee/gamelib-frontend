class Game {
    constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.content = data.content;
      Game.all.push(this);
    }
   
    renderListItem() {
      return `
      <li class="card col-md-3 mt-4 mr-2 border border-dark rounded">
      <img class="card-img-top border border-dark rounded mt-2" src="https://i.ytimg.com/vi/GWNxfarEo3o/maxresdefault.jpg" alt="Card image cap">
        <h3>${this.title}</h3>
        <p>${this.content}</p>
        <p>Rating: </p>
        <p>Downloads: </p>
        <button data-id=${this.id} class="mb-2">edit</button>
      </li>`;
    }

    static findById(id) {
        return this.all.find(game => game.id === id);
    }

    renderUpdateForm() {
        return `
        <div class="card col-md-3 mt-4 mr-2 mb-5 border border-dark rounded">
        <form data-id=${this.id}>
          <label>Title</label>
          <p>
            <input type="text" value="${this.title}" />
          </p>
          <label>Content</label>
          <p>
            <textarea>${this.content}</textarea>
          </p>
          <button type='submit'>Save Game</button>
        </form>
        </div>
      `;
      }

    update({ title, content }) {
    this.title = title;
    this.content = content;
    }

  }
   
  Game.all = [];