class App {
    constructor() {
      this.adapter = new Adapter();
   
      this.handleEditClick = this.handleEditClick.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.createGames = this.createGames.bind(this);
      this.addGames = this.addGames.bind(this);
    }
   
    attachEventListeners() {
      document.querySelector('#games-list').addEventListener('click', this.handleEditClick);
      document.querySelector('#update').addEventListener('submit', this.handleFormSubmit);
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
   
    handleFormSubmit(e) {
      e.preventDefault();
      const id = parseInt(e.target.dataset.id);
      const game = Game.findById(id);
      const title = e.target.querySelector('input').value;
      const content = e.target.querySelector('textarea').value;
   
      const bodyJSON = { title, content };
      this.adapter.updateGame(game.id, bodyJSON).then(updatedGame => {
        const game = Game.findById(updatedGame.id);
        game.update(updatedGame);
        this.addGames();
      });

    }
   
    handleEditClick(e) {
      const id = parseInt(e.target.dataset.id);
      const game = Game.findById(id);
      document.querySelector('#update').innerHTML = game.renderUpdateForm();
    }
  }