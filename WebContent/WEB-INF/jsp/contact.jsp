<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/contact.css?p=${rand}" rel="stylesheet" type="text/css" />

<div class="contact" id="contact">
	<div class="contact_bg">
	<c:if test="${secciones.size() > 0}">
		<img src="${secciones.get(0).RUTA}${secciones.get(0).NOMBRE}?p=${rand}">
	</c:if>
	</div>
	<div class="mask">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div id='contact' class="contacto">
						<div class="container">
							<div class="row">
								<div class="col-12">
									<h1 class="text-center title">Contacto</h1>
									<div class="information_contacto"></div>
								</div>
							</div>
							<div class="row">
								<div class="col-12">
									<div class="row">
										<div class="col-6">
											<a href="https://www.medellin.gov.co/irj/portal/medellin?NavigationTarget=navurl://0d1d895fa06d599590df8ad88f5bd3b3" class="btn btn_success btn-block pointer" target="_blank">Chat</a>
										</div>
										<div class="col-6">
											<a href="https://www.medellin.gov.co/mercurio/inicialPqr.jsp" class="btn btn_success btn-block pointer" target="_blank">PQRS</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mt-lg-0 mt-xl-0 mt-2 d-none">
					<div id='links' class="links">
						<div class="container">
							<h1 class="text-center title">Enlaces</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="js/contact.js?p=${rand}"></script>