export const Api = {
  CALL(url, method, body = {}) {
    const data = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    return fetch(url, data).then(response => {
      return response.json();
    });
  },

  GET(url) {
    return this.call(url, 'get');
  },

  POST(url, body = {}) {
    console.log(`url: ${url} || body: ${JSON.stringify(body)}`);
    return this.call(url, 'post', body);
  },

  DELETE(url) {
    return this.call(url, 'delete');
  },
};
