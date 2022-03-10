import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/';

const getData = async (userId, method = 'get') => {
  let baseUrl = '';
  if (userId) baseUrl = `${url}posts/${userId}`;
  else baseUrl = `${url}users`;

  return await axios[method](baseUrl)
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getUsers = async () => {
  /* return await axios.get(`${url}users`)
    .then(res => res.data)
    .catch(err => console.log(err)); */
  return await getData();
}

const getUserPosts = async (userId) => {
  /* return await axios.get(`${url}posts/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err)); */
  return await getData(userId);
}

/* const users = await getUsers();

users.forEach(async (user) => {
  const post = await getUserPosts(user.id);
  console.log(`${user.name} posted ${post.title}`);
}); */