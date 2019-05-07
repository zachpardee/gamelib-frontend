document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.attachEventListeners();
    app.adapter.fetchGames().then(app.createGames);
  });