<template>
  <div class="about">
    <h1>Lucy's Kitchen</h1>
    <img class="kitchenimage" src="/kitchen.jpg">
    <h2>About Us</h2>
    <p>Lucy's Kitchen is dedicated to providing our customers with delicious recipes that are
    tried and tested by our in-house staff! If you find a recipe that you like, contact us at
    (111)-111-1111 or e-mail us at lucyskitchen@email.com, and we will send you the ingredients
    you need at a discounted price.</p>
    <h2>Meet Our Staff</h2>
    <div class="home">
      <section class="image-gallery">
        <div class="image" v-for="staff in staffs" :key="staff.id">
          <h2>{{staff.staffName}}</h2>
          <p>{{staff.about}}</p>
          <img :src="staff.path" />
          <p>Favorite Recipe: {{staff.favoriteRecipe}}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     staffs: [],
    }
  },
  created() {
    this.getStaffs();
  },
  methods: {
    async getStaffs() {
      try {
        let response = await axios.get("/api/staffs");
        this.staffs = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

html {
  box-sizing: border-box;
  background-color: #f8faf5;
}

.kitchenimage {
  width: 30%;
  height: 400px;
}

h1 {
font-size: 220%;
}

h2 {
font-size: 160%;
}

p {
font-size: 110%;
font-family: Helvetica;
width: 60%;
margin: auto;
line-height: 1.4em;
margin-bottom: 3.5%;
}

.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
