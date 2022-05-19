-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
create database systemp; 
use systemp;

create table empresas (idcliente int primary key auto_increment,
razao_social varchar(50) not null,
cnpj char(14) unique not null,
inscricao_estadual char(9) not null,
contato1_nome varchar(30) not null,
contato1_email varchar (40) not null,
contato1_tel varchar (15) not null,
contato2_nome varchar(30) not null,
contato2_email varchar(40) not null,
contato2_tel varchar(15) not null,
cep char(8) not null,
estado char(2)not null,
cidade varchar (30) not null,
bairro varchar (45) not null,
rua varchar (45) not null,
numero char (5) not null,
complemento varchar (20)
);

select * from empresa;

create table usuario (idcadastro int primary key auto_increment,
Nome_usuario varchar(40),
CNPJ char(14),
email varchar(50),
senha varchar(30),
fk_cliente int,
foreign key (fk_cliente) references empresas (idcliente));

select * from usuario;
desc usuario;

create table maquina(idmaquina int primary key auto_increment,
nome_maquina varchar (25),
temp_max float,
temp_min float,
fk_cliente int,
foreign key (fk_cliente) references empresas (idcliente));

select * from maquina;

create table sensor (idsensor int primary key auto_increment,
fk_maquina int,
foreign key (fk_maquina) references maquina (idmaquina))
auto_increment = 1000;

select * from sensor;
desc sensor;

create table log_temperatura (idregistro int primary key auto_increment,
registro_temp float,
data_hora_registro datetime default current_timestamp,
fk_sensor int,
foreign key (fk_sensor) references sensor (idsensor));

select * from log_temperatura;
desc sensor;

select * from empresas;

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