(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{203:function(e,t,a){e.exports=a(440)},208:function(e,t,a){},209:function(e,t,a){},228:function(e,t){e.exports={oddsKey:Object({NODE_ENV:"production",PUBLIC_URL:""}).YOUR_API_KEY,footballAPI:Object({NODE_ENV:"production",PUBLIC_URL:""}).FOOTBALL_API_KEY}},440:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),i=a(56),r=a.n(i),s=(a(208),a(9)),c=a(10),o=a(12),m=a(11),u=a(13),d=(a(209),a(19)),p=a(16),h=a(181),g=a(47),y=a.n(g),_=a(48),E=a.n(_),f=a(36),b=a.n(f),v=a(76),k=a.n(v),w=a(41),A=a.n(w),O=a(18),S=a(40),x=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={teamData:{},table:0,loading:!0,activeWinIndex:0,activeGoalsIndex:0},a.onPieEnterGoals=function(e,t){a.setState({activeGoalsIndex:t})},a.onPieEnterWin=function(e,t){a.setState({activeWinIndex:t})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this;if(this.props.match.params.name!==e.match.params.name){var a,n=this.props.match.params,l=n.name,i=n.league,r={"X-Auth-Token":E.a.footballAPI},s={premier_league:2021,ligue1:2015,bundesliga:2002,serie_a:2019,la_liga:2014};a="soccer_spain_la_liga"===i?s.la_liga:"soccer_france_ligue_one"===i?s.ligue1:"soccer_italy_serie_a"===i?s.serie_a:"soccer_epl"===i?s.premier_league:"soccer_germany_bundesliga"===i?s.bundesliga:null,this.setState({loading:!0}),y.a.get("http://api.football-data.org/v2/competitions/".concat(a,"/standings"),{headers:r}).then(function(e){var a=e.data.standings[0].table.filter(function(e){if("Real Madrid CF"===l)return e.team.name.includes(l);var t=l.split(" ");return t="Real"===t[0]?t[1]:t[0],e.team.name.includes(t)});t.setState({table:e.data.standings[0].table}),t.setState({teamData:a,loading:!1})}).catch(function(e){console.log(e)})}}},{key:"componentDidMount",value:function(){var e,t=this,a=this.props.match.params,n=a.name,l=a.league,i={"X-Auth-Token":E.a.footballAPI};e="soccer_spain_la_liga"===l?2014:"soccer_france_ligue_one"===l?2015:"soccer_italy_serie_a"===l?2019:"soccer_epl"===l?2021:"soccer_germany_bundesliga"===l?2002:null,this.setState({loading:!0}),y.a.get("http://api.football-data.org/v2/competitions/".concat(e,"/standings"),{headers:i}).then(function(e){var a=e.data.standings[0].table.filter(function(e){if("Real Madrid CF"===n)return e.team.name.includes(n);var t=n.split(" ");return t="Real"===t[0]?t[1]:t[0],e.team.name.includes(t)});t.setState({table:e.data.standings[0].table}),t.setState({teamData:a,loading:!1})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this.props.match.params.league,t=function(e){var t=Math.PI/180,a=e.cx,n=e.cy,i=e.midAngle,r=e.innerRadius,s=e.outerRadius,c=e.startAngle,o=e.endAngle,m=e.fill,u=e.payload,d=e.percent,p=e.value,h=Math.sin(-t*i),g=Math.cos(-t*i),y=a+(s+10)*g,_=n+(s+10)*h,E=a+(s+30)*g,f=n+(s+30)*h,b=E+22*(g>=0?1:-1),v=f,k=g>=0?"start":"end";return l.a.createElement("g",null,l.a.createElement("text",{x:a,y:n,dy:8,textAnchor:"middle",fill:m},u.name),l.a.createElement(O.i,{cx:a,cy:n,innerRadius:r,outerRadius:s,startAngle:c,endAngle:o,fill:m}),l.a.createElement(O.i,{cx:a,cy:n,startAngle:c,endAngle:o,innerRadius:s+6,outerRadius:s+10,fill:m}),l.a.createElement("path",{d:"M".concat(y,",").concat(_,"L").concat(E,",").concat(f,"L").concat(b,",").concat(v),stroke:m,fill:"none"}),l.a.createElement("circle",{cx:b,cy:v,r:2,fill:m,stroke:"none"}),l.a.createElement("text",{x:b+12*(g>=0?1:-1),y:v,textAnchor:k,fill:"#333"},"PV ".concat(p)),l.a.createElement("text",{x:b+12*(g>=0?1:-1),y:v,dy:18,textAnchor:k,fill:"#999"},"(Rate ".concat((100*d).toFixed(2),"%)")))},a=["#B2E0AE","#FFBB28","#FFABAB","#FF8042"],n=["#D291BC","#6EB5FF","#AC6C39","#FF8042"];if(this.state.loading)return l.a.createElement("div",{style:{marginTop:"40vh"}},l.a.createElement(b.a,{animation:"grow"})," ",l.a.createElement(b.a,{animation:"grow"})," ",l.a.createElement(b.a,{animation:"grow"}));var i=Object(h.a)({},this.state.teamData),r=this.state.table,s=i[Object.keys(i)[0]],c="undefined"===typeof s?i:s,o=c.goalDifference,m=c.goalsAgainst,u=c.goalsFor,d=c.lost,p=c.draw,g=c.won,y=c.playedGames,_=c.position,E=c.points,f=c.team,v=[{name:"Wins",value:g},{name:"Draws",value:p},{name:"Loses",value:d}],w=[{name:"Goals For",value:u},{name:"Goals Against",value:m},{name:"G. Difference",value:o}],x=[{subject:"Points",A:E+30,B:120,fullMark:3*y+30},{subject:"Won",A:4*g,B:120,fullMark:4*y},{subject:"Standings",A:6*(21-_),B:120,fullMark:120},{subject:"Goals",A:u,B:120,fullMark:120}];return l.a.createElement("div",{style:{alignItems:"center"},className:"container lg-12"},l.a.createElement("span",{style:{fontSize:"20px"}},"Melon Sports"),l.a.createElement("div",{className:"md-12"},l.a.createElement(S.a,{style:{color:"white"},to:"/"},l.a.createElement(A.a,{className:"col-sm-4",style:{width:"100px",marginTop:"10px",marginRight:"10px"}},"Home")),l.a.createElement(A.a,{className:"col-sm-4",onClick:this.props.history.goBack,style:{width:"100px",marginTop:"10px"}},"Back")," ",l.a.createElement("h1",{className:"display-4",style:{gridArea:"name",marginTop:"20px"}},f.name," ",l.a.createElement("img",{width:"50px",src:f.crestUrl,alt:""}))),l.a.createElement("hr",null),l.a.createElement("h3",{className:"display-5"},"Games Played: ",y),l.a.createElement("div",{className:"row",style:{marginTop:"20px"}},l.a.createElement("div",{className:"col-sm-4"},l.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},l.a.createElement("h1",{className:"display-4"},"Goals"),l.a.createElement(O.c,{width:400,height:400,style:{marginTop:"-50px"}},l.a.createElement(O.b,{activeIndex:this.state.activeGoalsIndex,activeShape:t,data:w,onMouseEnter:this.onPieEnterGoals,cx:175,cy:200,innerRadius:60,outerRadius:80,fill:"#8884d8",paddingAngle:5,dataKey:"value"},v.map(function(e,t){return l.a.createElement(O.a,{key:"cell-".concat(t),fill:n[t%n.length]})}))))),l.a.createElement("div",{style:{gridArea:"graph2"},className:"col-sm-4"},l.a.createElement("h1",{className:"display-4"},"Wins"),l.a.createElement(O.c,{width:400,height:400,style:{marginTop:"-50px"}},l.a.createElement(O.b,{activeIndex:this.state.activeWinIndex,activeShape:t,data:v,onMouseEnter:this.onPieEnterWin,cx:175,cy:200,innerRadius:60,outerRadius:80,fill:"#8884d8",paddingAngle:5,dataKey:"value"},v.map(function(e,t){return l.a.createElement(O.a,{key:"cell-".concat(t),fill:a[t%a.length]})})))),l.a.createElement("div",{style:{gridArea:"graph3"},className:"col-sm-4"},l.a.createElement("h1",{className:"display-4"},"Stats"),l.a.createElement(O.h,{cx:175,cy:150,outerRadius:100,width:500,height:500,data:x},l.a.createElement(O.e,null),l.a.createElement(O.d,{dataKey:"subject"}),l.a.createElement(O.f,null),l.a.createElement(O.g,{name:"Mike",dataKey:"A",stroke:"#8884d8",fill:"#b28dff",fillOpacity:.6})))),l.a.createElement("div",{className:"standings",style:{marginTop:"-200px"}},l.a.createElement("hr",null),l.a.createElement("h3",{className:"display-5",style:{marginTop:"50px"}},"Position: ",_,"/",r.length," with ",E," points"),l.a.createElement(k.a,{striped:!0,bordered:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Position"),l.a.createElement("th",null,"Team"),l.a.createElement("th",null,"Points"),l.a.createElement("th",null,"Played"),l.a.createElement("th",null,"Won"),l.a.createElement("th",null,"Draw"),l.a.createElement("th",null,"Away"),l.a.createElement("th",null,"GD"))),l.a.createElement("tbody",null,r.map(function(t){return l.a.createElement("tr",{key:t.position,style:t.team.name===f.name?{background:"#fde0e0"}:null},l.a.createElement("td",null,t.position),l.a.createElement("td",{style:{cursor:"auto !important"}},l.a.createElement(S.a,{style:{color:"black"},to:"/team/".concat(e,"/").concat(t.team.name)},t.team.name)),l.a.createElement("td",null,t.points),l.a.createElement("td",null,t.playedGames),l.a.createElement("td",null,t.won),l.a.createElement("td",null,t.draw),l.a.createElement("td",null,t.lost),l.a.createElement("td",null,t.goalDifference))})))))}}]),t}(n.Component),j=a(103),L=a.n(j),B=a(34),R=a(52),C=a.n(R),N=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.leagues;return l.a.createElement(C.a,{lg:"6"},t.map(function(t){return l.a.createElement(C.a.Item,{style:{cursor:"pointer"},as:"li",key:t.key,param:t.key,onClick:e.props.onclick},l.a.createElement("h5",null,t.details," | ",t.title))}))}}]),t}(n.Component),I=a(78),M=a.n(I),P=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.info;return l.a.createElement(M.a,null,l.a.createElement(M.a.Body,null,l.a.createElement(M.a.Title,null,"Best Odds"),l.a.createElement("div",{className:"card-main"},l.a.createElement(k.a,{striped:!0,bordered:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Bookmaker"),l.a.createElement("th",null,"Home"),l.a.createElement("th",null,"Draw"),l.a.createElement("th",null,"Away"))),l.a.createElement("tbody",null,e.sites.map(function(e){return l.a.createElement("tr",{key:e.site_key},l.a.createElement("td",null,e.site_nice),l.a.createElement("td",null,e.odds.h2h[0]),l.a.createElement("td",null,2===e.odds.h2h.length?e.odds.h2h[2]:e.odds.h2h[1]),l.a.createElement("td",null,2===e.odds.h2h.length?e.odds.h2h[1]:e.odds.h2h[2]))})))),l.a.createElement(S.a,{style:{color:"white"},to:"/team/".concat(e.sport_key,"/").concat(e.teams[0])},l.a.createElement(A.a,{variant:"primary",style:{marginRight:"10px"}},"Home Team"," ")),l.a.createElement(S.a,{style:{color:"white"},to:"/compare/"},l.a.createElement(A.a,{variant:"primary",style:{marginRight:"10px"}},"Compare"))," ",l.a.createElement(S.a,{style:{color:"white"},to:"/team/".concat(e.sport_key,"/").concat(e.teams[1])},l.a.createElement(A.a,{variant:"primary"},"Away Team "))))}}]),t}(n.Component),F=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={showInfo:!1},a.toggle=function(e){a.setState({showInfo:!a.state.showInfo})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.teams,a=e.info;return l.a.createElement("div",{className:"match-card"},l.a.createElement("h5",{onClick:this.toggle,style:{display:"inline-block",textDecoration:"underline",cursor:"pointer"}},t[0]," vs ",t[1]),l.a.createElement(B.Transition,{native:!0,items:this.state.showInfo,from:{opacity:0,display:"none"},enter:{opacity:1,display:"block"},leave:{opacity:0,display:"none"}},function(e){return e&&function(e){return l.a.createElement(B.animated.div,{style:e},l.a.createElement(P,{info:a}))}}))}}]),t}(n.Component),G=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.sportRes;return l.a.createElement(C.a,{lg:"6"},l.a.createElement("div",{className:"matches"},e.map(function(e){return l.a.createElement(C.a.Item,{as:"li",key:e.teams,param:e.key},l.a.createElement(F,{style:{display:"inline-block"},teams:e.teams,info:e}))})))}}]),t}(n.Component),D=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={leagues:[{key:"americanfootball_nfl",active:!0,group:"American Football",details:"US Football",title:"NFL"},{key:"aussierules_afl",active:!0,group:"Aussie Rules",details:"Aussie Football",title:"AFL"},{key:"baseball_mlb",active:!0,details:"Major League Baseball \ud83c\uddfa\ud83c\uddf8",group:"Baseball",title:"MLB"},{key:"basketball_euroleague",active:!0,group:"Basketball",details:"Basketball Euroleague",title:"Basketball Euroleague"},{key:"basketball_nba",active:!0,group:"Basketball",details:"US Basketball",title:"NBA"},{key:"basketball_ncaab",active:!0,group:"Basketball",details:"US College Basketball",title:"NCAAB"},{key:"cricket_odi",active:!0,details:"One Day Internationals",group:"Cricket",title:"One Day Internationals"},{key:"cricket_test_match",active:!0,details:"International Test Matches",group:"Cricket",title:"Test Matches"},{key:"icehockey_nhl",active:!0,group:"Ice Hockey",details:"US Ice Hockey",title:"NHL"},{key:"mma_mixed_martial_arts",active:!0,group:"Mixed Martial Arts",details:"Mixed Martial Arts",title:"MMA"},{key:"rugbyleague_nrl",active:!0,group:"Rugby League",details:"Aussie Rugby League",title:"NRL"},{key:"rugbyunion_premiership_rugby",active:!0,details:"Gallagher Premiership",group:"Rugby Union",title:"Premiership Rugby"},{key:"rugbyunion_super_rugby",active:!0,group:"Rugby Union",details:"Vodafone Super Rugby",title:"Super Rugby"},{key:"soccer_australia_aleague",active:!0,group:"Soccer - Other",details:"Aussie Soccer \ud83c\udde6\ud83c\uddfa",title:"A-League"},{key:"soccer_belgium_first_div",active:!0,group:"Soccer - Europe",details:"Belgium Soccer \ud83c\udde7\ud83c\uddea",title:"Belgium First Div"},{key:"soccer_denmark_superliga",active:!0,group:"Soccer - Europe",details:"Danish Soccer \ud83c\udde9\ud83c\uddf0",title:"Denmark Superliga"},{key:"soccer_efl_champ",active:!0,group:"Soccer - UK",details:"EFL Championship \ud83c\uddec\ud83c\udde7",title:"Championship"},{key:"soccer_england_league1",active:!0,group:"Soccer - UK",details:"EFL League 1 \ud83c\uddec\ud83c\udde7",title:"League 1"},{key:"soccer_england_league2",active:!0,group:"Soccer - UK",details:"EFL League 2  \ud83c\uddec\ud83c\udde7",title:"League 2"},{key:"soccer_epl",active:!0,group:"Soccer - UK",details:"English Premier League \ud83c\uddec\ud83c\udde7",title:"EPL"},{key:"soccer_fa_cup",active:!0,details:"English FA Cup \ud83c\uddec\ud83c\udde7",group:"Soccer - UK",title:"FA Cup"}],active:{},sportRes:[{sport_key:"soccer_spain_la_liga",sport_nice:"La Liga - Spain",teams:["Athletic Bilbao","Levante"],commence_time:1554312667,home_team:"Athletic Bilbao",sites:[{site_key:"paddypower",site_nice:"Paddy Power",last_update:1554318668,odds:{h2h:[1.07,81,7.5]}},{site_key:"betfair",site_nice:"Betfair",last_update:1554318667,odds:{h2h:[1.13,95,9]}},{site_key:"unibet",site_nice:"Unibet",last_update:1554318668,odds:{h2h:[1.11,71,7.5]}},{site_key:"sport888",site_nice:"888sport",last_update:1554318706,odds:{h2h:[1.1,91,8]}},{site_key:"ladbrokes",site_nice:"Ladbrokes",last_update:1554318665,odds:{h2h:[1.09,81,8.5]}},{site_key:"smarkets",site_nice:"Smarkets",last_update:1554318704,odds:{h2h:[1.16,100,8.4]}}],sites_count:6},{sport_key:"soccer_spain_la_liga",sport_nice:"La Liga - Spain",teams:["Eibar","Rayo Vallecano"],commence_time:1554316247,home_team:"Eibar",sites:[{site_key:"unibet",site_nice:"Unibet",last_update:1554318668,odds:{h2h:[4.2,1.89,3.4]}},{site_key:"smarkets",site_nice:"Smarkets",last_update:1554318704,odds:{h2h:[2.1,4.9,3.4]}},{site_key:"ladbrokes",site_nice:"Ladbrokes",last_update:1554318665,odds:{h2h:[1,1]}},{site_key:"sport888",site_nice:"888sport",last_update:1554318706,odds:{h2h:[4.2,1.89,3.4]}},{site_key:"paddypower",site_nice:"Paddy Power",last_update:1554318668,odds:{h2h:[3.6,1.91,3.25]}},{site_key:"betfair",site_nice:"Betfair",last_update:1554318667,odds:{h2h:[2.1,4.6,3.1]}}],sites_count:6},{sport_key:"soccer_spain_la_liga",sport_nice:"La Liga - Spain",teams:["Celta Vigo","Huesca"],commence_time:1554316259,home_team:"Huesca",sites:[{site_key:"unibet",site_nice:"Unibet",last_update:1554318668,odds:{h2h:[1.58,6.25,3.75]}},{site_key:"smarkets",site_nice:"Smarkets",last_update:1554318704,odds:{h2h:[1.67,7.2,4.3]}},{site_key:"ladbrokes",site_nice:"Ladbrokes",last_update:1554318665,odds:{h2h:[1.57,5.5,3.7]}},{site_key:"sport888",site_nice:"888sport",last_update:1554318706,odds:{h2h:[1.6,6,3.7]}},{site_key:"paddypower",site_nice:"Paddy Power",last_update:1554318668,odds:{h2h:[1.53,6,3.5]}},{site_key:"betfair",site_nice:"Betfair",last_update:1554318667,odds:{h2h:[1.66,6.2,4]}},{site_key:"matchbook",site_nice:"Matchbook",last_update:1554318707,odds:{h2h:[1.66,5.7,3.96]}}],sites_count:7}],filtered:[],showGames:!1,loading:!1},a.filterList=function(e){var t=a.state.leagues;t=t.filter(function(t){return-1!==t.key.toLowerCase().search(e.target.value.toLowerCase())}),a.setState({filtered:t})},a.getGamesFromSport=function(e){},a.onClick=function(e){var t=document.querySelector(".active"),n=a.state.active;if(null!==t?t.classList.remove("active"):e.target.classList.add("active"),"LI"===e.target.tagName||"h5"===e.target.tagName){e.target.classList.add("active");var l=e.target.getAttribute("param");a.setState({active:l}),n===l?a.setState({showGames:!a.state.showGames}):a.setState({showGames:!0}),a.getGamesFromSport(l)}else{e.target.parentElement.classList.add("active");var i=e.target.parentElement.getAttribute("param");a.setState({active:i}),n===i?a.setState({showGames:!a.state.showGames}):a.setState({showGames:!0}),a.getGamesFromSport(i)}a.state.showGames?document.getElementById("changetext").innerHTML="match":document.getElementById("changetext").innerHTML="league",a.setState({filtered:a.state.leagues})},a.animateLeagueList=function(e){},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({filtered:this.state.leagues})}},{key:"render",value:function(){var e=this,t={display:"grid",gridTemplateColumns:this.state.showGames?"1fr 1fr":"1fr",gridGap:"20px"};return this.state.loading?l.a.createElement("div",null,l.a.createElement(b.a,{animation:"grow"})," ",l.a.createElement(b.a,{animation:"grow"})," ",l.a.createElement(b.a,{animation:"grow"})):l.a.createElement("div",null,this.state.showGames?l.a.createElement("div",null):l.a.createElement("div",{className:"filter-list"},l.a.createElement("form",null,l.a.createElement("fieldset",{className:"form-group"},l.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"Search",onChange:this.filterList})))),l.a.createElement(B.Spring,{from:{opacity:0,marginLeft:-500},to:{opacity:1,marginLeft:0}},function(a){return l.a.createElement("div",{style:a},l.a.createElement("div",{className:"list-grid",style:t},l.a.createElement(N,{leagues:e.state.filtered,onclick:e.onClick}),l.a.createElement(B.Transition,{native:!0,items:e.state.showGames,from:{opacity:0,display:"none"},enter:{opacity:1,display:"block"},leave:{opacity:0,display:"none"}},function(t){return t&&function(t){return l.a.createElement(B.animated.div,{style:t},l.a.createElement(G,{sportRes:e.state.sportRes}))}})))}))}}]),t}(n.Component),T=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(L.a,null,l.a.createElement("h1",{className:"display-3"},"Please choose a ",l.a.createElement("span",{id:"changetext"},"league")," ",l.a.createElement("span",{style:{fontSize:"20px"}},"Melon Sports")),l.a.createElement("hr",null),l.a.createElement(D,null))}}]),t}(n.Component),U=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={team1Data:{},team2Data:{},loading:!0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e,t=this,a=this.props.match.params,n=a.name1,l=a.name2,i=a.league,r={"X-Auth-Token":E.a.footballAPI};e="soccer_spain_la_liga"===i?2014:"soccer_france_ligue_one"===i?2015:"soccer_italy_serie_a"===i?2019:"soccer_epl"===i?2021:"soccer_germany_bundesliga"===i?2002:null,console.log(n,l,i),this.setState({loading:!0}),y.a.get("http://api.football-data.org/v2/competitions/".concat(e,"/standings"),{headers:r}).then(function(e){var a=e.data.standings[0].table.filter(function(e){var t=n.split(" ");return t="Real"===t[0]?t[1]:t[0],e.team.name.includes(t)});t.setState({table:e.data.standings[0].table}),t.setState({teamData:a,loading:!1})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Compare"))}}]),t}(n.Component),K=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement(p.b,{history:Object(d.a)()},l.a.createElement("div",{className:"App"},l.a.createElement(p.c,null,l.a.createElement(p.a,{exact:!0,path:"/",component:T})),l.a.createElement(p.c,null,l.a.createElement(p.a,{exact:!0,path:"/team/:league/:name",component:x})),l.a.createElement(p.c,null,l.a.createElement(p.a,{exact:!0,path:"/compare/:name1/:name2",component:U}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},48:function(e,t,a){e.exports=a(228)}},[[203,1,2]]]);
//# sourceMappingURL=main.010184f0.chunk.js.map