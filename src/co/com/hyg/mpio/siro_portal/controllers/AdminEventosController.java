package co.com.hyg.mpio.siro_portal.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AdminEventosController
{

	@RequestMapping("admin_eventos")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response)
	{
		return new ModelAndView("admin/eventos/index");
	}
	
	@RequestMapping("edit_evento")
	public ModelAndView editar(HttpServletRequest request, HttpServletResponse response)
	{
		return new ModelAndView("admin/eventos/edit");
	}
}
