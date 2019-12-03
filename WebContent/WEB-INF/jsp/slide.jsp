<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/slide.css?p=${rand}" rel="stylesheet" type="text/css" />
<div class="index_slide" id="header">
	<div class="owl-carousel owl-theme">
		<c:forEach items="${banners}" var="banner" varStatus="i">
			<div class="item">
		    	<img src="${banner.RUTA}${banner.NOMBRE}?p=${rand}">
		    </div>
		</c:forEach>
	</div>
</div>
<script src="js/slide.js?p=${rand}"></script>