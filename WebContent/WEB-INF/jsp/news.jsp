<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/news.css?p=${rand}" rel="stylesheet" type="text/css" />
<div class="news" id="news">
	<div class="noti">
		<div class="prev_container">
			<div class="prev pointer icon-arrow" id="prev_noti" style="display: none;"></div>
		</div>
		<div class="news_bg">
			<c:if test="${secciones.size() > 0}">
	  			<img src="${secciones.get(0).RUTA}${secciones.get(0).NOMBRE}?p=${rand}">
	  		</c:if>
		</div>
		<div class="mask">
			<div class="container" id="noticias_container">
			</div>
		</div>
		<div class="next_container">
			<div class="next pointer icon-arrow" id="next_noti" style="display: none;"></div>
		</div>
	</div>
	<div class="detalle_noti" style="display: none;">
	</div>
</div>
<script src="js/news.js?p=${rand}"></script>