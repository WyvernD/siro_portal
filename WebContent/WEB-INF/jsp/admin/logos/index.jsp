<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<jsp:include page="../shared/head.jsp"></jsp:include>
		<link href="css/admin/logos/index.css?p=${rand}" rel="stylesheet" type="text/css" />
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
							<label for="txt_name">Nombre</label>
							<input type="text" class="form-control where" id="txt_name" placeholder="Nombre" name="L.NOMBRE_LOGO">
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<div class="form-group">
							<label for="cmb_section">Sección</label>
							<select class="form-control where" id="cmb_section" name="L.FK_IDSECCION">
								<option value="0">Seleccione</option>
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
					<table class="table table-striped" id="tbl_logos">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Sección</th>
								<th width="40">Editar</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<script src="js/admin/logos/admin.js?p=${rand}"></script>
	</body>
</html>