package com.uiterwyk.cfademo.server;

import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class CFADemoServerServlet extends HttpServlet 
{
	private int test = 0;
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world "+test);
		test++;
	}
}
