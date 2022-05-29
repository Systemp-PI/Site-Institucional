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

select * from empresas;

create table usuario (idcadastro int primary key auto_increment,
Nome_usuario varchar(40),
CNPJ char(14),
email varchar(50),
senha varchar(30),
fk_cliente int,
foreign key (fk_cliente) references empresas (idcliente),
fk_admin int,
foreign key (fk_admin) references usuario (idcadastro));

select * from usuario;
desc usuario;

create table maquina(idmaquina int primary key auto_increment,
nome_maquina varchar (25),
temp_max float,
temp_min float,
fk_cliente int,
foreign key (fk_cliente) references empresas (idcliente));

insert into maquina values (null, 'maquina 1', 40, 20, 1);

select * from maquina;
select * from log_temperatura;

create table log_temperatura (idregistro int primary key auto_increment,
registro_temp float,
data_hora_registro datetime default current_timestamp,
fk_maquina int,
foreign key (fk_maquina) references maquina (idmaquina));
select * from log_temperatura where fk_maquina= 1;

select registro_temp, 
	DATE_FORMAT(data_hora_registro,'%H:%i:%s') as data_hora_registro,
     fk_maquina, nome_maquina
      from log_temperatura
       join maquina on fk_maquina = idmaquina
		where fk_maquina = 1
		order by idregistro ;

select * 
from maquina 
join log_temperatura 
on fk_maquina = idmaquina;

insert into log_temperatura values (null,42,default,1);

SELECT * FROM maquina 
        join log_temperatura on fk_maquina = idMaquina;
        truncate table log_temperatura;