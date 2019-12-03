<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/documentation.css?p=${rand}" rel="stylesheet" type="text/css" />
<div class="documentation" id="documentation">
	<div class="documentation_container">
		<div class="prev_container">
			<div class="prev pointer icon-arrow" id="prev_doc" style="display: none;"></div>
		</div>
		<div class="documentation_bg">
		<c:if test="${secciones.size() > 0}">
			<img src="${secciones.get(0).RUTA}${secciones.get(0).NOMBRE}?p=${rand}">
		</c:if>
		</div>
		<div class="mask">
			<div class="container" id="documentacion_container">
			</div>
		</div>
		<div class="next_container">
			<div class="next pointer icon-arrow" id="next_doc" style="display: none;"></div>
		</div>
	</div>
	<div class="detalle_documentation" style="display: none;"></div>
</div>
<script src="js/documentation.js?p=${rand}"></script>