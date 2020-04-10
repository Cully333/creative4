<template>
<div class="admin">
  <h1>Admin Page</h1>
  <div class="heading">
    <h2>Add a Recipe</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="recipeName" placeholder="Name">
      <input v-model="description" placeholder="Description">
      <input v-model="ingredientList" placeholder="Ingredient List">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addRecipe">
      <h2>{{addRecipe.recipeName}}</h2>
      <p></p>
      <h2>{{addRecipe.description}}</h2>
      <p></p>
      <h2>{{addRecipe.ingredientList}}</h2>
      <p></p>
      <img :src="addRecipe.path" />
    </div>
  </div>
  <div class="heading">
    <h2>Edit/Delete a recipe</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findRecipeName" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.recipeName}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findRecipe">
      <input v-model="findRecipe.recipeName">
      <input v-model="findRecipe.description">
      <input v-model="findRecipe.ingredientList">
      <p></p>
      <img :src="findRecipe.path" />
    </div>
    <div class="actions" v-if="findRecipe">
      <button @click="deleteRecipe(findRecipe)">Delete</button>
      <button @click="editRecipe(findRecipe)">Edit</button>
    </div>
  </div>
  <div class="heading">
    <h2>Add a Staff Member</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="staffName" placeholder="Name">
      <input v-model="about" placeholder="About">
      <input v-model="favoriteRecipe" placeholder="Favorite Recipe">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="uploadStaff">Upload</button>
    </div>
    <div class="upload" v-if="addStaff">
      <h2>{{addStaff.staffName}}</h2>
      <p></p>
      <h2>{{addStaff.about}}</h2>
      <p></p>
      <h2>{{addStaff.favoriteRecipe}}</h2>
      <p></p>
      <img :src="addStaff.path" />
    </div>
  </div>
  <div class="heading">
    <h2>Edit/Delete a Staff Member</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findStaffName" placeholder="Search">
      <div class="suggestions" v-if="staffSuggestions.length > 0">
        <div class="suggestion" v-for="s in staffSuggestions" :key="s.id" @click="selectStaff(s)">{{s.staffName}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findStaff">
      <input v-model="findStaff.staffName">
      <input v-model="findStaff.about">
      <input v-model="findStaff.favoriteRecipe">
      <p></p>
      <img :src="findStaff.path" />
    </div>
    <div class="actions" v-if="findStaff">
      <button @click="deleteStaff(findStaff)">Delete</button>
      <button @click="editStaff(findStaff)">Edit</button>
    </div>
  </div>
</div>
</template>

<style scoped>

suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      recipeName: "",
      description: "",
      ingredientList: "",
      file: null,
      addRecipe: null,
      recipes: [],
      findRecipeName: "",
      findRecipe: null,
      staffName: "",
      about: "",
      favoriteRecipe: "",
      addStaff: null,
      staffs: [],
      findStaffName: "",
      findStaff: null,
    }
  },
  computed: {
    suggestions() {
      let recipes = this.recipes.filter(recipe => recipe.recipeName.toLowerCase().startsWith(this.findRecipeName.toLowerCase()));
      return recipes.sort((a, b) => a.recipeName > b.recipeName);
    },
    staffSuggestions() {
      let staffs = this.staffs.filter(staff => staff.staffName.toLowerCase().startsWith(this.findStaffName.toLowerCase()));
      return staffs.sort((a, b) => a.staffName > b.staffName);
    }
  },
  created() {
    this.getRecipes();
    this.getStaffs();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.recipeName, this.file.description, this.file.ingredientList)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          recipeName: this.recipeName,
          description: this.description,
          ingredientList: this.ingredientList,
          path: r1.data.path
        });
        this.addRecipe = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadStaff() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.staffName, this.file.about, this.file.favoriteRecipe)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/staffs', {
          staffName: this.staffName,
          about: this.about,
          favoriteRecipe: this.favoriteRecipe,
          path: r1.data.path
        });
        this.addStaff = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getStaffs() {
      try {
        let response = await axios.get("/api/staffs");
        this.staffs = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRecipe(recipe) {
      this.findRecipeName = "";
      this.findRecipe = recipe;
    },
    selectStaff(staff) {
      this.findStaffName = "";
      this.findStaff = staff;
    },
    async deleteRecipe(recipe) {
      try {
        await axios.delete("/api/recipes/" + recipe._id);
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStaff(staff) {
      try {
        await axios.delete("/api/staffs/" + staff._id);
        this.findStaff = null;
        this.getStaffs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRecipe(recipe) {
      try {
        await axios.put("/api/recipes/" + recipe._id, {
          recipeName: this.findRecipe.recipeName,
          description: this.findRecipe.description,
          ingredientList: this.findRecipe.ingredientList,
        });
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editStaff(staff) {
      try {
        await axios.put("/api/staffs/" + staff._id, {
          staffName: this.findStaff.staffName,
          about: this.findStaff.about,
          favoriteRecipe: this.findStaff.favoriteRecipe,
        });
        this.findStaff = null;
        this.getStaffs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
