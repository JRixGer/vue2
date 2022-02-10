<template>
  <div class="col-md-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Library</th>
          <th scope="col">Version </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(library,index) in lib" :key="index">
          <td>
            <div class="col-md-12">
              <select class="form-select" aria-label="Default select example" v-model="library.library_id">
                <option v-for="(library) in libraries" :key="library.id" :value="library.id">{{library.description}}</option>
              </select>
            </div>
          </td>
          <td>
            <div class="col-md-12">
              <input type="text" class="form-control" id="libraryVersion" v-model="library.version" required>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col-12" style="text-align:right;">
      <button class="btn btn-warning" type="button" @click.prevent="addLibrary">Add Library</button>
      <button v-if="addCounts > 0" class="btn btn-danger" type="button" style="margin-left: 20px;" @click.prevent="removeLibrary">Remove Library</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Libraries',
  props: {
    existingLibraries: Array,
    action: String
  },
  data() {
      return {
          lib: [],
          addCounts: 0,
      };
  },
  watch: {
    existingLibraries() {
      for (let i = 0; i < this.existingLibraries.length; i++) {
        this.lib.push({
          library_id: this.existingLibraries[i].library_id,
          version: this.existingLibraries[i].version
        });
      }
    },
    lib() {
      this.$root.$emit('lib', this.lib);
    }
  },
  computed: {
      libraries() {
          return this.$store.state.libraries;
      }
  },
  mounted() {
    this.$store.dispatch("getActiveLibraries");
    if(this.action=="add") {
      this.lib.push({
          library_id: null,
          version: null
      });
    }
  },
  methods: {
    addLibrary() {
        this.addCounts++;
        this.lib.push({
            library_id: null,
            version: null
        });
    },
    removeLibrary() {
        this.addCounts--;
        this.lib.pop();
    },
  },
}
</script>
<style scoped>
</style>
