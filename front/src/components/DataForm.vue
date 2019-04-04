<template>
  <form v-on:submit="handleSubmit">
    <div>
      <input type="text" v-model="title" required>
    </div>
    <div>
      <textarea cols="30" rows="10" v-model="text" required></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { API_ENDPOINT, EVENTS, API_ROUTES } from "../conf";

export default {
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      const { title, text } = this;
      if (title && text) {
        const URL = `${API_ENDPOINT}/${API_ROUTES.EVENT}/${EVENTS.ADD_DATA}`;
        const body = JSON.stringify({ title, text });
        fetch(URL, {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
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
    }
  }
};
</script>