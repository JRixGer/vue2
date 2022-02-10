<template>
  <div>
    <h1>Edit Project</h1>
    <div class="container" style="text-align: left; margin-bottom: 50px;">
      <form class="row g-3" @submit.prevent="projectUpdate">
        <div class="col-md-6">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="project.name" required>
        </div>
        <div class="col-md-6">
          <label for="clientName" class="form-label">Client Name</label>
          <input type="text" class="form-control" id="clientName" v-model="project.client_name" required>
        </div>
        <div class="col-md-6">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" id="description" v-model="project.description" required>
        </div>
        <div class="col-md-6">
          <label for="gitUrl" class="form-label">Git URL</label>
          <input type="text" class="form-control" id="gitUrl" v-model="project.git_url" required>
        </div>
        <div class="col-md-6">
          <label for="testUrl" class="form-label">Test URL</label>
          <input type="text" class="form-control" id="testUrl" v-model="project.testing_url" required>
        </div>
        <div class="col-md-6">
          <label for="productionUrl" class="form-label">Production URL</label>
          <input type="text" class="form-control" id="productionUrl" v-model="project.production_url" required>
        </div>
        <div class="col-md-12">
          <Libraries slot-scope="" :existingLibraries="project.libraries" action="edit"/>
        </div> 
        <div class="col-md-6">
          <label for="activeStartDate" class="form-label">Active Start Date</label>
          <input type="date" class="form-control" id="activeStartDate" v-model="project.active_start_date" required>
        </div>
        <div class="col-md-6">
          <label for="activeEndDate" class="form-label">Active End Date</label>
          <input type="date" class="form-control" id="activeEndDate" v-model="project.active_end_date" required>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit" :disabled="updating">Update Project</button>
        </div>
      </form>
    </div>
  </div>  
</template>

<script>
import Libraries from '../components/Libraries.vue';

export default {
  name: 'ProjectEdit',
  props: ['id'],
  data() {
    return {
      data: null,
      library: [{
        library_id: null,
        version: null
      }],
      updating: false,
    }
  },
  computed: {
    project() {
      return this.$store.state.project
    },
  },
  created(){
    this.$root.$on("lib",(data)=>{
      this.project.Libraries = data;
    })
  },  
  mounted() {
    this.$store.dispatch('getProject', this.id)
  },
  methods: {
    async projectUpdate() {
      this.updating = true
      this.data = {
        active_end_date: this.project.active_end_date,
        active_start_date: this.project.active_start_date,
        client_name: this.project.client_name,
        description: this.project.description,
        git_url: this.project.git_url,
        libraries: this.project.Libraries,
        name:  this.project.name,
        production_url: this.project.production_url,
        testing_url: this.project.testing_url,
      }
      try {
        await this.$store.dispatch('updateProject', {id:this.id, data:this.data})
        this.updating = false
        this.$router.push('/')
      }
      catch (err) { 
        console.log(err.message)
      }
    },
  },
  components: { Libraries }
}
</script>
