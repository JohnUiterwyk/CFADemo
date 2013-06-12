package com.uiterwyk.cfademo.game;

import java.util.ArrayList;
import java.util.logging.Level;

import com.google.appengine.api.memcache.ErrorHandlers;
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class DecisionDatastore 
{
	public DecisionDatastore()
	{
		
	}
	
	public static void setDecision(String playerId, String decisionId, ArrayList<Integer> selection)
	{
	}
	
	public static  String getDecisionJsonString()
	{
		
//	    Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		String result = gson.toJson(decisions);
//		return result;
		return null;
	}
	
	public static void resetGame()
	{
		
	}
	
	public static void resetPlayer()
	{
		
	}
	
	private Decision getDecision(String playerId, Integer decisionId, ArrayList<Decision> decisions)
	{
		for (Decision decision : decisions) 
		{
			if(decision.getPlayerId().equals(playerId) && decision.getDecisionid().equals(decisionId))
				return decision;
		}
		return null;
	}
	
	private ArrayList<Decision> getDecisionArray()
	{
		return null;
		
	}

}
