// ODE solver for finding Y, S, M

// Variables for ODE
var t_max = 30;
var S_actual = [1];           // need to initialize these for the ODE solver, runTime
var Y_demand = [0];           // don't use new Array
var z = {
  Y_supply:  [],
  S_actual:  [],
  Y_demand:  [],
  Y_cust:    [],
  Y_waste:   [],
  M_profit:  [],
  M_storage: [],
  M_supply:  [],
  M_delivery:[],
  M_cust:    []
};
var zs = [];
var z_length = Object.keys(z).length;
var z_plot   = Object.create(null);
var Par = [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1];

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
  runTime(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,C_cust);
  for (key in z) {
    food.results[key][iFood[0]][iFood[1]] = z[key][t_max-1];
  }
}

function runTime(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,C_cust) {
  let C_delivery = Par[0] + X_delivery*Par[1];
  let C_storage = Par[2] + Par[3]*S_infra;
  let C_total = C_delivery + C_storage + C_store;
  z.Y_demand[0] = 0;
  z.Y_supply[0] = 1;

  for (i=1; i<t_max; i++) {
    z.Y_supply[i] = Math.max(S_required*Enforcement - z.S_actual[i-1],0,z.Y_demand[i-1] - z.S_actual[i-1]);
    z.S_actual[i] = z.Y_supply[i] + z.S_actual[i-1];
    z.Y_demand[i] = Par[4] + Par[5]*Training + Par[6]*Signage + Par[7]*Convenience + Par[8]*Taste + Par[9]*Affordability + Par[10]*Healthiness - Par[11]*C_cust;
    z.Y_cust[i]   = Math.min(z.Y_demand[i],z.S_actual[i]);
    z.Y_waste[i]  = Math.max(z.S_actual[i]*Par[15] - z.Y_cust[i],0);
    z.S_actual[i] = z.S_actual[i] - z.Y_cust[i] - z.Y_waste[i];
    z.M_supply[i] = z.Y_supply[i]*C_store;
    z.M_storage[i] = C_storage*z.S_actual[i];
    z.M_delivery[i] = C_delivery*z.Y_supply[i];
    z.M_cust[i]   = C_cust*z.Y_cust[i];
    z.M_profit[i] = z.M_cust[i] - z.M_delivery[i] - z.M_storage[i] - z.M_supply[i];
  }
}
