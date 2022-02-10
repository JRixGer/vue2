<template>
  <div>
    <h1>Libraries</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Active Start Date</th>
          <th scope="col">Active End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="library in libraries" :key="library.id">
          <th scope="row">{{library.id}}</th>
          <td>{{library.description}}</td>
          <td>{{library.active_start_date}}</td>
          <td>{{library.active_end_date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Library',
  computed: {
    libraries() {
      return this.$store.state.libraries
    }
  },
  mounted() {
    this.$store.dispatch('getLibraries')
  },
}
</script>
