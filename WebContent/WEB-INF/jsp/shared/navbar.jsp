<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<link href="css/shared/navbar.css?p=${rand}" rel="stylesheet" type="text/css" />
<div class="nav_bar">
	<div class="nav_logo"></div>
	<div class="nav_menu">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  	<a class="pointer index">
		  		<img src="${ruta_navs}logo.png?p=${rand}" class="logo_portal">
		  		<span class="nombre_portal d-none">SIF</span>
		  	</a>
		  	<div class="nav_buttons">
		  		<button class="btn_hidden pointer d-none d-lg-none d-xl-none admin_btn" type="button" id="btn_admin_2" data-toggle="collapse" data-target="#admin_content" aria-controls="admin_content" aria-expanded="false" aria-label="Toggle navigation">
		    			<img src="img/admin.svg">
	    		</button>
	    		<button class="btn_hidden pointer d-lg-none d-xl-none" type="button" id="btn_open_login_2">
	    			<img src="img/login.svg">
	    		</button>
	    		<button class="btn_hidden pointer d-lg-none d-xl-none" type="button" id="btn_close_login_2" title="Administrador" style="display: none;">
	    			<img src="img/login.svg">
	    		</button>
			  	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    	<span class="navbar-toggler-icon"></span>
			  	</button>
		  	</div>
		  	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		    	<ul class="navbar-nav mr-auto">
		      		<li class="nav-item active">
		        		<a class="nav-link noticias pointer">Noticias</a>
		      		</li>
		      		<li class="nav-item">
		        		<a class="nav-link eventos pointer">Eventos</a>
		      		</li>
		      		<li class="nav-item">
		        		<a class="nav-link documentacion pointer">Documentación</a>
		      		</li>
		      		<li class="nav-item">
		        		<a class="nav-link contacto pointer">Contacto</a>
		      		</li>
		    	</ul>
		    	<form class="form-inline">
		    		<button class="btn_hidden pointer d-none admin_btn" type="button" id="btn_admin_1">
		    			<img src="img/admin.svg">
		    		</button>
		    		<button class="btn_hidden pointer btn_modal_login d-none" type="button" data-toggle="modal" data-target="#exampleModal">
		    		</button>
		    		<button class="btn_hidden pointer" type="button" id="btn_open_login">
		    			<img src="img/login.svg">
		    		</button>
		    		<button class="btn_hidden pointer" type="button" id="btn_close_login" title="Administrador" style="display: none;">
		    			<img src="img/login.svg">
		    		</button>
		    		<div class="logo_alcaldia">
		    			<img src="${ruta_navs}logo_alcaldia.png?p=${rand}">
		    		</div>
		    	</form>
		  	</div>
		  	
		  	<div id="admin_content">
		    	<div class="container">
		    		<div class="row">
		    			
		    		</div>
		    	</div>
		  	</div>
		  	
		  	<div id="logout">
		    	<div class="container">
		    		<div class="row">
		    			<div class="col-12 pointer" id="cambio_clave">
		    				<p data-toggle="modal" data-target="#cambioClaveModal" 
		    				onclick="eval('$(\'#btn_close_login\').click()')">Cambiar Clave</p>
		    			</div>
		    		</div>
		    		<div class="row">
		    			<div class="col-12 pointer" id="cerrar_sesion">
		    				<p>Cerrar sesión</p>
		    			</div>
		    		</div>
		    	</div>
		  	</div>
		</nav>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog nav_dialog" role="document">
    <div class="modal-content nav_modal_content">
      <div class="modal-header nav_modal_header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body nav_modal_body">
      	<div class="container-fluid">
      		<div class="row">
      			<div class="col-12">
      				<div class="form-group">
      					<input type="text" id="txt_usuario" class="form-control" placeholder="Usuario" onkeypress="validar_key(event)">
      				</div>
      			</div>
      			<div class="col-12">
      				<div class="form-group">
      					<input type="password" id="txt_password" class="form-control" placeholder="Clave" onkeypress="validar_key(event)">
      					<div class="infoMayus"><label style="margin-bottom: 0px; color: red;">May&uacute;sculas activadas.</label></div>
      				</div>
      			</div>
      			<div class="col-6">
      				<div class="form-group">
   						<input type="button" id="btn_login" class="btn btnInfo btn-block btn-lg pointer" value="Ingresar">
      				</div>
      			</div>
      			<div class="col-6">
      				<div class="form-group">
   						<input type="button" onclick="registro()" id="btn_registro" data-toggle="modal" class="btn btnInfo btn-block btn-lg pointer" data-target="#registerModal" value="Registrar">
      				</div>
      			</div>
      			<div class="col-12" style="text-align: center;text-decoration-line: underline; font-style: italic; font-size: 14px;">
      				<label style="cursor:pointer;" title="Recuperar" data-toggle="modal" data-target="#recuperarModal"
      				onclick="eval('$(\'#exampleModal .nav_modal_header button\').click()')">
      				Recuperar clave</label>
      			</div>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="cambioClaveModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog nav_dialog" role="document">
    <div class="modal-content nav_modal_content">
      <div class="modal-header nav_modal_header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body nav_modal_body">
      	<div class="container-fluid">
      		<div class="row">
      			<div class="col-12">
      				<div class="form-group">
						<input type="password" id="txt_password_a_cc" class="form-control form-clave" placeholder="Clave actual"/>
      				</div>
      			</div>
      			<div class="col-12">
      				<div class="form-group">
						<input type="password" id="txt_password_n_cc" class="form-control form-clave" placeholder="Clave nueva"/>
      				</div>
      			</div>
      			<div class="col-12">
      				<div class="form-group">
						<input type="password" id="txt_password_rn_cc" class="form-control form-clave" placeholder="Confirmar clave nueva"/>
      				</div>
      			</div>
      			<div class="col-12">
      				<div class="form-group">
   						<input type="button" id="btn_cambiar_clave" class="pointer btn btnInfo btn-block" value="Cambiar">
      				</div>
      			</div>
      			<div class="col-12" style="text-align: center;">
      				<div class="form-group errorCambio"> <label style="color:red"></label> </div>
      			</div>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog nav_dialog_register" role="document">
    <div class="modal-content nav_modal_content_register">
      <div class="modal-header nav_modal_header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body nav_modal_body_register">
      	<div class="container-fluid">
      		<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_documento">Nro Documento *</label>
						<input type="text" id="txt_documento" class="form-control"/>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_nombre">Nombre *</label>
						<input type="text" id="txt_nombre" class="form-control"/>
					</div>
				</div>	
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_apellido">Apellido</label>
						<input type="text" id="txt_apellido" class="form-control"/>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_email">Email *</label>
						<input type="text" id="txt_email" class="form-control"/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_email">Confirmar Email *</label>
						<input type="text" id="txt_email_r" class="form-control"/>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_tel">T&eacute;lefono</label>
						<input type="text" id="txt_tel" class="form-control"/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="cmb_tipo">Tipo Usuario *</label>
						<select id="cmb_tipo" class="form-control" onchange="tipoUsu()">
							<option value=-1>Seleccione</option>
							<option value=1>Externo</option>
							<option value=2>Municipio</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_usu">Usuario *</label>
						<input type="text" id="txt_usu" class="form-control"/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_clave">Clave *</label>
						<input type="password" id="txt_clave" class="form-control"/>
					</div>
				</div>
				<div class="col-12 col-sm-6">
					<div class="form-group">
						<label for="txt_clave_r">Confirmar Clave *</label>
						<input type="password" id="txt_clave_r" class="form-control"/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-12">
					<input type="button" id="btn_registro_g" class="pointer btn btnInfo btn-block">
				</div>
			</div>
			<br>
      	</div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="recuperarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog nav_dialog" role="document">
    <div class="modal-content nav_modal_content">
      <div class="modal-header nav_modal_header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body nav_modal_body">
      	<div class="container-fluid">
      		<div class="row">
      			<div class="col-12">
      				<div class="form-group">
      					<label for="txt_recuperar" style="font-style: italic; color: #8c8c8c;">
      					Se le enviar&aacute;n los pasos a seguir a su email.</label>
      					<input type="text" id="txt_recuperar" class="form-control" placeholder="Email"/>
      				</div>
      			</div>
      			<div class="col-12">
      				<div class="form-group">
      					<input type="button" id="btn_recuperar" class="pointer btn btnInfo btn-block" value="Enviar">
    				</div>
      			</div>
      			<div class="col-12" style="text-align: center;">
      				<div class="form-group errorRecuperar"> <label style="color:red"></label> </div>
      			</div>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>


<script src="js/shared/navbar.js?p=${rand}"></script>

