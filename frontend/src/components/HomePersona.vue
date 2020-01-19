<template>
<div>
  <br>
  <div class="container">
    <h3 class="text-primary"> 
        <i class="fas fa-users"></i>
      Alumnos 
    </h3>
    <hr>
    <div v-if="this.productos.length">
      <vue-good-table :columns="columns" :rows="productos" :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Alumno',
                }"
                  :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    perPageDropdown: [3, 7, 9],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'Siguiente',
                    prevLabel: 'Anterior',
                    rowsPerPageLabel: 'Filas por paginas',
                    ofLabel: 'of',
                    pageLabel: 'page',
                    allLabel: 'All',
                    }"
                theme="default">
                <template slot="table-row" slot-scope="props" >
                  <span v-if="props.column.field == 'opciones'">
                    <button @click="verEstado(props.row)" class="btn btn-primary"   title="Ver Info del alumno" >
                        <i class="fas fa-clipboard-list"></i>
                        Info 
                    </button>
                     <button @click="editar(props.row)" class="btn btn-warning"  style="margin-left:2px;" title="Editar Alumno" >
                        <i class="far fa-edit"></i>
                    </button>
                  </span>
                </template>
      </vue-good-table>
    </div>
    <br>
    <router-link to="/nuevoAlumno" tag="button" class="btn btn-primary" title="Ir a Nuevo Producto" style="float:left;">
      <i class="fas fa-plus-circle fa-1x">
      </i>
      Nuevo Alumno
    </router-link>
    <br>

</div>
</div>
</template>

<script>
import axios from 'axios'


export default {
  created() {
    this.getPersona();
  },
  data() {
    return {
      productos: [],
      columns: [
        {
          label: 'DNI',
          field: 'documento',
        },
        {
          label: 'Nombre',
          field: 'nombre'
        }, 
        {
          label: 'Apellido',
          field: 'apellido'
        },
        {
          label: 'Legajo',
          field: 'legajo'
        },
        {
          label: 'Opciones',
          field: 'opciones',
          width: '150px',
        }
      ]
      }
   },
  
 
  methods: {
    getPersona() {
      axios.get('http://localhost:3000/persona').then(response => {
        this.productos = response.data;
      })
    },

    verEstado(alumno){
        //console.log(alumno);
        this.$router.push('/EstadoAcademico/'+alumno.idalumno);
    },

    editar(persona){
        //console.log(alumno);
        this.$router.push('/editarAlumno/'+persona.identificador);
    }

   

  }
}
</script>

<style scoped>


h1,
h2 {
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1000px;
  height: auto;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


.footer{
  background-color:#FEC404; 
  height:90px;
}



.opciones{
  text-align:left !important;
}

@-webkit-keyframes blinker { from { opacity: 1.0; } to { opacity: 0.0; } }

.waitingForConnection { -webkit-animation-name: blinker; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1); -webkit-animation-duration: 1.1s; }


</style>
