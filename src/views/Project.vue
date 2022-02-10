<template>
  <div>
    <h1>Projects</h1>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Client Name</th>
            <th scope="col">Production URL</th>
            <th scope="col">Test URL</th>
            <th scope="col">Git URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <th scope="row">{{project.id}}</th>
            <td>
              <router-link :to="{ name: 'ProjectEdit', params: { id:project.id }}">
                {{project.name}}
              </router-link>
            </td>
            <td>{{project.client_name}}</td>
            <td>{{project.production_url}}</td>
            <td>{{project.testing_url}}</td>
            <td>{{project.git_url}}</td>
          </tr>
        </tbody>
      </table>
      <div style="text-align:left;">
        <router-link :to="{ name: 'ProjectCreate'}">
          <button type="button" class="btn btn-success">Create Project</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Project',
  computed: {
    projects() {
      return this.$store.state.projects
    }
  },
  mounted() {
    this.$store.dispatch('getProjects')
  },
}
</script>
