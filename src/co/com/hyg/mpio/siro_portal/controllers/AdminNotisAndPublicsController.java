package co.com.hyg.mpio.siro_portal.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AdminNotisAndPublicsController
{
	
	@RequestMapping("admin_ntpc")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response)
	{
		return new ModelAndView("admin/notis_and_publics/index");
	}
	
	@RequestMapping("edit_ntpc")
	public ModelAndView editar(HttpServletRequest request, HttpServletResponse response)
	{
		return new ModelAndView("admin/notis_and_publics/edit");
	}
}
