$(document).ready(function()
		{
	autenticacion();
	// Eventos botones
	eventos_botones();
	// Eventos menu
	eventos_menu();

		});

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para válidar el "ENTER" en el formulario de login.
 * Fecha creación:			2018/01/25.
 * Fecha modificación:		2018/05/04.
 * */
function validar_key(e)
{
	if (e.keyCode === 13)
	{
		login();
	}

	var kCode = e.keyCode ? e.keyCode : e.which;
	var sKey = e.shiftKey ? e.shiftKey : ( (kCode==16) ? true:false);
	if(((kCode>=65&&kCode<=90)&&!sKey)||((kCode>=97&&kCode<=122)&&sKey ))
	{
		$(".infoMayus").css({"display":"block"}).animate({ opacity: 1 }, 250, function(){});
	} 
	else
	{
		$(".infoMayus").css({"display":"none"}).animate({ opacity: 0 }, 250, function(){});
	}
}

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para válidar el usuario y sus permisos.
 * Fecha creación:			2018/01/01.
 * Fecha modificación:		2018/02/09.
 * */
function autenticacion()
{	
	var strToken = parent.consultarToken();

	if (strToken != null)
	{
		try
		{
			var str_where = '';
			var perfil = consultar_perfil(strToken);


			str_where = ' or dfp.ID_PERFIL in (' + perfil.map(function(elem)
					{
				return elem.idPerfil;
					}).join(",")+") and fp.MENU = 1";

			var obj_consulta = {'SQL' : 'SQL_CONSULTAR_FORMULARIO_PORTAL', 'N' : 1, 'DATOS' : {'P1' : str_where + ''}}
			var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
			var space = '<hr/>';

			for (var i = 0; i < obj_rs.length; i++)
			{
				var obj = encode64(JSON.stringify(obj_rs[i]));
				if (i == (obj_rs.length -1))
				{
					space = '';
				}

				var html =
					'<div class="col-12 item_admin pointer" onclick="abrir_formulario_admin(\'' + obj + '\')">' +
					'<p style="font-size: 14px;">' +
					'<span class="link_admin_span ' + obj_rs[i].ICONO + '"></span>' +
					'<span style="vertical-align: bottom;">' + obj_rs[i].NOMBRE + '</span>' +
					'</p>' +
					space +
					'</div>';

				// $('#admin_content .container .row').empty();
				$('#admin_content .container .row').append(html);
			}

			$('#info_siro_1').hide();
			$('#info_siro_2').show();
			$('#imgLogoSiro_1').hide();
			$('#imgLogoSiro_2').show();
			$('#info_am_1').hide();
			$('#info_am_2').show();

			if (obj_rs.length > 0)
			{
				$('.nav_bar .nav_buttons .admin_btn').removeClass('d-none');
				$('.nav_bar .form-inline .admin_btn').addClass('d-lg-block d-xl-block');
			}

			$( "#btn_open_login").hide();
			$( "#btn_open_login_2").hide();
			$( "#btn_close_login").show();
			$( "#btn_close_login_2").show();
		}
		catch (e)
		{
			parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
			return;
		}
	}
	else
	{
		$('#info_siro_1').show();
		$('#info_siro_2').hide();
		$('#imgLogoSiro_1').show();
		$('#imgLogoSiro_2').hide();
		$('#info_am_1').show();
		$('#info_am_2').hide();
		$('.nav_bar .nav_buttons .admin_btn').addClass('d-none');
		$('.nav_bar .form-inline .admin_btn').removeClass('d-lg-block d-xl-block');
		$( "#btn_open_login").show();
		$( "#btn_open_login_2").show();
		$( "#btn_close_login").hide();
		$( "#btn_close_login_2").hide();
		return;
	}
}

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para consultar los perfiles asociados al usuario.
 * Fecha creación:			2018/02/08.
 * Fecha modificación:		2018/02/08.
 * */
function consultar_perfil(token)
{
	var resultado = 0;

	$.ajax(
			{
				'url' : './consultar_perfil.hyg',
				'type' : 'POST',
				'data' : 
				{
					token: encode64(token)
				},
				'async' : false,
				'success' : function(result)
				{
					resultado = result;
				},
				'error' : function(objError)
				{
					resultado = -2;
				}
			});

	return resultado;
}

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para asignar eventos a los botones.
 * Fecha creación:			2018/01/01.
 * Fecha modificación:		2018/02/09.
 * */
function eventos_botones()
{
	$('#btn_open_login').on('click', function()
			{
		$('.btn_modal_login').click();
			});
	$('#btn_open_login_2').on('click', function()
			{
		$('.btn_modal_login').click();
			});
	$('#btn_login').on('click', function()
			{
		// Login
		login();
			});
	$('#btn_registro').on('click', function()
			{
		// Registro
		registro();
			});
	$('#btn_recuperar').on('click', function()
			{
		// Recuperar Usuario
		recuperarClave();
			});
	$('#cmb_tipo').on('change', function ()
			{
		//advertencia de usuario
		if($('#cmb_tipo').val() == 2)
		{
			parent.msgInformacion("Recuerde que el usuario ingresado debe ser el mismo que el del Directorio Activo.");
		}
			});
	$('#btn_registro_g').on('click', function ()
			{
		//Guardar usuario
		guardarRegistro();
			});

	$('.admin_btn').on('click', function()
			{
		$('#logout').hide();
		$('#admin_content').slideToggle('fast');
			});
	$('#btn_close_login').on('click', function()
			{
		$('#admin_content').hide();
		$('#logout').slideToggle('fast');
			});
	$('#btn_close_login_2').on('click', function()
			{
		$('#admin_content').hide();
		$('#logout').slideToggle('fast');
			});
	$('#cerrar_sesion').on('click', function()
			{
		logout();
			});
	$('#btn_cambiar_clave').on('click', function()
			{
		cambiarClave();
			});
}

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para procesar el objeto de formularios y abrirlo.
 * Fecha creación:			2018/02/09.
 * Fecha modificación:		2018/02/09.
 * */
function abrir_formulario_admin(obj)
{
	obj = JSON.parse(convertir_cadena_db(decode64(obj)));
	$('body').addClass('no_scroll');
	$('#admin_content').hide();
	abrir_modal_admin(obj, true);
}

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para iniciar sesión.
 * Fecha creación:			2018/01/01.
 * Fecha modificación:		2018/01/01.
 * */
function login()
{    
	var psw = encode64($("#txt_password").val());
	var idp = encode64($("#txt_usuario").val());

	var url = "/mapgis/Validacion.do";

	$.ajax(
			{
				"url": url,
				"type": "POST",
				"data":
				{
					"id_Persona": idp,
					"password": psw
				},
				"success": function(respuesta)
				{
					if (respuesta == "1")
					{
						$('.nav_modal_header > button').click();
						autenticacion();
					}
					else
					{
						parent.msgAdvertencia("Usuario o clave no validos");
					}
				},
				"error": function(xhr, status, err)
				{
					parent.msgError("Hubo problemas con la peticion");
				}
			});
}

/*
 * Autor:					Duberney Martinez.<br>
 * Descripción:				Se usa para limpiar campos del modal de registro.<br>
 * Fecha creación:			2018/04/06.<br>
 * Fecha modificación:		2018/04/06.
 * */
function registro()
{
	$("#registerModal input").val("");
	$("#registerModal #btn_registro_g").val("Registrarme");
	$("#registerModal select").val(-1);
	$("#registerModal #txt_clave").prop("disabled", true);
	$("#registerModal #txt_clave_r").prop("disabled", true); 
}

/*
 * Autor:					Duberney Martinez.<br>
 * Descripción:				Se usa para habilitar los campos de clave de registro de usuario.<br>
 * Fecha creación:			2018/04/09.<br>
 * Fecha modificación:		2018/04/09.
 * */
function tipoUsu()
{
	if($("#registerModal #cmb_tipo").val() == 1)
	{
		$("#registerModal #txt_clave").prop("disabled", false);
		$("#registerModal #txt_clave_r").prop("disabled", false);
	}
	else
	{
		$("#registerModal #txt_clave").prop("disabled", true);
		$("#registerModal #txt_clave").val("");
		$("#registerModal #txt_clave_r").prop("disabled", true);
		$("#registerModal #txt_clave_r").val("");
	}
}

/*
 * Autor:					Duberney Martinez.<br>
 * Descripción:				Se usa guardar el registro del usuario nuevo.<br>
 * Fecha creación:			2018/04/09.<br>
 * Fecha modificación:		2018/04/09.
 * */
function guardarRegistro()
{
	var msj = "";

	if($.trim($("#registerModal #txt_documento").val()) == "")
	{
		msj += "Debe ingresar el Documento. <br>";
	}

	if($.trim($("#registerModal #txt_nombre").val()) == "")
	{
		msj += "Debe ingresar el Nombre. <br>"
	}

	if($.trim($("#registerModal #txt_email").val()) == "")
	{
		msj += "Debe ingresar el Email. <br>";
	}
	else
	{
		msj += validarEmail($.trim($("#registerModal #txt_email").val()));
	}

	if($.trim($("#registerModal #txt_email").val()) != $.trim($("#registerModal #txt_email_r").val()))
	{
		msj += "Email no coincide. <br>";
	}

	if($.trim($("#registerModal #txt_usu").val()) == "")
	{
		msj += "Debe ingresar el Usuario. <br>";
	}

	if($("#registerModal #cmb_tipo").val() == -1)
	{
		msj += "Debe seleccionar el Tipo de Usuario. <br>";
	}

	if($("#registerModal #cmb_tipo").val() == 1)
	{
		if($.trim($("#registerModal #txt_clave").val()) == "")
		{
			msj += "Debe ingresar la Clave. <br>";
		}
		if($.trim($("#registerModal #txt_clave").val()) != $.trim($("#registerModal #txt_clave_r").val()))
		{
			msj += "Clave no coincide. <br>";
		}
	}

	if(msj != "")
	{
		parent.msgAdvertencia(msj);
	}
	else
	{

		var obj_consulta = {
				'SQL' : 'SQL_SELECT_USUARIO_DOCUMENTO', 'N' : 1, 'DATOS' : {'P1' : $.trim($("#registerModal #txt_documento").val()) + ''}
		};
		var resultado = send_query_usuario('./consultar_datos_usuario.hyg', obj_consulta);

		if(resultado == -1)
		{
			parent.msgAdvertencia("Hubo problemas con la petici\u00F3n.");
		}
		else if(resultado == 0)
		{
			parent.msgAdvertencia("Hubo problemas con la validaci\u00F3n.");
		}
		else 
		{

			if(resultado.length > 0)
			{
				parent.msgAdvertencia("El documento ya existe. Por favor comuniquese con el administrador del sistema.")
			}
			else
			{

				var obj_consulta = {
						'SQL' : 'SQL_SELECT_USUARIO_IDENTIFICADOR', 'N' : 1, 'DATOS' : {'P1' : $.trim($("#registerModal #txt_usu").val()) + ''}
				};
				var resultado = send_query_usuario('./consultar_datos_usuario.hyg', obj_consulta);

				if(resultado == -1)
				{
					parent.msgAdvertencia("Hubo problemas con la petici\u00F3n.");
				}
				else if(resultado == 0)
				{
					parent.msgAdvertencia("Hubo problemas con la validaci\u00F3n.");
				}
				else 
				{

					if(resultado.length > 0)
					{
						parent.msgAdvertencia("El usuario ya existe. Por favor comuniquese con el administrador del sistema.")
					}
					else
					{

						var obj_consulta = { 'SQL' : 'SQL_SELECT_USUARIO_PASSWORD', 'N' : 0, 'DATOS' : { } };
						var resultado = send_query_usuario('./consultar_datos_usuario.hyg', obj_consulta);

						if(resultado == -1)
						{
							parent.msgAdvertencia("Hubo problemas con la petici\u00F3n.");
						}
						else if(resultado == 0)
						{
							parent.msgAdvertencia("Hubo problemas con la validaci\u00F3n.");
						}
						else 
						{

							var dato = resultado[0].TAM;
							if($.trim($("#registerModal #txt_clave").val()).length < dato && $("#registerModal #cmb_tipo").val() == 1)
							{
								parent.msgAdvertencia("La clave debe ser m\u00EDnimo de " + dato + " caracteres.");
							}
							else
							{

								var obj_consulta = { 'SQL' : 'SQL_SELECT_USUARIO_EMAIL', 'N' : 1, 'DATOS' : { 'P1' : $.trim($("#registerModal #txt_email").val()) } };
								var resultado = send_query_usuario('./consultar_datos_usuario.hyg', obj_consulta);

								if(resultado == -1)
								{
									parent.msgAdvertencia("Hubo problemas con la petici\u00F3n.");
								}
								else if(resultado == 0)
								{
									parent.msgAdvertencia("Hubo problemas con la validaci\u00F3n.");
								}
								else 
								{

									if(resultado[0].RES == "Ok")
									{
										parent.msgAdvertencia("El email se encuentra registrado. Si este le pertenece, por favor continue a recuperar su clave.");
									}
									else
									{
										$.ajax(
												{
													'url' : './guardar_usuario.hyg',
													'type' : 'POST',
													'data' : 
													{
														nro_doc: encode64($.trim($("#registerModal #txt_documento").val())),
														nombre: encode64($.trim($("#registerModal #txt_nombre").val())),
														apellido: encode64($.trim($("#registerModal #txt_apellido").val())),
														email: encode64($.trim($("#registerModal #txt_email").val())),
														telefono: encode64($.trim($("#registerModal #txt_tel").val())),
														identificador: encode64($.trim($("#registerModal #txt_usu").val())),
														tipo: encode64($("#registerModal #cmb_tipo").val()),
														clave: encode64($.trim($("#registerModal #txt_clave").val()))
													},
													'async' : false,
													'success' : function(objResult)
													{
														// Si objResult tiene algo
														if (objResult != null && objResult != '' && objResult == 'Ok')
														{
															parent.msgInformacion("Su usuario ha sido creado exitosamente y se activar\u00E1 dentro de 5 min.<br>" +
															"Por favor comuniquese con el adminsitrador para gestionar los permisos.");
															$("#registerModal .close span").click();
														}
														else
														{
															parent.msgAdvertencia("No se pudo completar la acci\u00F3n.");
														}

													},
													'error' : function(objError)
													{
														parent.msgAdvertencia("Hubo problemas con la petici\u00F3n hacia el servidor.");
													}
												});
									}

								}

							}

						}

					}

				}

			}

		}

	}

}

/*
 * Autor:					Duberney Martinez.<br>
 * Descripción:				Se usa para recuperar la clave del usuario externo.<br>
 * Fecha creación:			2018/04/16.<br>
 * Fecha modificación:		2018/04/16.
 * */
function recuperarClave()
{

	$("#recuperarModal .errorRecuperar label").html("");

	var msj = "";

	if($.trim($("#recuperarModal #txt_recuperar").val()) == "")
	{
		msj += "Ingrese el email.";
	}

	$("#recuperarModal .errorRecuperar label").append(msj);

	if(msj == "")
	{
		$.ajax(
				{
					'url' : './recuperar_usuario.hyg',
					'type' : 'POST',
					'data' : 
					{
						email: encode64($.trim($("#recuperarModal #txt_recuperar").val()))
					},
					'async' : false,
					'success' : function(objResult)
					{

						// Si objResult tiene algo
						if (objResult != null && objResult != '' )
						{
							parent.msgInformacion(objResult);
							$("#recuperarModal .close span").click();
							$("#recuperarModal #txt_recuperar").val("");
						}
						else
						{
							parent.msgAdvertencia("No se encuentra disponible en este momento.");
						}

					},
					'error' : function(objError)
					{
						parent.msgAdvertencia("Hubo problemas con la petici\u00F3n hacia el servidor.");
					}
				});
	}

}

/*
 * Autor:					Duberney Martinez.<br>
 * Descripción:				Se usa para cambiar la clave del usuario activo.<br>
 * Fecha creación:			2018/04/21.<br>
 * Fecha modificación:		2018/04/21.
 * */
function cambiarClave()
{
	$("#cambioClaveModal .errorCambio label").html("");

	var msj = "";

	if($.trim($("#cambioClaveModal #txt_password_a_cc").val()) == "")
	{
		msj += "Ingrese su clave actual.<br>";
	}

	if($.trim($("#cambioClaveModal #txt_password_n_cc").val()) == "")
	{
		msj += "Ingrese su clave nueva.<br>";
	}

	if($.trim($("#cambioClaveModal #txt_password_rn_cc").val()) == "")
	{
		msj += "Confirme su clave nueva.<br>";
	}

	if($.trim($("#cambioClaveModal #txt_password_n_cc").val()) != $.trim($("#cambioClaveModal #txt_password_rn_cc").val()))
	{
		msj += "La clave nueva no coincide.<br>";
	}

	if(msj != "")
	{
		$("#cambioClaveModal .errorCambio label").append(msj);
	}
	else
	{

		var obj_consulta = { 'SQL' : 'SQL_SELECT_USUARIO_PASSWORD', 'N' : 0, 'DATOS' : { } };
		var resultado = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
		var dato = resultado[0].TAM;

		if($.trim($("#cambioClaveModal #txt_password_n_cc").val()).length < dato)
		{
			parent.msgAdvertencia("La clave debe ser m\u00EDnimo de " + dato + " caracteres.");
		}
		else
		{

			var obj_consulta = { 'SQL' : 'SQL_SELECT_USUARIO_TIPO', 'N' : 1, 'DATOS' : { 'P1' :'?USUARIO?' } };
			var resultado = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);

			if(resultado[0].TIPO == 2)
			{
				parent.msgAdvertencia("No se permite el cambio de clave por este medio para usuarios de Directorio activo.");
			}
			else
			{
				$.ajax(
						{
							'url' : './cambiar_clave.hyg',
							'type' : 'POST',
							'data' : 
							{
								clave: encode64($.trim($("#cambioClaveModal #txt_password_a_cc").val())),
								clave_n: encode64($.trim($("#cambioClaveModal #txt_password_n_cc").val()))
							},
							'async' : false,
							'success' : function(objResult)
							{

								// Si objResult tiene algo
								if (objResult != null && objResult != '' )
								{
									if(objResult == 'Ok')
									{
										parent.msgInformacion("Clave actualizada correctamente.");
										$("#cambioClaveModal .close span").click();
										$("#cambioClaveModal #txt_password_a_cc").val("");
										$("#cambioClaveModal #txt_password_n_cc").val("");
										$("#cambioClaveModal #txt_password_rn_cc").val("");	
									}
									else
									{
										parent.msgAdvertencia(objResult);
									}
								}
								else
								{
									parent.msgAdvertencia("No se pudo completar la acci\u00F3n.");
								}

							},
							'error' : function(objError)
							{
								parent.msgAdvertencia("Hubo problemas con la petici\u00F3n hacia el servidor.");
							}
						});
			}

		}

	}

}

/*
 * Autor:					Duberney Martinez.<br>
 * Descripción:				Se usa para validar si el email es válido.<br>
 * Fecha creación:			2018/04/10.<br>
 * Fecha modificación:		2018/04/10.
 * */
function validarEmail(email)
{

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if(!reg.test(email))
	{
		return "Email incorrecto.";
	}
	else
	{
		return "";
	}

}

/*
 * Autor:					Daiber Gonzalez.<br>
 * Descripción:				Se usa para cerrar sesión.<br>
 * Fecha creación:			2018/01/01.<br>
 * Fecha modificación:		2018/01/01.
 * */
function logout()
{
	var url = "/mapgis/cerrarSession.do";
	$.ajax(
			{
				"url": url,
				"type": "POST",
				"success": function(respuesta)
				{
					location.reload();
				},
				"error": function(xhr, status, err)
				{
					location.reload();
//					parent.msgError("Hubo problemas con la peticion");
				}
			});
}

/*
 * Autor:					Daiber Gonzalez.
 * Descripción:				Se usa para asignar los eventos a los link del menú.
 * Fecha creación:			2018/01/01.
 * Fecha modificación:		2018/01/01.
 * */
function eventos_menu()
{
	$('.index').on('click', function()
			{
		active_link(this);
		var obj = document.getElementById("header");

		if (obj != null)
		{
			$("html, body").animate(
					{
						scrollTop : document.getElementById("header").offsetTop			
					}, 600);
		}
			});

	$('.noticias').on('click', function()
			{
		active_link(this);
		var obj = document.getElementById("news");

		if (obj != null)
		{
			$("html, body").animate(
					{
						scrollTop : document.getElementById("news").offsetTop			
					}, 600);
		}
			});

	$('.eventos').on('click', function()
			{
		active_link(this);
		var obj = document.getElementById("events");

		if (obj != null)
		{
			$("html, body").animate(
					{
						scrollTop : document.getElementById("events").offsetTop			
					}, 600);
		}
			});

	$('.documentacion').on('click', function()
			{
		active_link(this);
		var obj = document.getElementById("documentation");

		if (obj != null)
		{
			$("html, body").animate(
					{
						scrollTop : document.getElementById("documentation").offsetTop			
					}, 600);
		}
			});

	$('.contacto').on('click', function()
			{
		active_link(this);
		var obj = document.getElementById("contact");

		if (obj != null)
		{
			$("html, body").animate(
					{
						scrollTop : document.getElementById("contact").offsetTop			
					}, 600);
		}
			});
}

function active_link(obj)
{
	$('.nav-link').each(function(i, obj)
			{
		$(obj).removeClass('active_link');
			});

	$(obj).addClass('active_link');
}