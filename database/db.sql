
CREATE DATABASE ieamysql;

USE ieamysql;

CREATE TABLE investigadores(
    id_i  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    contrasena varchar(20) NOT NULL
);

CREATE TABLE customer(
    id  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    contrasena varchar(20) NOT NULL
);

CREATE TABLE admin(
    id_a  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    contrasena varchar(20) NOT NULL
);

CREATE TABLE equipos(
    id_e  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE componentes(
    id_c  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    valor VARCHAR(100) NOT NULL,
    cantidad int(10) NOT NULL
);

CREATE TABLE prestamos(
    id_p  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    investigador_id INT(6) UNSIGNED,
	equipos_id INT(6) UNSIGNED,
	FOREIGN KEY (investigador_id) REFERENCES investigadores(id_i),
	FOREIGN KEY (equipos_id) REFERENCES equipos(id_e)
);






DROP TABLE customer;
SHOW TABLES;
describe customer;
	