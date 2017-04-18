package sk.fillo.spring.demo;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	@Autowired
    protected InMemoryTokenStore tokenStore;
	
	@RequestMapping("/userinfo")
	public String revokeToken(Principal principal) {
		return principal.getName();
	}

	@RequestMapping(method = RequestMethod.POST, value = "/revoke")
	public String revokeToken(@RequestParam("refresh_token") String refreshToken) {
		OAuth2RefreshToken oauthRefreshToken = tokenStore.readRefreshToken(refreshToken);
		if (oauthRefreshToken != null) {
			tokenStore.removeAccessTokenUsingRefreshToken(oauthRefreshToken);
			tokenStore.removeRefreshToken(oauthRefreshToken);
			return "OK, refresh token was removed";
		} else {
			return "OK, refresh token does not exist";
		}
	}

}
