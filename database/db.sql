
DROP DATABASE ieamysql;

CREATE DATABASE ieamysql;

USE ieamysql;

CREATE TABLE customer(
    id  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    contrasena varchar(20) NOT NULL,
    role ENUM('admin', 'investigador') NOT NULL
);

CREATE TABLE admin(
    id_a  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    contrasena varchar(20) NOT NULL
);

CREATE TABLE equipo(
    id_e  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    No_serie varchar(15) NOT NULL
);

CREATE TABLE componente(
    id_c  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    valor VARCHAR(10) NOT NULL,
    cantidad int(10) NOT NULL
);

CREATE TABLE prestamo(
    id_p  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    investigador_id INT(6) UNSIGNED,
	equipos_id INT(6) UNSIGNED,
	FOREIGN KEY (investigador_id) REFERENCES customer(id),
	FOREIGN KEY (equipos_id) REFERENCES equipo(id_e)
);






DROP TABLE prestamo;
SHOW TABLES;
describe componente;

select * from prestamo;

INSERT INTO equipo (nombre, descripcion, No_serie)
VALUES ('Osciloscopio 4MHz', 'Prueba del equipo OK', 'HAD123');

-- Suma o resta de componentes
UPDATE componente
SET cantidad = cantidad + 1 WHERE id_c = 2;




	