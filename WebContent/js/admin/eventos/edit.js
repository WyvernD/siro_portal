// Variables globales
var str_estado = '';
var obj_evento = {};
var str_ruta_wapp = '';
var str_ruta_evento = '';
var int_id_evento = '';
var str_nombre_evento = '';
var str_id_para_editar = '';
// Variable aleatoria
var int_aleatorio = Math.round(Math.random()*999999999);
// Array de subsistemas para persistir
var obj_subsistemas = [];
var str_fecha_creacion = '';

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para procesar
 * 						la información enviada desde el anterior
 * 						formulario.
 * Fecha creación:		2018/01/10.
 * Fecha modificación:	2018/01/10.
 * */
function cargarNuevosDatos(obj_datos)
{
	str_estado = obj_datos.ESTADO;
	str_ruta_wapp = obj_datos.WEBAPP;
	
	if (str_estado == 'nuevo')
	{
		// Cargar formulario nuevo
		cargar_nuevo();
	}
	else
	{
		cargar_editar(obj_datos);
	}
	
	generarSumoSelect($('#cmb_tipo'));
	// Evento a combos
	evento_combos();
	// Evento a botones
	evento_botones();
	// Formatear fechas del datepicker
	formatear_datepicker();
	$("#txt_fecha_inicio").datepicker();
	$("#txt_fecha_final").datepicker();
	$('.load_container').hide();
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
	  		yearStatus: 'Ver otro aÃ±o',
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

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para preparar el formulario,
 * 						si es un nuevo registro.
 * Fecha creación:		2018/01/10.
 * Fecha modificación:	2018/01/10.
 * */
function cargar_nuevo()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SUBSISTEMAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ''}};
	obj_subsistemas = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_subsistemas, 'cmb_subsistema', false, false, '', '');
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONSECUTIVO_EVENTOS_PORTAL', 'N' : 0, 'DATOS' : {}};
	int_id_evento = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].CONSECUTIVO;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para preparar el formulario,
 * 						si se va a editar un registro.
 * Fecha creación:		2018/01/13.
 * Fecha modificación:	2018/01/13.
 * */
function cargar_editar(obj)
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SUBSISTEMAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ''}};
	obj_subsistemas = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_subsistemas, 'cmb_subsistema', false, false, '', '');
	$('#cmb_subsistema').prop('disabled', true);
	$('#cmb_subsistema').val(obj.FK_IDSUBSISTEMA);
	reload_combo('#cmb_subsistema', 0);
	reload_combo('#cmb_tipo', 1);
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_TIPOEVENTOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and FK_IDSUBSISTEMA = ' + obj.FK_IDSUBSISTEMA}};
	var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_rs, 'cmb_tipo', false, false, '', '');
	$('#cmb_tipo').val(obj.FK_IDTIPOEVENTO);
	reload_combo('#cmb_tipo', 0);
	int_id_evento = obj.PK_IDPUBLI_EVENTOS;
	$('#txt_actividad').val(obj.ACTIVIDAD == 'null' ? '' : convertir_cadena_db(obj.ACTIVIDAD));
	$('#txt_descripcion').val(obj.DESCRIPCION == 'null' ? '' : convertir_cadena_db(obj.DESCRIPCION));
	$('#txt_fecha_inicio').val(formato(obj.FECHAINICIO.split(' ')[0]));
	$('#txt_fecha_final').val(formato(obj.FECHAFIN.split(' ')[0]));
	$('#txt_hora_inicio').val(obj.HORAINICIO);
	$('#txt_hora_final').val(obj.HORAFIN);
	$('#txt_lugar').val(obj.LUGAR == 'null' ? '' : convertir_cadena_db(obj.LUGAR));
	str_id_para_editar = obj.IMAGEN.split('.')[0];
	str_fecha_creacion = formato(obj.FECHA_CREACION.split(' ')[0]);
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los botones
 * 						del formulario.
 * Fecha creación:		2018/01/11.
 * Fecha modificación:	2018/01/11.
 * */
function evento_botones()
{
	$('#btn_guardar').on('click', function()
	{
		// Validar campos requeridos
		var bl_rs = validarCampos('.requerido', obj_evento, true);
		
		if (bl_rs)
		{
			// Validar campos no requeridos
			validarCampos('.nRequerido', obj_evento, false);
			
			// Se válidan la hora final y la inicial
			// var bl_tmp = validarHoras(obj_evento.txt_hora_inicio, obj_evento.txt_hora_final, '#txt_hora_final');
			
			// Si la hora final es menor que la inicial
			/*if (!bl_tmp)
			{
				parent.msgAdvertencia('La hora final es menor que la hora inicial.');
				return;
			}*/
			
			var obj_subsistema = obj_subsistemas.filter(word => word.KEY == $('#cmb_subsistema').val());
			str_ruta_evento = str_ruta_wapp + obj_subsistema[0].URL;
			
			var str_rs = null;
			
			if($('#file')[0].files[0])
			{
				// Guardar imagen.
				str_rs = validar_archivo('#file');
				// Validar subida del archivo
				bl_rs = validar_subida(str_rs);
			}
			
			if (bl_rs)
			{
				// Se asigna el nombre del logo
				str_nombre_evento = str_rs != null ? str_rs : str_id_para_editar + '.png';
				// Se guarda el logo
				guardar();
			}
		}
		else
		{
			parent.msgAdvertencia('Los campos marcados con * son obligatorios.');
		}
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para validar un archivo que va a ser subido al servidor
 * Fecha creación:		2017/12/25
 * Fecha modificación:	2017/12/25
 * */
function validar_archivo(obj)
{
	var int_id = str_estado == 'nuevo' ? int_id_evento : str_id_para_editar;
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
        data.append('id', int_id);
        data.append('ruta', str_ruta_evento);
        data.append('tipo', 'imagen');
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
 * Fecha creación:		2018/01/11.
 * Fecha modificación:	2018/01/11.
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
 * Fecha creación:		2018/01/10.
 * Fecha modificación:	2018/01/10.
 * */
function guardar()
{
	var str_sql = str_estado == 'nuevo' ? 'SQL_INSERTAR_EVENTOS_PORTAL' : 'SQL_ACTUALIZAR_EVENTOS_PORTAL';
	var fecha_create = str_estado == 'nuevo' ? formato(fechaActual()) : str_fecha_creacion;
	
	var obj_consulta =
	[
		{
			'SQL' : str_sql + '',
			'N' : 17,
			'DATOS' :
			[
				{
					'P1' : int_id_evento + "",
					'P2' : obj_evento.cmb_subsistema + "",
					'P3' : obj_evento.cmb_tipo + "",
					'P4' : obj_evento.txt_actividad + "",
					'P5' : formato(obj_evento.txt_fecha_inicio) + "",
					'P6' : formato(obj_evento.txt_fecha_final) + "",
					'P7' : obj_evento.txt_hora_inicio + "",
					'P8' : obj_evento.txt_hora_final + "",
					'P9' : obj_evento.txt_descripcion + "",
					'P10' : obj_evento.txt_lugar + "",
					'P11' : str_nombre_evento + "",
					'P12' : "1",
					'P13' : "1",
					'P14' : '51',
					'P15' : '2',
					'P16' : fecha_create + '',
					'P17' : formato(fechaActual())
				}
			]
		}
	];
	
	var str_rs = send_query('./enviar_datos.hyg', obj_consulta, 'set' ,true);
	
	if (str_rs == 'Ok')
	{
		parent.msgInformacion('Evento guardado correctamente.');
		$('#btn_guardar').prop('disabled', true);
		invocarMetodoAjeno('4', 'recargar_tabla');
		return;
	}
	
	parent.msgAdvertencia('Ha ocurrido un error, intente de nuevo mas tarde.');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los combos del formulario
 * Fecha creación:		2018/01/10.
 * Fecha modificación:	2018/01/10.
 * */
function evento_combos()
{
	$('#cmb_subsistema').on('change', function()
	{
		var int_val = $(this).val();
		
		if (int_val != '0')
		{
			reload_combo('#cmb_tipo', 1);
			var obj_consulta = {'SQL' : 'SQL_CONSULTAR_TIPOEVENTOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and FK_IDSUBSISTEMA = ' + int_val}};
			var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
			llenarCombo(obj_rs, 'cmb_tipo', false, false, '', '');
			reload_combo('#cmb_tipo', 2);
			return;
		}
		
		reload_combo('#cmb_tipo', 1);
		reload_combo('#cmb_tipo', 2);
	});
}

function reload_combo(obj, int_accion)
{
	if (int_accion == 1)
	{
		$(obj).empty();
		// Se le agrega la opción por defecto
		$(obj).append('<option value="0">Seleccione</option>');
		return;
	}

	$(obj)[0].sumo.reload();
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txtSuccess');
}













