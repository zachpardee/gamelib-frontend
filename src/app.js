class App {
    constructor() {
      this.adapter = new Adapter();
      
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
      this.handleEditClick = this.handleEditClick.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleNewFormSubmit = this.handleNewFormSubmit.bind(this);
      this.createGames = this.createGames.bind(this);
      this.addGames = this.addGames.bind(this);
    }
   
    attachEventListeners() {
      document.querySelector('#games-list').addEventListener('click', this.handleEditClick);
      document.querySelector('#update').addEventListener('submit', this.handleFormSubmit);
      document.querySelector('#new-game-button').addEventListener('click', this.handleNewGameClick);
      document.querySelector('#new').addEventListener('submit', this.handleNewFormSubmit);
      document.querySelector('#search-input').addEventListener("input", this.handleSearchSubmit);
    }

    createGames(games) {
      games.forEach(game => {
        new Game(game);
      });
      this.addGames();
    }
   
    addGames() {
        document.querySelector('#games-list').innerHTML = '';
        Game.all.forEach(
          game => (document.querySelector('#games-list').innerHTML += game.renderListItem())
        );
    }

    handleSearchSubmit(e){
      e.preventDefault();
      console.log("igotclicked")
      let searchInput = document.querySelector("#search-input");
      document.querySelector('#games-list').innerHTML = '';
       let filteredList = Game.all.filter(function(g){return g.title.includes(searchInput.value)});
       console.log(filteredList);
       filteredList.forEach(
        game => (document.querySelector('#games-list').innerHTML += game.renderListItem())
      );
    }
   
    handleFormSubmit(e) {
      e.preventDefault();
      const id = parseInt(e.target.dataset.id);
      const game = Game.findById(id);
      const title = e.target.querySelector('input').value;
      const content = e.target.querySelector('textarea').value;
      console.log(this);
   
      const bodyJSON = { title, content };
      this.adapter.updateGame(game.id, bodyJSON).then(updatedGame => {
        const game = Game.findById(updatedGame.id);
        game.update(updatedGame);
        this.addGames();
      });
      document.querySelector("#update-card").remove();

    }

    handleNewFormSubmit(e) {
      e.preventDefault();
      const title = e.target.querySelector('input').value;
      const content = e.target.querySelector('#content-text').value;
      const image = e.target.querySelector('#image-url').value;
      const rating = e.target.querySelector('#rating-text').value;
      const downloads = e.target.querySelector('#downloads-text').value;
   
      const bodyJSON = { title: title, content: content, image_url: image, rating: rating, downloads: downloads };
      this.adapter.createGame(bodyJSON).then(createdGame => {
        //Create new card here
      });
      document.querySelector("#new-form").remove();

      let gameList = document.querySelector("#games-list");

      gameList.innerHTML +=  `
      <li class="card col-md-3 m-4 border border-dark rounded">
      <img class="card-img-top border border-dark rounded mt-2" src="${image}" alt="Card image cap">
      <h3 class="text-center">${title}</h3>
        <p>${content}</p>
        <p>Rating: ${rating}</p>
        <p>Downloads: ${downloads}</p>
        <button type="button" class="btn btn-info mt-auto mb-2" data-toggle="button" aria-pressed="false" autocomplete="off">Favorite</button>
        <button id="edit-button" class="mt-auto mb-2">edit</button>
        <button id="delete-button" class="mt-auto mb-2">delete</button>
      </li>`;

    }
   
    handleEditClick(e) {
      if (e.target.id == "edit-button"){
      const id = parseInt(e.target.dataset.id);
      const game = Game.findById(id);
      document.querySelector('#update').innerHTML = game.renderUpdateForm();
    }
    else if(e.target.id == "delete-button"){
      const id = parseInt(e.target.dataset.id);
      let listItem = document.getElementById(`${e.target.parentNode.id}`);
      listItem.remove();
      fetch(`http://localhost:3000/api/v1/games/${id}`,{
        method: "DELETE"
      })
    }

    }

    handleNewGameClick(e){
      document.querySelector('#new').innerHTML = Game.renderCreateForm();
    }
  }