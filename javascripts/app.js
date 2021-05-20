//Calculates Totals
function calculate() {
  //Snowballed Amounts
  var snowBallAmount = parseInt($('.snowBallAmount input').val());
  $('.snowballed span').each(function(){
    var payment = $(this).parent().prev().find('span').text(),
        prevSnowball = $(this).parent().parent().prev().find('.snowballed span').text(),
        snowBalled = parseInt(payment) + parseInt(prevSnowball);
    if (!$(this).parent().parent().prev().length) {
      $(this).text(parseInt(payment) + snowBallAmount);
    } else {
      $(this).text(snowBalled);
    }
  });
  //Months/Days Needed to Pay off each
  $('.months').each(function(){
    var monthsAvg = 30.41666, //365 days/ year divided by 12 months/ year
        monthsInYear = 12,
        owed = $(this).parent().parent().find('.owed span').text(),
        interest = $(this).parent().parent().find('.interest span').text(),
        payments = $(this).parent().parent().find('.payment span').text(),
        snowballed = $(this).parent().parent().find('.snowballed span').text(),
        interestYear = (interest / 100) / 12,
        interestPercent = Math.floor(owed * interestYear),
        months = Math.floor((parseInt(owed) + parseInt(interestPercent)) / snowballed) || 0,
        days = Math.floor(((months / monthsAvg) * monthsInYear)),
        totalPaid = Math.floor(((parseInt(months) * parseInt(interestPercent))) + parseInt(owed));
    if (payments === 0) {
      $(this).text('0');
      $(this).parent().find('.days').text('0');
    } else {
      $(this).text(months+'m');
      $(this).parent().find('.days').text(days+'d');
    }
    $(this).parent().parent().find('.totalPaid span').text(totalPaid);
  });
  //Total Months/Days Needed to Pay off each
  $('.totalMonths').each(function(){
    var prevMonths = $(this).parent().parent().prev().find('.totalMonths').text() || 0,
        currMonths = $(this).parent().prev().find('.months').text(),
        totalMonths = parseInt(prevMonths) + parseInt(currMonths),
        prevDays = $(this).parent().parent().prev().find('.totalDays').text(),
        currDays = $(this).parent().prev().find('.days').text(),
        totalDays = parseInt(prevDays) + parseInt(currDays) || 0;
    if (totalMonths === 0) {
      $(this).text('0');
      $(this).parent().find('.totalDays').text('0');
    } else {
      $(this).text(totalMonths);
      $(this).parent().find('.totalDays').text(totalDays);
    }
  });
  //Total Months to Pay Debt
  var finalTotalMonths = $('.snowBall tr:last-child .totalMonths').text(),
      finalTotalDays = $('.snowBall tr:last-child .totalDays').text(),
      finalTotalYears = (finalTotalMonths / 12).toFixed(2);
  $('.totalm').text(finalTotalMonths+' Months');
  $('.totald').text(finalTotalDays+' Days');
  $('.totaly').text(finalTotalYears+' Years');
}

//Executes first Calculation
calculate();

//Enter in new SnowBall amount then Calculate for new SnowBalled amount
$('.snowBallAmount input').keyup(function() {
  //Checks to make sure it's a number entered
  var v = this.value.replace(/,/g,'');
  if ($.isNumeric(v) === false) {
    this.value = this.value.slice(0,-1);
  } else {
    calculate();
    totalDebt();
  }
});

//If it's blank set snowball back to original
$('.snowBallAmount input').blur(function(){
  if (!$(this).val().length) {
    $(this).val('500');
  }
  calculate();
});

//Totals all your Debt
function totalDebt() {
  var sum = 0;
  $('.owed span').each(function() {
    sum += parseInt($(this).text());
  });
  $('.totalDebtOwed').text('$'+sum);
  var sum2 = 0;
  $('.totalPaid span').each(function() {
    sum2 += parseInt($(this).text());
  });
  $('.totalDebtPaid').text('$'+sum2);
}
totalDebt();