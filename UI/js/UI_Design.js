  var myTable0 = document.getElementById("checkboxTable");
  var myTable  = myTable0.getElementsByTagName("td");
  var food = {
    names:  [["Fresh Oranges","Fresh Carrots","Tomatoes","Fresh Bananas","Canned Fruit in 100% Juice","Frozen Broccoli","Fresh Iceberg Lettuce"],
             ["Whole Wheat Tortillas","Plain Oatmeal","Whole Wheat Pasta","Whole Wheat Bread","Whole Grain Cereal"],
             ["Low-sugar Yogurt","Low-fat Cheese","Fat-free/skim Milk"],
             ["Ground Beef (10% fat)","Unbreaded Poultry","Canned Tuna in Water","Eggs"],
             ["Peanut Butter","Soymilk","Low Sodium Canned Beans"]
             ],
    numVars: [],
    results: Object.create(null),
    vars:    [],
    plot:    null,                         // initial foods to be plotted
    select:  null,
    numTypes: 0
  };
  food.numTypes = food.names.length;

  var sliders = {
    defaultValues: [
                    [ [[0.5, 5,5,3],[5,5,5,5],[2,3,0.3]], [[0.6,5,5,3],[5,5,5,5],[2,3,0.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,0.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,0.3]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,0.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,0.2]] ],
                    [ [[0.6,5,5,3],[5,5,5,5],[2,3,1]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.7]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.5]] ],
                    [ [[0.6,5,5,3],[5,5,5,5],[2,3,1]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.7]] ],
                    [ [[0.6,5,5,3],[5,5,5,5],[2,3,3.5]], [[0.6,5,5,3],[5,5,5,5],[2,3,3.2]], [[0.6,5,5,3],[5,5,5,5],[2,3,2.5]], [[0.6,5,5,3],[5,5,5,5],[2,3,2.2]] ],
                    [ [[0.6,5,5,3],[5,5,5,5],[2,3,2.3]], [[0.6,5,5,3],[5,5,5,5],[2,3,1.5]], [[0.6,5,5,3],[5,5,5,5],[2,3,1]]]  // take out price



                    // [ [[0.1, 5,5,3],[5,5,5,5],[2,3,0.3]], [[0.1,5,5,3],[5,5,5,5],[2,3,0.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,0.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,0.3]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,0.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,0.2]] ],
                    // [ [[0.1,5,5,3],[5,5,5,5],[2,3,1]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.7]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.5]] ],
                    // [ [[0.1,5,5,3],[5,5,5,5],[2,3,1]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.7]], [[0.1,5,5,3],[5,5,5,5],[2,3,2.2]] ],
                    // [ [[0.1,5,5,3],[5,5,5,5],[2,3,3.5]], [[0.1,5,5,3],[5,5,5,5],[2,3,3.2]], [[0.1,5,5,3],[5,5,5,5],[2,3,2.5]] ],
                    // [ [[0.1,5,5,3],[5,5,5,5],[2,3,2.3]], [[0.1,5,5,3],[5,5,5,5],[2,3,1.5]], [[0.1,5,5,3],[5,5,5,5],[2,3,1]]]




                    // [ [[1, 5,5,10],[1,1,1,1],[2,3,0.3]], [[1,5,5,10],[1,1,1,1],[2,3,0.2]], [[1,5,5,10],[1,1,1,1],[2,3,0.2]], [[1,5,5,10],[1,1,1,1],[2,3,0.3]], [[1,5,5,10],[1,1,1,1],[2,3,1.2]], [[1,5,5,10],[1,1,1,1],[2,3,0.2]], [[1,5,5,10],[1,1,1,1],[2,3,0.2]] ],
                    // [ [[1,5,5,10],[1,1,1,1],[2,3,1]], [[1,5,5,10],[1,1,1,1],[2,3,1.2]], [[1,5,5,10],[1,1,1,1],[2,3,1.2]], [[1,5,5,10],[1,1,1,1],[2,3,1.7]], [[1,5,5,10],[1,1,1,1],[2,3,1.5]] ],
                    // [ [[1,5,5,10],[1,1,1,1],[2,3,1]], [[1,5,5,10],[1,1,1,1],[2,3,1.2]], [[1,5,5,10],[1,1,1,1],[2,3,1.7]], [[1,5,5,10],[1,1,1,1],[2,3,2.2]] ],
                    // [ [[1,5,5,10],[1,1,1,1],[2,3,3.5]], [[1,5,5,10],[1,1,1,1],[2,3,3.2]], [[1,5,5,10],[1,1,1,1],[2,3,2.5]] ],
                    // [ [[1,5,5,10],[1,1,1,1],[2,3,2.3]], [[1,5,5,10],[1,1,1,1],[2,3,1.5]], [[1,5,5,10],[1,1,1,1],[2,3,1]]]

                    ],
    min:           [[0, 1, 1, 0],[ 1, 1, 1, 1],[ 1, 1,   0.1]],
    max:           [[1, 5, 5, 10],[ 5, 5, 5, 5],[ 5, 5,  10]],
    step:          [[0.1,1, 1, 1],[ 1, 1, 1, 1],[ 1, 1,0.05]],
    currentValues: [],
    typeNames:     ["Ordinance","Demand","Supply"],
    vars:         [["Enforcement","PromotionsOwners","PromotionsConsumers","MinimumStock"],
                   ["ConveniencePreparation","Taste","Affordability","Healthiness"],
                   ["InfrastructureCapacity","EaseDelivery","UnitCost"]],                      // take out price
    namesDisplay: [["Level of Enforcement","Promotions to Store Owners","Promotions to Consumers","Minimum Stock Required"],
                   ["Convenience of Preparation","Taste","Affordability","Healthiness"],
                   ["Infrastructure (storage) Capacity","Ease of Delivery","Unit Cost"]],      // take out price
    numVars:       [],
    valuesHTML:    [],
    slidersHTML:   [],
    numTypes:      0
  };
  sliders.currentValues = sliders.defaultValues;
  sliders.numTypes   = sliders.vars.length;
  sliders.valuesHTML = Array(sliders.numTypes);
  sliders.sliderHTML = Array(sliders.numTypes);





function updateSelect() {
  food.plot = [];
  for (i=0; i<food.numTypes; i++) {
    for (j=0; j<food.numVars[i]; j++) {
      let foodVarNamei = food.vars[i][j];
      if (document.getElementById("plot" + foodVarNamei).checked) {
        food.plot.push([i,j]);
      }
      if (document.getElementById("select" + foodVarNamei).checked) {
        food.select = [i,j];
      }
    }
  }

  document.getElementById("sliderPanel").innerHTML = 'Sliders for: ' + food.names[food.select[0]][food.select[1]];
  document.getElementById("sliderPanel2").innerHTML = '<input type="range" id="sliderTop"> ';

  for (i=0; i<sliders.numTypes; i++) {
    for (j=0; j<sliders.numVars[i]; j++) {
      let sliderValue = sliders.currentValues[food.select[0]][food.select[1]][i][j];
      sliders.valuesHTML[i][j].innerHTML = sliderValue;
      sliders.sliderHTML[i][j].value = sliderValue;
    }
  }

  z_plot.num_plots = 0;
  for (key in z) {
    let key_checked = document.getElementById("plot" + key).checked;
    z_plot[key] = key_checked;
    if (key_checked) {z_plot.num_plots++};
  }
  createTopSliders(food.select);
  updatePlot1(true);
}

function fResetPlot(button) {
  initializePlotOptions();
  initializeFoodSelection();
  updateSelect();
}

function fResetSliders(button) {
  initializeSliders(food.select);
  // createTopSliders();
  updatePlot1(true);
}

function initializePlotOptions() {
  for (key in z) {
    z_plot[key] = false;
  };
  z_plot["price"]    = true;           // initialize
  z_plot["M_profit"] = true;

  let plotSelectionHTML = '';
  let boot_col_tot = 0;
  let boot_cols = 4;
  for (key in z) {
    let plotOption = '';
    if (z_plot[key]) {
      plotOption = 'checked="checked"';
    };
    food.results[key] = Array(food.numTypes);
    if (boot_col_tot==0) {             // new row
      plotSelectionHTML += '<div class="row">';
    }
    plotSelectionHTML +=
     '<div class="col-sm-' + boot_cols + '"><div class="form-group">\
        <input type="checkbox" id="plot' + key + '" autocomplete="off" onchange="updateSelect()" ' + plotOption + '/>\
        <div class="btn-group">\
          <label for="plot' + key + '" class="btn btn-info">\
            <span class="glyphicon glyphicon-ok"></span><span> </span>\
          </label>\
          <label for="plot' + key + '" class="btn btn-default active">' + key + '</label>\
        </div>\
      </div></div>';
    boot_col_tot += boot_cols;
    if (boot_col_tot==12) {
      boot_col_tot = 0;
      plotSelectionHTML += '</div>';
    }
  };
  document.getElementById("plotSelectionForm").innerHTML = plotSelectionHTML;

  for (i0=0; i0<food.numTypes; i0++) {
    food.numVars[i0] = food.names[i0].length;
    let food_n = food.numVars[i0];
    food.vars[i0]    = Array(food_n);
    zs[i0]           = Array(food_n);
    for (key in z) {
      food.results[key][i0] = Array(food_n);
    };
  };
}


function initializeFoodSelection() {
  food.plot = [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[3,3],[0,4],[1,4],[0,5],[0,6]];

  for (i0=0; i0<food.numTypes; i0++) {
    for (j0=0; j0<food.numVars[i0]; j0++) {
      let foodNamei = food.names[i0][j0];
      let foodVarNamei = foodNamei.replace(/ /g,"");     // replace all " " with "" (remove blank spaces for variable names)
      food.vars[i0][j0] = foodVarNamei;
      let selectOption = '';
      let plotOption = '';

      for (k=0; k<food.plot.length; k++) {
        if (food.plot[k][0]==i0 && food.plot[k][1]==j0) {
          plotOption = 'checked="checked"';
        }
      };
      if (food.select[0]==i0 && food.select[1]==j0) {
        selectOption = 'checked="checked"';
      };
      myTable[food.numTypes*j0 + i0].innerHTML =
        '<div class="form-group"> \
          <input type="checkbox" id="plot' + foodVarNamei + '" autocomplete="off" onchange="updateSelect()" ' + plotOption + '/> \
          <div class="btn-group"> \
            <label for="plot' + foodVarNamei + '" class="btn btn-info"> \
              <span class="glyphicon glyphicon-ok"></span><span> </span> \
            </label> \
            <label for="plot' + foodVarNamei + '" class="btn btn-default active">' + foodNamei + '</label> \
          </div> \
          <input type="radio" id="select' + foodVarNamei + '" name="choose" onchange="updateRadio()" ' + selectOption + '> \
        </div >';
    }
  }
  document.getElementById("sliderPanel").innerHTML = 'Sliders for: ' + food.names[food.select[0]][food.select[1]];
  document.getElementById("sliderPanel2").innerHTML = '<input type="range" id="sliderTop"> ';
  initializeSliders(food.select);
  createTopSliders(food.select);
}



function updateRadio() {
//  $("#nav-content").removeClass("in");
//   createTopSliders(food.select);
  updateSelect();
  fResetSliders();
  // createTopSliders();
}

function initializeSliders(food_select) {
  food.select = food_select;
  let i,j;


  for (i = 0; i < sliders.numTypes; i++) {
    sliders.numVars[i] = sliders.vars[i].length;
    sliders.valuesHTML[i] = Array(sliders.numVars[i]);
    sliders.sliderHTML[i] = Array(sliders.numVars[i]);
  }


  for (i = 0; i < sliders.numTypes; i++) {
    slidersHTML = '';
    for (j = 0; j < sliders.numVars[i]; j++) {
      let sliderNamei = sliders.namesDisplay[i][j];
      let sliderVarNamei = sliders.vars[i][j];
      if (i == 0 && j == 0) {
        slidersHTML +=
          '<div class="slidecontainer"> \
            <p><b>' + sliderNamei + '</b> (Percentage Enforced): <span id="value' + sliderVarNamei + '" style="border:0; color:#f6931f; font-weight:bold;"></span></p> \
          <input type="range" \
          min="' + sliders.min[i][j] + '" max="' + sliders.max[i][j] + '" \
          step="' + sliders.step[i][j] + '" value="' +
          sliders.defaultValues[food.select[0]][food.select[1]][i][j] + '" \
          id="slider' + sliderVarNamei + '"> \
        </div >';
      }
      else if (i == 0 && j == 3) {
        slidersHTML +=
          ' <div class="slidecontainer" id="test1"> \
            <p><b>' + sliderNamei + '</b> (Ordinance Required Amount (Units)): <span id="value' + sliderVarNamei + '" style="border:0; color:#f6931f; font-weight:bold;"></span></p> \
            <input type="range" \
          min="' + sliders.min[i][j] + '" max="' + sliders.max[i][j] + '" \
          step="' + sliders.step[i][j] + '" value="' +
          sliders.defaultValues[food.select[0]][food.select[1]][i][j] + '" \
          id="slider' + sliderVarNamei + '">\
        </div >';
      }
      else if (i == 2 && j == 2) {
        slidersHTML +=
          '<div class="slidecontainer"> \
            <p><b>' + sliderNamei + '</b> (Unit Price for Stores ($)): <span id="value' + sliderVarNamei + '" style="border:0; color:#f6931f; font-weight:bold;"></span></p> \
          <input type="range" \
          min="' + sliders.min[i][j] + '" max="' + sliders.max[i][j] + '" \
          step="' + sliders.step[i][j] + '" value="' +
          sliders.defaultValues[food.select[0]][food.select[1]][i][j] + '" \
          id="slider' + sliderVarNamei + '"> \
        </div >';
      }
      else {
        slidersHTML +=
          '<div class="slidecontainer"> \
            <p><b>' + sliderNamei + '</b> (Rate from 1 to 5): <span id="value' + sliderVarNamei + '" style="border:0; color:#f6931f; font-weight:bold;"></span></p> \
          <input type="range" \
          min="' + sliders.min[i][j] + '" max="' + sliders.max[i][j] + '" \
          step="' + sliders.step[i][j] + '" value="' +
          sliders.defaultValues[food.select[0]][food.select[1]][i][j] + '" \
          id="slider' + sliderVarNamei + '"> \
        </div >';
      }
    }


    document.getElementById("set" + sliders.typeNames[i]).innerHTML = slidersHTML;

  }

  let m=0,n=3;
  let slider_range = (sliders.max[m][n] - sliders.min[m][n]), slider_tick = 3;
  var slider = [];
  slider = new Slider("#slider" + sliders.vars[m][n], {
    ticks:            [sliders.min[m][n], slider_tick, sliders.max[m][n]],
    ticks_positions:  [                0,          30,               100],
    ticks_labels:     [sliders.min[m][n],     '3(SNAP Minimum)', sliders.max[m][n]],
    ticks_snap_bounds: 0.1,
    step:              1,
    value:             sliders.defaultValues[food.select[0]][food.select[1]][m][n]
  });



  for (i = 0; i < sliders.numTypes; i++) {
    for (j = 0; j < sliders.numVars[i]; j++) {
      sliders.valuesHTML[i][j] = document.getElementById("value" + sliders.vars[i][j]);
      sliders.sliderHTML[i][j] = document.getElementById("slider" + sliders.vars[i][j]);
      if (i==0 && j==0){
        sliders.valuesHTML[i][j].innerHTML = sliders.defaultValues[food.select[0]][food.select[1]][i][j]+" Medium";
      }
      else if (i==0 && j==3) {
        sliders.valuesHTML[i][j].innerHTML = sliders.defaultValues[food.select[0]][food.select[1]][i][j]+"(SNAP Default)"
      }
      else {
        sliders.valuesHTML[i][j].innerHTML = sliders.defaultValues[food.select[0]][food.select[1]][i][j];
      }
      sliders.sliderHTML[i][j].oninput = (function (e) {
        return function () {
          let sliderValue = sliders.sliderHTML[e[0]][e[1]].value;
          // let tickValue = valtick;
          console.log(e + ", " + sliderValue);
          // console.log(e + ", " + tickValue);
          // if (e[0]==0 && e[1]==3){
          //   sliders.currentValues[food.select[0]][food.select[1]][e[0]][e[1]] = tickValue;
          // }
          // else {
          sliders.valuesHTML[e[0]][e[1]].innerHTML = sliderValue;                // e is set to i
          sliders.currentValues[food.select[0]][food.select[1]][e[0]][e[1]] = sliderValue;
            // }
          if (sliders.sliderHTML[0][0].value == 0) {
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "None";
          }
          else if (sliders.sliderHTML[0][0].value <= 0.3) {
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "Low";
          }
          else if (sliders.sliderHTML[0][0].value > 0.3 && sliders.sliderHTML[0][0].value <= 0.7) {
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "Medium";
          }
          else if (sliders.sliderHTML[0][0].value > 0.7 && sliders.sliderHTML[0][0].value <= 1) {
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "High";
          }
          if (sliders.sliderHTML[0][3].value == 3) {
            sliders.valuesHTML[0][3].innerHTML = sliders.sliderHTML[0][3].value + " " + "(SNAP Default)";
          }

          evalSliders(food.select);                        // evaluate only the selected food
          updatePlot1(false);                              // false = don't evaluate all foods
        }
      })([i, j]);                                           // (i,j) is the argument, passed to (e)



    }
  }
  slider.on("slideStop", function(sliderValue) {
        document.getElementById("value" + sliders.vars[m][n]).textContent = sliderValue;
        // document.getElementById("slider" + sliders.vars[i][j]).value= sliderValue;
        valtick=sliderValue;
        // console.log(valtick);
        sliders.currentValues[food.select[0]][food.select[1]][0][3] = sliderValue;
        evalSliders(food.select);
        updatePlot1(false);
      });
}


// function updateSliders() {
//   let i=0,j=3;
//   // sliders.sliderHTML[i][j] = document.getElementById("slider" + sliders.vars[i][j]);
//   let slider_range = (sliders.max[i][j] - sliders.min[i][j]), slider_tick = 3;
//   var slider = [];
//   slider = new Slider("#slider" + sliders.vars[i][j], {
//     ticks:            [sliders.min[i][j], slider_tick, sliders.max[i][j]],
//     ticks_positions:  [                0,          30,               100],
//     ticks_labels:     [sliders.min[i][j],     '3(SNAP Minimum)', sliders.max[i][j]],
//     ticks_snap_bounds: 0.1,
//     step:              1,
//     value:             sliders.defaultValues[food.select[0]][food.select[1]][i][j]
//   });
//     slider.on("slide", function(sliderValue) {
//       document.getElementById("value" + sliders.vars[i][j]).textContent = sliderValue;
//       // document.getElementById("slider" + sliders.vars[i][j]).value= sliderValue;
//       valtick=sliderValue;
//       console.log(valtick);
//   });
// }

function createTopSliders(food_select) {
  food.select = food_select;
  var slider1 = [];
  slider1 = new Slider("#sliderTop" , {
    ticks:            [1, 2, 3],
    ticks_positions:  [                0,          50,               100],
    ticks_labels:     ['SNAP Minimum',     'SNAP Proposed', 'Minneapolis'],
    ticks_snap_bounds: 1,
    step:              1,
    value:             1,
    tooltip:          'hide'
  });


  for (i = 0; i < sliders.numTypes; i++) {
    sliders.numVars[i] = sliders.vars[i].length;
  }
  // sliders.currentValues = sliders.defaultValues;
  // initializeSliders(food.select);
  // console.log(sliders.currentValues);
  slider1.on("slideStop", function (sliderValue) {
    keepValue = sliderValue;
    // document.getElementById("value" + sliders.vars[i][j]).textContent = sliderValue;
    sliders.currentValues = [];
    if (keepValue == 1) {
      sliders.defaultValues = [[[[0.5, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.3]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.3]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]]],
        [[[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.7]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.5]]],
        [[[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.7]]],
        [[[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 3.5]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 3.2]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 2.5]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 2.2]]],
        [[[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 2.3]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.5]], [[0.6, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1]]]]
    }
    else if (keepValue == 2) {
      sliders.defaultValues = [[[[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 0.3]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 0.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 0.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 0.3]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 0.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 0.2]]],
        [[[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.7]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.5]]],
        [[[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.7]]],
        [[[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 3.5]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 3.2]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 2.5]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 2.2]]],
        [[[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 2.3]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1.5]], [[1, 5, 5, 10], [1, 1, 1, 1], [2, 3, 1]]]]
    }
    else if (keepValue == 3) {
      sliders.defaultValues = [[[[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.3]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.3]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 0.2]]],
        [[[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.7]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.5]]],
        [[[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.7]]],
        [[[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 3.5]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 3.2]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 2.5]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 2.2]]],
        [[[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 2.3]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1.5]], [[0.1, 5, 5, 3], [5, 5, 5, 5], [2, 3, 1]]]]
    }
    sliders.currentValues = sliders.defaultValues;
    console.log(sliders.currentValues);
    for (i0 = 0; i0 < sliders.numTypes; i0++) {
      for (j0 = 0; j0 < sliders.numVars[i0]; j0++) {

        let Select = [i0, j0];
        evalSliders(Select);
        initializeSliders(Select);
        updatePlot1(false);
      }
    }
    slider1.value = keepValue;
    console.log(slider1.value);
  });

}




function fClose() {
  console.log('Close');
  $('.collapse').collapse("hide");
}

function updatePlot1(updateResults) {
  if (updateResults) {
    for (i0=0; i0<food.numTypes; i0++) {                     // doesn't work if we use i,j
      for (j0=0; j0<food.numVars[i0]; j0++) {
        evalSliders([i0,j0]);
      }
    }
  }

  let panel = '';
  let boot_cols = 12;                                             // default number of Bootstrap columns
  let boot_col_tot = 0;                                          // counter for the number of columns used in a row
  if (food.plot.length>10) {                                     // food.plot is an array of foods to plot
    boot_cols = 12;                                              // if the array is large, make the plot full-width
  } else if (food.plot.length>6) {                               // otherwise, make it half-width
    boot_cols = 12;
  }

  let plotNum = 0;
  if (z_plot['price']) {                                         // price is full-width because we show all prices
    panel += '<br><hr  noshade><div class="row" id="plot' + plotNum++ + '"></div><br><hr noshade>';
  };
  if (z_plot['M_profit']) {                                      // profit is also full-width
    panel += '<br><hr  noshade><div class="row" id="plot' + plotNum++ + '"></div><br><hr noshade>';
  };

  for (k=plotNum; k<z_plot.num_plots; k++) {                     // for each plot
    if (boot_col_tot==0) {                                       // beginning of a new row
      panel += '<div class="row">';
    };                                                           // new div
    panel += '<div class="col-sm-' + boot_cols + '"><div id="plot' + plotNum++ + '"></div></div>';
    boot_col_tot += boot_cols;
    if (boot_col_tot==12) {                                      // end of row
      boot_col_tot = 0;
      panel += '</div>';
    };
  };

  document.getElementById("panelPlots").innerHTML = panel;       // add plot divs to panelPlots

  plotNum = 0;
  for (key in z) {
    if (z_plot[key]) {                                           // if we are plotting this key
      let xValue = [];
      let yValue = [];
      let plot_title = key;
      let total_result = 0;                                      // total used for profit calcs
      let average_result = 0;
      if (key=='M_profit' || key=='price') {
        for (i = 0; i < food.numTypes; i++) {
          for (j = 0; j < food.numVars[i]; j++) {
            let profit = food.results[key][i][j];
            total_result += profit;
            xValue.push(food.names[i][j]);
            yValue.push(profit.toFixed(2));
            average_result = total_result/xValue.length;
          }
        }
        if (key == 'M_profit') {
          plot_title = 'Total Weekly Profit = $' + total_result.toFixed(2) + '/Week, (dashed line = Average profit for all foods = $' + average_result.toFixed(2) + '/Week)';
        }
        else if (key == 'price') {
          plot_title = 'Recommended Selling Unit Price for Each Food in Dollars'
        }
      }
      else if (key=='M_storage' || key=='M_supply' || key=='M_delivery' || key=='M_cust') {
        // for (i = 0; i < food.plot.length; i++) {                     // only plot the ones that were checked
        //   let ploti = food.plot[i];
        //   xValue.push(food.names[ploti[0]][ploti[1]]);
        //   yValue.push(food.results[key][ploti[0]][ploti[1]].toFixed(2));
        for (i = 0; i < food.numTypes; i++) {
          for (j = 0; j < food.numVars[i]; j++) {
            xValue.push(food.names[i][j]);
            yValue.push(food.results[key][i][j].toFixed(2));
          }

          if (key == 'M_storage') {
            plot_title = 'Weekly Storage Cost in Dollars'
          }
          else if (key == 'M_supply') {
            plot_title = 'Cost for Stores to Buy the Food from Supplier In Dollars Per Week'
          }
          else if (key == 'M_delivery') {
            plot_title = 'Delivery Cost In Dollars Per Week'
          }
          else if (key == 'M_cust') {
            plot_title = 'Money Get from Customers in Dollars Per Week (Costs not Deducted)'
          }
        }
      }
      else {
        // for (i = 0; i < food.plot.length; i++) {                     // only plot the ones that were checked
        //   let ploti = food.plot[i];
        //   xValue.push(food.names[ploti[0]][ploti[1]]);
        //   yValue.push(food.results[key][ploti[0]][ploti[1]].toFixed(0));
        for (i = 0; i < food.numTypes; i++) {
          for (j = 0; j < food.numVars[i]; j++) {
            xValue.push(food.names[i][j]);
            yValue.push(food.results[key][i][j].toFixed(2));
          }
          if (key == 'Y_supply') {
            plot_title = 'Amount Supplied to The Store from Supplier Each Week'
          }
          else if (key == 'S_actual') {
            plot_title = 'Actual Stock in The Store Each Week'
          }
          else if (key == 'Y_demand') {
            plot_title = 'Customer Demand in Units Per Week'
          }
          else if (key == 'Y_cust') {
            plot_title = 'Amount of Food Actually Purchased by Customer Per Week'
          }
          else if (key == 'Y_waste') {
            plot_title = 'Amount of Food Wasted from Store Per Week'
          }
        }
      }


      let data = [], k = 0;
      for (i = 0; i < food.numTypes; i++) {
        let hoverinfo = [];
        for (l = 0; l < food.numTypes; l++) {
          if (l == i) {
            hoverinfo.push('y+name');
          } else {
            hoverinfo.push('none');
          }
        }
        for (j = 0; j < food.numVars[i]; j++) {
          let y = [];                                    // need to reinitialize y because y is an object which changes for every j
          for (l = 0; l < food.numTypes; l++) {
            if (l == i) {
              y.push(yValue[k]);
            } else {
              y.push(0);
            }
          }
          data.push({
            x: ['Fruits & Vegetables', 'Grains', 'Dairy', 'Meat, Poultry, Fish', 'Other'],
            y: y,
            type: 'bar',
            hoverinfo: hoverinfo,
            hoverlabel: {namelength: -1},
            name: xValue[k]
          });
          k++;
        }
      }
      // console.log(data);

      // let trace0 = {
      //   x: ['Fruits & Vegetables', 'Grains', 'Dairy', 'Meat, Poultry, Fish', 'Other'],
      //   y: [yValue[0], 0, 0, 0, 0],
      //   type: 'bar',
      //   hoverinfo: ["y+name", 'none', 'none', 'none', 'none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[0]
      // };
      //
      // let trace1 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [yValue[1],0,0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['y+name','none','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[1]
      // };
      // let trace2 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [yValue[2],0,0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['y+name','none','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[2]
      // };
      // let trace3 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [yValue[3],0,0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['y+name','none','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[3]
      // };
      // let trace4 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [yValue[4],0,0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['y+name','none','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[4]
      // };
      // let trace5 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [yValue[5],0,0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['y+name','none','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[5]
      // };
      // let trace6 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [yValue[6],0,0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['y+name','none','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[6]
      // };
      // let trace7 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,yValue[7],0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','y+name','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[7]
      // };
      // let trace8 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,yValue[8],0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','y+name','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[8]
      // };
      // let trace9 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,yValue[9],0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','y+name','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[9]
      // };
      // let trace10 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,yValue[10],0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','y+name','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[10]
      // };
      // let trace11 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,yValue[11],0,0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','y+name','none','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[11]
      // };
      // let trace12 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,yValue[12],0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','y+name','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[12]
      // };
      // let trace13 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,yValue[13],0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','y+name','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[13]
      // };
      // let trace14 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,yValue[14],0,0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','y+name','none','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[14]
      // };
      // let trace15 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,yValue[15],0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','y+name','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[15]
      // };
      // let trace16 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,yValue[16],0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','y+name','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[16]
      // };
      // let trace17 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,yValue[17],0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','y+name','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[17]
      // };
      // let trace18 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,yValue[18],0],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','y+name','none'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[18]
      // };
      // let trace19 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,0,yValue[19]],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','none','y+name'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[19]
      // };
      // let trace20 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,0,yValue[20]],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','none','y+name'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[20]
      // };
      // let trace21 = {
      //   x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
      //   y: [0,0,0,0,yValue[21]],
      //   type: 'bar',
      //   hoverinfo: ['none','none','none','none','y+name'],
      //   hoverlabel: {namelength: -1},
      //   name: xValue[21]
      // };
      //
      //
      //   let data = [trace0,trace1,trace2,trace3,trace4,trace5,trace6,trace7,trace8,trace9,trace10,trace11,trace12,trace13,trace14,trace15,trace16,trace17,trace18,trace19,trace20,trace21];
      if (key=='M_profit') {
        let trace_avg = {                                        // set up a line plot to show avg profit
          x: ['Fruits & Vegetables','Grains','Dairy','Meat, Poultry, Fish','Other'],
          y: Array(xValue.length).fill(total_result/xValue.length),
          mode: 'lines',
          line: {
            color: 'rgb(55, 128, 191)',
            width: 1.5,
            dash:  'dash'
          },
          hoverinfo: 'none',
          name: 'average',
          showlegend: false
        };
        data.push(trace_avg);
      };
      let layout = {
        title: plot_title,
        barmode: 'group'
      };
      Plotly.newPlot('plot' + plotNum, data, layout);
      plotNum++;
    }
  }
}



$(document).ready(function(){
  initializeSliders([0,0]);
  initializePlotOptions();
  initializeFoodSelection();
  updatePlot1(true);                     // true = evaluate profit and other results for all foods


// let sliderValue = sliders.sliderHTML[0][3].value;
//   console.log(sliderValue);

  // See ContraceptiveDT for scrollspy options

  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 300, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });
});



