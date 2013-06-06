package com.uiterwyk.cfademo.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.memcache.ErrorHandlers;
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.uiterwyk.cfademo.game.Decision;
import com.uiterwyk.cfademo.game.PopulateData;

@SuppressWarnings("serial")
public class GameServlet extends HttpServlet {

	private enum Action {
	    RESET, DECISION
	}
	private ArrayList<Decision> decisions = new ArrayList<Decision>();
	@Override
	public void init() throws ServletException {

	    PopulateData.populate(decisions);
		super.init();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException 
	{

		MemcacheService syncCache = MemcacheServiceFactory.getMemcacheService();
	    syncCache.setErrorHandler(ErrorHandlers.getConsistentLogAndContinue(Level.INFO));
	    this.decisions = null;
	    this.decisions = (ArrayList<Decision>) syncCache.get("decisions");
	    if(this.decisions == null)
	    {
	    	this.decisions = new ArrayList<Decision>();
		    PopulateData.populate(this.decisions);
	    }
	    processInput(req);
		outputDecisionJSON(resp);
	    syncCache.put("decisions", this.decisions);
	
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException 
	{
		MemcacheService syncCache = MemcacheServiceFactory.getMemcacheService();
	    syncCache.setErrorHandler(ErrorHandlers.getConsistentLogAndContinue(Level.INFO));
	    this.decisions = null;
	    this.decisions = (ArrayList<Decision>) syncCache.get("decisions");
	    if(this.decisions == null)
	    {
	    	this.decisions = new ArrayList<Decision>();
		    PopulateData.populate(this.decisions);
	    }
	    processInput(req);
		outputDecisionJSON(resp);
	    syncCache.put("decisions", this.decisions);
	}
	private void processInput(HttpServletRequest req)
	{


	    
		String decisionParam = req.getParameter("decisionId");
		String playerParam = req.getParameter("playerId");
		String selectionParam = req.getParameter("selection");
		String resetParam = req.getParameter("reset");
		if(playerParam != null)System.out.println("player="+playerParam);
		if(decisionParam != null)System.out.println("decision="+decisionParam);
		if(selectionParam != null)System.out.println("selection="+selectionParam);
		if(resetParam != null)System.out.println("reset="+resetParam);
		if(decisionParam != null && playerParam != null)
		{
			int decisionId = -1;
			try
			{
				decisionId = Integer.valueOf(req.getParameter("decisionId"));
			}catch(NumberFormatException e)
			{
			}
			Decision decision = getDecision(playerParam, decisionId);
			if(decision != null) decision.clearSelection();
			if(selectionParam != null && selectionParam != "")
			{
				String[] selections = selectionParam.split(Pattern.quote(":"));
				for(int i = 0; i< selections.length;i++)
				{
					try{
						Integer selection = Integer.parseInt(selections[i]);
						decision.addSelection(selection);
					}catch(NumberFormatException e)
					{
						
					}
				}
			}else
			{
				decision.setSelection(0);
			}
		}
		
		//reset
		if(resetParam != null && resetParam != "")
		{
			for (Decision decision : decisions) 
			{
				if(decision.getPlayerId().equals(resetParam) || resetParam.equals("all"))
				{
					decision.setSelection(0);
				}
			}
		}
	}
	
	private void outputDecisionJSON(HttpServletResponse resp) throws IOException
	{
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String result = gson.toJson(decisions);
		resp.setContentType("application/json");
		resp.getWriter().println(result);
	}
	
	private Decision getDecision(String playerId, Integer decisionId)
	{
		for (Decision decision : decisions) 
		{
			if(decision.getPlayerId().equals(playerId) && decision.getDecisionid().equals(decisionId))
				return decision;
		}
		return null;
	}

}
