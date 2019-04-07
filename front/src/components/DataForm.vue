<template>
  <form v-on:submit="handleSubmit">
    <div class="form-group">
      <input
        type="text"
        v-model="title"
        required
        id="title"
        placeholder="Title"
        class="form-control"
      >
    </div>
    <div class="form-group">
      <textarea
        cols="30"
        rows="10"
        v-model="text"
        required
        id="text"
        placeholder="Text"
        class="form-control"
      ></textarea>
    </div>
    <div class="form-group" style="text-align: center;">
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, EVENTS, API_ROUTES } from "../conf"

export default {
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      const { title, text } = this;
      if (title && text) {
        const URL = `${API_ENDPOINT}/${API_ROUTES.EVENT}/${EVENTS.ADD_DATA}`;
        const options = {headers: {'Content-Type': 'application/json'}}
        const body = JSON.stringify({ title, text })
        axios.post(URL, body, options)
          .then(({data}) => data)
          .then(res => {
            console.log(res);
            this.title = "";
            this.text = "";
          });
      }
    }
  },
  data() {
    return {
      title: "",
      text: ""
    };
  }
};
</script>