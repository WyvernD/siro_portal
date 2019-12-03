package co.com.hyg.mpio.siro_portal.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AdminDominiosController
{
	
	@RequestMapping("admin_dominios")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response)
	{
		return new ModelAndView("admin/dominios/index");
	}
}