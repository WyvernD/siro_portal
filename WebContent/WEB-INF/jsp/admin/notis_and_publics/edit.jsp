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
			<div id="editor" style="display: none;"></div>
			<div class="row">
				<div class="col-12 col-sm-4">
					<div class="form-group">
						<label for="cmb_tipo">Tipo*:</label>
						<select class="form-control requerido" id="cmb_tipo">
							<option value="0">Seleccione</option>
							<option value="1">Documentación</option>
							<option value="2">Noticia</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-sm-4">
					<div class="form-group">
						<label for="txt_titulo">Titulo*:</label>
						<input type="text" class="form-control requerido" id="txt_titulo">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="file_imagen">Imagen</label>
						<input type="file" id="file_imagen" class="file">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="file_imagen_mini">Imagen Miniatura (500px * 500px)</label>
						<input type="file" id="file_imagen_mini" class="file">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="txt_link">Link</label>
						<input type="text" class="form-control n_requerido" id="txt_link" placeholder="http://">
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="file_imagen_mini">Documento</label>
						<input type="file" id="file_documento" class="file">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="txt_entrada">Entrada*:</label>
						<textarea rows="4" class="form-control requerido" id="txt_entrada" maxlength="100"></textarea>
					</div>
				</div>
				<div class="col-sm-4 col-12">
					<div class="form-group">
						<label for="txt_cuerpo">Cuerpo*:</label>
						<textarea rows="4" class="form-control requerido" id="txt_cuerpo"></textarea>
					</div>
				</div>
				<div class="col-12 col-sm-4">
					<div class="form-group">
						<label for="cmb_subsistema">Subsistema*:</label>
						<select class="form-control requerido" id="cmb_subsistema">
							<option value="0">Seleccione</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-4">
					<div class="form-group">
						<label for="txt_fecha">Fecha*:</label>
						<input type="text" class="form-control requerido" id="txt_fecha" readonly placeholder="dd/mm/aa" style="background-color: #fff;">
					</div>
				</div>
				<div class="col-sm-4 col-12 m_t_4 mt_sm_0">
					<div class="form-group">
						<input type="button" value="Guardar" id="btn_guardar" class="btn btn_success btn-block pointer">
					</div>
				</div>
			</div>
		</div>
		<script src="js/admin/notis_and_publics/edit.js?p=${rand}"></script>
	</body>
</html>











