<template>
  <div>
    <br>
    <br>
    <div class="container">
      		<div>
        			 <h3 class="text-primary"> 
                  <i class="fas fa-plus-circle"></i>
                  Nuevo Curso 
               </h3>
               <hr>
        			 <div>
               <br>
            				<form @submit.prevent="nuevoProfesor()" style="width:500px; margin-top:-20px;">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Curso</span>
              						</div>
              						<input required type="text" v-model="nombre" class="form-control" placeholder="Ingrese Modelo">
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Carrera</span>
              						</div>
              						<input required type="text" v-model="apellido" class="form-control" placeholder="Ingrese Marca">
            					   
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Descripcion</span>
              						</div>
            					    <textarea type="text" v-model="descripcion" class="form-control" placeholder="Ingrese Descripcion"></textarea>

                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Cupo Maximo</span>
              						</div>
              						<input  required type="number" min="0" v-model.number="direccion" class="form-control" placeholder="Ingrese Stock">
                      </div>
                      <div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text">Año</span>
              						</div>
              						<input required type="number" min="0" v-model="matricula" class="form-control" placeholder="Ingrese Precio" >
                      </div>
                      <br>
                      <div class="btn-group mr-2" role="group" aria-label="First group">
                        <router-link class="btn btn-info" to="/HomeCurso" tag="button" title="Volver a HomeProducto">
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

export default {
  created(){
    /*
    if (this.idp){
       this.getProducto();
    }
    */
  },
  data () {
    return {
      id: this.$route.params.id,
      nombre: '',
      apellido: '',
      documento: '',
      tipodocumento: '',
      direccion: '',
      matricula: '',
      descripcion: ''
		}

  },
  

  methods: {
    /*
      getProducto(){
         this.editProducto = true;
         axios.get('http://localhost:3000/producto/'+this.idp).then((response) =>{
           console.log(response.data);
           this.producto = new Producto(this.idp,response.data[0].modelo,response.data[0].marca,response.data[0].descripcion,response.data[0].tipo_producto,response.data[0].stock,response.data[0].precio);
         }).catch(error=>{
           console.log(error);
         })
      },
      */

      nuevoAlumno(){
                    var objeto = {
                        nombre: this.nombre,
                        apellido: this.apellido,
                        documento: this.documento,
                        tipodocumento: this.tipodocumento,
                        direccion:this.direccion,
                        legajo: this.legajo
                    }
                    axios.post('http://localhost:3000/persona',
                    objeto, 
                    { headers: {
                      'Content-Type': 'application/json'
                    },
                    }).then(function(response){
                      console.log(response);
                    })

                    /*
                }else{
                      axios.put('http://localhost:3000/producto/'+ this.idp,
                      this.producto,
                      { headers: {
                        'Content-Type': 'application/json',
                      }
                    }).then(function(response){
                      console.log(response);
                      if (response.data == "OK"){
                        _this.submitted = false;
                        alertEditSuccess();
                      }else {
                        _this.errors.push(response.data.msg);
                      }
                    }).catch(error=>{
                      console.log(error);
                    })
                }
                */
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
