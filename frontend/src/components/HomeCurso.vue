<template>
<div>
  <br>
  <div class="container">
    <h3 class="text-primary"> 
      <i class="fas fa-school"></i>
      Cursos 
    </h3>
    <hr>
    <div v-if="this.cursos.length">
      <vue-good-table :columns="columns" :rows="cursos" :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Buscar Cursos',
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
                    <button @click="detalles(props.row)" class="btn btn-info" style="width:150px;"  title="Ver Mas" >
                        <i class="fas fa-clipboard-list"></i>
                        Detalles 
                    </button>
                  </span>
                </template>
               
      </vue-good-table>
    </div>
    <br>
</div>
</div>
</template>

<script>
import axios from 'axios'


export default {
  created() {
    this.getCurso();
  },
  data() {
    return {
      cursos: [],
      columns: [
        {
          label: 'Curso',
          field: 'nombre',
        },
        {
          label: 'Descripcion',
          field: 'descripcion',
        },
        {
          label: 'Año',
          field: 'anio',
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
    getCurso() {
      axios.get('http://localhost:3000/curso').then(response => {
        this.cursos = response.data;
      })
    },

    detalles(curso){
        this.$router.push('/buscarCurso/'+curso.identificador);
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
