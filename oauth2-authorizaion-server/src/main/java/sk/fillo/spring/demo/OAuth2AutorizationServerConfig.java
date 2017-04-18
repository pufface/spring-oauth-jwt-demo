package sk.fillo.spring.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

@Configuration
@EnableAuthorizationServer
public class OAuth2AutorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Value("${jwt.privateKey}")
    private String privateKey;

    @Value("${jwt.publicKey}")
    private String publicKey;
	
    @Bean
    protected InMemoryTokenStore tokenStore() {
    	return new InMemoryTokenStore();
    }

    @Bean
    protected JwtAccessTokenConverter jwtTokenEnhancer() {
    	JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey(privateKey);
        converter.setVerifierKey(publicKey);
        return converter;
    }
    
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
        	.tokenStore(tokenStore()).reuseRefreshTokens(false)
        	.tokenEnhancer(jwtTokenEnhancer())
        	.authenticationManager(authenticationManager);
    }

	@Override
	public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
		oauthServer
			.tokenKeyAccess("isAnonymous() || hasAuthority('ROLE_CLIENT')")
			.checkTokenAccess("hasAuthority('ROLE_CLIENT')")
			.allowFormAuthenticationForClients();
	}

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
                .withClient("my-trusted-client")
		            .authorizedGrantTypes("password", "authorization_code", "refresh_token", "implicit")
		            .authorities("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT")
		            .scopes("read", "write", "trust")
		            .autoApprove(true)
		            .accessTokenValiditySeconds(600)
		            .refreshTokenValiditySeconds(1600)
		            .and()
    	        .withClient("my-client-with-registered-redirect")
    	            .authorizedGrantTypes("authorization_code")
    	            .authorities("ROLE_CLIENT")
    	            .scopes("read", "trust")
    	            .autoApprove(true)
    	            .redirectUris("http://anywhere?key=value")
    	            .and()
    	        .withClient("my-client-with-secret")
    	            .authorizedGrantTypes("client_credentials", "password")
    	            .authorities("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT")
    	            .scopes("read", "write")
    	            .secret("secret");
    }

}
