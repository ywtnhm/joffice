package com.palmelf.test.tools;

import org.eclipse.jetty.security.HashLoginService;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * 开发调试使用的 Jetty Server
 * 
 */
public class JettyServer {

	public static void main(String[] args) throws Exception {
		Server server = buildNormalServer(8083, "/eoffice");
		// URLencoding设置(防止POST和Get请求乱码),tomcat也要设置
		server.setAttribute("org.eclipse.jetty.util.URI.charset", "UTF-8");
		server.start();
	}

	/**
	 * <a href="http://wiki.eclipse.org/Jetty/Tutorial/Realms">jetty Realms</a><BR>
	 * 创建用于正常运行调试的Jetty Server, 以src/main/webapp为Web应用目录.
	 */
	public static Server buildNormalServer(int port, String contextPath) {
		Server server = new Server(port);
		WebAppContext webContext = new WebAppContext("src/main/webapp", contextPath);
		webContext.setClassLoader(Thread.currentThread().getContextClassLoader());
		server.setHandler(webContext);
		server.setStopAtShutdown(true);
		// HashLoginService hls = new HashLoginService();
		// hls.setName("Test Realm");
		// hls.setConfig("realm.properties");
		// hls.setRefreshInterval(0);
		// server.addBean(hls);
		return server;
	}

}
