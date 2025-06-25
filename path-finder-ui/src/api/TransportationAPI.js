export const fetchTransportationTypes = () => {

    return fetch('http://localhost:8080/transportation/transportation-type', {
        method: 'GET',
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };

  export const searchRecords = (searchRequestBody) => {

    return fetch('http://localhost:8080/transportation/search', {
        method: 'POST',
        body: JSON.stringify(searchRequestBody),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };

  export const addRecord = (transportation) => {

    return fetch('http://localhost:8080/transportation/save', {
        method: 'POST',
        body: JSON.stringify(transportation),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };
  
  export const updateRecord = (transportation) => {
    return addRecord(transportation);
  };
  
  export const deleteRecord = (id) => {

    return fetch('http://localhost:8080/transportation/delete', {
        method: 'POST',
        body: JSON.stringify({"id": id}),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then((response) => response.json());
  };
  