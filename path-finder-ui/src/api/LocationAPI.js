export const searchLocations = (searchRequestBody) => {

    return fetch('http://localhost:8080/location/search', {
        method: 'POST',
        body: JSON.stringify(searchRequestBody),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };

  export const saveLocation = (location) => {

    return fetch('http://localhost:8080/location/save', {
        method: 'POST',
        body: JSON.stringify(location),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };
  
  export const updateLocation = (location) => {
    return saveLocation(location);
  };
  
  export const deleteLocation = (id) => {

    return fetch('http://localhost:8080/location/delete', {
        method: 'POST',
        body: JSON.stringify({"id": id}),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };
  