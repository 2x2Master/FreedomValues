import drawCanvas from './modules/canvas.js'

function getQueryVariable(variable)
{
       let query = window.location.search.substring(1)
       let vars = query.split("&")
       for (var i=0;i<vars.length;i++) {
               let pair = vars[i].split("=")
               if(pair[0] == variable) {return pair[1]}
       }
       return(NaN);
}

function setBarValue(name, value) {
    var innerel = document.getElementById(name)
    var outerel = document.getElementById("bar-" + name)
    outerel.style.width = (value + "%")
    innerel.innerHTML = (value + "%")
    if (innerel.offsetWidth + 20 > outerel.offsetWidth) {
        innerel.style.visibility = "hidden"
    }
}
function setLabel(val,ary) {
    if (val > 100) { return "" } else
    if (val >  90) { return ary[0] } else
    if (val >  75) { return ary[1] } else
    if (val >  60) { return ary[2] } else
    if (val >= 40) { return ary[3] } else
    if (val >= 25) { return ary[4] } else
    if (val >= 10) { return ary[5] } else
    if (val >=  0) { return ary[6] } else
    {return ""}
}

fetch("JSON/ideologies.json")
    .then(response => response.json())
    .then(data => parse_ideology(data))

function parse_ideology(ideologies){
    var anarchy = getQueryVariable("s")
    var prog = getQueryVariable("c")
    var reg = getQueryVariable("e")
    var welfare = getQueryVariable("w")
    var property = getQueryVariable("p")
    var national = getQueryVariable("n")
    var isolation = getQueryVariable("a")
    var dem = getQueryVariable("l")
    var reform = getQueryVariable("r")
    var minarchy = (100 - anarchy).toFixed(1)
    var trad = (100 - prog).toFixed(1)
    var markets = (100 - reg).toFixed(1)
    var aust = (100 - welfare).toFixed(1)
    var georgist = (100 - property).toFixed(1)
    var global = (100 - national).toFixed(1)
    var inter = (100 - isolation).toFixed(1)
    var auto = (100 - dem).toFixed(1)
    var revo = (100 - reform).toFixed(1)
    
    setBarValue("anarchy", anarchy)
    setBarValue("minarchy", minarchy)
    setBarValue("prog", prog)
    setBarValue("trad", trad)
    setBarValue("reg", reg)
    setBarValue("markets", markets)
    setBarValue("welfare", welfare)
    setBarValue("aust", aust)
    setBarValue("property", property)
    setBarValue("georgist", georgist)
    setBarValue("national", national)
    setBarValue("global", global)
    setBarValue("isolation", isolation)
    setBarValue("inter", inter)
    setBarValue("dem", dem)
    setBarValue("auto", auto)
    setBarValue("reform", reform)
    setBarValue("revo", revo)
  
    const stateArray = ["Anarchist","Night-Watchman Statist","Libertarian","Liberal","Bureaucratic","Statist","Post-Libertarian"]
    const socialArray = ["Ultraprogressive","Progressive","Cultural Liberal","Neutral","Conservative","Traditionalist","Reactionary"]
    const econArray = ["Planned","Directed","Regulated","Intervening","Free Market","Deregulated","Lassiez-Faire"]
    const spendArray = ["Welfarist","Welfarist-Leaning","Generous","Balanced","Fiscally Conservative Leaning","Fiscally Conservative","Austere"]
    const landArray = ["Propertarian","Propertarian Leaning","Propertarian Leaning","Syncretic","Georgist Leaning","Georgist Leaning","Georgist"]
    const nationArray = ["Chauvinist","Nationalist","Patriotic","Neutral","Diplomatic","Internationalist","Globalist"]
    const milArray = ["Isolationist","Non-Interventionist","Defensive","Syncretic","Hawkish","Interventionist","Imperialist"]
    const leaderArray = ["Direct Democratic","Democratic","Representative","Neutral","Elitist","Autocratic","Absolutist"]
    const appliArray = ["Non-Violent","Reformist","Peaceful","Occasional","Unrest","Revolutionary","Insurrectionary"]
  
    document.getElementById("state-label").innerHTML = setLabel(anarchy, stateArray)
    document.getElementById("social-label").innerHTML = setLabel(prog, socialArray)
    document.getElementById("econ-label").innerHTML = setLabel(reg, econArray)
    document.getElementById("spend-label").innerHTML = setLabel(welfare, spendArray)
    document.getElementById("land-label").innerHTML = setLabel(property, landArray)
    document.getElementById("nation-label").innerHTML = setLabel(national, nationArray)
    document.getElementById("mil-label").innerHTML = setLabel(isolation, milArray)
    document.getElementById("leader-label").innerHTML = setLabel(dem, leaderArray)
    document.getElementById("appli-label").innerHTML = setLabel(reform, appliArray)

  
    var ideology = ""
    var ideodist = Infinity
    for (var i = 0; i < ideologies.length; i++) {
        var dist = 0
        dist += Math.pow(Math.abs(ideologies[i].stats.state - anarchy), 2)
        dist += Math.pow(Math.abs(ideologies[i].stats.social - prog), 2)
        dist += Math.pow(Math.abs(ideologies[i].stats.econ - reg), 1.75)
        dist += Math.pow(Math.abs(ideologies[i].stats.spend - welfare), 1.25)
        dist += Math.pow(Math.abs(ideologies[i].stats.land - property), 1.25)
        dist += Math.pow(Math.abs(ideologies[i].stats.nation - national), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.mil - isolation), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.leader - dem), 1.5)
        dist += Math.pow(Math.abs(ideologies[i].stats.appli - reform), 1.25)
        if (dist < ideodist) {
            ideology = ideologies[i].name
            ideodist = dist
        }
    }
    document.getElementById("ideology-label").innerHTML = ideology

    drawCanvas(ideology, anarchy, minarchy, prog, trad, reg, markets, welfare, austere, property, georgist, national, global, isolation, inter, dem, auto, reform, revo) 
} 
