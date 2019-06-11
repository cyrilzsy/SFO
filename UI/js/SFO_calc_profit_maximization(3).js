/**
 * Created by Siyao on 2018/7/20.
 */

// Variables for maximization
var n_max = 50;                                 // number of points for maximization

var z = {
  price:     null,
  Weekly_Profit:  null,
  Weekly_Storage_Cost: null,
  Weekly_Item_Cost:  null,
  Weekly_Delivery_Cost:null,
  Weekly_Revenue:    null,
  Weekly_Amount_of_Supply:  null,
  Actual_Amount_in_Store:  null,
  Weekly_Consumer_Demand:  null,
  Weekly_Amount_Sold:    null,
  Weekly_Amount_Wasted:   null
};
var zs       = [];
var z_length = Object.keys(z).length;
var z_plot   = {
  num_plots: null
};
var Pars     = [
                [
                  [0.0287,-0.0010,0.0535,-0.0015,-16.5178402214775,2.79508364248950/2, 2.79508364248950/2,-0.479453242578706,0.554963737373109,1.99362694396789,1.10808182780980,( -16.5178402214775+(2.79508364248950/2+ 2.79508364248950/2-0.479453242578706+0.554963737373109+1.99362694396789+1.10808182780980)*5)/2.49,0.4550,0.0104,-0.0323, 2],    //Oranges·
                  [0.0287,-0.0010,0.0535,-0.0015,-2.66175447624987,1.20106762729864/2, 1.20106762729864/2,0.574998419056799,-0.276278219836149,0.890020868450260,-0.166004705759214,( -2.66175447624987+(1.20106762729864/2+1.20106762729864/2+0.574998419056799-0.276278219836149+0.890020868450260-0.166004705759214)*5)/1.49,0.4550,0.0104,-0.0323, 2],    //Carrots·
                  [0.0287,-0.0010,0.0535,-0.0015,0.492200579505844,0.828071487686349/2, 0.828071487686349/2,-0.430594307799062,0.0877101776335659,0.442185422309038,0.501085949787469,( 0.492200579505844+(0.828071487686349/2+0.828071487686349/2-0.430594307799062+0.0877101776335659+0.442185422309038+0.501085949787469)*5)/2.49,0.4550,0.0104,-0.0323, 2],    //Tomatoes·
                  [0.0287,-0.0010,0.0535,-0.0015,0,0.941176470588241/2, 0.941176470588241/2,0.270076726342705,0,0.608695652173914,0,( 0+(0.941176470588241/2+ 0.941176470588241/2+0.270076726342705+0+0.608695652173914+0)*5)/0.485,0.4550,0.0104,-0.0323, 2],    //Bananas·
                  [0.2311,-0.0256,0.3443,-0.0291,7.46241583377826,-0.282166335872858/2, -0.282166335872858/2,-1.16520338785742,-0.300048124178850,0.939344611961531,1.27623869047736,( 7.46241583377826+(-0.282166335872858/2-0.282166335872858/2-1.16520338785742-0.300048124178850+0.939344611961531+1.27623869047736)*5)/2.31625,0.4550,0.0104,-0.0323, 5],    //CFJ·
                  [0.1455,-0.0062,0.3367,-0.0273,2.69842890949335,0.566241572059529/2, 0.566241572059529/2,0.335432030763894,0.789696747146486,0.796548752001795,-1.47023827738507,( 2.69842890949335+(0.566241572059529/2+0.566241572059529/2+0.335432030763894+0.789696747146486+0.796548752001795-1.47023827738507)*5)/2.41,0.5567,0.0565,-0.0237, 4],    // Broccoli·
                  [0.0818, 0.0057,0.1688, 0.0125,10.5031317893958,0.377988778717700/2, 0.377988778717700/2,-1.59317795728747,-0.0946196204872186,0.0425680673045816,0.343697996117044,( 10.5031317893958+(0.377988778717700/2+0.377988778717700/2-1.59317795728747-0.0946196204872186+0.0425680673045816+0.343697996117044)*5)/2.0625,0.4550,0.0104,-0.0323, 3]     //Lettuce·
                ],
                [
                  [0.1468, 0.0047,0.3324, 0.0003,-8.12101292540831,0.959673952880220/2, 0.959673952880220/2,-0.264090443957358,0.234645049347247,1.75156026822243,1.17643109548742,(-8.12101292540831+(0.959673952880220/2+0.959673952880220/2-0.264090443957358+0.234645049347247+1.75156026822243+1.17643109548742)*5)/1.59,0.8594,0.0713,-0.0442, 3],     //Whole Wheat Tortillas·
                  [0.6882,-0.0976,0.3383, 0.0527,-24.2365143032937,2.67547522519433/2, 2.67547522519433/2,-0.734001257992270,-1.32599047296199,0.596684151844762,5.09955186474820,( -24.2365143032937+(2.67547522519433/2+2.67547522519433/2-0.734001257992270-1.32599047296199+0.596684151844762+5.09955186474820)*5)/1.99,0.4550,0.0104,-0.0323, 6],    //Oatmeal·
                  [0.6882,-0.0976,0.3383, 0.0527,-2.27571867802352,1.47739124766416/2, 1.47739124766416/2,1.17803441832167,-0.0252732388857503,1.62626026682890,-1.65340489331190,(-2.27571867802352+(1.47739124766416/2+1.47739124766416/2+1.17803441832167-0.0252732388857503+1.62626026682890-1.65340489331190)*5)/2.5,0.4550,0.0104,-0.0323, 6],    //Pasta·
                  [0.1468, 0.0047,0.3324, 0.0003,0,2.43919263933716/2, 2.43919263933716/2,0,0.309359795751240,1.08319283202466,-2.17023941422998,( 0+(2.43919263933716/2+2.43919263933716/2+0+0.309359795751240+1.08319283202466-2.17023941422998)*5)/3.334,0.8594,0.0713,-0.0442, 3],     //Whole Wheat Bread·
                  [0.6882,-0.0976,0.3383, 0.0527,0.223376623376606,1.66753246753247/2, 1.66753246753247/2,0.0961038961038945,-0.631168831168828,0.605194805194806,0.0363636363636388,( 0.223376623376606+(1.66753246753247/2+1.66753246753247/2+0.0961038961038945-0.631168831168828+0.605194805194806+0.0363636363636388)*5)/5.174,0.4550,0.0104,-0.0323, 6]     //Cereal·
                ],
                [
                  [0.0507, 0.0498,0.3508, 0.0495,0.679032250138045,0.760516892874893/2, 0.760516892874893/2,-1.65363877805271,-0.492109740500034,1.17890255632593,1.68378423443359,( 0.679032250138045+(0.760516892874893/2+0.760516892874893/2-1.65363877805271-0.492109740500034+1.17890255632593+1.68378423443359)*5)/1.5,1.6626,0.0485,-0.1052, 3],     //Yogurt·
                  [0.1378,-0.0017,0.3385,-0.0202,0.360765745558464,0.0777024286011066/2, 0.0777024286011066/2,0.0794917441533440,0.348541787867509,0.0724276224042098,0.923035782308915,( 0.360765745558464+(0.0777024286011066/2+0.0777024286011066/2+0.0794917441533440+0.348541787867509+0.0724276224042098+0.923035782308915)*5)/3.49,1.6626,0.0104,-0.0323, 3],     // Cheese·
                  [0.0507, 0.0498,0.3508, 0.0495,-1.78676564925247,0.276095504275353/2, 0.276095504275353/2,-0.464938077185286,0.862811343585461,0.541142257698529,1.26696871281550,( -1.78676564925247+(0.276095504275353/2+ 0.276095504275353/2-0.464938077185286+0.862811343585461+0.541142257698529+1.26696871281550)*5)/ 4.99333333333333,1.6626,0.0485,-0.1052, 3]     //FFM·
                ],
                [
                  [0.1410,-0.0108,0.2881,-0.0252,-8.44879775005700,-0.645085006292069/2, -0.645085006292069/2,-0.730251767269410,2.44463400420597,0.643167825139567,1.52076383199750,( -8.44879775005700+(-0.645085006292069/2 -0.645085006292069/2-0.730251767269410+2.44463400420597+0.643167825139567+1.52076383199750)*5)/2.99,0.4550,0.0104,-0.0323, 2],    //Beef·
                  [0.1410,-0.0108,0.2881,-0.0252,-4.67226770222337,0.570787143013344/2, 0.570787143013344/2,-0.290511982148169,0.506507500379164,0.332711387949308,1.30432704686458,( -4.67226770222337+(0.570787143013344/2+0.570787143013344/2-0.290511982148169+0.506507500379164+0.332711387949308+1.30432704686458)*5)/5.99,0.4550,0.0104,-0.0323, 2],    //Poultry·
                  [0.1410,-0.0108,0.2881,-0.0252,-3.62536005279746,-0.229681303159829/2, -0.229681303159829/2,0.633557229120022,0.546379734655737,0.787064621381739,1.03242479753776,( -3.62536005279746+(-0.229681303159829/2 -0.229681303159829/2+0.633557229120022+0.546379734655737+0.787064621381739+1.03242479753776)*5)/1.874,0.4550,0.0104,-0.0323, 4],     //CT·
                  [0.1378,-0.0017,0.3385,-0.0202,2.25250492297000,0.908561755631141/2, 0.908561755631141/2,-0.269972910501987,0.820467576845718,0.703726714615167,-0.821134942030052,( 2.25250492297000+(0.908561755631141/2+ 0.908561755631141/2-0.269972910501987+0.820467576845718+0.703726714615167-0.821134942030052)*5)/ 2.61166666666667,1.6626,0.0485,-0.1052, 3]     // Eggs·
                ],
                [
                  [0.1511,-0.0352,0.1864,-0.0352,3,0.14,0.18,0.15,0.18,0.17,0.13,3.875,0.4550,0.0104,-0.0323, 1],     //Peanut Butter
                  [0.0507, 0.0498,0.3508, 0.0495,3,0.15,0.19,0.19,0.16,0.15,0.11,1.410,1.6626,0.0485,-0.1052, 3],     //Soymilk
                  [0.1544,-0.0134,0.3464,-0.0375,2,0.18,0.11,0.20,0.14,0.13,0.19,1.350,0.4690,0.1291,-0.0098,6]       //Canned Beans
                ]
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
  let Weekly_Consumer_Demand   = null;
  let C_cust_max = y_0/a;                        // maximum cost for the customer (x-intercept of the demand curve)
  let C_custj    = null;
  let j_max      = null;

  for (j = 0; j < n_max; j++) {
    C_custj   = C_cust_max*j/n_max;           // price for the customer
    if (C_custj>0) {
      C_custj = C_custj;
    }else {
      C_custj = 0;
    };
    S_expire  = Enforcement*S_required/Par[15];           // maximum amount of food that can expire each week
    Weekly_Consumer_Demand  = y_0 - C_custj*a;              // demand
    if        (Weekly_Consumer_Demand  > Enforcement*S_required) {
      Weekly_Profit = (C_custj - C_delivery - C_store - C_storage)*Weekly_Consumer_Demand;
    }
    else if (((Weekly_Consumer_Demand <= Enforcement*S_required)) && ((S_expire) <= Weekly_Consumer_Demand)) {
      Weekly_Profit = (C_custj - C_delivery - C_store)*Weekly_Consumer_Demand - C_storage*Enforcement*S_required;
    }
    else {
      Weekly_Profit = (C_custj)*Weekly_Consumer_Demand - C_storage*Enforcement*S_required - (C_store + C_delivery)*S_expire;
    }
    if (Weekly_Profit > M_profit_max) {            // update the maximum profit
      j_max      = j;                         // index j corresponding to the maximum profit
      z.Weekly_Profit = Weekly_Profit;                  // set the z key values
      z.Weekly_Consumer_Demand = Weekly_Consumer_Demand;
      z.price    = C_custj;
      M_profit_max = Weekly_Profit;
    }
    z.Actual_Amount_in_Store   = Math.max(Enforcement*S_required,z.Weekly_Consumer_Demand);    // set the remaining z key values
    z.Weekly_Amount_of_Supply   = Math.max(z.Weekly_Consumer_Demand,S_expire);
    z.Weekly_Amount_Sold     = z.Weekly_Consumer_Demand;
    z.Weekly_Amount_Wasted    = Math.max(S_expire-z.Weekly_Consumer_Demand,0);
    z.Weekly_Storage_Cost  = z.Actual_Amount_in_Store*C_storage;
    z.Weekly_Item_Cost   = z.Weekly_Amount_of_Supply*(C_store + C_delivery);
    z.Weekly_Delivery_Cost = z.Weekly_Amount_of_Supply*C_delivery;
    z.Weekly_Revenue     = z.Weekly_Consumer_Demand*z.price
  }

}

