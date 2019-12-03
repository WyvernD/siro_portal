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
		<div class="container-fluid pt-3">
			<div class="form_header">
				<div class="row">
					<div class="col-12 col-sm-6">
						<div class="form-group">
							<label for="cmb_seccion" class="txt_success">Sección *</label>
							<select class="form-control" id="cmb_seccion">
								<option value="0">Seleccione</option>
							</select>
						</div>
					</div>
					<div class="col-12 col-sm-6">
						<div class="form-group">
							<label for="cmb_subseccion" class="txt_success">Subsección *</label>
							<select class="form-control" id="cmb_subseccion" disabled>
								<option value="0">Seleccione</option>
							</select>
						</div>
					</div>
					<div class="col-12">
						<div class="form-group">
							<label for="txt_descripcion" class="txt_success">Descripción *</label>
							<textarea rows="5" id="txt_descripcion" class="form-control"></textarea>
						</div>
					</div>
					<div class="col-12 col-sm-3">
						<input type="button" value="Guardar" id="btn_guardar" class="disabled btn btn_success btn-block" disabled>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="js/vendor/ckeditor/ckeditor.js"></script>
		<script src="js/admin/contenidos/index.js?p=${rand}"></script>
	</body>
</html>