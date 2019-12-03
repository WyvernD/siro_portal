<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<jsp:include page="../shared/head.jsp"></jsp:include>
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
							<label for="cmb_subsistema">Subsistema:</label>
							<select class="form-control where" id="cmb_subsistema" name="NP.FK_IDSUBSISTEMA">
								<option value="0">Seleccione</option>
							</select>
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="txt_titulo">Titulo:</label>
							<input type="text" class="form-control where" id="txt_titulo" name="NP.TITULONOTICIA">
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="txt_fecha">Fecha:</label>
							<input type="text" class="form-control where" id="txt_fecha" readonly name="NP.FECHA" placeholder="dd/mm/aa" style="background-color: #fff;">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="cmb_tipo">Tipo:</label>
							<select class="form-control where" id="cmb_tipo" name="NP.TIPO">
								<option value="0">Seleccione</option>
								<option value="1">Documentación</option>
								<option value="2">Noticia</option>
							</select>
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="row mt_sm_0" style="margin-top: 1.6rem;">
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
					<table class="table table-striped" id="tbl_noti_publi">
						<thead>
							<tr>
								<th>Subsistema</th>
								<th>Titulo</th>
								<th>Fecha</th>
								<th>Ver Documento</th>
								<th>Ver Imagen</th>
								<th>Público</th>
								<th width="50">Editar</th>
								<th width="50">Eliminar</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<script src="js/admin/notis_and_publics/index.js?p=${rand}"></script>
	</body>
</html>