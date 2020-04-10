<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">About Us</router-link> |
      <router-link to="/recipes">Our Recipes</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view/>
    <hr>
    <p><a href="https://github.com/Cully333/creative4">GitHub</a></p>
  </div>
</template>

<style>
body {
  background-color: #fefff2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-decoration: none;
}

#nav a {
  font-weight: bold;
  color: darkgreen;
  text-decoration: none;
}

</style>
