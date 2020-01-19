import HomePersona from './components/HomePersona.vue'
import Home from './components/Home.vue'
import HomeProfesor from './components/HomeProfesor.vue'
import HomeCurso from './components/HomeCurso.vue'
import FormularioAlumno from './components/FormularioAlumno.vue'
import BuscarCurso from './components/BuscarCurso.vue'
import EstadoAcademico from './components/EstadoAcademico.vue'
import NuevoEstadoAcademico from './components/NuevoEstadoAcademico.vue'
import FormularioInscripcion from './components/FormularioInscripcion.vue'
import FormularioInscripcionCarrera from './components/FormularioInscripcionCarrera.vue'
import HomeInscripcionCurso from './components/HomeInscripcionCurso.vue'
import HomeInscripcionCarrera from './components/HomeInscripcionCarrera.vue'
import HomeInscripcionProfesorCurso from './components/HomeInscripcionProfesorCurso.vue'
import HomeInscripcionProfesorCarrera from './components/HomeInscripcionProfesorCarrera.vue'


import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);




const rutas = new VueRouter({

            routes: [
            {
                path:'/Home',
                name: 'Home',
                component:Home,
            },
            {
              path:'/HomePersona',
              name: 'HomePersona',
              component:HomePersona,
            },
            {
              path:'/nuevoAlumno',
              name: 'nuevoAlumno',
              component:FormularioAlumno,
            },
            {
              path:'/editarAlumno/:id',
              name: 'editarAlumno',
              component:FormularioAlumno,
            },
            {
                path:'/HomeProfesor',
                name: 'HomeProfesor',
                component:HomeProfesor,
              },
            
              {
                path:'/HomeCurso',
                name: 'HomeCurso',
                component:HomeCurso,
              },
            {
                path:'/buscarCurso/:id',
                name: 'buscarCurso',
                component:BuscarCurso,
            },
            {
                path:'/EstadoAcademico/:id',
                name: 'EstadoAcademico',
                component: EstadoAcademico
            },
            {
              path:'/estado/:idalumno/:idcurso',
              name: 'NuevoEstadoAcademico',
              component: NuevoEstadoAcademico
            },
            {
                path:'/inscripcion/curso',
                name: 'inscripcion',
                component: FormularioInscripcion
            },
            {
              path:'/Homeinscripcion/curso',
              name: 'HomeinscripcionCurso',
              component: HomeInscripcionCurso
         },
         {
            path:'/Homeinscripcion/carrera',
            name: 'Homeinscripcioncarrera',
            component: HomeInscripcionCarrera
         },
         {
              path:'/inscripcion/carrera',
              name: 'inscripcionCarrera',
              component: FormularioInscripcionCarrera
         },
         {
            path:'/Home/profesor/curso',
            name: 'HomeinscripcionCursoProfesor',
            component: HomeInscripcionProfesorCurso
         },
         {
            path:'/Home/profesor/carrera',
            name: 'HomeinscripcionCarreraProfesor',
            component: HomeInscripcionProfesorCarrera
         },
         ]
})



export default rutas;
