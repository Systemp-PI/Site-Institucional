-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
create database systemp; 
use systemp;

create table empresa (
	idcliente int primary key auto_increment,
	razao_social varchar(50) not null,
	cnpj char(14) unique,
	inscricao_estadual char(9),
	contato_nome varchar(30),
	contato2_nome varchar(30),
	contato_email varchar(40),
	contato_tel varchar(15),
	estado char(2),
	cidade varchar (30)
	);

create table usuario (
	idcadastro int primary key auto_increment,
	Nome_usuario varchar(40),
	CNPJ char(14),
	email varchar(50),
	senha varchar(30),
	fk_cliente int,
	foreign key (fk_cliente) references empresa (idcliente)
	);

create table sensor (
	idsensor int primary key auto_increment,
	local_maquina varchar(30),
	temp_min char(4),
	temp_max char(4),
	fk_empresa int,
	foreign key (fk_empresa) references empresa (idcliente)
	)auto_increment = 1000;

create table log_temperatura (
	idregistro int primary key auto_increment,
	registro_temp char(4),
	data_hora_registro datetime default current_timestamp,
	fk_sensor int,
	foreign key (fk_sensor) references sensor (idsensor)
	);

create table colaboradores (
	idcolaborador int primary key auto_increment,
	nome_colaborador varchar(50),
	cpf char(14),
	cargo varchar (45),
	chefe varchar(45),
	fk_chefe int,
	foreign key (fk_chefe) references colaboradores (idcolaborador)
	);

/* para sql server - remoto - produção */

create table empresa (
	idcliente int primary key auto_increment,
	razao_social varchar(50) not null,
	cnpj char(14) unique,
	inscricao_estadual char(9),
	contato_nome varchar(30),
	contato2_nome varchar(30),
	contato_email varchar(40),
	contato_tel varchar(15),
	estado char(2),
	cidade varchar (30)
	);

create table usuario (
	idcadastro int primary key auto_increment,
	Nome_usuario varchar(40),
	CNPJ char(14),
	email varchar(50),
	senha varchar(30),
	fk_cliente int,
	foreign key (fk_cliente) references empresa (idcliente)
	);

create table sensor (
	idsensor int primary key auto_increment,
	local_maquina varchar(30),
	temp_min char(4),
	temp_max char(4),
	fk_empresa int,
	foreign key (fk_empresa) references empresa (idcliente)
	)auto_increment = 1000;

create table log_temperatura (
	idregistro int primary key auto_increment,
	registro_temp char(4),
	data_hora_registro datetime default current_timestamp,
	fk_sensor int,
	foreign key (fk_sensor) references sensor (idsensor)
	);

create table colaboradores (
	idcolaborador int primary key auto_increment,
	nome_colaborador varchar(50),
	cpf char(14),
	cargo varchar (45),
	chefe varchar(45),
	fk_chefe int,
	foreign key (fk_chefe) references colaboradores (idcolaborador)
	);