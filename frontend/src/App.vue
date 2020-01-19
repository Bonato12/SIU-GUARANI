<template>
  <div>
    <b-navbar type="dark" variant="primary">
    <div style="margin-top:30px;">
    <b-navbar-nav>
        <b-nav-item >
            <i class="fas fa-home" style="color:white;"></i>
            <b-link to="/Home" style="color:white;">Home</b-link>
        </b-nav-item>
        <b-nav-item>
            <i class="fas fa-users" style="color:white;"></i>
            <b-link to="/HomePersona" style="color:white;">Alumno</b-link>
        </b-nav-item>
        <b-nav-item>
            <i class="fas fa-chalkboard-teacher" style="color:white;"></i>
            <b-link to="/HomeProfesor" style="color:white;">Profesor</b-link>
        </b-nav-item>
        <b-nav-item>
            <i class="fas fa-school" style="color:white;"></i>
            <b-link to="/HomeCurso" style="color:white;">Curso</b-link>
        </b-nav-item>
       <div>
        <b-dropdown variant="primary">
          <template v-slot:button-content>
            <i class="fas fa-clipboard-list" style="color:white;"></i>
            Insripciones
          </template>
          <b-dropdown-item>
             <b-link to="/Homeinscripcion/curso">Ver Inscripciones de Alumnos</b-link>
          </b-dropdown-item>
          <b-dropdown-item>
             <b-link to="/Home/profesor/curso">Ver Inscripciones de Profesores</b-link>
          </b-dropdown-item>
           <b-dropdown-item>
             <b-link to="/Homeinscripcion/carrera">Ver Inscripcion de Alumnos a Carreras</b-link>
          </b-dropdown-item>
           <b-dropdown-item>
             <b-link to="/Home/profesor/carrera">Ver Inscripcion de Profesores a Carreras</b-link>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      </b-navbar-nav>
    </div>
  </b-navbar>
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
       this.$router.push('/Home');

  }
 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


b-dropdown:hover {
    text-decoration: none;
    color: #fff !important;

}

</style>
