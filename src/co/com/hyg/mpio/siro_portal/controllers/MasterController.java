package co.com.hyg.mpio.siro_portal.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jose4j.json.internal.json_simple.JSONArray;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import co.com.hyg.mpio.siro_portal.controllers.UtilsController;
import co.com.hyg.mpio.siro_portal.bo.UtilsBO;

@Controller
public class MasterController
{
	
	// Instancia de la clase UtilsBO
	private UtilsBO uBO = new UtilsBO();
	// Instancia de la clase UtilsController
	UtilsController u_controller = new UtilsController();
	
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("index");
		try
		{
			// Se consulta la ruta de los menus
			String obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_RUTA_MENU_PORTAL\", \"N\" : 0, \"DATOS\" : {}}";
			JSONObject obj_ruta_menus = u_controller.string_to_json(uBO.get_datos(obj_consulta));
			// Se consulta la ruta de la navegación
			obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_RUTA_NAVEGACION_PORTAL\", \"N\" : 0, \"DATOS\" : {}}";
			JSONObject obj_ruta_nav = u_controller.string_to_json(uBO.get_datos(obj_consulta));
			// Se consulta la ruta del pie de pagina
			obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_RUTA_FOOTER_PORTAL\", \"N\" : 0, \"DATOS\" : {}}";
			JSONObject obj_ruta_footer = u_controller.string_to_json(uBO.get_datos(obj_consulta));
			// Se consultan los banners
			obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_LOGOS_PORTAL\", \"N\" : 1, \"DATOS\" : {\"P1\" : \"and L.FK_IDSECCION = 2 and L.PUBLICO = 1\"}}";
			JSONArray obj_banners = u_controller.string_to_jsonarray(uBO.get_datos(obj_consulta));
			// Se consulta el fondo de las secciones
			obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_LOGOS_PORTAL\", \"N\" : 1, \"DATOS\" : {\"P1\" : \"and L.FK_IDSECCION = 6\"}}";
			JSONArray obj_secciones = u_controller.string_to_jsonarray(uBO.get_datos(obj_consulta));
			
			view.addObject("ruta_menus", obj_ruta_menus.get("RUTA"));
			view.addObject("ruta_navs", obj_ruta_nav.get("RUTA"));
			view.addObject("ruta_footer", obj_ruta_footer.get("RUTA"));
			view.addObject("banners", obj_banners);
			view.addObject("secciones", obj_secciones);
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return null;
		}
		
		return view;
	}
	
	@RequestMapping(value = "consultar_eventos", method = RequestMethod.GET)
	public @ResponseBody String get_events(HttpServletRequest request, HttpServletResponse response)
	{
		// Variable que almacena lo que retorna el método consultarEstado(método perteneciente al BO)
		String resultado = null;
		// Parametro sql
		String start = request.getParameter("start");
		// Token del usuario
		String end = request.getParameter("end");
		
		String json = "{\"SQL\" : \"SQL_CONSULTAR_EVENTOS_PORTAL\", \"N\" : 6, \"DATOS\" : " +
					      "{\"P1\" : \"'" + start + "'\",\"P2\" : \"'" + end + "'\",\"P3\" : \"'" + start + "'\",\"P4\" : \"'" + 
					          end + "'\",\"P5\" : \"'" + start + "'\",\"P6\" : \"'" + end +
					      "'\"}" +
					  "}";
		
		resultado = uBO.get_datos(json);
		
		// Se retorna el JSON
		return resultado;
	}
	
	@RequestMapping(value = "consultar_evento_id", method = RequestMethod.GET)
	public @ResponseBody String consultar_evento_id(HttpServletRequest request, HttpServletResponse response)
	{
		// Variable que almacena lo que retorna el método consultarEstado(método perteneciente al BO)
		String resultado = null;
		// Parametro sql
		String id = request.getParameter("id");
		
		String json = "{\"SQL\" : \"SQL_CONSULTAR_EVENTO_ID\", \"N\" : 1, \"DATOS\" : {\"P1\" : \"" + id + "\"}}";
		
		resultado = uBO.get_datos(json);
		
		// Se retorna el JSON
		return resultado;
	}
	
	

	@RequestMapping("/detalle_np")
	public ModelAndView detalle_np(HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView view = new ModelAndView("detalle_noti_p");
		
		try
		{
			String tipo = request.getParameter("tipo");
			String index = request.getParameter("index");
			
			// Se consulta la ruta de la navegación
			String obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_RUTA_NAVEGACION_PORTAL\", \"N\" : 0, \"DATOS\" : {}}";
			JSONObject obj_ruta_nav = u_controller.string_to_json(uBO.get_datos(obj_consulta));
			// Se consulta la ruta del pie de pagina
			obj_consulta = "{\"SQL\" : \"SQL_CONSULTAR_RUTA_FOOTER_PORTAL\", \"N\" : 0, \"DATOS\" : {}}";
			JSONObject obj_ruta_footer = u_controller.string_to_json(uBO.get_datos(obj_consulta));
					
			view.addObject("ruta_navs", obj_ruta_nav.get("RUTA"));
			view.addObject("ruta_footer", obj_ruta_footer.get("RUTA"));
			view.addObject("tipo", tipo);
			view.addObject("index", index);
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return null;
		}
		
		return view;
	}
}
