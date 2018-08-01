  var myTable0 = document.getElementById("checkboxTable");
  var myTable  = myTable0.getElementsByTagName("td");
  var food = {
    names:  [["Fresh Oranges","Fresh Carrots","Tomatoes","Fresh Bananas","Canned Fruit in 100% Juice","Frozen Broccoli","Fresh Iceberg Lettuce"],
             ["Whole Wheat Tortillas","Plain Oatmeal","Whole Wheat Pasta","Whole Wheat Bread","Whole Grain Cereal"],
             ["Low-sugar Yogurt","Low-fat Cheese","Fat-free/skim Milk","Eggs"],
             ["Ground Beef (10% fat)","Unbreaded Poultry","Canned Tuna in Water"],
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
                    [ [[0.5, 5,5,3],[5,5,5,5],[2,3,0.3]], [[0.6,10,5,3],[5,5,5,5],[2,3,0.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,0.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,0.3]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,0.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,0.2]] ],
                    [ [[0.6,10,5,3],[5,5,5,5],[2,3,1]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.7]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.5]] ],
                    [ [[0.6,10,5,3],[5,5,5,5],[2,3,1]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.7]], [[0.6,10,5,3],[5,5,5,5],[2,3,2.2]] ],
                    [ [[0.6,10,5,3],[5,5,5,5],[2,3,3.5]], [[0.6,10,5,3],[5,5,5,5],[2,3,3.2]], [[0.6,10,5,3],[5,5,5,5],[2,3,2.5]] ],
                    [ [[0.6,10,5,3],[5,5,5,5],[2,3,2.3]], [[0.6,10,5,3],[5,5,5,5],[2,3,1.5]], [[0.6,10,5,3],[5,5,5,5],[2,3,1]]]  // take out price
                   ],
    min:           [[0,  1, 1, 1],[ 1, 1, 1, 1],[ 1, 1,   0.1]],
    max:           [[1, 10,10,10],[10,10,10,10],[5, 5,  10]],
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


  $("sliderMinimumStock").sliders({
    ticks: [0, 1, 2, 3, 4],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
    });

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
  };

  document.getElementById("sliderPanel").innerHTML = 'Sliders for: ' + food.names[food.select[0]][food.select[1]];

  for (i=0; i<sliders.numTypes; i++) {
    for (j=0; j<sliders.numVars[i]; j++) {
      let sliderValue = sliders.currentValues[food.select[0]][food.select[1]][i][j];
      sliders.valuesHTML[i][j].innerHTML = sliderValue;
      sliders.sliderHTML[i][j].value = sliderValue;
    }
  };

  z_plot.num_plots = 0;
  for (key in z) {
    let key_checked = document.getElementById("plot" + key).checked;
    z_plot[key] = key_checked;
    if (key_checked) {z_plot.num_plots++};
  };

  updatePlot1(true);
}

function fResetPlot(button) {
  initializePlotOptions();
  initializeFoodSelection();
  updateSelect();
}

function fResetSliders(button) {
  initializeSliders();
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
  food.plot = [[0,0],[1,0]];

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
    };
  };
  document.getElementById("sliderPanel").innerHTML = 'Sliders for: ' + food.names[food.select[0]][food.select[1]];
}

function updateRadio() {
//  $("#nav-content").removeClass("in");
  updateSelect();
}

function initializeSliders() {
  food.select = [0,0];

  for (i=0; i<sliders.numTypes; i++) {
    sliders.numVars[i] = sliders.vars[i].length;
    sliders.valuesHTML[i] = Array(sliders.numVars[i]);
    sliders.sliderHTML[i] = Array(sliders.numVars[i]);
  };

  for (i=0; i<sliders.numTypes; i++) {
    slidersHTML = '';
    for (j=0; j<sliders.numVars[i]; j++) {
      let sliderNamei = sliders.namesDisplay[i][j];
      let sliderVarNamei = sliders.vars[i][j];
      console.log(sliderVarNamei);
      slidersHTML +=
        '<div class="slidecontainer"> \
          <p>' + sliderNamei + ': <span id="value' + sliderVarNamei + '"></span></p> \
          <input type="range" \
          min="' + sliders.min[i][j] + '" max="' + sliders.max[i][j] + '" \
          step="' + sliders.step[i][j] + '" value="' +
          sliders.defaultValues[food.select[0]][food.select[1]][i][j] + '" \
          id="slider' + sliderVarNamei + '" data-slider-ticks="[0, 1, 2, 3, 4]" data-slider-ticks-snap-bounds="30" data-slider-ticks-labels=\'["$0", "$100", "$200", "$300", "$400"]\'/> \
        </div >';
    };
    document.getElementById("set" + sliders.typeNames[i]).innerHTML = slidersHTML;
    for (j=0; j<sliders.numVars[i]; j++) {
      sliders.valuesHTML[i][j] = document.getElementById("value"  + sliders.vars[i][j]);
      sliders.sliderHTML[i][j] = document.getElementById("slider" + sliders.vars[i][j]);
      sliders.valuesHTML[i][j].innerHTML = sliders.defaultValues[food.select[0]][food.select[1]][i][j];
      sliders.sliderHTML[i][j].oninput = (function(e) {
        return function() {
          let sliderValue = sliders.sliderHTML[e[0]][e[1]].value;
          console.log(e + ", " + sliderValue);
          sliders.valuesHTML[e[0]][e[1]].innerHTML = sliderValue;                // e is set to i
          sliders.currentValues[food.select[0]][food.select[1]][e[0]][e[1]] = sliderValue;
          if (sliders.sliderHTML[0][0].value == 0) {
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "None";
          }
          else if (sliders.sliderHTML[0][0].value <= 0.3) {
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "Low";
          }
          else if (sliders.sliderHTML[0][0].value > 0.3 && sliders.sliderHTML[0][0].value <= 0.7){
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "Medium";
          }
          else if (sliders.sliderHTML[0][0].value > 0.7 && sliders.sliderHTML[0][0].value <= 1){
            sliders.valuesHTML[0][0].innerHTML = sliders.sliderHTML[0][0].value + " " + "High";
          }

          evalSliders(food.select);                        // evaluate only the selected food
          updatePlot1(false);                              // false = don't evaluate all foods

        }
      })([i,j]);                                           // (i,j) is the argument, passed to (e)

    }
  };

}

function fClose() {
  console.log('Close');
  $('.collapse').collapse("hide");
};

function updatePlot1(updateResults) {
  if (updateResults) {
    for (i0=0; i0<food.numTypes; i0++) {                     // doesn't work if we use i,j
      for (j0=0; j0<food.numVars[i0]; j0++) {
        evalSliders([i0,j0]);
      }
    }
  };

  let panel = '';
  let boot_cols = 4;                                             // default number of Bootstrap columns
  let boot_col_tot = 0;                                          // counter for the number of columns used in a row
  if (food.plot.length>10) {                                     // food.plot is an array of foods to plot
    boot_cols = 12;                                              // if the array is large, make the plot full-width
  } else if (food.plot.length>6) {                               // otherwise, make it half-width
    boot_cols = 6;
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
    panel += '<div class="col-sm-' + boot_cols + '"><div style="padding-bottom: inherit" id="plot' + plotNum++ + '"></div></div>';
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
      if (key=='M_profit' || key=='price') {
        for (i=0; i<food.numTypes; i++) {
          for (j=0; j<food.numVars[i]; j++) {
            let profit = food.results[key][i][j];
            total_result += profit;
            xValue.push(food.names[i][j]);
            yValue.push(profit.toFixed(2));
          };
        };
        if (key=='M_profit') {plot_title = 'Profit = ' + total_result.toFixed(2) + ', (dashed line = average)'};
      } else {
        for (i=0; i<food.plot.length; i++) {                     // only plot the ones that were checked
          let ploti = food.plot[i];
          xValue.push(food.names[ploti[0]][ploti[1]]);
          yValue.push(food.results[key][ploti[0]][ploti[1]].toFixed(2));
        };
      };
      let trace0 = {
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
        },
        showlegend: false
      };
      let data = [trace0];
      if (key=='M_profit') {
        let trace_avg = {                                        // set up a line plot to show avg profit
          x: xValue,
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
        title: plot_title
      };
      Plotly.newPlot('plot' + plotNum, data, layout);
      plotNum++;
    }
  }
}

$(document).ready(function(){
  initializeSliders();
  initializePlotOptions();
  initializeFoodSelection();
  updatePlot1(true);                     // true = evaluate profit and other results for all foods

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
