var int_show_noti = 3;
var int_cantidad_notis = 0;
var int_noti_actual = 1;
var str_ruta_noti_mini;

// Variables del detalle
var obj_detalles_noti = [];
var str_ruta_detalle_noti = '';
var str_ruta_doc_detalle_noti = '';
var int_cantidad_detalles_noti = 0;
var int_detalle_noti_actual = 1;
var detalle_titulo = '';

$(document).ready(function()
{
	cambiar_texto_detalle_noti();
	try
	{
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_NOTICIASMINI', 'N' : 0, 'DATOS' : {}};
		str_ruta_noti_mini =  send_query('./consultar_datos.hyg', obj_consulta, 'get', false)[0].RUTA;
		obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_NOTICIAS', 'N' : 0, 'DATOS' : {}};
		str_ruta_detalle_noti =  send_query('./consultar_datos.hyg', obj_consulta, 'get', false)[0].RUTA;
		// Ruta del documento
		obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTADOCS_NOTICIAS', 'N' : 0, 'DATOS' : {}};
		str_ruta_doc_detalle_noti = send_query('./consultar_datos.hyg', obj_consulta, 'get', false)[0].RUTA;
		// validar cantidad según el tamaño de la pantalla
		validar_cantidad_mostrar();
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
	
	$(window).resize(function()
	{
		validar_cantidad_mostrar();
		cambiar_texto_detalle_noti();
	});
	
	eventos_flechas_noti();
});

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para calcular cuantos items se muestran,
 * 						según el tamaño de la pantalla.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function validar_cantidad_mostrar()
{
	if ($(window).width() <= 974 && $(window).width() > 750)
	{
		// Se muestran 2 items
		int_show_noti = 2;
	}
	else if ($(window).width() <= 750)
	{
		// Se muestra 1 items
		int_show_noti = 1;
	}
	else
	{
		// Se muestra de a 3 items
		int_show_noti = 3;
	}
	
	crear_contenido();
	ocultar_contenidos();
	validar_flechas_noti()
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear el contenido a mostrar.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function crear_contenido()
{
	try
	{
		int_cantidad_notis = 0;
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_NOTICIAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 'and NP.TIPO = 2 and NP.PUBLICO = 1'}};
		var obj_rs =  send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		
		var int_cols = 0;
		var cols = '';
		var html = '';
		var int_id = 0;
		var clase = 12/int_show_noti;
		
		var obj_tmp = encode64(JSON.stringify(obj_rs));
			
		for (var i = 0; i < obj_rs.length; i++)
		{
			var titulo = obj_rs[i].TITULO;
			var length_titulo = obj_rs[i].TITULO.length;
			
			if (length_titulo > 16)
			{
				titulo = obj_rs[i].TITULO.substr(0, 16) + '...';
			}
			
			int_cols++;
			
			cols +=
				'<div class="text-center col-' + clase + '">' +
					'<div class="card" style="width: 20rem;">' +
					  	'<div class="card-body">' +
					  		'<img src="' + str_ruta_noti_mini + obj_rs[i].IMAGEN_MINIATURA + '">' +
					  		'<div class="card_information">' +
					  			'<div class="content">' +
					  				'<div class="text">' +
					  					'<h3 class="title" data-toggle="tooltip" title="" data-original-title="' + obj_rs[i].TITULO + '">' 
					  						+ titulo + '</h3>' +
						  				'<p class="date">' + formato(obj_rs[i].FECHA.split(' ')[0]) + '</p>' +
						  			'</div>' +
					  				'<button class="btn btnInfo pointer" onclick="detalle_noticia(\'' + (i + 1) + '\', \'' + obj_tmp + '\')">+</button>' +
					  			'</div>' +
					  		'</div>' +
					  	'</div>' +
					'</div>' +
				'</div>';
			
			if (int_cols == int_show_noti)
			{
				int_id++;
				int_cantidad_notis++;
				html +=
					'<div class="row justify-content-center" id="item_noti_' + int_id + '">' +
						cols +
					'</div>';
				
				int_cols = 0;
				cols = '';
			}
		}
		
		if (cols != '')
		{
			int_id++;
			int_cantidad_notis++;
			html +=
				'<div class="row justify-content-center item_noti" id="item_noti_' + int_id + '">' +
					cols +
				'</div>';
		}
		
		$('#noticias_container').html(html);
		$('[data-toggle="tooltip"]').tooltip();
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
}

function detalle_noticia(index, obj)
{
	obj_detalles_noti = JSON.parse(convertir_cadena_db(decode64(obj)));
	int_cantidad_detalles_noti = obj_detalles_noti.length;
	int_detalle_noti_actual = index;
	// Crear el contenido de la noticia
	crear_contenido_detalle_noticia(index - 1);
	validar_flechas_detalle_noti();
	
	$( ".detalle_noti" ).show();
	
	$( ".detalle_noti" ).animate(
	{
	    right: "0"
	}, 1000, function(){$('.noticias').click();});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear el contenido a mostrar.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function crear_contenido_detalle_noticia(i)
{
	var obj = obj_detalles_noti[i];
	detalle_titulo = obj.TITULO;
	var html =
		'<div class="row">' +
			'<div class="col-md-6 d-none d-sm-none d-md-block d-lg-block d-xl-block detalle_noti_img">' +
				'<img src="' + str_ruta_detalle_noti + obj.IMAGEN + '">' +
			'</div>' +
			'<div class="col-md-6 detalle_contenido_noti">' +
				'<div class="detaller_header_noti">' +
					'<div class="prev_detalle_noti pointer icon-arrow" id="prev_detalle_noti" onclick="anterior_detalle_noti()"></div>' +
					'<div class="fragmento"></div>' +
					'<div class="contenido_header">' +
						'<h2 id="detalle_noti_titulo" data-toggle="tooltip" title="" data-original-title="' + obj.TITULO + '">' + 
							obj.TITULO + '</h2>' +
						'<p>' + formato(obj.FECHA.split(' ')[0]) + '</p>' +
					'</div>' +
					'<div class="next_detalle_noti pointer icon-arrow" id="next_detalle_noti" onclick="siguiente_detalle_noti()"></div>' +
				'</div>' +
				'<div class="detalle_body_noti">' +
					'<p>' +
						obj.ENTRADA +
					'</p>' +
					'<p>' +
						obj.CUERPO +
					'</p>' +
					'<div class="row">' +
						'<div class="col-sm-4">' +
							'<button class="btn btn_success btn_detalle_noti pointer w-xs-100" onclick="ver_enlace_detalle_noti(\'' + obj.LINK + '\')">' +
								'Ver enlace' +
							'</button>' +
						'</div>' +
						'<div class="col-sm-6 mt_sm_2">' +
							'<button class="btn btn_success btn_detalle_noti pointer w-xs-100" onclick="ver_documento_detalle_noti(\'' + obj.DOCUMENTO + '\')">' +
								'Descargar documento' +
							'</button>' +
						'</div>' +
						'<div class="col-sm-2">' +
							'<div class="icon-arrow pointer back_noti" onclick="back_noti()"></div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	
	$('.detalle_noti').html(html);
	$('[data-toggle="tooltip"]').tooltip();
	cambiar_texto_detalle_noti();
}

function cambiar_texto_detalle_noti()
{
	var tmp_obj = document.getElementById('detalle_noti_titulo');
	
	if(tmp_obj)
	{
		detalle_titulo = detalle_titulo == '' ? $(tmp_obj).html().trim() : detalle_titulo;
		
		var new_titulo = '';
		var ancho = $(window).width();
		var max = 0;
		
		if (ancho > 1229)
		{
			$(tmp_obj).html(detalle_titulo);
			return;
		}
		
		if (ancho <= 750 && ancho > 443)
		{
			$(tmp_obj).html(detalle_titulo);
			return;
		}
		
		if (ancho <= 1229 && ancho > 918 || ancho <= 443 && ancho > 333)
		{
			max = 20;
		}
		
		if (ancho <= 917 && ancho > 750 || ancho <= 333)
		{
			max = 15;
		}
		
		if (detalle_titulo.length > max)
		{
			new_titulo = detalle_titulo.substr(0, max) + '...';
		}
		else
		{
			new_titulo = detalle_titulo;
		}
		
		$(tmp_obj).html(new_titulo);
	}
}

function back_noti()
{
	$( ".detalle_noti" ).animate(
	{
	    right: "-100%"
	}, 1000, function()
	{
		$( ".detalle_noti" ).hide();
		$('.noticias').click();
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para abrir en enlace externo.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function ver_enlace_detalle_noti(link)
{
	if (link != 'null' && link != '')
	{
		window.open(link, '_blank');
		return;
	}
	
	parent.msgInformacion('No hay un link para mostrar.')
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para descargar el documento.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function ver_documento_detalle_noti(doc)
{
	if (doc != 'null' && doc != '')
	{
		window.open('./' + str_ruta_doc_detalle_noti + doc, '_blank');
		return;
	}
	
	parent.msgInformacion('No hay un documento para mostrar.')
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función para ocultar los contenidos.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function ocultar_contenidos()
{
	int_noti_actual = 1;
	for (var i = 0; i < int_cantidad_notis; i++)
	{
		$('#item_noti_' + (i + 1)).hide();
	}
	
	$('#item_noti_' + int_noti_actual).show();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se oculta o
 * 						se muestran las flchas.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function validar_flechas_detalle_noti()
{	
	if (int_cantidad_detalles_noti == 1)
	{
		$('#prev_detalle_noti').hide();
		$('#next_detalle_noti').hide();
		return;
	}
	
	if (int_cantidad_detalles_noti > 1)
	{
		if (int_detalle_noti_actual >= int_cantidad_detalles_noti)
		{
			$('#prev_detalle_noti').show();
			$('#next_detalle_noti').hide();
		}
		else if (int_detalle_noti_actual <= 1)
		{
			$('#prev_detalle_noti').hide();
			$('#next_detalle_noti').show();
		}
		else
		{
			$('#prev_detalle_noti').show();
			$('#next_detalle_noti').show();
		}
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el anterior.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function anterior_detalle_noti()
{
	int_detalle_noti_actual--;
	crear_contenido_detalle_noticia(int_detalle_noti_actual - 1);
	validar_flechas_detalle_noti();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el siguiente.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function siguiente_detalle_noti()
{
	int_detalle_noti_actual++;
	crear_contenido_detalle_noticia(int_detalle_noti_actual - 1);
	validar_flechas_detalle_noti();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se oculta o
 * 						se muestran las flchas.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function validar_flechas_noti()
{	
	if (int_cantidad_notis == 1)
	{
		$('#prev_noti').hide();
		$('#next_noti').hide();
		return;
	}
	
	if (int_cantidad_notis > 1)
	{
		if (int_noti_actual >= int_cantidad_notis)
		{
			$('#prev_noti').show();
			$('#next_noti').hide();
		}
		else if (int_noti_actual <= 1)
		{
			$('#prev_noti').hide();
			$('#next_noti').show();
		}
		else
		{
			$('#prev_noti').show();
			$('#next_noti').show();
		}
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para asignar eventos a las flechas.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function eventos_flechas_noti()
{	
	$('#prev_noti').on('click', function()
	{
		anterior();
	});
	
	$('#next_noti').on('click', function()
	{
		siguiente();
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el anterior.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function anterior()
{
	$('#item_noti_' + int_noti_actual).hide();
	int_noti_actual--;
	$('#item_noti_' + int_noti_actual).show();
	validar_flechas_noti();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el siguiente.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function siguiente()
{
	$('#item_noti_' + int_noti_actual).hide();
	int_noti_actual++;
	$('#item_noti_' + int_noti_actual).show();
	validar_flechas_noti();
}