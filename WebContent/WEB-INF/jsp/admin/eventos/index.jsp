<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<jsp:include page="../shared/head.jsp"></jsp:include>
<%-- 		<link href="css/admin/eventos/index.css?p=${rand}" rel="stylesheet" type="text/css" /> --%>
	</head>
	<body>
		<div class="load_container">
			<div class="load"></div>
		</div>
		<div class="container-fluid pt-2">
			<div class="form_header">
				<div class="row">
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="cmb_subsistema">Subsistema: </label>
							<select class="form-control where" id="cmb_subsistema" name="E.FK_IDSUBSISTEMA">
								<option value="0">Seleccione</option>
							</select>
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="txt_lugar">Lugar:</label>
							<input type="text" class="form-control where" id="txt_lugar" name="E.LUGAR">
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="cmb_tipo">Tipo de Evento: </label>
							<select class="form-control where" id="cmb_tipo" name="E.FK_IDTIPOEVENTO">
								<option value="0">Seleccione</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="txt_fecha_inicio">Fecha inicio:</label>
							<input type="text" class="form-control where" id="txt_fecha_inicio" readonly name="E.FECHAINICIO" placeholder="dd/mm/aa" style="background-color: #fff;">
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="txt_fecha_fin">Fecha final:</label>
							<input type="text" class="form-control where" id="txt_fecha_fin" readonly name="E.FECHAFIN" placeholder="dd/mm/aa" style="background-color: #fff;">
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="txt_actividad">Actividad:</label>
							<input type="text" class="form-control where" id="txt_actividad" name="E.ACTIVIDAD">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-sm-4">
						<div class="row">
							<div class="col-6">
								<input type="button" value="Buscar" id="btn_buscar" class="pointer btn btn_success btn-block">
							</div>
							<div class="col-6">
 								<input type="button" value="Nuevo" id="btn_nuevo" class="pointer btn btn_success btn-block">
							</div>
						</div>
					</div>
				</div>
				<hr/>
				<div class="table-responsive">
					<table class="table table-striped" id="tbl_eventos">
						<thead>
							<tr>
								<th>Subsistema</th>
								<th>Fecha Inicio</th>
								<th>Fecha Final</th>
								<th>Tipo Evento</th>
								<th>Actividad</th>
								<th>Lugar</th>
								<th>Público</th>
								<th width="40">Editar</th>
								<th width="40">Eliminar</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<script src="js/admin/eventos/index.js?p=${rand}"></script>
	</body>
</html>