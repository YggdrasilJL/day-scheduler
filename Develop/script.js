// removed all comments to try to figure this out by adding my own comments

// this makes sure that none of this code is executed until the document (HTML) loads so theres no conflicts
$(document).ready(function() {
  $(function () {
    let saveBtn = $('.saveBtn');
    // this saves the text inside textarea, 
    saveBtn.on('click', function() {
      let userInput = $(this).siblings('.description').val();
      let timeBlockId = $(this).parent().attr('id');
      localStorage.setItem(timeBlockId, userInput);
    });

    
    $('.time-block').each(function() {
      let timeBlockId = $(this).attr('id');
      let timeBlockHour = parseInt(timeBlockId.split('-')[1]);
      let currentHour = dayjs().hour();
      
      if (timeBlockHour < currentHour) {
        $(this).addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });

   
    $('.time-block').each(function() {
      let timeBlockId = $(this).attr('id');
      let userInput = localStorage.getItem(timeBlockId);
      $(this).find('.description').val(userInput);
    });

    // Display the current date in the header
    let currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  });
});