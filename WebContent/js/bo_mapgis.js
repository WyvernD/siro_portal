/*
 * Author:			Daiber Gonzalez.
 * Description:		This functión is used for show a new formulary in the portal.
 * Created date:	2017/12/12.
 * Updated date:	2017/12/12.
 * */
function abrir_modal_admin(formulario, modal)
{
	// If not exists a formulary.
	if ($("#divModalForm_" + formulario.ID).length == 0)
	{
		// Create the formulary
		var html = '<div id="divModalForm_' + formulario.ID + '" class="dialogFormulario" title="' + formulario.NOMBRE + '">';
		html += '<iframe id="ifModalForm_' + formulario.ID + '" src="" class="iframe_admin"></iframe>';
		html += '</div>';
		$("body").append(html);
	}
	
	// Assign properties of formulary
	$("#divModalForm_" + formulario.ID).dialog(
	{
		title: formulario.NOMBRE,
		modal: modal,
		autoOpen: false,
		width: formulario.ANCHO,
		height: formulario.ALTO
		/*position: {
			my: "left top",
			at: "left+" + formulario.IZQUIERDA + " top+" + formulario.ARRIBA,
			of: "body"
		}*/
	});
	
	// Add view in the formulary
	$("#divModalForm_" + formulario.ID + " iframe").attr("src", "");
	$("#divModalForm_" + formulario.ID + " iframe").attr("src", formulario.ENLACE);
	// Open formulary
	$("#divModalForm_" + formulario.ID).dialog('open');
	// Add new class
	var obj_modal = $("#divModalForm_" + formulario.ID).parent();
	$(obj_modal).addClass('modal-admin');
	$(obj_modal).css({'max-width' : formulario.ANCHO + 'px'});
	$(obj_modal).css({'top' : formulario.TOP});
}

/*
 * Author:			Daiber Gonzalez.
 * Description:		this function is used to request login.
 * Created date:	2017/12/12.
 * Updated date:	2017/12/12.
 * */
function soltar()
{
	$("#divModalForm_login").dialog("open");
    $('#divModalForm_login').parent().removeClass('modal-admin');
}

/*
 * Author:			Daiber Gonzalez.
 * Description:		this function is used for show a error message.
 * Created date:	2017/12/12.
 * Updated date:	2017/12/12.
 * */
function msgError(txt, detalle)
{
	try 
	{
		$("#divMensajeCont").dialog('destroy');
	}
	catch (e){}
	
	// Remove message
	$("#divMensajeCont").remove();
	// Create a new message container
	$("body").append("<div id='divMensajeCont' style='display:none; text-align:center' title='Error'>" + txt + " <br/><br/> " + detalle + "<div class='dialog_button'><button class='btnMensajeCont'>Aceptar</button></div></div>");
	
	setTimeout(function()
	{
		$('#divMensajeCont').parent().addClass('ui_error_siro');
	}, 100);

	// Assign event click in the button of message
	$("#divMensajeCont button").click(function()
	{
		try
		{
			$("#divMensajeCont").dialog('destroy');
		}
		catch (e){}
		// Destroy message
		$("#divMensajeCont").remove();
	})
	// assign event in the dialog
	$("#divMensajeCont").dialog(
	{
		close: function()
		{
			try
			{
				$("#divMensajeCont").dialog('destroy');
			}
			catch (e){}
			$("#divMensajeCont").remove();
		},
		modal: true,
		autoOpen: true
	});
}

/*
 * Author:			Daiber Gonzalez.
 * Description:		this function is used for show a warning message.
 * Created date:	2017/12/12.
 * Updated date:	2017/12/12.
 * */
function msgAdvertencia(txt)
{
	try
	{
		$("#divMensajeCont").dialog('destroy');
	}
	catch (e){}
	
	$("#divMensajeCont").remove();
	$("body").append("<div id='divMensajeCont' style='display:none; text-align:center' title='Advertencia'>" + txt + "<div class='dialog_button'><button class='btnMensajeCont'>Aceptar</button></div></div>");
	
	setTimeout(function()
	{
		$('#divMensajeCont').parent().addClass('ui_advertencia_siro');
	}, 100);
	
	$("#divMensajeCont button").click(function()
	{
		try
		{
			$("#divMensajeCont").dialog('destroy');
		}
		catch (e){}
		
		$("#divMensajeCont").remove();
	})
	
	$("#divMensajeCont").dialog(
	{
		//Cerrar form con tecla Escape -> closeOnEscape: true,
		close: function()
		{
			try
			{
				$("#divMensajeCont").dialog('destroy');
			}
			catch (e){}
			$("#divMensajeCont").remove();
		},
		modal: true,
		autoOpen: true
	});
}

/*
 * Author:			Daiber Gonzalez.
 * Description:		this function is used for show a information message.
 * Created date:	2017/12/12.
 * Updated date:	2017/12/12.
 * */
function msgInformacion(txt)
{
	try
	{
		$("#divMensajeCont").dialog('destroy');
	}
	catch (e){}
	
	$("#divMensajeCont").remove();
	$("body").append("<div id='divMensajeCont' style='display:none; text-align:center' title='Informaci&oacute;n'>" + txt + "<div class='dialog_button'><button class='btnMensajeCont'>Aceptar</button></div></div>");
	
	setTimeout(function()
	{
		$('#divMensajeCont').parent().addClass('ui_informacion_siro');
	}, 100);
	
	$("#divMensajeCont button").click(function()
	{
		try
		{
			$("#divMensajeCont").dialog('destroy');
		}
		catch (e){}
		
		$("#divMensajeCont").remove();
	})
	
	$("#divMensajeCont").dialog(
	{
		close: function()
		{
			try
			{
				$("#divMensajeCont").dialog('destroy');
			}
			catch (e){}
			
			$("#divMensajeCont").remove();
		},
		modal: true,
		autoOpen: true
	});
}

/*
 * Author:			Daiber Gonzalez.
 * Description:		this function is used for show confirmation alert.
 * Created date:	2017/12/12.
 * Updated date:	2017/12/12.
 * */
function msgConfirmacion(txt, callback, id)
{
	try
	{
		$("#divMensajeCont").dialog('destroy');
	}
	catch (e){}
	
	$("#divMensajeCont").remove();
	$("body").append("<div id='divMensajeCont' style='display:none;' title='Informaci&oacute;n'>" + txt + "<div class='dialog_button'><button id='btnAceptar_divMensajeCont' class='btnMensajeCont'>Aceptar</button><button id='btnCancelar_divMensajeCont' class='btnMensajeCont'>Cancelar</button></div></div>");
	
	setTimeout(function()
	{
		$('#divMensajeCont').parent().addClass('ui_confirmar_siro');
	}, 100);
		
	$("#btnAceptar_divMensajeCont").click(function()
	{
		try
		{
			$("#divMensajeCont").dialog('destroy');
		}
		catch (e){}
		
		$("#divMensajeCont").remove();
		//eval("document.getElementById('ifModalForm_" + id + "').contentWindow." + callback + "();");
		eval("document.getElementById('"+ id + "').contentWindow." + callback + "();");
	})
	
	$("#btnCancelar_divMensajeCont").click(function()
	{
		try
		{
			$("#divMensajeCont").dialog('destroy');
		}
		catch (e){}
		
		$("#divMensajeCont").remove();
		return;
	})
	
	$("#divMensajeCont").dialog(
	{
		close: function()
		{
			try
			{
				$("#divMensajeCont").dialog('destroy');
			}
			catch (e){}
			
			$("#divMensajeCont").remove();
		},
		modal: true,
		autoOpen: true
	});
}

//
function consultarToken()
{
    var token = null;
    var url = "/mapgis/validacionToken.do";
    $.ajax(
    {
        "url": url,
        "type": "POST",
        "async": false,
        "success": function(data)
        {
            if (data && data != "" && data != "Sin autenticacion")
            {
                token = data;
            }
        },
        "error": function(xhr, status, err) {}
    });
    return token;
}



