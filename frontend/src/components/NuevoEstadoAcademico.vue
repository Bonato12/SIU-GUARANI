<template>
<div>
    <div class="container" style="margin-top:30px;">
      <br>
      <br>
      <h3 v-if="estadoAcademico.length == 0 " class="text-primary"> 
         <i class="fas fa-plus-circle"></i>
         Nuevo Estado Academico
      </h3> 
      <h3 v-else class="text-primary"> 
          <i class="fas fa-edit"></i>        
          Editar Estado Academico
      </h3> 
      <hr> 
      <br>
      <form @submit.prevent="nuevoEstado()" style="width:500px; margin-top:-20px;">
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Alumno</span>
                      </div>
                      <input required type="text" v-model="alumno" class="form-control" placeholder="Ingrese Nombre" disabled>
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Curso</span>
                      </div>
                      <input required type="text" v-model="curso" class="form-control" placeholder="Ingrese Curso" disabled>
                      
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Condicion</span>
                      </div>
                      <select class="form-control" v-model="condicion" placeholder="Elige una Condicion">
                        <option  disabled selected>Elige una Condicion</option>
                        <option  v-for="item in tipoCondicion">{{ item.name }}</option>
                      </select>                      
                  </div>
                 
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Nota</span>
                      </div>
                      <input required type="text" v-model="nota" class="form-control" placeholder="Ingrese Nota">
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <router-link class="btn btn-info" to="/Homeinscripcion/curso" tag="button" title="Volver a HomeInscripcion">
                        <i class="fas fa-arrow-left"></i>
                          Volver
                    </router-link>
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button  type="submit" class="btn btn-success"  title="Guardar Nuevo Estado" >
                        <i class="far fa-save fa-1x"></i>
                        Guardar
                    </button>
                  </div>
            </form>  
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { alertError, alertEditSuccess, alertSuccess } from '../assets/sweetAlert';

export default {
  created() {
    this.getEstadoAcademico();
    this.getCurso();
    this.getAlumno();
  },
  data() {
    return {
       idalumno: this.$route.params.idalumno,
       idcurso: this.$route.params.idcurso,
       condicion: '',
       nota: '',
       estadoAcademico: [],
       curso: '',
       alumno: '',
       tipoCondicion : [{name:"PROMOCIONADO"},
                       {name:"REGULAR"},
                       {name:"LIBRE"},
                       {name:"CURSANDO"}
                     ]
		  }
      },
  
 
  methods: {

      getAlumno() {
        axios.get('http://localhost:3000/alumno/'+this.idalumno).then(response => {
          this.alumno = response.data[0].documento;
        })
      },

      getCurso() {
        axios.get('http://localhost:3000/curso/'+this.idcurso).then(response => {
          this.curso = response.data[0].nombre;
        })
      },


      getEstadoAcademico(){
        console.log(this.idalumno);
        console.log(this.idcurso);
         axios.get('http://localhost:3000/estado/'+this.idalumno + '/' + this.idcurso).then(response => {
            this.estadoAcademico = response.data;
            this.alumno = response.data[0].documento;
            this.curso = response.data[0].nombre
            this.condicion = response.data[0].condicion;
            this.nota = response.data[0].nota;
          })
      },

      nuevoEstado(){
        var objeto = {
          idalumno: this.idalumno,
          idcurso: this.idcurso,
          condicion: this.condicion,
          nota: this.nota
        }

        if (this.condicion && this.nota >= 0 && this.nota <= 10){
           if (this.estadoAcademico.length != 0 ){
        // ESTO SIGNIFICA QUE EL CURSO TODAVIA NO SE HA CARGADO UN ESTADO ACADEMICO (NOTA, CONDICION)  
              axios.put('http://localhost:3000/estado/'+this.idalumno + '/' + this.idcurso,
                        objeto,
                        { headers: {
                          'Content-Type': 'application/json',
                        }
                        }).then(function(response){
                          console.log(response);
                          alertEditSuccess();
                        }).catch(error=>{
                          console.log(error);
                          alertError();
                        })
            }else{
              axios.post('http://localhost:3000/nuevo/estado',
                        objeto,
                        { headers: {
                          'Content-Type': 'application/json',
                        }
                        }).then(function(response){
                          console.log(response);
                          alertSuccess();
                        }).catch(error=>{
                          console.log(error);
                          alertError();
                        })
            }

        }else{
          alert("COMPLETAR LOS CAMPOS CORRECTAMENTE");
        }
       
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
