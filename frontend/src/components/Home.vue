<template>
<div>
  <br>
  <div class="container">
    <h3 class="text-primary"> 
      <i class="fas fa-home"></i>
      Bienvenido 
    </h3>
    <hr>
    
</div>
</div>
</template>

<script>


export default {
  created() {
    this.getCurso();
  },
  data() {
    return {
     
      }
   },
  
 
  methods: {
   
  

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
