package sk.fillo.spring.demo;

import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

	@RequestMapping(path = "/userinfo", method = RequestMethod.GET)
	public String userinfo(Authentication authentication) {
		String username = authentication.getName();
		String roles = StringUtils.collectionToDelimitedString(authentication.getAuthorities(), ", ");
		return username + ": " + roles;
	}

}
