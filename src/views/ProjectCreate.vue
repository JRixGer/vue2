<template>
  <div>
    <h1>Create Project</h1>
    <div class="container" style="text-align: left; margin-bottom: 50px;">
      <form class="row g-3" @submit.prevent="projectCreate">
        <div class="col-md-6">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required>
        </div>
        <div class="col-md-6">
          <label for="clientName" class="form-label">Client Name</label>
          <input type="text" class="form-control" id="clientName" v-model="clientName" required>
        </div>
        <div class="col-md-6">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
        </div>
        <div class="col-md-6">
          <label for="gitUrl" class="form-label">Git URL</label>
          <input type="text" class="form-control" id="gitUrl" v-model="gitUrl" required>
        </div>
        <div class="col-md-6">
          <label for="testUrl" class="form-label">Test URL</label>
          <input type="text" class="form-control" id="testUrl" v-model="testUrl" required>
        </div>
        <div class="col-md-6">
          <label for="productionUrl" class="form-label">Production URL</label>
          <input type="text" class="form-control" id="productionUrl" v-model="productionUrl" required>
        </div>
        <div class="col-md-12">
          <Libraries :existingLibraries="null" action="add"/>
        </div>  
        <div class="col-md-6">
          <label for="activeStartDate" class="form-label">Active Start Date</label>
          <input type="text" class="form-control" id="activeStartDate" v-model="activeStartDate" disabled>
        </div>
        <div class="col-md-6">
          <label for="activeEndDate" class="form-label">Active End Date</label>
          <input type="date" class="form-control" id="activeEndDate" v-model="activeEndDate" required>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit" :disabled="creating">Create Project</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getCurrentDate } from '../helpers/date';
import Libraries from '../components/Libraries.vue';

export default {
    name: "ProjectCreate",
    data() {
        return {
            project: {},
            name: null,
            clientName: null,
            description: null,
            gitUrl: null,
            testUrl: null,
            productionUrl: null,
            library: [{ "library_id": null, "version": "" }],
            activeStartDate: getCurrentDate(),
            activeEndDate: null,
            creating: false,
        };
    },
    computed: {
    },
    mounted() {
    },
    created(){
      this.$root.$on("lib",(data)=>{
        this.library = data;
      })
    },
    methods: {
        async projectCreate() {
            this.creating = true;
            this.project = {
                active_end_date: this.activeEndDate,
                active_start_date: this.activeStartDate,
                client_name: this.clientName,
                description: this.description,
                git_url: this.gitUrl,
                libraries: this.library,
                name: this.name,
                production_url: this.productionUrl,
                testing_url: this.testUrl,
            };
            try {
                await this.$store.dispatch("createProject", this.project);
                this.creating = false;
                this.$router.push("/");
            }
            catch (err) {
                console.log(err.message);
            }
        },
    },
    components: { Libraries }
}
</script>
