<template>
  <div>
    <br>
    <br>
    <div class="container">
      <div>
          <h3 class="text-primary"> 
            <i class="fas fa-graduation-cap"></i>
            Incripcion a Carrera
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
                      <p>(*) Muestra solamente las carreras en la que el alumno no esta inscripto </p>
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
                      <br>
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
import { alertSuccess, alertError } from '../assets/sweetAlert';




export default {
  created(){
      this.getAlumno();
  },
  data () {
    return {
      alumnoSelected: {},
      carreraSelected: {},
      alumno:[],
      carrera:[]

		}

  },
 

  methods: {
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
                        carrera: this.carreraSelected.identificador
                    }
                    if (this.alumnoSelected.idalumno && this.carreraSelected.identificador ){
                        axios.post('http://localhost:3000/inscripcion/carrera',
                        objeto, 
                        { headers: {
                          'Content-Type': 'application/json'
                        },
                        }).then(function(response){
                          console.log(response);
                          alertSuccess();
                        }).catch(error=>{
                          console.log(error);
                          alertError();  
                        });
                    }else{
                      alert("POR FAVOR COMPLETE LOS CAMPOS");
                    }
                    
                    
           }   
        
        },
             components: {
              ModelListSelect
            },
            watch: {
                alumnoSelected:{
                handler () {
                  this.carreraSelected = [];
                  this.carrera = [];
                  console.log(this.alumnoSelected.idalumno)
                  //DEVUELVE UN ARRAY CON LOS CURSOS QUE EL ALUMNO PUEDE TOMAR ES DECIR QUE TODAVIA NO SE HA INSCRIPTO
                  axios.get('http://localhost:3000/carrera/disponible/'+ this.alumnoSelected.idalumno).then(response=>{
                          console.log(response.data[0]);
                         this.carrera = response.data;
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
