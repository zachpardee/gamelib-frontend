class Adapter {
    constructor() {
      this.baseUrl = 'http://localhost:3000/api/v1/';
      this.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }
   
    fetchGames() {
      return this.get(`${this.baseUrl}/games`);
    }
   
    updateGame(id, body) {
      return this.patch(`${this.baseUrl}/games/${id}`, body);
    }
    
    createGame(body) {
      return this.post(`${this.baseUrl}games`, body);
    }
   
    get(url) {
      return fetch(url).then(res => res.json());
    }

    post(url, body) {
      return fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body),
      })
      .then(res => res.json());
    }
   
    patch(url, body) {
      return fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(body),
      }).then(res => res.json());
    }
  }