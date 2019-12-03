// Variables globales
var int_id_seccion = '';
var str_estado = '';
var obj_logo = {};
var str_ruta = '';
var int_id_logo = '';
var str_nombre_logo = '';
var str_id_para_editar = '';
// Variable aleatoria
var int_aleatorio = Math.round(Math.random()*999999999);

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
	$('#txt_ancho').val(obj_datos.ANCHO);
	$('#txt_alto').val(obj_datos.ALTO);
	int_id_seccion = obj_datos.ID_SECCION;
	str_estado = obj_datos.ESTADO;
	str_ruta = obj_datos.WEBAPP + obj_datos.RUTA;
	
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
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONSECUTIVO_LOGOS', 'N' : 0, 'DATOS' : {}};
	int_id_logo = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].CONSECUTIVO;
	$('#file_imagen').addClass('requerido');
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
	int_id_logo = obj.ID;
	$('#file_imagen').addClass('nRequerido');
	str_id_para_editar = obj.NOMBRE.split('.')[0];
	$('#txt_descripcion').val(obj.DESCRIPCION == 'null' ? '' : convertir_cadena_db(obj.DESCRIPCION));
	var bl_check = obj.PUBLICO == 0 ? false : true;
	$('#cb_publico').prop('checked', bl_check);
	$('#img_container').attr('src', obj.RUTA + obj.NOMBRE + '?p=' + int_aleatorio);
	$('#img_container').show();
}

function evento_botones()
{
	$('#btn_guardar').on('click', function()
	{
		// Validar campos requeridos
		var bl_rs = validarCampos('.requerido', obj_logo, true);
		
		if (bl_rs)
		{
			// Validar campos no requeridos
			validarCampos('.nRequerido', obj_logo, false);
			var str_rs = null;
			
			if($('#file_imagen')[0].files[0])
			{
				// Guardar imagen.
				str_rs = validar_archivo('#file_imagen');
				// Validar subida del archivo
				bl_rs = validar_subida(str_rs);
			}
			
			if (bl_rs)
			{
				// Se asigna el nombre del logo
				str_nombre_logo = str_rs != null ? str_rs : str_id_para_editar + '.png';
				// Se guarda el logo
				guardar();
			}
		}
		else
		{
			parent.msgAdvertencia('Los campos marcados con * son obligatorios.');
		}
	});
	
	$('#file_imagen').on('change', function()
	{
		$('#btn_guardar').prop('disabled', true);
		// Cada que se elija una imagen, se mostrará abajo del formulario
		if ($(this)[0].files[0])
		{
			var reader = new FileReader();
			reader.onload = function(e)
			{
				$('#img_container').attr('src', e.target.result);
			}
	
		    reader.readAsDataURL($(this)[0].files[0]);
		    $('#img_container').show();
		    
		    setTimeout(function()
		    {
		    	var int_width = $('#img_container')[0].naturalWidth;
			    var int_height = $('#img_container')[0].naturalHeight;
			    
			    // Se válida el tamaño de la imagen
			    validar_medidas(int_width, int_height);
		    }, 200)
		}
		else
		{
			$('#img_container').hide();
		}
		
		$('#btn_guardar').prop('disabled', false);
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para validar un archivo que va a ser subido al servidor
 * Fecha creación:		2017/12/25
 * Fecha modificación:	2017/12/25
 * */
function validar_archivo(obj, intIdDetalle)
{
	var int_id = str_estado == 'nuevo' ? int_id_logo : str_id_para_editar;
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
        data.append('ruta', str_ruta);
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
	var str_sql = str_estado == 'nuevo' ? 'SQL_INSERTAR_LOGOS_PORTAL' : 'SQL_ACTUALIZAR_LOGOS_PORTAL';
	
	var obj_consulta =
	[
		{
			'SQL' : str_sql + '',
			'N' : 9,
			'DATOS' :
			[
				{
					'P1' : int_id_logo + "",
					'P2' : str_nombre_logo + "",
					'P3' : int_id_seccion + "",
					'P4' : obj_logo.txt_ancho + "",
					'P5' : obj_logo.txt_alto + "",
					'P6' : formato(fechaActual()) + "",
					'P7' : "?USUARIO?",
					'P8' : obj_logo.cb_publico + "",
					'P9' : obj_logo.txt_descripcion + ""
				}
			]
		}
	];
	
	var str_rs = send_query('./enviar_datos.hyg', obj_consulta, 'set' ,true);
	
	if (str_rs == 'Ok')
	{
		parent.msgInformacion('Logo guardado correctamente.');
		$('#btn_guardar').prop('disabled', true);
		invocarMetodoAjeno('2', 'recargar_tabla');
		return;
	}
	
	parent.msgAdvertencia('Ha ocurrido un error, intente de nuevo mas tarde.');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para válidar las dimensiones
 * 						del logo.
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function validar_medidas(int_width, int_height)
{
	var int_ancho = $('#txt_ancho').val();
	var int_alto = $('#txt_alto').val();
	
	// Si la iamgen no cumple con el ancho y alto indicado
	if (int_ancho != int_width || int_alto != int_height)
	{
		parent.msgAdvertencia('La imagene debe medir ' + int_ancho + ' de ancho * ' + int_alto + ' de alto.');
		// Se limpia el input tipo file, para que no deje guardar la imagen
		$('#file_imagen').replaceWith($('#file_imagen').val('').clone(true));
	}
}