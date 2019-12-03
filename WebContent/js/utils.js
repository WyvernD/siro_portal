var str_url_webapp = '';

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Esta función se usa para inizializar variables globales, que son muy
 * 						utilizadas por formularios
 * Fecha creación:		2017/12/18
 * Fecha modificación	2017/12/18
 * */
function initialize(str_accion)
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTA_WEBAPP_PORTAL', 'N' : 0, 'DATOS' : {}};
	str_url_webapp = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,false)[0].RUTA;
}

function send_query(strUrl, objConsulta, strTipo, blToken = true)
{
	// Variable a retornar
	var objResultado = '-1';
	// Token del usuario
	var strToken = '-1';
	
	// Se se require token
	if (blToken)
	{
		// Se obtiene el token
		strToken = encode64(parent.consultarToken());
	}
	
	// Petición ajax
	$.ajax(
	{
		'url' : strUrl,
		'type' : 'POST',
		'data' : 
		{
			str_sql: encode64(JSON.stringify(objConsulta)),
			token: strToken
		},
		'async' : false,
		'success' : function(objResult)
		{
			// Si objResult tiene algo
			if (objResult != null && objResult != '')
			{
				// Si es tipo get
				if (strTipo === 'get')
				{
					// Se convierte el resultado a json
					var objDatos = JSON.parse(objResult);
					
					// Si el leng es mayo a 0
					if (objDatos.length > 0)
					{
						// Se guarda en la variable objResultado
						objResultado = objDatos;
					}
					else
					{
						objResultado = {};
					}
				}
				else
				{
					// Si es set se obtiene la respuesta sin convertirla
					objResultado = objResult;
				}
			}
			else
			{
				objResultado = '0'
			}
		},
		'error' : function(objError)
		{
			objResultado = '-1';
		}
	});
	
	// Se retorna el resultado
	return objResultado;
}

function send_query_usuario(strUrl, objConsulta)
{
	// Variable a retornar
	var objResultado = '-1';

	// Petición ajax
	$.ajax(
	{
		'url' : strUrl,
		'type' : 'POST',
		'data' : 
		{
			str_sql: encode64(JSON.stringify(objConsulta))
		},
		'async' : false,
		'success' : function(objResult)
		{
			// Si objResult tiene algo
			if (objResult != null && objResult != '')
			{
			
				// Se convierte el resultado a json
				var objDatos = JSON.parse(objResult);
				objResultado = objDatos;
				
				if (objDatos.length > 0)
				{
					// Se guarda en la variable objResultado
					objResultado = objDatos;
				}
				else
				{
					objResultado = {};
				}
				
			}
			else
			{
				objResultado = '0'
			}
		},
		'error' : function(objError)
		{
			objResultado = '-1';
		}
	});
	
	// Se retorna el resultado
	return objResultado;
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Esta función llena un slect de html con los datos que devuelve un controlador de spring
 * Fecha creación:		2017/10/06
 * Fecha modificación	2017/10/06
 * */
function llenarCombo(newOptions, id, blAuto = false, blMultible = false, strCLass = '', addClass = '')
{
	// Se guarda la referencia del select en una variable
	var select = $('#' + id);
	// Se accede a la propiedad options del select
	var options = select.prop('options');
	
	// Se recorre el json que deuvelve el controllador spring
	for (var i = 0; i < newOptions.length; i++)
	{
		// Se agregan los datos a las opciones del select, recibe primero el texto de la opción y segundo el valor
		options[options.length] = new Option(newOptions[i].VALUE, newOptions[i].KEY);
	}
	
	// Si el combo es autocompletable
	if (blAuto)
	{
		generarComboBuscador(select);
	}

	// Si es multple selección
	if (blMultible)
	{
		generarComboMultiple(id, strCLass, addClass);
	}

	if (!blMultible && !blAuto)
	{
		generarSumoSelect(select);
	}
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Esta función hace que un select de html se vuelva un buscador
 * Fecha creación:		2017/11/20
 * Fecha modificación	2017/11/20
 * */
function generarComboBuscador(select)
{
	select.SumoSelect(
		{
			search: true, searchText: 'Buscar...',
			placeholder: 'Seleccione'
		});

	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txtSuccess');
	$('.SumoSelect').css({'width' : '100%'});
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Esta función hace que un select de html se vuelva multiselección
 * Fecha creación:		2017/10/06
 * Fecha modificación	2017/10/06
 * */
function generarComboMultiple(id, strCLass, addClass)
{
	$('#' + id).SumoSelect(
			{
				search: false,
				placeholder: 'Seleccione',
				captionFormat: '{0} Seleccionadas',
				captionFormatAllSelected: 'Todas seleccionadas'
			});
	
	// Si addClass es true se deben aplicar las clases de strClass
	// A los elementos que crea sumoselect
	if (addClass)
	{
		$('#' + id).siblings('.CaptionCont').addClass(strCLass);
		$('#' + id).siblings('.optWrapper').addClass(strCLass);
	}

	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txtSuccess');
	$('.SumoSelect').css({'width' : '100%'});
}

function generarSumoSelect(select)
{
	select.SumoSelect(
	{
		csvDispCount: 5
	});
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txtSuccess');
	$('.SumoSelect').css({'width' : '100%'});
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para válidar los campos requeridos del formulario
 * Fecha creación:		2017/10/25
 * Fecha modificación:	2017/10/25
 * */
function validarCampos(strClase, objForm, bolRequerido)
{
	if (bolRequerido)
	{
		// Variable para controlar si faltan campos por llenar
		var error = 0;
		
		// Se recorren todos los objetos con la clase que enviaron al método
		$(strClase).each(function(i, objeto)
		{
			// En cada recorrido se llama la función validar, y se le envia el objeto
			// la función validar deuvelve 0 o 1, ese valor se le suma a la variable error
			error += validarRequeridos(objeto, objForm);
		});
		
		// Si error es mayor que 0
		if(error > 0)
		{
			return false;
		}
		
		return true;
	}
	
	// Se recorren todos los objetos con la clase que enviaron al método
	$(strClase).each(function(i, objeto)
	{
		validarNoRequeridos(objeto, objForm)
	});
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para válidar el valor o contenido de un objeto html
 * 						si es requerido
 * Fecha creación:		2017/10/25
 * Fecha modificación:	2017/10/25
 * */
function validarRequeridos(objeto, objForm)
{
	var id = $(objeto).attr('id');
	
	// Segpun el tag del objeto se comprueba su html o su valor, si está chequeado etc..
	// y se retorna 0 o 1 según sea el caso.
	switch ($(objeto)[0].tagName)
	{
		// Si es LABEL, STRONG o SPAN se válida solo el html 
		case 'LABEL':
		case 'STRONG':
		case 'SPAN':
			if ($(objeto).html() == '')
			{
				objForm[id] = 'null';
				return 1;
			}
			
			objForm[id] = $(objeto).html();
			return 0;
		break;
		// Si es INPUT se válida el tipo de input, por si es file, radio o checkbox
		case 'INPUT':
			// Si es de tipo radio
			if ($(objeto).attr('type') == 'radio')
			{
				// Se válida que este seleccionado
				if ($('input:radio[name=' + $(objeto).attr('name') + ']').is(':checked'))
				{
					id = $(objeto).attr('name');
					objForm[id] = $('input:radio[name=' + $(objeto).attr('name') + ']:checked').val();
					return 0;
				}

				objForm[id] = 'null';
				return 1;
			}
			
			// No es radio, checkbox o file se válidad el valor
			if ($(objeto).val() == '')
			{
				objForm[id] = 'null';
				return 1;
			}
			
			objForm[id] = $(objeto).val();
			return 0;
		break;
		// Si es select o textarea se válida el valor
		case 'SELECT':
		case 'TEXTAREA':
			if ($(objeto).val() == '' || $(objeto).val() == '0' || $(objeto).val() == null )
			{
				objForm[id] = 'null';
				return 1;
			}
			
			objForm[id] = $(objeto).val();
			return 0;
		break;
	}
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para válidar el valor o contenido de un objeto html
 * 						si no es requerido
 * Fecha creación:		2017/10/26
 * Fecha modificación:	2017/10/26
 * */
function validarNoRequeridos(objeto, objForm)
{
	var id = $(objeto).attr('id');
	
	// Segpun el tag del objeto se comprueba su html o su valor, si está chequeado etc..
	// y se retorna 0 o 1 según sea el caso.
	switch ($(objeto)[0].tagName)
	{
		// Si es LABEL, STRONG o SPAN se válida solo el html 
		case 'LABEL':
		case 'STRONG':
		case 'SPAN':
			if ($(objeto).html() == '')
			{
				objForm[id] = 'null';
			}
			else	
			{		
				objForm[id] = $(objeto).html();
			}
		break;
		// Si es INPUT se válida el tipo de input, por si es file, radio o checkbox
		case 'INPUT':
				// Si es de tipo radio
				if ($(objeto).attr('type') == 'radio')
				{
					id = $(objeto).attr('name');

					if($(objeto).attr('disabled'))
					{
						objForm[id] = 'null';
						return;
					}
					// Se válida que este seleccionado
					if ($('input:radio[name=' + $(objeto).attr('name') + ']').is(':checked'))
					{
						objForm[id] = $('input:radio[name=' + $(objeto).attr('name') + ']:checked').val();
					}
					else
					{
						objForm[id] = 'null';
					}
				}
				else if ($(objeto).attr('type') == 'checkbox')
				{
					if($(objeto).prop('checked'))
					{
						objForm[id] = '1';
					}
					else
					{
						objForm[id] = '0';
					}
				}
				else
				{
					if($(objeto).attr('readonly') && $(objeto).attr('type') == 'time')
					{
						objForm[id] = '00:00';
						return;
					}

					// No es radio, checkbox o file se válidad el valor
					if ($(objeto).val() == '')
					{
						objForm[id] = 'null';
					}
					else
					{
						objForm[id] = $(objeto).val();
					}
				}
		break;
		// Si es select o textarea se válida el valor
		case 'SELECT':
		case 'TEXTAREA':
			if ($(objeto).val() == '' || $(objeto).val() == '0' || $(objeto).val() == null )
			{
				objForm[id] = 'null';
			}
			else
			{
				objForm[id] = $(objeto).val();
			}
		break;
	}
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para validar cuando de un select se activan otros campos
 * Fecha creación:		2017/10/25
 * Fecha modificación:	2017/10/25
 * */
function validarSeleccion(objeto, objInputs, objPropiedad, blValidarIndex, intIndex, strSpan, strOptionName)
{

	// Se obtiene el texto de la opcion
	var strOption = $(objeto + " option[value='" + $(objeto).val() + "']").text();
	var blCondicion = true;
	var strRclase = 'requerido';
	var strAclase = 'nRequerido';

	$(strSpan).hide();

	// Si el valor del combo es diferente de null
	if ($(objeto).val())
	{
		if (blValidarIndex)
		{
			// Si existe el id o el nombre de la opción
			if ($(objeto).val().indexOf(intIndex) != -1 && strOption == convertirCadena(strOptionName))
			{
				blCondicion = false;
			}
			else
			{
				blCondicion = true;
			}
		}
		else
		{
			blCondicion = false;
		}
	}
	else
	{
		blCondicion = true;
	}

	if (!blCondicion)
	{
		strRclase = 'nRequerido';
		strAclase = 'requerido';
		$(strSpan).show();
	}
	
	// Caso contrario se des habilitan los inputs
	for (var i = 0; i < objInputs.length; i++)
	{
		$(objInputs[i]).attr(objPropiedad[i], blCondicion);
		$(objInputs[i]).removeClass(strRclase);
		$(objInputs[i]).addClass(strAclase);
		
		// Limpiar el input
		limpiarInput(objInputs[i]);
	}

	return blCondicion;
}

function limpiarInput(objInput)
{
	if ($(objInput)[0].tagName == 'INPUT')
	{
		$(objInput).val('');
	}

	if ($(objInput)[0].tagName == 'SELECT')
	{
		$(objInput).val('0');
	}
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para validar que la hora sea mayor a otra hora
 * Fecha creación:		2017/10/30
 * Fecha modificación:	2017/10/30
 * */
function validarHoras(strHoraInicial, strHoraFinal, strIdTxt)
{
	if($(strIdTxt).attr('readonly'))
	{
		return true;
	}

	if (
		(new Date(2000, 1, 1, parseInt(strHoraInicial.split(':')[0]), parseInt(strHoraInicial.split(':')[1]), 0, 0)) < 
		(new Date(2000, 1, 1, parseInt(strHoraFinal.split(':')[0]), parseInt(strHoraFinal.split(':')[1]), 0, 0))
	)
	{
		return true;
	}

	return false;
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función devuelve la fecha actual en el formato adecuado para los input
 *						y la base de datos
 * Fecha creación:		2017/10/30
 * Fecha modificación:	2017/10/30
 * */
function fechaActual()
{
	var today = new Date();
	var d = today.getDate();
	var m = today.getMonth() + 1; //January is 0!
	var y = today.getFullYear();

	if(d < 10)
	{
	    d = '0' + d;
	}

	if(m < 10)
	{
	    m = '0' + m;
	}

	today = y + '-' + m + '-' + d;

	return today;
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función devuelve la fecha en formato dd/mm/yyyy
 * Fecha creación:		2017/10/31
 * Fecha modificación:	2017/10/31
 * */
function formato(strFecha)
{
  	return strFecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para calcular el tiempo transcurrido de una hora a otra
 * Fecha creación:		2017/11/01
 * Fecha modificación:	2017/11/01
 * */
function restarHoras(inicio, fin)
{
	var strResultado = '';
	// Minutos iniciales
	var inicioMinutos = parseInt(inicio.substr(3,2));
	// Horas iniciales
	var inicioHoras = parseInt(inicio.substr(0,2));

	// Minutos finales
	var finMinutos = parseInt(fin.substr(3,2));
	// Horas finales
	var finHoras = parseInt(fin.substr(0,2));

	// Minutos transcurridos
	var transcurridoMinutos = finMinutos - inicioMinutos;
	// Horas transcurridas
	var transcurridoHoras = finHoras - inicioHoras;

	if (transcurridoMinutos < 0)
	{
		transcurridoHoras--;
		transcurridoMinutos = 60 + transcurridoMinutos;
	}

	var strMinuto = transcurridoMinutos > 1 ? 'minutos' : 'minuto';
	var strHora = transcurridoHoras > 1 ? 'horas' : 'hora';

	if (transcurridoHoras != 0 && transcurridoMinutos != 0)
	{
		strResultado += transcurridoHoras + ' ' + strHora + ' y ' + transcurridoMinutos + ' ' + strMinuto;
	}
	else if (transcurridoHoras != 0 && transcurridoMinutos == 0)
	{
		strResultado += transcurridoHoras + ' ' + strHora;
	}
	else if (transcurridoHoras == 0 && transcurridoMinutos != 0)
	{
		strResultado += transcurridoMinutos + ' ' + strMinuto;
	}

	return strResultado;
}


/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para mostrar el nuevo formulario y pasarle los datos
 * Fecha creación:		2017/10/24
 * Fecha modificación:	2017/10/24
 * */
function abrirFormulario(objCapaGeo, objPropiedades)
{
	// Se muestra el gif de cargando
	// parent.showLoading();
	
	// Si existe un objeto con id 'div300001'
	if ( window.parent.document.getElementById('divModalForm_' + objPropiedades.ID) != undefined)
	{
		// Se elimina el formulario
		// delete parent.forms[objPropiedades.ID];
		// Se elimina el div
		delete window.parent.document.getElementById('divModalForm_' + objPropiedades.ID);
	}
	
	// Se muestra el nuevo formulario
	parent.abrir_modal_admin(objPropiedades, true);
	// Variable para instanciar el nuevo formulario
	var objeto = window.parent.document.getElementById('ifModalForm_' + objPropiedades.ID);
	validarIngresoFormulario(objeto, objCapaGeo);
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para ejecutar x función de un iframe ajeno
 * Fecha creación:		2017/11/03
 * Fecha modificación:	2017/11/03
 * */
function invocarMetodoAjeno(strIdForm, strFuncion, data = [])
{
	// Gif de carga
	// parent.showLoading();

	// Se verifica que el formulario si exista
	if (window.parent.document.getElementById('divModalForm_' + strIdForm) != undefined)
	{
		var objeto = window.parent.document.getElementById('ifModalForm_' + strIdForm);
		eval('objeto.contentWindow.' + strFuncion + '(data)');
	}
	else
	{
		parent.msgAdvertencia('No se encontró el formulario');
	}

	// parent.hideLoading('');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para válidar el formulario en caso de que no esté listo
 * Fecha creación:		2017/10/24
 * Fecha modificación:	2017/10/24
 * */
function validarIngresoFormulario(objeto, objCapaGeo)
{
	try
	{
		// Se ejecuta por 3 segundos
		setTimeout(function()
		{
			// Se ejecuta un método llamado cargarNuevosDatos, método que debe existir en el javascript
			// del formulario que se va a mostrar (se le pasa la objCapaGeo)
			objeto.contentWindow.cargarNuevosDatos(objCapaGeo);
			// parent.hideLoading('');
		}, 3000);

	}
	catch (e)
	{
		// Si hay errores, se vuelve a intentar ejecutar este método
		validarIngresoFormulario(objeto, objCapaGeo);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para reemplazar los caracteres especiales de una cadena
 * Fecha creación:		2017/11/07
 * Fecha modificación:	2017/11/07
 * */
function convertirCadena(strCadena)
{
	while (strCadena.includes('Á') || strCadena.includes('á')
			|| strCadena.includes('É') || strCadena.includes('é')
			|| strCadena.includes('Í') || strCadena.includes('í')
			|| strCadena.includes('Ó') || strCadena.includes('ó')
			|| strCadena.includes('Ú') || strCadena.includes('ú')
			|| strCadena.includes('Ñ') || strCadena.includes('ñ')
			|| strCadena.includes('¿'))
	{
		strCadena = strCadena.replace('Á', '\xC1');
		strCadena = strCadena.replace('á', '\xE1');
		strCadena = strCadena.replace('É', '\xC9');
		strCadena = strCadena.replace('é', '\xE9');
		strCadena = strCadena.replace('Í', '\xCD');
		strCadena = strCadena.replace('í', '\xED');
		strCadena = strCadena.replace('Ó', '\xD3');
		strCadena = strCadena.replace('ó', '\xF3');
		strCadena = strCadena.replace('Ú', '\xDA');
		strCadena = strCadena.replace('ú', '\xFA');
		strCadena = strCadena.replace('Ñ', '\xD1');
		strCadena = strCadena.replace('ñ', '\xF1');
		strCadena = strCadena.replace('¿', '\xBF');
	}
	

	return strCadena;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para deshabilitar un item de html, tambien le peude agregar una clase,
 *						fue pensado para cuando se trata de un span que funciona como boton, poder ponerle el cursor
 *						bloqueado y quitarle opacidad.
 * Fecha creación:		2017/11/15
 * Fecha modificación:	2017/11/15
 * */
function cambiarEstado(objeto, strPropiedad, blEstado, blApiclarClase)
{
	// Se le asigna la propiedad al item
	$(objeto).prop(strPropiedad, blEstado)

	// Si hay que asignarle la clase
	if (blApiclarClase)
	{
		$(objeto).children().addClass('bloquear');
	}
	else
	{
		$(objeto).children().removeClass('bloquear');
	}
}

function consultarReporte(url, data, tipo, titulo)
{
	// Se obtiene el token del usuario
	var token = parent.consultarToken();
	// Se válida que no sea nulo
	if (token == null)
	{
        return;
	}
	
	var resultado = null;
	
	$.ajax(
	{
		"url" : url,
		"type": "POST",
		"data": 
		{
			str_sql: data,
			token: encode64(token),
			tipo : encode64(tipo),
			titulo: encode64(titulo)
		},
		"async" : false,
		"success" : function(result)
		{
			console.log(result);
		}
	});
	
	return resultado;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para hacer una petición ajax al controlador,
 * 						esté se encarga de guardar el archivo y devolver la ruta
 * Fecha creación:		2017/11/27
 * Fehca modificación:	2017/11/27
 */
function subirFichero(formData)
{
	// Variable a retornar
	var resultado = null;
	
	// Se inicia la petición ajax
	$.ajax(
	{
		type : "POST",
		enctype : 'multipart/form-data',
		url : "./uploadFile.hyg",
		data : formData,
		processData : false,
		contentType : false,
		cache : false,
		timeout : 600000,
		async:false,
		success : function(result)
		{
			// Si todo salió bien, se guarda el resultado (osea la nueva ruta)
			// en la variable resultado
			resultado = result;
		},
		error : function(e)
		{
			console.log("ERROR : ", e);
			resultado = "-1";
		}
	});
	
	return resultado;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para hacer una petición ajax al controlador,
 * 						esté se encarga de guardar el archivo y devolver la ruta
 * Fecha creación:		2017/11/27
 * Fehca modificación:	2017/11/27
 */
function eliminarFichero(ruta)
{
	// Variable a retornar
	var resultado = null;
	
	// Se inicia la petición ajax
	$.ajax(
	{
		type : "POST",
		url : "./deleteFile.hyg",
		data : 
		{
			ruta : ruta
		},
		async:false,
		success : function(result)
		{
			// Si todo salió bien, se guarda el resultado (osea la nueva ruta)
			// en la variable resultado
			resultado = result;
		},
		error : function(e)
		{
			console.log("ERROR : ", e);
			resultado = "-1";
		}
	});
	
	return resultado;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para aplicar un maximo de alto a los contenedores
 *						de mapgis.
 * Fecha creación:		2017/11/28
 * Fecha modificación:	2017/11/28
 * */
function modificar_contenedor(str_id_form, bl_redefinir = false)
{
	var max_alto = bl_redefinir == true ? 'unset' : '602px';
	var max_alto_sub = bl_redefinir == true ? 'unset' : '562px';
	var div_principal = window.parent.document.getElementById('div' + str_id_form);
	var div_secundario = $(div_principal).children()[1];
	var val_principal = $(div_principal).height();
	var val_secundario = $(div_secundario).height();
	$(div_principal).css({'max-height' : max_alto});
	$(div_secundario).css({'max-height' : max_alto_sub});
	$(div_principal).css({'min-height' : '0px'});
	$(div_secundario).css({'min-height' : '0px'});
}
/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para modificar el alto del iframe
 *						de mapgis.
 * Fecha creación:		2017/11/28
 * Fecha modificación:	2017/11/28
 * */
function agregar_alto(str_id_form, bl_nada = false)
{
	if (!bl_nada)
	{
		// Body del iframe -> contenedor del formulario
		var container = $('body').children()[1];
		// Tamaño del scroll
		var valor_scroll = $(container)[0].scrollHeight;
		// Padre principal del iframe
		var div_principal = window.parent.document.getElementById('div' + str_id_form);
		// Padre secundario del iframe
		var div_secundario = $(div_principal).children()[1];
		// Alto del padre principal
		var val_principal = $(div_principal).height();
		var val_secundario = $(div_secundario).height();

		// Se le aplica el alto del scrol + 39 al principal
		$(div_principal).height(valor_scroll + 39);
		// Se le aplica el alto del scroll al secundario
		$(div_secundario).height(valor_scroll);
	}
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para procesar el where de una petición
 * Fecha creación:		2017/12/04
 * Fecha modificación:	2017/12/04
 * */
function validar_where(str_clase)
{	
	var str_resultado = '';
	// Se recorren todos los objetos con la clase que enviaron al método
	$(str_clase).each(function(i, objeto)
	{
		// En cada recorrido se llama la función validacion_where
		str_resultado = validacion_where(objeto, str_resultado);
	});

	return str_resultado;
}

/*
 * Autor:				Daiber Gonzalez
 * Descripción:			Está función se usa para crear un string especifico y retornarlo
 * Fecha creación:		2017/12/04
 * Fecha modificación:	2017/12/04
 * */
function validacion_where(objeto, str_where)
{
	var name = $(objeto).attr('name');
	
	// Segpun el tag del objeto se comprueba su html o su valor, si está chequeado etc..
	// y se retorna 0 o 1 según sea el caso.
	switch ($(objeto)[0].tagName)
	{
		// Si es LABEL, STRONG o SPAN se válida solo el html 
		case 'LABEL':
		case 'STRONG':
		case 'SPAN':
			if ($(objeto).html() == '')
			{
				str_where += '';
			}
			else
			{
				str_where += ' and ' + name + " = '" + $(objeto).html().trim() + "'";
			}
		break;
		// Si es INPUT se válida el tipo de input, por si es file, radio o checkbox
		case 'INPUT':
			// Si es de tipo radio
			if ($(objeto).attr('type') == 'radio')
			{
				// Se válida que este seleccionado
				if ($('input:radio[name=' + $(objeto).attr('name') + ']').is(':checked'))
				{
					str_where += ' and ' + name + " = '" + $('input:radio[name=' + name + ']:checked').val() + "'";
				}
				else
				{
					str_where += '';
				}
			}
			
			// No es radio, checkbox o file se válidad el valor
			if ($(objeto).val() == '')
			{
				str_where += '';
			}
			else
			{
				str_where += ' and ' + name + " = '" + $(objeto).val() + "'";
			}
		break;
		// Si es select o textarea se válida el valor
		case 'SELECT':
		case 'TEXTAREA':
			if ($(objeto).val() == '' || $(objeto).val() == '0' || $(objeto).val() == null )
			{
				str_where += '';
			}
			else
			{
				str_where += ' and ' + name + " = '" + $(objeto).val() + "'";
			}
		break;
	}

	return str_where;
}

function des_habilitar_inputs(str_clase)
{
	$(str_clase).each(function(i, objeto)
	{
		// En cada recorrido se llama la función validacion_where
		switch ($(objeto)[0].tagName)
		{
			// Si es INPUT se válida el tipo de input, por si es file, radio o checkbox
			case 'INPUT':
				// Si es de tipo radio
				if ($(objeto).attr('type') == 'radio')
				{
					$(objeto).prop('disabled', true);
				}
				else
				{
					$(objeto).prop('readonly', true);
				}
			break;
			// Si es select o textarea se válida el valor
			case 'SELECT':
				$(objeto).prop('disabled', true);
			break;
			case 'TEXTAREA':
				$(objeto).prop('readonly', true);
			break;
		}
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para reemplazar los caracteres especiales de una cadena
 * 						que venga de base de datos
 * Fecha creación:		2018/11/07
 * Fecha modificación:	2018/11/07
 * */
function convertir_cadena_db(strCadena)
{
	while (strCadena.includes('||A||') || strCadena.includes('||a||')
			|| strCadena.includes('||E||') || strCadena.includes('||e||')
			|| strCadena.includes('||I||') || strCadena.includes('||i||')
			|| strCadena.includes('||O||') || strCadena.includes('||o||')
			|| strCadena.includes('||U||') || strCadena.includes('||u||')
			|| strCadena.includes('||N||') || strCadena.includes('||n||')
			|| strCadena.includes('||?||'))
	{
		strCadena = strCadena.replace('||A||', '\xC1');
		strCadena = strCadena.replace('||a||', '\xE1');
		strCadena = strCadena.replace('||E||', '\xC9');
		strCadena = strCadena.replace('||e||', '\xE9');
		strCadena = strCadena.replace('||I||', '\xCD');
		strCadena = strCadena.replace('||i||', '\xED');
		strCadena = strCadena.replace('||O||', '\xD3');
		strCadena = strCadena.replace('||o||', '\xF3');
		strCadena = strCadena.replace('||U||', '\xDA');
		strCadena = strCadena.replace('||u||', '\xFA');
		strCadena = strCadena.replace('||N||', '\xD1');
		strCadena = strCadena.replace('||n||', '\xF1');
		strCadena = strCadena.replace('||?||', '\xBF');
	}
	

	return strCadena;
}