package com.uiterwyk.cfademo.game;

import java.io.Serializable;
import java.util.ArrayList;

public class Decision implements Serializable
{
	private String playerId = "";
	private Integer decisionId = -1;
	private ArrayList<Integer> selection = new ArrayList<Integer>();

	public Decision(String playerId, Integer decisionid) {
		super();
		this.playerId = playerId;
		this.decisionId = decisionid;
		this.selection.add(0);
	}
	
	public Integer getDecisionid() {
		return decisionId;
	}
	public void setDecisionid(Integer decisionid) {
		this.decisionId = decisionid;
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
