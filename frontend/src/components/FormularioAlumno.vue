<template>
  <div>
    <br>
    <div class="container">
      <div>
          <h3 v-if="editar == false" class="text-primary"> 
            <i class="fas fa-plus-circle"></i>
            Nuevo Alumno 
          </h3>
          <h3 v-else class="text-primary"> 
            <i class="far fa-edit"></i>
            Editar Alumno 
          </h3>
          <hr>
          <div>
            <br>
                <form @submit.prevent="nuevoAlumno()" style="width:500px; margin-top:-20px;">
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Nombre</span>
                      </div>
                      <input  type="text" v-model="nombre" class="form-control" placeholder="Ingrese Nombre" :class="{ 'is-invalid': submitted && $v.nombre.$error }">
                      <div v-if="submitted && !$v.nombre.required.$error" class="invalid-feedback">
                              <span v-if="!$v.nombre.required">El nombre  es requerido</span>
                              <span v-if="!$v.nombre.maxLength">El Nombre no puede tener mas de 50 digitos</span>
                      </div>
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Apellido</span>
                      </div>
                      <input  type="text" v-model="apellido" class="form-control" placeholder="Ingrese Apellido" :class="{ 'is-invalid': submitted && $v.apellido.$error }">
                      <div v-if="submitted && !$v.apellido.required.$error" class="invalid-feedback">
                              <span v-if="!$v.apellido.required">El apellido es requerido</span>
                              <span v-if="!$v.apellido.maxLength">El apellido no puede tener mas de 50 digitos</span>
                        </div>
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Documento</span>
                      </div>
                      <input  type="number" v-model="documento" class="form-control" placeholder="Ingrese Documento" :class="{ 'is-invalid': submitted && $v.documento.$error }">
                       <div v-if="submitted && !$v.documento.required.$error" class="invalid-feedback">
                              <span v-if="!$v.documento.maxLength">El documento no puede tener mas de 10 digitos</span>
                              <span v-if="!$v.documento.required">El documento es requerido</span>

                      </div>
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Tipo Documento </span>
                      </div>
                      <input  type="text" v-model="tipodocumento" class="form-control" placeholder="Ingrese Tipo Documento" :class="{ 'is-invalid': submitted && $v.tipodocumento.$error }" >
                      <div v-if="submitted && !$v.tipodocumento.required.$error" class="invalid-feedback">
                              <span v-if="!$v.tipodocumento.maxLength">El Tipo de documento no puede tener mas de 5 caracteres</span>
                              <span v-if="!$v.tipodocumento.required">El tipodocumento es requerido</span>
                      </div>
                  
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Direccion</span>
                      </div>
                      <input   type="text"  v-model="direccion" class="form-control" placeholder="Ingrese Direccion" :class="{ 'is-invalid': submitted && $v.direccion.$error }">
                      <div v-if="submitted && !$v.direccion.required.$error" class="invalid-feedback">
                              <span v-if="!$v.direccion.required">La direccion es requerida</span>
                              <span v-if="!$v.direccion.maxLength">La direccion no puede tener mas de 200 digitos</span>
                        </div>
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Legajo</span>
                      </div>
                      <input  type="number" min="0" v-model="legajo" class="form-control" placeholder="Ingrese Legajo" :class="{ 'is-invalid': submitted && $v.legajo.$error }"  >
                       <div v-if="submitted && !$v.legajo.required.$error" class="invalid-feedback">
                              <span v-if="!$v.legajo.maxLength">El legajo no puede tener mas de 5 digitos</span>
                              <span v-if="!$v.legajo.required">El legajo es requerido</span>

                      </div>
                  </div>               
                  <br>
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <router-link class="btn btn-info" to="/HomePersona" tag="button" title="Volver a HomeProducto">
                        <i class="fas fa-arrow-left"></i>
                          Volver
                    </router-link>
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="Second group">
                    <button  type="submit" class="btn btn-success"  title="Guardar Alumno"  >
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
import { alertSuccess, alertEditSuccess,alertError } from '../assets/sweetAlert.js'
import Swal from 'sweetalert2'
import { required, maxLength } from "vuelidate/lib/validators";




export default {
  created(){
    if (this.idp){
       this.getAlumno();
    }
    
  },
  data () {
    return {
      submitted: false,
      idp: this.$route.params.id,
      editar: false,
      nombre: '',
      apellido: '',
      documento: '',
      tipodocumento: '',
      direccion: '',
      legajo: ''
		}

  },
  
  validations: {
        nombre:{
          required,
          maxLength: maxLength(50)

        },
        apellido:{
          required,
          maxLength: maxLength(10)
        },
         direccion:{
          required,
          maxLength: maxLength(200)
        },
        documento:{
          required,
          maxLength: maxLength(10)
        }, 
        tipodocumento:{
          required,
          maxLength: maxLength(5)
        },
        legajo:{
          required,
          maxLength: maxLength(5)
        }  
    },

  methods: {

      getAlumno(){
         this.editar = true;
         axios.get('http://localhost:3000/persona/'+this.idp).then((response) =>{
           console.log(response.data);
           this.nombre = response.data[0].nombre;
           this.apellido = response.data[0].apellido;
           this.documento = response.data[0].documento;
           this.tipodocumento = response.data[0].tipodoc;
           this.direccion = response.data[0].direccion;
           this.idalum = response.data[0].idalumno;
           this.legajo = response.data[0].legajo;
         }).catch(error=>{
           console.log(error);
         })
      },
      

      nuevoAlumno(){
                  var objeto = {
                        identificador: this.idp,
                        nombre: this.nombre,
                        apellido: this.apellido,
                        documento: this.documento,
                        tipodocumento: this.tipodocumento,
                        direccion:this.direccion,
                        legajo: this.legajo
                  }
                  this.submitted = true;
                  this.$v.$touch();
                  var _this = this ;
                  if (this.$v.$invalid) {
                        return;
                  }     
                  if (this.editar == false){
                        axios.post('http://localhost:3000/persona',
                        objeto, 
                        { headers: {
                          'Content-Type': 'application/json'
                        },
                        }).then(function(response){
                            console.log(response);
                            _this.vaciarCampos();
                            _this.submitted = false;
                            alertSuccess();

                        }).catch(error=>{
                           console.log(error);
                           alertError();
                        })
                  
                }else{  
                        this.$swal({
                        title: 'Estas Seguro Que Desea Editar?',
                        text: "No se podran recuperar los datos!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Editar!'
                        }).then((result) => {
                        if (result.value) {
                          axios.put('http://localhost:3000/persona/'+this.idp,
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
                          }
                        })
                        }
                        
                
            },
            vaciarCampos(){
              this.nombre = '';
              this.apellido = '';
              this.documento = '';
              this.tipodocumento = '';
              this.direccion = '';
              this.legajo = '';
            }
  }
}
</script>

<style scoped>

select{
  display: block !important;
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


.input-group-prepend span{
width: 138px;
background-color: #5bc0de;
}



/*Sirve para desabilitar las flechas en los inputs numer*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}





</style>
