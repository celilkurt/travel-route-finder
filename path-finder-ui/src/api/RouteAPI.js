export const searchRoutes = (searchRequestBody) => {

  return fetch('http://localhost:8080/route/search', {
      method: 'POST',
      body: JSON.stringify(searchRequestBody),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      }
      })
      .then((response) => response.json());
};

