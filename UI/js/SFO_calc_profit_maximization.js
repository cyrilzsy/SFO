/**
 * Created by Siyao on 2018/7/20.
 */

// Variables for maximization
var c_max = 100;
var t_max = 101;

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
  M_cust:    [],
  S_actual_end: [],
  M_profit1: [1],
  Max_profit: [],
  M_Profit: [1]
};
var zs       = [];
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
  runOptimal(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,C_cust);
  for (key in z) {
    food.results[key][iFood[0]][iFood[1]] = z[key][t_max-1];
  }
}

function runOptimal(Enforcement,Training,Signage,Convenience,Taste,Affordability,Healthiness,S_infra,S_required,X_delivery,C_store,C_cust) {
  let C_delivery = Par[0] + X_delivery*Par[1];
  let C_storage  = Par[2] + Par[3]*S_infra;
  let C_total    = C_delivery + C_storage + C_store;        // this is only needed if there is no ordinance
  var y_0        = Par[4] + Par[5]*Training      + Par[6]*Signage + Par[7]*Convenience + Par[8]*Taste
                          + Par[9]*Affordability + Par[10]*Healthiness;
  var a          = Par[11];

  // if ((y_0 - a*C_cust) > S_required) {
  //   z.M_profit = (C_cust - C_delivery - C_store - C_storage) * (y_0 - C_cust * a);
  // }
  // else if (((S_required/Par[15]) <= (y_0 - C_cust*a)) && ((y_0 - C_cust*a) <= S_required)) {
  //   z.M_profit = (C_cust - C_store - C_delivery)*(y_0 - C_cust*a) - C_storage*S_required;
  // }
  // else if ((S_required / Par[15]) > (y_0 - C_cust*a)) {
  //   z.M_profit = C_cust*(y_0 - C_cust*a) - (C_store + C_delivery)*S_required/Par[15] - C_storage*S_required;
  // }

  for (j = 0; j < c_max; j++) {
    for (i = 1; i < t_max; i++) {
      if        ((y_0 - j/10*a)  > S_required) {
        z.M_profit1[i] = (j/10 - C_delivery - C_store - C_storage)*(y_0 - j/10*a);
      }
      else if ((((y_0 - j/10*a) <= S_required)) && ((S_required/Par[15]) <= (y_0 - j/10*a))) {
        z.M_profit1[i] = (j/10 - C_delivery - C_store            )*(y_0 - j/10*a) - C_storage*S_required;
      }
      else if                                      ((S_required/Par[15])  > (y_0 - j/10*a))  {
        z.M_profit1[i] = (j/10                                   )*(y_0 - j/10*a) - (C_store + C_delivery)*S_required/Par[15]
                                                                                  - C_storage*S_required;
      }

      z.Max_profit = Math.max(z.M_profit1);
    }
  }
  return [z.Max_profit];
}

console.log(z.Max_profit)

