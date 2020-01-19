drop table inscripciones_curso;
drop table inscripciones_carrera;
drop table curso_profesor;
drop table carrera;
drop table alumno;
drop table persona;

CREATE TYPE tipo AS ENUM ('CURSANDO','LIBRE', 'REGULAR', 'PROMOCIONADO');

CREATE TABLE persona (
    identificador  SERIAL PRIMARY KEY NOT NULL,
    tipodoc        char(5) NOT NULL,
    documento 	    bigint NOT NULL,    
    nombre       varchar(40) NOT NULL,
    apellido       varchar(40) NOT NULL,
	direccion 		varchar(200) NOT NULL
);

CREATE TABLE alumno (
    identificador  SERIAL PRIMARY KEY NOT NULL,
    idpersona	    integer REFERENCES persona (identificador) UNIQUE,
    legajo 	    integer NOT NULL
);

CREATE TABLE profesor (
    identificador  SERIAL PRIMARY KEY,
    idpersona	    integer REFERENCES persona (identificador) UNIQUE,
    matricula     integer NOT NULL
);

   
CREATE TABLE carrera (
    identificador  SERIAL PRIMARY KEY NOT NULL,
    nombre       varchar(40) NOT NULL,
    descripcion      varchar(250),
    fechadesde		date NOT NULL,
    fechahasta 	date
);
 
CREATE TABLE curso (
    identificador  SERIAL PRIMARY KEY NOT NULL,
    idcarrera 		integer REFERENCES carrera (identificador),
    nombre       varchar(40) NOT NULL,
    descripcion      varchar(250),
    cupomaximo 	smallint NOT NULL,
    anio			smallint NOT NULL    
);

CREATE TABLE inscripciones_carrera(
    idalumno 		integer REFERENCES alumno (identificador) NOT NULL,
    idcarrera		integer REFERENCES carrera (identificador) NOT NULL,
    fechainscripcion	date NOT NULL
);

CREATE TABLE inscripciones_curso(
    idalumno 		integer REFERENCES alumno (identificador) NOT NULL,
    idcurso 		integer REFERENCES curso (identificador) NOT NULL,
    fechainscripcion	date NOT NULL
);

CREATE TABLE curso_profesor(
    idprofesor 		integer REFERENCES profesor (identificador)  NOT NULL,
    idcurso 		integer REFERENCES curso (identificador)  NOT NULL,
    fechainscripcion	varchar(10) NOT NULL DEFAULT to_char(CURRENT_DATE, 'dd-mm-yyyy'),
	CONSTRAINT c_u UNIQUE (idprofesor,idcurso)
);

CREATE TABLE inscripciones_carrera_profesor(
    idprofesor 		integer REFERENCES profesor (identificador) NOT NULL,
    idcarrera 		integer REFERENCES carrera (identificador) NOT NULL,
    fechainscripcion	date NOT NULL
);

CREATE TABLE estado_academico(
    idalumno integer REFERENCES alumno (identificador)  NOT NULL,
    idcurso  integer REFERENCES curso  (identificador)  NOT NULL,
    condicion tipo NOT NULL,
    nota integer NOT NULL
);

-- REALIZAR LOS SIGUIENTES INSERTS ANTES DE CORRER LA APLICACION :)

----- Insert de datos iniciales persona
INSERT INTO persona VALUES (DEFAULT,'DNI', 31565839, 'Florencia', 'Maneiro', 'CDU');
INSERT INTO persona VALUES (DEFAULT,'DNI', 31000123, 'Patricia', 'Brumatti', 'COLON');
INSERT INTO persona VALUES (DEFAULT,'DNI', 20945422, 'Diego', 'Menendez', 'CASEROS');   
INSERT INTO persona VALUES (DEFAULT,'DNI', 30999281, 'Franzo', 'Perez', 'HERRERA');
INSERT INTO persona VALUES (DEFAULT,'DNI', 24112872, 'Leandro', 'Garcia', 'CDU');
INSERT INTO persona VALUES (DEFAULT,'DNI', 33999281, 'Evelyn', 'Bonato', 'HERRERA');
INSERT INTO persona VALUES (DEFAULT,'DNI', 34112872, 'Raul', 'Gonzales', 'ESPAÑA');

----- Insert de datos iniciales alumno
INSERT INTO alumno VALUES (DEFAULT,3, 98734);
INSERT INTO alumno VALUES (DEFAULT,4, 09213);
INSERT INTO alumno VALUES (DEFAULT,1, 35839);
INSERT INTO alumno VALUES (DEFAULT,5, 36299);
INSERT INTO alumno VALUES (DEFAULT,2, 11009);

-- INSERTS DE PROFESOR

INSERT INTO profesor VALUES (DEFAULT,6, 3200);
INSERT INTO profesor VALUES (DEFAULT,7, 3300);


----- Insert de datos iniciales carrera

INSERT INTO carrera VALUES (DEFAULT,'Ingenieria en sistema de información', 'Carrera a fines a programación y desarrollo de software en general','1960-01-01');
INSERT INTO carrera VALUES (DEFAULT,'Ingenieria civil', 'Carrera a fines a construcción, planificación y desarrollo de obras de desarrollo urbano','1980-01-01');

----- Insert de datos iniciales curso


INSERT INTO curso VALUES (DEFAULT,1,'Análisis matemático', 'Curso sobre el desarrollo avanzado de matemáticas', 5,2018);
INSERT INTO curso VALUES (DEFAULT,1,'Diseño de sistemas', 'Curso sobre diseño de componentes de sistemas de software', 3,2018);
INSERT INTO curso VALUES (DEFAULT,1,'Java', 'Curso sobre el lenguaje de programación JAVA', 4,2018);
INSERT INTO curso VALUES (DEFAULT,1,'Base de datos-SQL', 'Curso sobre tipos de base de datos y consultas sql', 10,2018);
INSERT INTO curso VALUES (DEFAULT,2,'Fisica básica', 'Curso sobre fundamentos base de física', 5,2018);
INSERT INTO curso VALUES (DEFAULT,2,'Dibujo', 'Curso sobre dibujo de planos', 10,2018);
    
----- Insert de datos iniciales inscripciones

INSERT INTO inscripciones_carrera VALUES (1,1,'2000-01-01');
INSERT INTO inscripciones_carrera VALUES (2,1,'2003-01-01');
INSERT INTO inscripciones_carrera VALUES (3,1,'2004-01-01');
INSERT INTO inscripciones_carrera VALUES (4,1,'2001-01-01');
INSERT INTO inscripciones_carrera VALUES (4,2,'2000-01-01');
INSERT INTO inscripciones_carrera VALUES (5,2,'2000-01-01');

INSERT INTO inscripciones_curso VALUES (4,1,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (4,2,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (4,3,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (4,4,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (3,1,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (3,2,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (5,5,'2010-01-01');
INSERT INTO inscripciones_curso VALUES (5,6,'2010-01-01');

INSERT INTO curso_profesor VALUES (1,3, '1985-06-28');
INSERT INTO curso_profesor VALUES (2,5, '1985-06-28');
INSERT INTO curso_profesor VALUES (2,2, '1985-06-28');
INSERT INTO curso_profesor VALUES (1,1, '1985-06-28');

INSERT INTO inscripciones_carrera_profesor VALUES(1,1,'1989-12-08');
INSERT INTO inscripciones_carrera_profesor VALUES(1,2,'1989-12-08');
INSERT INTO inscripciones_carrera_profesor VALUES(2,1,'1999-09-08');
INSERT INTO inscripciones_carrera_profesor VALUES(2,2,'1999-09-08');

INSERT INTO estado_academico VALUES (4,1, 'PROMOCIONADO', 8);
INSERT INTO estado_academico VALUES (4,2, 'PROMOCIONADO',6);
INSERT INTO estado_academico VALUES (4,3, 'CURSANDO', 0);
INSERT INTO estado_academico VALUES (3,1, 'CURSANDO', 0);
INSERT INTO estado_academico VALUES (3,2, 'PROMOCIONADO', 7);
INSERT INTO estado_academico VALUES (5,6, 'CURSANDO', 0);

SELECT * FROM estado_academico;
		   