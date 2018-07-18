// var plotBananas,plotMilk,selectBananas,selectMilk;

// function updateSelect() {
//   plotBananas = document.getElementById("plotBananas").checked;
//   plotMilk = document.getElementById("plotFatFreeMilk").checked;
//   selectBananas = document.getElementById("selectBananas").checked;
//   selectMilk = document.getElementById("selectFatFreeMilk").checked;
//   console.log([plotBananas,plotMilk,selectBananas,selectMilk])
// }

function fReset(button) {
  // document.getElementById("checkboxHt"     ).checked = false
  console.log('Reset');
  updateSelect();
}

function fClose() {
  console.log('Close');
  $('.collapse').collapse("hide");
};


var Sliders = [], SliderValues = [];

var slider  = [[],[],[]];
var output  = [[],[],[]];

var Par = [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1];

// Variables for plots
var xValue = ['Product A', 'Product B', 'Product C'];
var yValue = [];
var trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue,
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: 'rgb(158,202,225)',
    opacity: 0.6,
    line: {
      color: 'rbg(8,48,107)',
      width: 1.5
    }
  }
};
var data = [trace1];
var layout = {
  title: 'January 2013 Sales Report'
};

// Variables for ODE
var t_max = 30;
var S_actual = [1];           // need to initialize these for the ODE solver, runTime
var Y_demand = [0];           // don't use new Array
var Y_supply = [], Y_cust = [], Y_waste = [], M_profit = [], M_storage = [], M_supply = [], M_delivery = [], M_cust = [];

// functions
function initializeSliders(iFood) {                      // need iFood for the initial value of the sliders
  for (i=0; i<sliders.numTypes; i++) {
    for (j=0; j<sliders.numVars[i]; i++) {
      // slider[i][j] = document.getElementById("slider" + sliders.vars[i][j]);
      // output[i][j] = document.getElementById("value"  + sliders.vars[i][j]);
      // output[i][j].innerHTML = sliders.defaultValues[iFood[0]][iFood[1]][i][j];
      // slider[i].oninput   = evalSliders(slider,indexFood,i);
      // slider[i][j].oninput = (function(e) {
      //   return function() {
      //     output[e[0]][e[1]].innerHTML = this.value;                // e is set to i USE ONCHANGE
      //     sliders.currentValues[iFood[0]][iFood[1]][e[0]][e[1]] = this.value;
      //     evalSliders(indexFood);                          // indexFood is used later
      //     updatePlot1(results);
      //   }
      // })([i,j]);                                           // (i,j) is the argument, passed to (e)
    }
  }
}

function evalSliders(iFood) {
  Enforcement   = sliders.currentValues[iFood[0]][iFood[1]][0][0];
  Training      = sliders.currentValues[iFood[0]][iFood[1]][0][1];
  Signage       = sliders.currentValues[iFood[0]][iFood[1]][0][2];
  S_required    = sliders.currentValues[iFood[0]][iFood[1]][0][3];
  Convenience   = sliders.currentValues[iFood[0]][iFood[1]][1][0];
  Taste         = sliders.currentValues[iFood[0]][iFood[1]][1][1];
  Affordability = sliders.currentValues[iFood[0]][iFood[1]][1][2];
  Healthiness   = sliders.currentValues[iFood[0]][iFood[1]][1][3];
  S_infra       = sliders.currentValues[iFood[0]][iFood[1]][2][0];
  X_delivery    = sliders.currentValues[iFood[0]][iFood[1]][2][1];
  C_store       = sliders.currentValues[iFood[0]][iFood[1]][2][2];
  C_cust        = sliders.currentValues[iFood[0]][iFood[1]][2][3];
  var timeResult = runTime(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,C_cust);
  food.results[iFood[0]][iFood[1]] = timeResult[0][t_max-1];
}

function updatePlot1(results) {
  yValue[0] = results[0][0];
  yValue[1] = results[0][1];
  Plotly.newPlot('plot1', data, layout);
}

// ODE solver for finding Y, S, M
function runTime(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,C_cust) {
  C_delivery = Par[0] + X_delivery*Par[1];
  C_storage = Par[2] + Par[3]*S_infra;
  C_total = C_delivery + C_storage + C_store;

  for (i=1; i<t_max; i++) {
    Y_supply[i] = Math.max(S_required*Enforcement - S_actual[i-1],0,Y_demand[i-1] - S_actual[i-1]);
    S_actual[i] = Y_supply[i] + S_actual[i-1];
    Y_demand[i] = Par[4] + Par[5]*Training + Par[6]*Signage + Par[7]*Convenience + Par[8]*Taste + Par[9]*Affordability + Par[10]*Healthiness - Par[11]*C_cust;
    Y_cust[i] = Math.min(Y_demand[i],S_actual[i]);
    Y_waste[i] = Math.max(S_actual[i]*Par[15] - Y_cust[i],0);
    S_actual[i] = S_actual[i] - Y_cust[i] - Y_waste[i];
    M_supply[i] = Y_supply[i]*C_store;
    M_storage[i] = C_storage*S_actual[i];
    M_delivery[i] = C_delivery*Y_supply[i];
    M_cust[i] = C_cust*Y_cust[i];
    M_profit[i] = M_cust[i] - M_delivery[i] - M_storage[i] - M_supply[i];
    Y_cust[i] = Training;
  }
  return [Y_cust,Y_demand,Y_supply,Y_waste,S_actual,M_profit,M_storage,M_supply,M_delivery,M_cust];
}

