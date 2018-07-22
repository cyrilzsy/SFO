/**
 * Created by Siyao on 2018/7/20.
 */

// Variables for maximization
var n_max = 50;                                 // number of points for maximization

var z = {
  Y_supply:  null,
  S_actual:  null,
  Y_demand:  null,
  Y_cust:    null,
  Y_waste:   null,
  M_profit:  null,
  M_storage: null,
  M_supply:  null,
  M_delivery:null,
  M_cust:    null,
  price:     null
};
var zs       = [];
var z_length = Object.keys(z).length;
var z_plot   = Object.create(null);
var Pars     = [
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1],
                  [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ], // Milk
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ], // Cheese
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ], // Eggs
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ], // Meat
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1],
                  [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ], // Fruits & Vegetables
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ],
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ],
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ],
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ],
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323,1] ],
               ];

function evalSliders(iFood) {
  let Enforcement   = sliders.currentValues[iFood[0]][iFood[1]][0][0];
  let Training      = sliders.currentValues[iFood[0]][iFood[1]][0][1];
  let Signage       = sliders.currentValues[iFood[0]][iFood[1]][0][2];
  let S_required    = sliders.currentValues[iFood[0]][iFood[1]][0][3];
  let Convenience   = sliders.currentValues[iFood[0]][iFood[1]][1][0];
  let Taste         = sliders.currentValues[iFood[0]][iFood[1]][1][1];
  let Affordability = sliders.currentValues[iFood[0]][iFood[1]][1][2];
  let Healthiness   = sliders.currentValues[iFood[0]][iFood[1]][1][3];
  let S_infra       = sliders.currentValues[iFood[0]][iFood[1]][2][0];
  let X_delivery    = sliders.currentValues[iFood[0]][iFood[1]][2][1];
  let C_store       = sliders.currentValues[iFood[0]][iFood[1]][2][2];         // take out price
  let Par           = Pars[iFood[0]][iFood[1]];
  runOptimal(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,Par);
  for (key in z) {
    food.results[key][iFood[0]][iFood[1]] = z[key];                        // z is not an array
  }
}

function runOptimal(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,Par) {
  let C_delivery = Par[0] + X_delivery*Par[1];
  let C_storage  = Par[2] + Par[3]*S_infra;
  let y_0        = Par[4] + Par[5]*Training      + Par[6]*Signage + Par[7]*Convenience + Par[8]*Taste
                          + Par[9]*Affordability + Par[10]*Healthiness;
  let a          = Par[11];
  let M_profit_max = -10000;
  let Y_demand   = null;
  let C_cust_max = y_0/a;                        // maximum cost for the customer (x-intercept of the demand curve)
  let C_custj    = null;
  let j_max      = null;

  for (j = 0; j < n_max; j++) {
    C_custj   = C_cust_max*j/n_max;           // price for the customer
    S_expire  = S_required/Par[15];           // maximum amount of food that can expire each week
    Y_demand  = y_0 - C_custj*a;              // demand
    if        (Y_demand  > S_required) {
      M_profit = (C_custj - C_delivery - C_store - C_storage)*Y_demand;
    }
    else if (((Y_demand <= S_required)) && ((S_expire) <= Y_demand)) {
      M_profit = (C_custj - C_delivery - C_store)*Y_demand - C_storage*S_required;
    }
    else {
      M_profit = (C_custj)*Y_demand - C_storage*S_required - (C_store + C_delivery)*S_expire;
    }
    if (M_profit > M_profit_max) {            // update the maximum profit
      j_max      = j;                         // index j corresponding to the maximum profit
      z.M_profit = M_profit;                  // set the z key values
      z.Y_demand = Y_demand;
      z.price    = C_custj;
    }
    z.S_actual   = Math.max(S_required,z.Y_demand);    // set the remaining z key values
    z.Y_supply   = Math.max(z.Y_demand,S_expire);
    z.Y_cust     = z.Y_demand;
    z.Y_waste    = Math.max(S_expire-z.Y_demand,0);
    z.M_storage  = z.S_actual*C_storage;
    z.M_supply   = z.Y_supply*(C_store + C_delivery);
    z.M_delivery = z.Y_supply*C_delivery;
    z.M_cust     = z.Y_demand*z.price
  }
  console.log(z);
}

