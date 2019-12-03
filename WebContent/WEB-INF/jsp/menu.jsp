<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/menu.css?p=${rand}" rel="stylesheet" type="text/css" />
<div class="menu">
		<div class="content_menu">
			<div class="subcontent_menu">
				<div class="item1">
					<div class="logo">
						<img src="${ruta_menus}am.png?p=${rand}">
					</div>
					<div class="information">
						<div class="text">
							<p id="info_am_1">
								Administrador de Mantenimiento
							</p>
							<p id="info_am_2">
								<a href="" target="_blank">
									Ingresar al Administrador de Mantenimiento
								</a>
							</p>
						</div>
						<span class="btn_menu btn_menu_1" name="AM"><p class="parafo_btn">+</p></span>
						<div class="end"></div>
					</div>
				</div>
				<div class="item2">
					<div class="logo">
						<img src="${ruta_menus}siro.png?p=${rand}" id="imgLogoSiro_1">
						<a href="" target="_blank" id="imgLogoSiro_2">
							<img src="${ruta_menus}siro.png?p=${rand}">
						</a>
					</div>
					<div class="information">
						<div class="text">
							<p id="info_siro_1">
								Sistema de información de registro de obra
							</p>
							<p id="info_siro_2">
								<a href="" target="_blank" id="link_siro">
									Ingresar al Sistema de información de registro de obra
								</a>
							</p>
						</div>
						<span class="btn_menu btn_menu_2" name="Siro"><p class="parafo_btn">+</p></span>
						<div class="end"></div>
					</div>
				</div>
				<div class="item3">
					<div class="logo">
						<img src="${ruta_menus}SIF.png?p=${rand}">
					</div>
					<div class="information">
						<div class="text">
							<p>
								HITOS Secretaría de infraestructura física - 2017
							</p>
						</div>
						<span class="btn_menu btn_menu_3"  name="SIF"><p class="parafo_btn">+</p></span>
						<div class="end"></div>
					</div>
				</div>
				<div class="item4">
					<div class="logo">
						<img src="${ruta_menus}huecosMed.png?p=${rand}">
					</div>
					<div class="information">
						<div class="text">
							<p>
								HuecosMed - Aplicación oficial de la secretaría de infraestructura física de Medellín
							</p>
						</div>
						<span class="btn_menu btn_menu_4"  name="HuecosMed"><p class="parafo_btn">+</p></span>
						<div class="end"></div>
					</div>
				</div>
				<div class="item5">
					<div class="logo">
						<img src="${ruta_menus}sgVial.png?p=${rand}">
					</div>
					<div class="information">
						<div class="text">
							<p>
								Sistema de gestión vial e infraestructura asociada
							</p>
						</div>
						<span class="btn_menu btn_menu_5"  name="SgVial"><p class="parafo_btn">+</p></span>
						<div class="end"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="menu_slide d-lg-none d-xl-none">
			<div class="menu-carousel">
				<div class="contenido">
					<span class="fc-icon fc-icon-left-single-arrow pointer" id="left"></span>
				    <div class="item_1 pointer" name="AM">
				    	<img src="${ruta_menus}am.png?p=${rand}">
				    </div>
				    <div class="item_2 pointer" name="Siro">
				    	<img src="${ruta_menus}siro.png?p=${rand}">
				    </div>
				    <div class="item_3 pointer" name="SIF">
				    	<img src="${ruta_menus}SIF.png?p=${rand}">
				    </div>
				    <div class="item_4 pointer" name="HuecosMed">
				    	<img src="${ruta_menus}huecosMed.png?p=${rand}">
				    </div>
				    <div class="item_5 pointer" name="SgVial">
				    	<img src="${ruta_menus}sgVial.png?p=${rand}">
				    </div>
				    <span class="fc-icon fc-icon-right-single-arrow pointer" id="right"></span>
				   </div>
			</div>
		</div>
</div>

<button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#menu_modal" id="btn_modal_menu">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="menu_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog menu_dialog" role="document">
    <div class="modal-content menu_modal_content">
      <div class="modal-header menu_modal_header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body menu_modal_body">
      	<div class="container">
      		<div id="menu_modal_logo" class="text-center">
      		</div>
      		<h2 id="menu_modal_title"></h2>
      		<div class="row">
      			<div class="col-12" id="menu_modal_contenido">
      			</div>
      			<div class="col-12" id="menu_modal_footer">
      				
      			</div>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>

<script src="js/menu.js?p=${rand}"></script>