/**
 * Created by Siyao on 2018/7/20.
 */

// Variables for maximization
var n_max = 50;                                 // number of points for maximization

var z = {
  price:     null,
  M_profit:  null,
  M_storage: null,
  M_supply:  null,
  M_delivery:null,
  M_cust:    null,
  Y_supply:  null,
  S_actual:  null,
  Y_demand:  null,
  Y_cust:    null,
  Y_waste:   null,
};
var zs       = [];
var z_length = Object.keys(z).length;
var z_plot   = {
  num_plots: null
};
var Pars     = [
                [ [0.0507, 0.0498,0.3508, 0.0495,3,0.15,0.19,0.19,0.16,0.15,0.11,1.410,1.6626,0.0485,-0.1052, 3] ],   //FFM
                [ [0.1378,-0.0017,0.3385,-0.0202,3,0.15,0.19,0.19,0.16,0.15,0.11,1.410,1.6626,0.0104,-0.0323, 1] ], // Cheese
                [ [0.1378,-0.0017,0.3385,-0.0202,3,0.15,0.19,0.19,0.16,0.15,0.11,1.8496,1.6626,0.0485,-0.1052, 3] ], // Eggs
                [ [0.1410,-0.0108,0.2881,-0.0252,4,0.17,0.13,0.18,0.17,0.16,0.12,2.4714,0.4550,0.0104,-0.0323, 4], //CT
                  [0.0818, 0.0057,0.1688, 0.0125,2,0.18,0.11,0.20,0.14,0.13,0.19,1.9286,0.4550,0.0104,-0.0323, 3] ], //Lettuce
                [ [0.0287,-0.0010,0.0535,-0.0015,3,0.14,0.18,0.15,0.18,0.17,0.13,3.8750,0.4550,0.0104,-0.0323, 2],    //Banana
                  [0.1455,-0.0062,0.3367,-0.0273,5,0.16,0.10,0.11,0.15,0.14,0.17,2.6200,0.5567,0.0565,-0.0237, 4] ],  // FV
                [ [0.2311,-0.0256,0.3443,-0.0291,3,0.14,0.18,0.15,0.18,0.17,0.13,1.9375,0.4550,0.0104,-0.0323, 5] ], //CFJ
                [ [0.6882,-0.0976,0.3383, 0.0527,5,0.16,0.10,0.11,0.15,0.14,0.17,1.0906,0.4550,0.0104,-0.0323, 6] ], //Cereal
                [ [0.1468, 0.0047,0.3324, 0.0003,4,0.17,0.13,0.18,0.17,0.16,0.12,2.162,0.8594,0.0713,-0.0442, 3] ], //Whole Wheat Bread
                [ [0.1544,-0.0134,0.3464,-0.0375,2,0.18,0.11,0.20,0.14,0.13,0.19,1.350,0.4690,0.1291,-0.0098,6] ], //Canned Beans
                [ [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323, 1] ]  //Peas
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
    food.results[key][iFood[0]][iFood[1]] = z[key];                             // z is not an array
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
    S_expire  = Enforcement*S_required/Par[15];           // maximum amount of food that can expire each week
    Y_demand  = y_0 - C_custj*a;              // demand
    if        (Y_demand  > Enforcement*S_required) {
      M_profit = (C_custj - C_delivery - C_store - C_storage)*Y_demand;
    }
    else if (((Y_demand <= Enforcement*S_required)) && ((S_expire) <= Y_demand)) {
      M_profit = (C_custj - C_delivery - C_store)*Y_demand - C_storage*Enforcement*S_required;
    }
    else {
      M_profit = (C_custj)*Y_demand - C_storage*Enforcement*S_required - (C_store + C_delivery)*S_expire;
    }
    if (M_profit > M_profit_max) {            // update the maximum profit
      j_max      = j;                         // index j corresponding to the maximum profit
      z.M_profit = M_profit;                  // set the z key values
      z.Y_demand = Y_demand;
      z.price    = C_custj;
      M_profit_max = M_profit;
    }
    z.S_actual   = Math.max(Enforcement*S_required,z.Y_demand);    // set the remaining z key values
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

