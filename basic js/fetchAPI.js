
const requrst = async (url, config) => {
    const res = await fetch(url, config);
    if(!res.ok){
        const msg = `Error: ${res.status}`;
        throw new Error(msg);
    }
    const data = await res.json();
    return data;
};

const getData = () => {
    requrst ("https://jsonplaceholder.typicode.com/users")
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
};

const addData = () => {
    requrst ("https://jsonplaceholder.typicode.com/users", {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
};

const updateData = () => {
    requrst ("https://jsonplaceholder.typicode.com/users/1", {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'fooller',
          body: 'barller',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
};
const deleteData = () => {
    requrst ("https://jsonplaceholder.typicode.com/users/2", {
        method: 'DELETE',
      })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
};

getData()
addData()
updateData()
deleteData()
