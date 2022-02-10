import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentDate } from '../helpers/date';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    project: [],
    projects: [],
    libraries: [],
  },
  mutations: {
    setProject(state, payload) {
      state.project = payload
    },
    setProjects(state, payload) {
      state.projects = payload
    },
    setLibraries(state, payload) {
      state.libraries = payload
    },
  },
  actions: {
    getProjects({commit}) {
      fetch('http://localhost:3000/project')
      .then(res => res.json())
      .then(data => commit('setProjects',data))
      .catch(err => console.log(err.message))
    },

    getProject({commit},id) {
      fetch('http://localhost:3000/project/'+id)
      .then(res => res.json())
      .then(data => commit('setProject',data))
      .catch(err => console.log(err.message))
    },

    updateProject({commit},{id,data}) {
      fetch('http://localhost:3000/project/'+id, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data),
        }) 
        .then(res => res.json())
        .then(data => commit('setProject',data))
        .catch(err => console.log(err.message))
    },

    createProject({commit},data) {
      console.log(data);
      fetch('http://localhost:3000/project', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data),
        }) 
        .then(res => res.json())
        .then(data => commit('setProject',data))
        .catch(err => console.log(err.message))
    },

    getLibraries({commit}) {
      fetch('http://localhost:3000/library')
      .then(res => res.json())
      .then(data => commit('setLibraries',data))
      .catch(err => console.log(err.message))
    },

    getActiveLibraries({commit}) {
      fetch('http://localhost:3000/library')
      .then(res => res.json())
      .then(data => {
        const date = getCurrentDate()
        const result = data.filter(library => library.active_end_date == null || (date.value < library.active_start_date && date.value > library.active_end_date));
        commit('setLibraries',result)
      })
      .catch(err => console.log(err.message))
    }
  },
  modules: {
  }
})
