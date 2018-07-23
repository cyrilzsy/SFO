var scrollTime = 250;
var tourWidth = 240;

var tour = {
  id: "beginTour",
  steps: [
    {
      title: "Main menu",
      content: "Select <b>Info</b>, <b>Help</b>, and <b>Acknowledgements</b> for basic information about this app.  \
      Select <b>Send Feedback</b> to submit any comments to the app authors.  \
      <b>Tour</b> will restart this tour. \
      (To quick the tour at any time, click on x in upper right of this bubble.)",
      target: "hamburger_menu",
      placement: "right",
      xOffset: 50,
      width: tourWidth - 10,
      delay: 30
    },
    {
      title: "Bottom menu",
      content: "These buttons will open submenus for <b>Staple Food Selection</b> showing each food and \
      <b>Plot Selection</b> to choose which results to plot. \
      Two <b>Reset</b> buttons will set all selections to default values.  \
      The 'x' on the far right will close any open submenus.",
      target: "Food_button",
      placement: "top",
      showPrevButton: true,
      width: tourWidth,
      delay: scrollTime,
      onNext: function() {
        $("#nav-content").addClass("in");
      }
    },
    {
      title: "SFO Selection",
      content: "Click on <b>Staple Food Selection</b> button in the bottom bar. \
                Choose the food you want to simulate by click the <b>blue box</b> on the top or the left of each food (Muilt-selection allowed). \
                Choose the food you want to change the characteristics in the <b>radio button</b> on the right of the food (one food each time). \
                Click the <b>Staple Food Selection</b> button again or click on the <b>x</b> button on the top right of the bar to retract the selection window.",
      target: "First_Food_Selection",
      placement: "top",
      showPrevButton: true,
      xOffset: 50,
      yOffset: -40,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime,
      onNext: function() {
        $("#nav-content").removeClass("in");
        $("#nav-content-1").addClass("in");
      }
    },
    {
      title: "Plot Selection",
      content: "Click on <b>Plot Selection</b> button to show the availible plots for the result. \
                Choose the results that you are interested in by click the <b>blue box</b> on the left of each variable. \
                Click the <b>Plot Selection</b> button again or click on the <b>x</b> button on the top right of the bar to retract the selection window.",
      target: "Plot_button",
      placement: "top",
      showPrevButton: true,
      xOffset: 50,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime,
      onNext: function () {
        $("#nav-content-1").removeClass("in");
      }
    },
    {
      title: "Upper menu",
      content: "Use the <b>Sliders</b> in the Upper menu to change the characteristic of each food. \
                You will see changes in the <b>Result</b> area directly",
      target: "sPanel",
      placement: "right",
      showPrevButton: true,
      xOffset: -100,
      yOffset: -60,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime
    },
    {
      title: "Results",
      content: "The simulation results will display in this area. See <b>Help</b> menu for detail descriptions for the Graphs",
      target: "panelPlots",
      placement: "right",
      showPrevButton: true,
      xOffset: -1200,
      yOffset: -20,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime,
      onNext: function() {
        document.getElementById("menuDropdown").className = "dropdown open";

      }
    },
    {
      title: "Feedback",
      content: "We would appreciate it if you filled out our survey after you have used this app.",
      target: "surveyMenu",
      width: Math.round(tourWidth*0.75),
      xOffset: -10,
      yOffset: -20,
      placement: "right",
      delay: 30
    }
  ]
};

hopscotchTour();   // Start the tour

function hopscotchTour() {
  document.getElementById("menuDropdown").className = "dropdown open";
  hopscotch.startTour(tour);
}
