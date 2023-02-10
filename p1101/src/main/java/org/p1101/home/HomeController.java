package org.p1101.home;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/home/*")
@Controller
public class HomeController {

	@Value("${SESSION.API}") private String SESSION_API;
	@Value("${SESSION.LOGIN}") private String SESSION_LOGIN;

	@Value("${COOKIE.LOGIN}") private String COOKIE_LOGIN;

	/** @content 홈 화면 */
	@RequestMapping(value = "/homeView.do", method = RequestMethod.GET)
	public String homeView(HttpServletRequest request, HttpServletResponse response, Model model, HttpSession session) {
		return "/home/homeView";
	}

}


















