var str_estado = '';
var obj_noti = {};
var str_ruta_wapp = '';
var str_ruta_img_publi = '';
var str_ruta_img_publi_mini = '';
var str_ruta_img_noti = '';
var str_ruta_img_noti_mini = '';
var str_ruta_doc_publi = '';
var str_ruta_doc_noti = '';
var int_id_noti = '';
var str_nombre = '';
var str_nombre_mini = '';
var str_nombre_doc = '';
var str_nombre_edit = '';
var str_nombre_mini_edit = '';
var str_nombre_doc_edit = '';

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para procesar
 * 						la información enviada desde el anterior
 * 						formulario.
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function cargarNuevosDatos(obj_datos)
{
	str_estado = obj_datos.ESTADO;
	str_ruta_wapp = obj_datos.WEBAPP;
	formatear_datepicker()
	$("#txt_fecha").datepicker();
	
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_PUBLICACIONES', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_publi = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_PUBLICACIONESMINI', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_publi_mini = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_NOTICIAS', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_noti = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_NOTICIASMINI', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_noti_mini = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULRAR_RUTADOCS_PUBLICACIONES', 'N' : 0, 'DATOS' : {}};
	str_ruta_doc_publi = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTADOCS_NOTICIAS', 'N' : 0, 'DATOS' : {}};
	str_ruta_doc_noti = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	
	llenar_combos();
	
	if (str_estado == 'nuevo')
	{
		// Cargar formulario nuevo
		cargar_nuevo();
	}
	else
	{
		cargar_editar(obj_datos);
	}
	
	// Evento a botones
	evento_botones();
	$('.load_container').hide();
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para preparar el formulario,
 * 						si es un nuevo registro.
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function cargar_nuevo()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONSECUTIVO_NOTICIASP', 'N' : 0, 'DATOS' : {}};
	int_id_noti = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].CONSECUTIVO;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para preparar el formulario,
 * 						si se va a editar un registro.
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function cargar_editar(obj)
{
	int_id_noti = obj.ID;
	$('#cmb_tipo').prop('disabled', true);
	$('#cmb_tipo').val(obj.TIPO);
	$('#cmb_tipo')[0].sumo.reload();
	$('#cmb_subsistema').prop('disabled', true);
	$('#cmb_subsistema').val(obj.ID_SUBSISTEMA);
	$('#cmb_subsistema')[0].sumo.reload();
	$('#txt_titulo').val(obj.TITULO == 'null' ? '' : convertir_cadena_db(obj.TITULO));
	$('#txt_link').val(obj.LINK == 'null' ? '' : convertir_cadena_db(obj.LINK));
	$('#txt_entrada').val(obj.ENTRADA == 'null' ? '' : convertir_cadena_db(obj.ENTRADA));
	$('#txt_cuerpo').val(obj.CUERPO == 'null' ? '' : convertir_cadena_db(obj.CUERPO));
	$('#txt_fecha').val(formato(obj.FECHA.split(' ')[0]));
	
	str_nombre_edit = obj.IMAGEN;
	str_nombre_mini_edit = obj.IMAGEN_MINIATURA;
	str_nombre_doc_edit = obj.DOCUMENTO;
	
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txt_success');
}

function llenar_combos()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SUBSISTEMAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ''}};
	var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_rs, 'cmb_subsistema', false, false, '', '');
	generarSumoSelect($('#cmb_tipo'));
	$('#cmb_tipo')[0].sumo.reload();
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txt_success');
}

function evento_botones()
{
	$('#file_imagen_mini').on('change', function()
	{
		crear_imagen();
	});
	
	$('#btn_guardar').on('click', function()
	{
		// Validar campos requeridos
		var bl_rs = validarCampos('.requerido', obj_noti, true);
		
		if (bl_rs)
		{
			// Validar campos no requeridos
			validarCampos('.n_requerido', obj_noti, false);
			var str_rs = null;
			
			if($('#file_imagen_mini')[0].files[0])
			{
				if ($('#editor img')[0].width != 500)
				{
					parent.msgAdvertencia('La imagen miniatura no tiene 500px de ancho.');
					return false;
				}
				
				if ($('#editor img')[0].height != 500)
				{
					parent.msgAdvertencia('La imagen miniatura no tiene 500px de alto.');
					return false;
				}
				
				var str_ruta = obj_noti.cmb_tipo == '1' ? str_ruta_wapp + str_ruta_img_publi_mini : str_ruta_wapp + str_ruta_img_noti_mini;
				// Guardar imagen.
				str_rs = validar_archivo('#file_imagen_mini', 'imagen', str_ruta);
				// Validar subida del archivo
				bl_rs = validar_subida(str_rs);
			}

			// Se asigna el nombre de la imagen mini
			str_nombre_mini = str_rs != null ? str_rs : str_nombre_mini_edit;
			
			if($('#file_imagen')[0].files[0] && bl_rs)
			{
				var str_ruta = obj_noti.cmb_tipo == '1' ? str_ruta_wapp + str_ruta_img_publi : str_ruta_wapp + str_ruta_img_noti;
				// Guardar imagen.
				str_rs = validar_archivo('#file_imagen', 'imagen', str_ruta);
				// Validar subida del archivo
				bl_rs = validar_subida(str_rs);
			}
			
			// Se asigna el nombre de la imagen
			str_nombre = str_rs != null ? str_rs : str_nombre_edit;
			
			if($('#file_documento')[0].files[0] && bl_rs)
			{
				var str_ruta = obj_noti.cmb_tipo == '1' ? str_ruta_wapp + str_ruta_doc_publi : str_ruta_wapp + str_ruta_doc_noti;
				// Guardar imagen.
				str_rs = validar_archivo('#file_documento', 'documento', str_ruta);
				// Validar subida del archivo
				bl_rs = validar_subida(str_rs);
			}

			// Se asigna el nombre del documento
			str_nombre_doc = str_rs != null ? str_rs : str_nombre_doc_edit;
			
			if (bl_rs)
			{
				guardar();
			}
		}
		else
		{
			parent.msgAdvertencia('Los campos marcados con * son obligatorios.');
		}
	});
}

function crear_imagen()
{
	file = $('#file_imagen_mini')[0].files[0];
	fr = new FileReader();
	fr.onload = function()
	{
		var img = document.createElement("img");
	    // Se le agrega la ruta de la imagen
	    img.src = fr.result;
	    // Se oculta
	    img.style.display = "none";
	    $('#editor').empty();
	    // Se asigna la imagen al contenedor
	    $('#editor').append(img);
	};
	fr.readAsDataURL(file);
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para validar un archivo que va a ser subido al servidor
 * Fecha creación:		2017/12/25
 * Fecha modificación:	2017/12/25
 * */
function validar_archivo(obj, str_ipo, str_ruta)
{
	var str_rs = '';
    // Se crea un formData
    var data = new FormData();
    // Se instancia la imagen
    var objFile = $(obj)[0].files[0];
    // si la imagen existe
    if (objFile)
    {
        // Se agrega la información necesaria al formdata
        data.append('file', objFile);
        data.append('id', int_id_noti);
        data.append('ruta', str_ruta);
        data.append('tipo', str_ipo);
        data.append('validar', 'si');
        // se procede a guardar la imagen
        str_rs = subirFichero(data);        
    }
    // Caos contrario se muestra el error
    else
    {
    	str_rs = '-3';
    }

    return str_rs;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para almacenar la imagen en el servidor.
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function validar_subida(str_valor)
{
	if (str_valor == '0')
	{
		parent.msgAdvertencia(convertirCadena('Esxtención no admitida.'));
		return;
	}

	if (str_valor == '-2' || str_valor == '')
	{
		parent.msgAdvertencia('Ha ocurrido un error.');
		return;
	}

	if (str_valor == '-3')
	{
		parent.msgAdvertencia(convertirCadena('No se ha seleccionado ningún archivo'));
		return;
	}
	
	return true;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para guardar en la base de datos.
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function guardar()
{	
	var str_sql = str_estado == 'nuevo' ? 'SQL_INSERTAR_NOTICIA_PORTAL' : 'SQL_ACTUALIZAR_NOTICIA_PORTAL';
	
	var obj_consulta =
	[
		{
			'SQL' : str_sql + '',
			'N' : 16,
			'DATOS' :
			[
				{
					'P1' : int_id_noti + "",
					'P2' : obj_noti.txt_titulo + "",
					'P3' : formato(obj_noti.txt_fecha) + "",
					'P4' : str_nombre + "",
					'P5' : str_nombre_mini + "",
					'P6' : obj_noti.txt_link + "",
					'P7' : obj_noti.txt_entrada + '',
					'P8' : obj_noti.txt_cuerpo + '',
					'P9' : obj_noti.cmb_subsistema + "",
					'P10' : "1",
					'P11' : "51",
					'P12' : "1",
					'P13' : str_nombre_doc + "",
					'P14' : formato(fechaActual()) + "",
					'P15' : formato(fechaActual()) + "",
					'P16' : obj_noti.cmb_tipo + ''
				}
			]
		}
	];
	
	var str_rs = send_query('./enviar_datos.hyg', obj_consulta, 'set' ,true);
	
	if (str_rs == 'Ok')
	{
		var str_msg = str_estado == 'nuevo' ? 'Noticia guardada correctamente.' : 'Noticia actualizada correctamente.'
		parent.msgInformacion(str_msg);
		$('#btn_guardar').prop('disabled', true);
		invocarMetodoAjeno('5', 'recargar_tabla');
		return;
	}
	
	parent.msgAdvertencia('Ha ocurrido un error, intente de nuevo mas tarde.');
}

function formatear_datepicker()
{
	$(function()
	{
		$.datepicker.setDefaults($.datepicker.regional['es'] =
		{
	  		closeText: 'Cerrar',
	  		prevText: 'Previo',
	  		changeYear: true,
	  		nextText: 'Pr\xF3ximo',
	  		monthStatus: 'Ver otro mes',
	  		yearStatus: 'Ver otro a\u00F1o',
	  		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	  		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	  		dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi\xE9rcoles', 'Jueves', 'Viernes', 'S\xE1bado'],
	  		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi\xE9;', 'Juv', 'Vie', 'S\xE1b'],
	  		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\xE1'],
	  		dateFormat: 'dd/mm/yy',
	  		firstDay: 0,
	  		initStatus: 'Selecciona la fecha',
	  		isRTL: false
	 	});

	 	$.datepicker.setDefaults($.datepicker.dateFormat = "dd/mm/yy");
	});
}