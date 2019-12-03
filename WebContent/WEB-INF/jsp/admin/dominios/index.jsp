<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<jsp:include page="../shared/head.jsp"></jsp:include>
		<link href="css/admin/dominios/index.css?p=${rand}" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div class="load_container">
			<div class="load"></div>
		</div>
		<div class="container-fluid pt-3">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="cmb_dominios">Dominio:</label>
						<select id="cmb_dominios" class="form-control">
							<option value="0">Seleccione</option>
						</select>
					</div>
				</div>
				<div class="col-12">
					<hr/>
					<div id="tbl_container"></div>
				</div>
			</div>
		</div>
		<script src="js/admin/dominios/index.js?p=${rand}"></script>
	</body>
</html>