package com.uiterwyk.cfademo.game;

import java.util.ArrayList;

public class PopulateData
{
	public static void populate(ArrayList<Decision> decisions)
	{
		decisions.add(new Decision("fire",0));
		decisions.add(new Decision("fire",1));
		decisions.add(new Decision("fire",2));
		decisions.add(new Decision("water",0));
		decisions.add(new Decision("water",1));
		decisions.add(new Decision("water",2));
		decisions.add(new Decision("council",0));
		decisions.add(new Decision("council",1));
		decisions.add(new Decision("council",2));
	}
	
}
