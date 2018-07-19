  var myTable0 = document.getElementById("checkboxTable");
  var myTable  = myTable0.getElementsByTagName("td");
  var numNodes = myTable.length;
  var food = {
    names:  [["Bananas","Frozen Vegetables"],
             ["Fat Free Milk"],
             [],
             ["Whole Wheat Bread"],
             ["Low Sodium Canned Beans"]],
    numVars: [],
    results: Object.create(null),
    vars:    [],
    plot:    [[0,0],[1,0]],
    select:  [0,0],
    numTypes: 0
  };
  food.numTypes = food.names.length;

  var sliders = {
    defaultValues: [
                    [ [[0.5, 5,5,5],[5,5,5,5],[2,3,1,2]], [[0.6,10,5,5],[5,5,5,5],[2,3,1,2]] ],
                    [ [[0.6,10,5,5],[5,5,5,5],[2,3,1,2]] ],
                    [ [] ],
                    [ [[0.6,10,5,5],[5,5,5,5],[2,3,1,2]] ],
                    [ [[0.6,10,5,5],[5,5,5,5],[2,3,1,2]] ]
                   ],
    currentValues: [],
    typeNames:     ["Ordinance","Demand","Supply"],
    vars:         [["Enforcement","PromotionsOwners","PromotionsConsumers","MinimumStock"],
                   ["ConveniencePreparation","Taste","Affordability","Healthiness"],
                   ["InfrastructureCapacity","EaseDelivery","UnitCost","OptimalPrice"]],
    namesDisplay: [["Level of Enforcement","Promotions to Store Owners","Promotions to Consumers","Minimum Stock Required"],
                   ["Convenience of Preparation","Taste","Affordability","Healthiness"],
                   ["Infrastructure (storage) Capacity","Ease of Delivery","Unit Cost","Optimal Price on Hand"]],
    numVars:       [],
    valuesHTML:    [],
    slidersHTML:   [],
    numTypes:      0
  };
  sliders.currentValues = sliders.defaultValues;
  sliders.numTypes = sliders.vars.length;
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
  };

  document.getElementById("sliderPanel").innerHTML = 'Sliders for: ' + food.names[food.select[0]][food.select[1]];

  for (i=0; i<sliders.numTypes; i++) {
    for (j=0; j<sliders.numVars[i]; j++) {
      let sliderValue = sliders.currentValues[food.select[0]][food.select[1]][i][j];
      sliders.valuesHTML[i][j].innerHTML = sliderValue;
      sliders.sliderHTML[i][j].value = sliderValue;
    }
  };

  for (key in z) {
    z_plot[key] = document.getElementById("plot" + key).checked;
  };

  updatePlot1();
}

function fReset(button) {
  // document.getElementById("checkboxHt"     ).checked = false
  console.log('Reset');
  updateSelect();
}

function fClose() {
  console.log('Close');
  $('.collapse').collapse("hide");
};

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

function updatePlot1() {
  let plotNum = 0;
  for (key in z) {
    if (z_plot[key]) {
      let xValue = [];
      let yValue = [];
      for (i=0; i<food.plot.length; i++) {
        let ploti = food.plot[i];
        xValue.push(food.names[ploti[0]][ploti[1]]);
        yValue.push(food.results[key][ploti[0]][ploti[1]]);
      }
      let trace1 = {
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
      let data = [trace1];
      let layout = {
        title: key
      };
      Plotly.newPlot('plot' + plotNum, data, layout);
      plotNum = plotNum + 1;
    }
  }
}

$(document).ready(function(){
  for (i=0; i<sliders.numTypes; i++) {
    sliders.numVars[i] = sliders.vars[i].length;
    sliders.valuesHTML[i] = Array(sliders.numVars[i]);
    sliders.sliderHTML[i] = Array(sliders.numVars[i]);
  };

  for (key in z) {
    z_plot[key] = false;
  };
  z_plot["Y_demand"] = true;           // initialize

  let plotSelectionHTML = '';
  for (key in z) {
    let plotOption = '';
    if (z_plot[key]) {
      plotOption = 'checked="checked"';
    };
    food.results[key] = Array(food.numTypes);
    plotSelectionHTML = plotSelectionHTML + 
      '<div class="form-group"> \
        <input type="checkbox" id="plot' + key + '" autocomplete="off" onchange="updateSelect()" ' + plotOption + '/> \
        <div class="btn-group"> \
          <label for="plot' + key + '" class="btn btn-info"> \
            <span class="glyphicon glyphicon-ok"></span><span> </span> \
          </label> \
          <label for="plot' + key + '" class="btn btn-default active">' + key + '</label> \
        </div> \
      </div >';
  };
  document.getElementById("plotSelectionForm").innerHTML = plotSelectionHTML;

  for (i0=0; i0<food.numTypes; i0++) {
    food.numVars[i0] = food.names[i0].length;
    // food.results[i0] = Array(z_length);
    let food_n = food.numVars[i0];
    food.vars[i0]    = Array(food_n);
    zs[i0]           = Array(food_n);
    for (key in z) {
      food.results[key][i0] = Array(food_n);
    };
  };

  for (i=0; i<food.numTypes; i++) {
    for (j=0; j<food.numVars[i]; j++) {
      let foodNamei = food.names[i][j];
      let foodVarNamei = foodNamei.replace(/ /g,"");     // replace all " " with "" (remove blank spaces for variable names)
      food.vars[i][j] = foodVarNamei;
      let selectOption = '';
      let plotOption = '';
      for (k=0; k<food.plot.length; k++) {
        if (food.plot[k][0]==i && food.plot[k][1]==j) {
          plotOption = 'checked="checked"';
        }
      };
      if (food.select[0]==i && food.select[1]==j) {
        selectOption = 'checked="checked"';
      };
      myTable[food.numTypes*j + i].innerHTML =
        '<div class="form-group"> \
          <input type="checkbox" id="plot' + foodVarNamei + '" autocomplete="off" onchange="updateSelect()" ' + plotOption + '/> \
          <div class="btn-group"> \
            <label for="plot' + foodVarNamei + '" class="btn btn-info"> \
              <span class="glyphicon glyphicon-ok"></span><span> </span> \
            </label> \
            <label for="plot' + foodVarNamei + '" class="btn btn-default active">' + foodNamei + '</label> \
          </div> \
          <input type="radio" id="select' + foodVarNamei + '" name="choose" onchange="updateSelect()" ' + selectOption + '> \
        </div >';
    }
  }
  document.getElementById("sliderPanel").innerHTML = 'Sliders for: ' + food.names[food.select[0]][food.select[1]];

  for (i=0; i<sliders.numTypes; i++) {
    let mySliders0 = document.getElementById("set" + sliders.typeNames[i]);
    slidersHTML = '';
    for (j=0; j<sliders.numVars[i]; j++) {
      let sliderNamei = sliders.namesDisplay[i][j];
      let sliderVarNamei = sliders.vars[i][j];
      slidersHTML = slidersHTML +
        '<div class="slidecontainer"> \
          <p>' + sliderNamei + ': <span id="value' + sliderVarNamei + '"></span></p> \
          <input type="range" min="0" max="10" value="' + sliders.defaultValues[food.select[0]][food.select[1]][i][j] + '" id="slider' + sliderVarNamei + '"> \
        </div >';
    }
    mySliders0.innerHTML = slidersHTML;
    for (j=0; j<sliders.numVars[i]; j++) {
      sliders.valuesHTML[i][j] = document.getElementById("value"  + sliders.vars[i][j]);
      sliders.sliderHTML[i][j] = document.getElementById("slider" + sliders.vars[i][j]);
      sliders.valuesHTML[i][j].innerHTML = sliders.defaultValues[food.select[0]][food.select[1]][i][j];
      sliders.sliderHTML[i][j].oninput = (function(e) {
        return function() {
          let sliderValue = sliders.sliderHTML[e[0]][e[1]].value;
          console.log(e + ", " + sliderValue);
          sliders.valuesHTML[e[0]][e[1]].innerHTML = sliderValue;                // e is set to i USE ONCHANGE?
          sliders.currentValues[food.select[0]][food.select[1]][e[0]][e[1]] = sliderValue;
          // sliders.valuesHTML[e[0]][e[1]].innerHTML = this.value;                // e is set to i USE ONCHANGE?
          // sliders.currentValues[food.select[0]][food.select[1]][e[0]][e[1]] = this.value;
          evalSliders(food.select);                          // food.select is used later
          updatePlot1();
        }
      })([i,j]);                                           // (i,j) is the argument, passed to (e)
    }
  };

  for (i0=0; i0<food.numTypes; i0++) {                     // doesn't work if we use i,j
    for (j0=0; j0<food.numVars[i0]; j0++) {
      evalSliders([i0,j0]);
    }
  };

  updatePlot1();

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