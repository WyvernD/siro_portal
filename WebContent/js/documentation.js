var int_show_doc = 3;
var int_cantidad_docs = 0;
var int_doc_actual = 1;
var str_ruta_doc_mini;

//Variables del detalle
var obj_detalles_docu = [];
var str_ruta_detalle_docu = '';
var str_ruta_doc_detalle_docu = '';
var int_cantidad_detalles_docu = 0;
var int_detalle_docu_actual = 1;
var detalle_publi_titulo = '';

$(document).ready(function()
{
	cambiar_texto_detalle_publi();
	
	try
	{
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_PUBLICACIONESMINI', 'N' : 0, 'DATOS' : {}};
		str_ruta_doc_mini =  send_query('./consultar_datos.hyg', obj_consulta, 'get', false)[0].RUTA;
		obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_PUBLICACIONES', 'N' : 0, 'DATOS' : {}};
		str_ruta_detalle_docu =  send_query('./consultar_datos.hyg', obj_consulta, 'get', false)[0].RUTA;
		// Ruta del documento
		obj_consulta = {'SQL' : 'SQL_CONSULRAR_RUTADOCS_PUBLICACIONES', 'N' : 0, 'DATOS' : {}};
		str_ruta_doc_detalle_docu = send_query('./consultar_datos.hyg', obj_consulta, 'get', false)[0].RUTA;
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
	
	// validar cantidad según el tamaño de la pantalla
	validar_cantidad_docs_mostrar();
	
	$(window).resize(function()
	{
		validar_cantidad_docs_mostrar();
		cambiar_texto_detalle_publi();
	});
	
	eventos_flechas_doc();
});

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para calcular cuantos items se muestran,
 * 						según el tamaño de la pantalla.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function validar_cantidad_docs_mostrar()
{	
	if ($(window).width() <= 974 && $(window).width() > 750)
	{
		// Se muestran 2 items
		int_show_doc = 2;
	}
	else if ($(window).width() <= 750)
	{
		// Se muestra 1 items
		int_show_doc = 1;
	}
	else
	{
		// Se muestra de a 3 items
		int_show_doc = 3;
	}
	
	crear_contenido_doc();
	ocultar_contenidos_doc();
	validar_flechas_doc()
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear el contenido a mostrar.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function crear_contenido_doc()
{
	try
	{
		int_cantidad_docs = 0;
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_NOTICIAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 'and NP.TIPO = 1 and NP.PUBLICO = 1'}};
		var obj_rs =  send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		
		var int_cols = 0;
		var cols = '';
		var html = '';
		var int_id = 0;
		var clase = 12/int_show_doc;
		
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
					  		'<img src="' + str_ruta_doc_mini + obj_rs[i].IMAGEN_MINIATURA + '">' +
					  		'<div class="card_information">' +
					  			'<div class="content">' +
					  				'<div class="text">' +
						  				'<h3 class="title" data-toggle="tooltip" title="" data-original-title="' + obj_rs[i].TITULO + '">' 
					  						+ titulo + '</h3>' +
						  				'<p class="date">' + formato(obj_rs[i].FECHA.split(' ')[0]) + '</p>' +
						  			'</div>' +
					  				'<button class="btn btnInfo pointer" onclick="detalle_documentation(\'' + (i + 1) + '\', \'' + obj_tmp + '\')">+</button>' +
					  			'</div>' +
					  		'</div>' +
					  	'</div>' +
					'</div>' +
				'</div>';
			
			if (int_cols == int_show_doc)
			{
				int_id++;
				int_cantidad_docs++;
				html +=
					'<div class="row justify-content-center" id="item_doc_' + int_id + '">' +
						cols +
					'</div>';
				
				int_cols = 0;
				cols = '';
			}
		}
		
		if (cols != '')
		{
			int_id++;
			int_cantidad_docs++;
			html +=
				'<div class="row justify-content-center" id="item_doc_' + int_id + '">' +
					cols +
				'</div>';
		}
		
		$('#documentacion_container').html(html);
		
		$('[data-toggle="tooltip"]').tooltip();
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
}

function detalle_documentation(index, obj)
{
	obj_detalles_docu = JSON.parse(convertir_cadena_db(decode64(obj)));
	int_cantidad_detalles_docu = obj_detalles_docu.length;
	int_detalle_docu_actual = index;
	// Crear el contenido de la noticia
	crear_contenido_detalle_docu(index - 1);
	validar_flechas_detalle_docu();
	
	$( ".detalle_documentation" ).show();

	$( ".detalle_documentation" ).animate(
	{
	    right: "0"
	}, 1000, function(){$('.documentacion').click();});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear el contenido a mostrar.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function crear_contenido_detalle_docu(i)
{
	var obj = obj_detalles_docu[i];
	detalle_publi_titulo = obj.TITULO;
	var html =
		'<div class="row">' +
			'<div class="col-md-6 d-none d-sm-none d-md-block d-lg-block d-xl-block detalle_noti_img">' +
				'<img src="' + str_ruta_detalle_docu + obj.IMAGEN + '">' +
			'</div>' +
			'<div class="col-md-6 detalle_contenido_noti">' +
				'<div class="detaller_header_noti">' +
					'<div class="prev_detalle_noti pointer icon-arrow" id="prev_detalle_docu" onclick="anterior_detalle_docu()"></div>' +
					'<div class="fragmento"></div>' +
					'<div class="contenido_header">' +
						'<h2 id="detalle_publi_titulo" data-toggle="tooltip" title="" data-original-title="' + obj.TITULO + '">' + 
							obj.TITULO + '</h2>' +
						'<p>' + formato(obj.FECHA.split(' ')[0]) + '</p>' +
					'</div>' +
					'<div class="next_detalle_noti pointer icon-arrow" id="next_detalle_docu" onclick="siguiente_detalle_docu()"></div>' +
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
							'<button class="btn btn_success btn_detalle_noti pointer w-xs-100" onclick="ver_enlace_detalle_docu(\'' + obj.LINK + '\')">' +
								'Ver enlace' +
							'</button>' +
						'</div>' +
						'<div class="col-sm-6 mt_sm_2">' +
							'<button class="btn btn_success btn_detalle_noti pointer w-xs-100" onclick="ver_documento_detalle_docu(\'' + obj.DOCUMENTO + '\')">' +
								'Descargar documento' +
							'</button>' +
						'</div>' +
						'<div class="col-sm-2">' +
							'<div class="icon-arrow pointer back_noti" onclick="back_docu()"></div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	
	$('.detalle_documentation').html(html);
	$('[data-toggle="tooltip"]').tooltip();
	cambiar_texto_detalle_publi();
}

function cambiar_texto_detalle_publi()
{
	var tmp_obj = document.getElementById('detalle_publi_titulo');
	
	if(tmp_obj)
	{
		detalle_publi_titulo = detalle_publi_titulo == '' ? $(tmp_obj).html().trim() : detalle_publi_titulo;
		
		var new_titulo = '';
		var ancho = $(window).width();
		var max = 0;
		
		if (ancho > 1229)
		{
			$(tmp_obj).html(detalle_publi_titulo);
			return;
		}
		
		if (ancho <= 750 && ancho > 443)
		{
			$(tmp_obj).html(detalle_publi_titulo);
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
		
		if (detalle_publi_titulo.length > max)
		{
			new_titulo = detalle_publi_titulo.substr(0, max) + '...';
		}
		else
		{
			new_titulo = detalle_publi_titulo;
		}
		
		$(tmp_obj).html(new_titulo);
	}
}

function back_docu()
{
	$( ".detalle_documentation" ).animate(
	{
	    right: "-100%"
	}, 1000, function()
	{
		$( ".detalle_documentation" ).hide();
		$('.documentacion').click();
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para abrir en enlace externo.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function ver_enlace_detalle_docu(link)
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
function ver_documento_detalle_docu(doc)
{
	if (doc != 'null' && doc != '')
	{
		window.open('./' + str_ruta_doc_detalle_docu + doc, '_blank');
		return;
	}
	
	parent.msgInformacion('No hay un documento para mostrar.')
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se oculta o
 * 						se muestran las flchas.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function validar_flechas_detalle_docu()
{	
	if (int_cantidad_detalles_docu == 1)
	{
		$('#prev_detalle_docu').hide();
		$('#next_detalle_docu').hide();
		return;
	}
	
	if (int_cantidad_detalles_docu > 1)
	{
		if (int_detalle_docu_actual >= int_cantidad_detalles_docu)
		{
			$('#prev_detalle_docu').show();
			$('#next_detalle_docu').hide();
		}
		else if (int_detalle_docu_actual <= 1)
		{
			$('#prev_detalle_docu').hide();
			$('#next_detalle_docu').show();
		}
		else
		{
			$('#prev_detalle_docu').show();
			$('#next_detalle_docu').show();
		}
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el anterior.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function anterior_detalle_docu()
{
	int_detalle_docu_actual--;
	crear_contenido_detalle_docu(int_detalle_docu_actual - 1);
	validar_flechas_detalle_docu();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el siguiente.
 * Fecha creación:		2018/01/30.
 * Fecha modificación:	2018/01/30.
 */
function siguiente_detalle_docu()
{
	int_detalle_docu_actual++;
	crear_contenido_detalle_docu(int_detalle_docu_actual - 1);
	validar_flechas_detalle_docu();
}


/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función para ocultar los contenidos.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function ocultar_contenidos_doc()
{
	int_doc_actual = 1;
	for (var i = 0; i < int_cantidad_docs; i++)
	{
		$('#item_doc_' + (i + 1)).hide();
	}
	
	$('#item_doc_' + int_doc_actual).show();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se oculta o
 * 						se muestran las flchas.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function validar_flechas_doc()
{	
	if (int_cantidad_docs == 1)
	{
		$('#prev_doc').hide();
		$('#next_doc').hide();
		return;
	}
	
	if (int_cantidad_docs > 1)
	{
		if (int_doc_actual >= int_cantidad_docs)
		{
			$('#prev_doc').show();
			$('#next_doc').hide();
		}
		else if (int_doc_actual <= 1)
		{
			$('#prev_doc').hide();
			$('#next_doc').show();
		}
		else
		{
			$('#prev_doc').show();
			$('#next_doc').show();
		}
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para asignar eventos a las flechas.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function eventos_flechas_doc()
{	
	$('#prev_doc').on('click', function()
	{
		anterior_doc();
	});
	
	$('#next_doc').on('click', function()
	{
		siguiente_doc();
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el anterior.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function anterior_doc()
{
	$('#item_doc_' + int_doc_actual).hide();
	int_doc_actual--;
	$('#item_doc_' + int_doc_actual).show();
	validar_flechas_doc();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para ocultar el item actual y mostrar el siguiente.
 * Fecha creación:		2018/01/24.
 * Fecha modificación:	2018/01/24.
 */
function siguiente_doc()
{
	$('#item_doc_' + int_doc_actual).hide();
	int_doc_actual++;
	$('#item_doc_' + int_doc_actual).show();
	validar_flechas_doc();
}