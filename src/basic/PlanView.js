
fcViews.plan = PlanView;

function PlanView(element, calendar) {
  var t = this;
  
  // exports
  t.render = render;
  
  
  // imports
  BasicView.call(t, element, calendar, 'plan');
  var opt = t.opt;
  var renderBasic = t.renderBasic;
  var skipHiddenDays = t.skipHiddenDays;
  var getCellsPerWeek = t.getCellsPerWeek;
  var formatDate = calendar.formatDate;
  
  
  function render(date, delta) {

    if (delta) {
      addMonths(date, delta);
    }

    var firstDay = opt('firstDay');

    var weeksOffset = opt('weeksOffset');

    var start = addDays(cloneDate(date, true), - weeksOffset * 7);

    var end = addDays(cloneDate(date), weeksOffset * 7);

    var visStart = cloneDate(start);
    addDays(visStart, -((visStart.getDay() - firstDay + 7) % 7));
    skipHiddenDays(visStart);

    var visEnd = cloneDate(end);
    addDays(visEnd, (7 - visEnd.getDay() + firstDay) % 7);
    skipHiddenDays(visEnd, -1, true);

    var colCnt = getCellsPerWeek();
    var rowCnt = Math.round(dayDiff(visEnd, visStart) / 7); // should be no need for Math.round

    t.title = formatDate(start, opt('titleFormat'));

    t.start = visStart;
    t.end = visEnd;
    t.visStart = visStart;
    t.visEnd = visEnd;

    renderBasic(rowCnt, colCnt, true);
  } 
}