var evaluate=function(brd,fplayer)
{
    for(var i=0;i<3;i++)
    {
        if (brd[i][0]==brd[i][1] && brd[i][1]==brd[i][2])
        {
            if (brd[i][0]==fplayer)
            return +10;
            else if (brd[i][0]!=fplayer && brd[i][0]!='a')
            return -10;
        }
    }
    for(var j=0;j<3;j++)
    {
        if (brd[0][j]==brd[1][j] && brd[1][j]==brd[2][j])
        {
            if (brd[0][j]==fplayer)
            return +10;
            else if (brd[0][j]!=fplayer && brd[0][j]!='a')
            return -10;
        }
    }
    if(brd[0][0]==brd[1][1] && brd[1][1]==brd[2][2])
    {
        if (brd[0][0]==fplayer)
        return +10;
        else if (brd[0][0]!=fplayer && brd[0][0]!='a')
        return -10;
    }
    if(brd[0][2]==brd[1][1] && brd[1][1]==brd[2][0])
    {
        if (brd[0][2]==fplayer)
        return +10;
        else if (brd[0][2]!=fplayer && brd[0][2]!='a')
        return -10;
    }
    return 0;
}
var turn,cnt,flag,grid,x,y;
var play1,play2,valid;
var check=function()
{
	var fplayer='X';
	var loc=evaluate(grid,fplayer);
	if(cnt==9 && loc!=10 && loc!=-10)
	{
		loc="Its A Draw";
		return loc;
	}
	if(loc==10)
	return loc="First Player Wins";
	else if(loc==-10)
	return loc="Second Player Wins";
	return loc="NoStatus";
}
var process=function(cellno)
{
	var char;
	if(!play1 && !play2)
	return ;
	if(grid[x[cellno]][y[cellno]]=='a' && flag==0)
	{
		valid=1;
		if(turn) char='X';
		else char='O';
		cnt++;
		$("main .c"+cellno+"data").append($("<ul>").append($("<li>")).text(char));
		grid[x[cellno]][y[cellno]]=char;
		turn=!turn;
		var result=check();
		if(result!="NoStatus")
		{
			$("main .result").append($("<p>").text(result));
			flag=1;
		}
	}
}
var minimax=function(brd,depth,maxi,player)
{
    var oppnent;
    if(player=='X')
    oppnent='O';
    else
    oppnent='X';
    var value=evaluate(brd,player);
    if(value==10)
    return (value-depth);
    if(value==-10)
    return (value+depth);
    var k=0;
    for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
    if(brd[i][j]=='a')
    k++;
    if(k==0)
    return 0;
    if(maxi)
    {
        var best=-15;
        for(var i=0;i<3;i++)
        for(var j=0;j<3;j++)
        if(brd[i][j]=='a')
        {
            brd[i][j]=player;
            var val=minimax(brd,depth+1,!maxi,player);
            if(val>best)
            best=val;
            brd[i][j]='a';
        }
        return best;
    }
    else
    {
        var best=15;
        for(var i=0;i<3;i++)
        for(var j=0;j<3;j++)
        if(brd[i][j]=='a')
        {
            brd[i][j]=oppnent;
            var val=minimax(brd,depth+1,!maxi,player);
            if(val<best)
            best=val;
            brd[i][j]='a';
        }
        return best;
    }
}
var makenextmove=function(player)
{
    var a=-1,b=-1
    var value=-15;
    for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
    {
        if(grid[i][j]=='a')
        {
            grid[i][j]=player;
            var val=minimax(grid,0,0,player);
            if(val>value)
            {
                value=val;
                a=i;
                b=j;
            }
            grid[i][j]='a';
        }
    }
    var cellno=-1;
    for(var i=1;i<=9;i++)
    if(x[i]==a && y[i]==b)
    cellno=i;
    if(cellno==-1)
    return ;
    process(cellno);
}
var main=function()
{
	"use strict";
	cnt=flag=0;
	play1=0,play2=0;
	turn=1;
	var first=0;
	grid=[['a','a','a'],['a','a','a'],['a','a','a']];
	x=[-1,0,0,0,1,1,1,2,2,2];
	y=[-1,0,1,2,0,1,2,0,1,2];
	for(var tabno=1;tabno<=1;tabno++)
	{
		$(".tabs a:nth-child("+tabno+")").on("click",function(event)
			{
				var loc=$(event.target);
				grid=[['a','a','a'],['a','a','a'],['a','a','a']];
				for(var cellno=1;cellno<=9;cellno++)
				$(".c"+cellno+"data").empty();
				$(".result").empty();
				cnt=flag=0;
				play1=play2=0;
				first=0;
				turn=1;
				$("main .content").empty();
				var button1=$("<button>").text("One Player Version");
				button1.addClass("button1");
				var button2=$("<button>").text("Two Player Version");
				button2.addClass("button2");
				$("main .content").append(button1).append(button2);
				var p1,p2;
				$(".content .button1").on("click",function(event)
					{
						$("main .content").empty();
						$("main .content").append($("<p>").text("Wanna Play as Player 1 or Player 2 ?"));
						var player1=$("<button>").text("I will choose to be player 1");
						player1.addClass("button1");
						var player2=$("<button>").text("I will choose to be player 2");
						player2.addClass("button2");
						$("main .content").append(player1).append(player2);
						$(".content .button1").on("click",function(event)
							{
								play1=1;
								p1=$("<p>").text("First Player : You");
								p2=$("<p>").text("Second Player : Dhruv");
								$("main .content").empty();
								$("main .content").append(p1).append(p2);
							}
						);
						$(".content .button2").on("click",function(event)
							{
								play1=1;
								p1=$("<p>").text("First Player : Dhruv");
								p2=$("<p>").text("Second Player : You");
								$("main .content").empty();
								$("main .content").append(p1).append(p2);
								makenextmove('X');
								first=1;
							}
						);
					}
				);
				$(".content .button2").on("click",function(event)
					{
						play2=1;
						p1=$("<p>").text("First Player : A");
						p2=$("<p>").text("Second Player : B");
						$("main .content").empty();
						$("main .content").append(p1).append(p2);
					}
				);
			}
		);
	}
		$(".c1").on("click",function(event)
			{
				valid=0;
				process(1);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c2").on("click",function(event)
			{
				valid=0;
				process(2);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c3").on("click",function(event)
			{
				valid=0;
				process(3);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c4").on("click",function(event)
			{
				valid=0;
				process(4);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c5").on("click",function(event)
			{
				valid=0;
				process(5);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c6").on("click",function(event)
			{
				valid=0;
				process(6);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c7").on("click",function(event)
			{
				valid=0;
				process(7);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c8").on("click",function(event)
			{
				valid=0;
				process(8);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
		$(".c9").on("click",function(event)
			{
				valid=0;
				process(9);
				if(valid)
				{
					if(play1 && first==1)
					makenextmove('X');
					else if(play1 && first==0)
					makenextmove('O');
				}
			}
		);
	$(".reset button").on("click",function(event)
		{
			grid=[['a','a','a'],['a','a','a'],['a','a','a']];
			for(var cellno=1;cellno<=9;cellno++)
			$(".c"+cellno+"data").empty();
			$(".result").empty();
			cnt=flag=0;
			turn=1;
			play1=play2=0;
			first=0;
			$("main .content").empty();
		}
	);
};
$(document).ready(main);
