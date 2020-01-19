<template>
  <div>
    <br>
    <br>
    <div class="container">
      <div>
          <h3 class="text-primary"> 
            <i class="fas fa-clipboard-list"></i>
            Incripcion a Curso
          </h3>
          <hr>
          <div>
          <br>
                <form @submit.prevent="nuevaInscripcion()" style="width:500px; margin-top:-20px;">
                    <div class="input-group form-group">
                          <div class="input-group-prepend" style="border-right: 5px solid white">
                              <h4 class="text-primary">Alumno: </h4>
                          </div>
                          <model-list-select class="form-control" :list="alumno"
                                              v-model="alumnoSelected"
                                              option-value="idalumno"
                                              :custom-text="textAlumno"
                                              >
                          </model-list-select>
                      </div>
                      <p>(*) Muestra Solamente la carrera en el que el alumno esta inscripto </p>
                      <div class="input-group form-group">
                          <div class="input-group-prepend" style="border-right: 5px solid white">
                              <h4 class="text-primary">Carrera: </h4>
                          </div>
                          <model-list-select class="form-control" :list="carrera"
                                              v-model="carreraSelected"
                                              option-value="identificador"
                                              :custom-text="textCarrera"
                                              >
                          </model-list-select>
                      </div>
                      <p>(*)Muestra solo los cursos en el que alumno no esta inscripto  </p>
                      <div class="input-group form-group">
                          <div class="input-group-prepend" style="border-right: 5px solid white">
                              <h4 class="text-primary">Curso: </h4>
                          </div>
                          <model-list-select class="search form-control" :list="curso"
                                              v-model="cursoSelected"
                                              option-value="identificador"
                                              :custom-text="textCurso"
                                              >
                          </model-list-select>
                      </div>
                      <br>
                      <!--
                      <div class="btn-group mr-2" role="group" aria-label="First group">
                          <router-link class="btn btn-info" to="/HomePersona" tag="button" title="Volver a HomeProducto">
                              <i class="fas fa-arrow-left"></i>
                                Volver
                          </router-link>
                      </div>
                      -->
                      <div class="btn-group mr-2" role="group" aria-label="Second group">
                        <button  type="submit" class="btn btn-info"  title="Guardar Alumno"  >
                              <i class="far fa-save fa-1x"></i>
                              Guardar
                        </button>
                      </div>
            </form>
          </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
import { ModelListSelect } from 'vue-search-select'
import { alertError, alertSuccess } from '../assets/sweetAlert';




export default {
  created(){
      this.getAlumno();
  },
  data () {
    return {
      alumnoSelected: {},
      carreraSelected: {},
      cursoSelected: {},

      curso: [],
      alumno:[],
      carrera:[]

		}

  },
 

  methods: {
        textCurso(item){
          return `${item.identificador} - ${item.nombre}`
        },

         textCarrera(item){
          return `${item.identificador} - ${item.nombre}`
        },

         textAlumno(item){
          return `${item.documento} ${item.nombre} ${item.apellido} `
        },

        getAlumno(){
            axios.get('http://localhost:3000/persona').then((response) =>{
              this.alumno = response.data;
              console.log(response.data);
            });
         },

       

   
      
      nuevaInscripcion(){
                    var objeto = {
                        alumno: this.alumnoSelected.idalumno,
                        curso: this.cursoSelected.identificador
                    }
                    if (this.alumnoSelected.idalumno && this.cursoSelected.identificador){
                      axios.post('http://localhost:3000/inscripcion',
                      objeto, 
                      { headers: {
                        'Content-Type': 'application/json'
                      },
                      }).then(function(response){
                        console.log(response);
                        alertSuccess();
                      }).catch(error =>{
                        console.log(error);
                        alertError();
                      })
                    }else{
                      alert("COMPLETE LOS DATOS POR FAVOR");
                    }
                    
                    
           }   
        
        },
             components: {
              ModelListSelect
            },
            watch: {
            alumnoSelected:{
              handler () {
                this.curso = [];
                this.carreraSelected = [];
                console.log(this.alumnoSelected.idalumno)
                //DEVUELVE UN ARRAY CON LOS CURSOS QUE EL ALUMNO PUEDE TOMAR ES DECIR QUE TODAVIA NO SE HA INSCRIPTO
                axios.get('http://localhost:3000/cursoLibre/'+this.alumnoSelected.idalumno).then(response=>{
                      //this.curso = response.data.cursos;
                      this.carrera = response.data.carrera;
                })
              },
              deep: true
            },
            carreraSelected:{
              handler () {
                this.curso = [];
                
                //DEVUELVE UN ARRAY CON LOS CURSOS QUE EL ALUMNO PUEDE TOMAR ES DECIR QUE TODAVIA NO SE HA INSCRIPTO
                axios.post('http://localhost:3000/cursoCarreraLibre',{
                  carrera: this.carreraSelected.identificador,
                  alumno: this.alumnoSelected.idalumno
                  }).then(response=>{
                      this.curso = response.data.cursos;
                      //this.carrera = response.data.carrera;
                })
              },
              deep: true
            }
        }
  
}
</script>

<style scoped>


.input-group-prepend h4{
width: 100px;
color: black;
border:0 !important;
}

.form-control {
    border: 1px solid;
    box-shadow: none;
    background-color: white;
}

.input-group-text{
width: auto;
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

/*
.search{
    border: 1px solid;
}
*/
</style>
