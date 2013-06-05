package com.uiterwyk.cfademo.game;

import java.io.Serializable;
import java.util.ArrayList;

public class Decision implements Serializable
{
	private String playerId = "";
	private Integer decisionid = -1;
	private ArrayList<Integer> selection = new ArrayList<Integer>();

	public Decision(String playerId, Integer decisionid) {
		super();
		this.playerId = playerId;
		this.decisionid = decisionid;
	}
	
	public Integer getDecisionid() {
		return decisionid;
	}
	public void setDecisionid(Integer decisionid) {
		this.decisionid = decisionid;
	}
	public String getPlayerId() {
		return playerId;
	}
	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}
	public void setSelection(Integer value)
	{
		selection.clear();
		selection.add(value);
	}
	public void clearSelection()
	{
		selection.clear();
	}
	public void addSelection(Integer value)
	{
		selection.add(value);
		
	}
}
