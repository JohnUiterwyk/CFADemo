package com.uiterwyk.cfademo.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;


public class ChannelTokenServlet extends HttpServlet {

	private static final String CHANNEL_KEY = "CFA";
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

	    ChannelService channelService = ChannelServiceFactory.getChannelService();
	    String token = channelService.createChannel(CHANNEL_KEY);
		resp.setContentType("text/plain");
		resp.getWriter().println(token);
	}

}
