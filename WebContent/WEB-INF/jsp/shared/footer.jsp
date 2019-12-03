<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/shared/footer.css?p=${rand}" rel="stylesheet" type="text/css" />
<footer>
	<div class="row align-items-center footer_row">
		<div class="col-md-8 information_footer d-none d-sm-none d-md-block d-lg-block d-xl-block text-left">
		</div>
		<div class="offset-md-2 col-md-2 social">
			<div class="social_container">
				<a href="" target="_blank" id="facebook">
					<img src="${ruta_footer}facebook.png?p=${rand}" />
				</a>
				<a href="" target="_blank" id="youtube">
					<img src="${ruta_footer}youtube.png?p=${rand}" />
				</a>
				<a href="" target="_blank" id="twitter">
					<img src="${ruta_footer}twitter.png?p=${rand}" />
				</a>
				<a href="" target="_blank" id="instagram">
					<img src="${ruta_footer}instagram.png?p=${rand}" />
				</a>
			</div>
		</div>
	</div>
</footer>
<script src="js/shared/footer.js?p=${rand}"></script>