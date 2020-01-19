<template>
<div>
      <br>
      <br>
      <div class="container">
        <h3 class="text-primary"> 
           <i class="fas fa-school"></i>
           Curso: {{ nombreCurso }}
        </h3>
        <hr>
          <div>
                <br>
                <h3 v-if="alumnos.length" class="text-primary"> 
                  <i class="fas fa-users"></i>
                  Alumnos 
                </h3>
                <br>
                <p v-if="alumnos.length">
                <ul  class="list-group" v-for="item in alumnos" v-bind:key="item">
                    <li class="alert alert-secondary" style="width:400px;" role="alert">
                      {{ item.documento }} {{ item.nombre }} {{ item.apellido }}
                    </li>
                </ul>
                </p>
            </div>
            <div>
                <br>
                <h3 v-if="profesores.length" class="text-primary"> 
                  <i class="fas fa-chalkboard-teacher"></i>
                  Profesores 
                </h3>
                <br>
                <p v-if="profesores.length">
                <ul  class="list-group" v-for="item in profesores" v-bind:key="item">
                    <li class="alert alert-secondary" style="width:400px;" role="alert">
                      {{ item.documento }} {{ item.nombre }} {{ item.apellido }}
                    </li>
                </ul>
                </p>
            </div>                   
        </div>     
</div>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    this.getNombreCurso();
    this.getCurso();
  },
  data() {
    return {
       idcurso: this.$route.params.id,
       alumnos: [],
       profesores: [],
       nombreCurso: ''
      }
   },
  
 
  methods: {
  
      getNombreCurso(){
        axios.get('http://localhost:3000/curso/'+this.idcurso).then((response) =>{
          this.nombreCurso = response.data[0].nombre;
        });
      },
    
      getCurso(){
        axios.get('http://localhost:3000/curso/buscar/'+this.idcurso).then((response) =>{
          this.alumnos = response.data.alumnos;
          this.profesores = response.data.profesores;

        });
      }
   

  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
li{
  list-style:none; 
 }

.input-group-prepend span{
width: auto;
background-color:	#428bca;
color: black;
border:0 !important;
}
.form-control {
    border: 0;
    box-shadow: none;
    background-color: white;
}

.input-group-text{
width: auto;
background-color: 	#428bca;
color: black;
border: none;
}
input{
  background-color: white;
}
.table{
  border-radius: 5px !important;
  background-color:white;
}
.table td,th {
   text-align: center;
}
.search{
    min-width: 0 !important;
    width: 25px !important;
    border: none !important;
    margin-left: -3px !important;
    border-left: -3px solid !important;
}

</style>
