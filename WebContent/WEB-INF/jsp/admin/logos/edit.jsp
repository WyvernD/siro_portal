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
		<div class="container-fluid pt-2 pb-2">
			<label>Los campos marcados con * son obligatorios.</label>
			<div class="row">
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="txt_ancho">Ancho</label>
						<input type="text" class="form-control requerido" id="txt_ancho" readonly="readonly">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="txt_alto">Alto</label>
						<input type="text" class="form-control requerido" id="txt_alto" readonly="readonly">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="file_imagen">Imagen *</label>
						<input type="file" class="file" id="file_imagen">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="txt_descripcion">Descripción</label>
						<input type="text" class="form-control nRequerido" id="txt_descripcion">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-check">
  						<label class="form-check-label">
    						<input class="form-check-input nRequerido" type="checkbox" value="1" id="cb_publico">
    						¿Es público?
  						</label>
					</div>
				</div>
				<div class="col-sm-4 col-12 m_t_4 mt_sm_0">
					<div class="form-group">
						<input type="button" value="Guardar" id="btn_guardar" class="btn btn_success btn-block pointer">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<img id="img_container" src="#" style="max-width: 100%; display: none;"/>
				</div>
			</div>
		</div>
		<script src="js/admin/logos/edit.js?p=${rand}"></script>
	</body>
</html>











