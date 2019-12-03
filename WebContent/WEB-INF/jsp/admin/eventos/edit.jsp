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
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="cmb_subsistema">Subsistema:<span class="txt-warning">*</span></label>
						<select class="form-control requerido" id="cmb_subsistema">
							<option value="0">Seleccione</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="file">Imagen:</label>
						<input type="file" id="file" class="file">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="cmb_tipo">Tipo de Evento:<span class="txt-warning">*</span></label>
						<select class="form-control requerido" id="cmb_tipo">
							<option value="0">Seleccione</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_actividad">Actividad:<span class="txt-warning">*</span></label>
						<input type="text" id="txt_actividad" class="form-control requerido">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_fecha_inicio">Fecha inicio:<span class="txt-warning">*</span></label>
						<input style="background-color: #fff;" type="text" id="txt_fecha_inicio" class="form-control requerido" readonly placeholder="dd/mm/aa">
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_fecha_final">Fecha final:<span class="txt-warning">*</span></label>
						<input style="background-color: #fff;" type="text" id="txt_fecha_final" class="form-control requerido" readonly placeholder="dd/mm/aa">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_hora_inicio">Hora inicio:</label>
						<input type="time" class="form-control n_requerido" id="txt_hora_inicio" value="00:00">
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_hora_final">Hora final:</label>
						<input type="time" class="form-control n_requerido" id="txt_hora_final" value="00:00">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="form-group">
						<label for="txt_descripcion">Descripción:<span class="txt-warning">*</span></label>
						<textarea rows="3" id="txt_descripcion" class="form-control requerido"></textarea>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_lugar">Lugar:<span class="txt-warning">*</span></label>
						<input type="text" class="form-control requerido" id="txt_lugar">
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="row m_t_4 mt_sm_0">
						<div class="col-6">
							<button type="button" id="btn_guardar" class="btn btn_success btn-block pointer">
								Guardar
							</button>
						</div>
						<div class="col-6">
							<button type="button" id="btn_limpiar" class="btn btn_success btn-block pointer">
								Limpiar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<img id="img_container" src="#" style="max-width: 100%; display: none;"/>
				</div>
			</div>
		</div>
		<script src="js/admin/eventos/edit.js?p=${rand}"></script>
	</body>
</html>