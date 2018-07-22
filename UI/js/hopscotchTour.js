var scrollTime = 250;
var tourWidth = 240;

var tour = {
  id: "beginTour",
  steps: [
    {
      title: "Main menu",
      content: "Select <b>Info</b>, <b>Help</b>, and <b>Acknowledgements</b> for basic information about this app.  \
      Select <b>Survey</b> to submit any comments to the app authors.  \
      <b>Admin</b> is for app administrators. \
      <b>Tour</b> will restart this tour. \
      (To quick the tour at any time, click on x in upper right of this bubble.)",
      target: "hamburger_menu",
      placement: "right",
      xOffset: 50,
      width: tourWidth - 10,
      delay: 30,
    },
    {
      title: "Bottom menu",
      content: "These buttons will open submenus for <b>Staple Food Selection</b> showing each food and \
      <b>Plot Selection</b> to choose which results to plot. \
      <b>Reset</b> will set all selections to default values.  \
      The 'x' on the far right will close any open submenus.",
      target: "Food_button",
      placement: "top",
      showPrevButton: true,
      width: tourWidth,
      delay: scrollTime,
      onNext: function() {
        $("#nav-content").addClass("in");
      },
    },
    {
      title: "SFO Selection",
      content: "...say something about the Milk checkbox and radio button...",
      target: "First_Food_Selection",
      placement: "top",
      showPrevButton: true,
      xOffset: 50,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime,
      onNext: function() {
        $("#nav-content").removeClass("in");
        $("#nav-content-1").addClass("in");
      },
    },
    {
      title: "Plot Selection",
      content: "...",
      target: "Plot_button",
      placement: "top",
      showPrevButton: true,
      xOffset: 50,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime,
      onNext: function() {
        document.getElementById("menuDropdown").className = "dropdown open";
        $("#nav-content-1").removeClass("in");
      },
    },
    {
      title: "Survey",
      content: "We would appreciate it if you filled out our survey after you have used this app.",
      target: "surveyMenu",
      width: Math.round(tourWidth*0.75),
      xOffset: -100,
      placement: "right",
      delay: 30,
    },
  ],
};

hopscotchTour();   // Start the tour

function hopscotchTour() {
  document.getElementById("menuDropdown").className = "dropdown open";
  hopscotch.startTour(tour);
}