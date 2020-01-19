<template>
<div>
    <div class="container" style="margin-top:30px;">
      <h3 style="text-align:left;" class="text-primary" v-if="alumno" >Alumno: {{ alumno.documento }} {{ alumno.nombre }}  {{ alumno.apellido }}</h3>
      <h3 style="text-align:left;" class="text-primary" v-if="carrera[0]">Carrera: {{ carrera[0] }} </h3>
      <h3 style="text-align:left;" class="text-primary" v-if="carrera[1]">Carrera: {{ carrera[1] }} </h3>

      <br>
      <br>
      <div>
      <h3 class="text-primary"> Estado Academico </h3>  
      <div>
        <br>
        <b-form-group>
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="condicionSelected"
            :options="options"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
        <!--
        <div>Selected: <strong>{{ condicionSelected }}</strong></div>
        -->
      </div>
      <br>
      <table class="table table-bordered" style=" margin: 0 auto">
        <thead>
          <tr>
            <th scope="col">Curso</th>
            <th scope="col">Carrera</th>
            <th scope="col">Condicion</th>
            <th scope="col">Nota</th>
          </tr>
        </thead>
        <tbody v-for="item in curso" v-bind:key="item">
          <tr>
            <td> {{ item.nombre }} </td>
            <td> {{ item.carrera }} </td>
            <td> {{ item.condicion }} </td>
            <td v-if="item.nota == 0"> Sin Nota </td>
            <td v-else > {{ item.nota }} </td>

          </tr>
        </tbody>
       </table>
      </div>
      <br>
      <h4 class="text-dark" style="text-align:right;" v-if="promedio1"> Promedio en Ingenieria en Sistemas: {{ promedio1 }} </h4>  
      <h4 class="text-dark" style="text-align:right;" v-if="promedio2"> Promedio en Ingenieria Civil: {{ promedio2 }} </h4>  
     </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    this.getCurso();
    this.getAlumno();
  },
  data() {
    return {
       cursoSelected: {},
       curso: [],
       alumno: {},
       idalumno: this.$route.params.id,
       carrera: '',
       promedio1: '',
       prmedio2: '',
       condicionSelected: ['CURSANDO','LIBRE','REGULAR','PROMOCIONADO'], 
        options: [
          { text: 'EN CURSO', value: 'CURSANDO' },
          { text: 'LIBRE', value: 'LIBRE' },
          { text: 'REGULAR', value: 'REGULAR' },
          { text: 'PROMOCIONADO', value: 'PROMOCIONADO' }
        ]
      }
   },
  
 
  methods: {
      getAlumno(){
         axios.get('http://localhost:3000/alumno/'+ this.idalumno).then((response) =>{
          this.alumno = response.data[0];
        });
      },

      getCurso(){
        axios.post('http://localhost:3000/estado',
                      {
                        identificador: this.idalumno,
                        opciones: this.condicionSelected
                      },
                      {
                      headers:{
                        'Content-Type': 'application/json'
                      }
        }).then(response=>{
          this.curso = response.data.cursos;
          this.promedio1 =  response.data.promedio1;
          this.promedio2 =  response.data.promedio2;
          this.carrera = response.data.carrera;
        })
      }
   

  },
  watch: {
        condicionSelected:{
          handler () {
            axios.post('http://localhost:3000/estado',
                      {
                        identificador: this.idalumno,
                        opciones: this.condicionSelected
                      },
                      {
                      headers:{
                        'Content-Type': 'application/json'
                      }
                }).then(response=>{
                  this.curso = response.data.cursos;                  
                })
          },
          deep: true
        }
    }
 
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}



input{
  background-color: white;
}
.table{
  border-radius: 5px !important;
  
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
