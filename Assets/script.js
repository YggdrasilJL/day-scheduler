// removed all comments to try to figure this out by adding my own comments
let textArea = $('.description')
// this makes sure that none of this code is executed until the document
// (HTML) loads so theres no conflicts
$(document).ready(function() {

  $(function () {
    // this saves the text inside textarea when the user clicks on the
    // blue button (saveBtn class)
    let saveBtn = $('.saveBtn');
    saveBtn.on('click', function() {
      let userInput = $(this).siblings('.description').val();
      let timeBlockId = $(this).parent().attr('id');
      localStorage.setItem(timeBlockId, userInput);
    });
    
    // this keydown function makes it so when the user presses the down arrow
    // it will go to the next text box and save the user input to localStorage
    $(textArea).keydown(function(event) {
      if (event.key === 'ArrowDown'){
    // prevents the default action when the down arrow is being pressed
      event.preventDefault()
      let userInput = $(this).val();
    // gets the textArea's parent id 
      let timeBlockId = $(this).parent().attr('id');
    // sets the time block and user input into the localStorage
      localStorage.setItem(timeBlockId, userInput);
      let currentIndex = $(textArea).index(this)
      let nextTextArea = $(textArea).eq(currentIndex + 1)
      nextTextArea.focus()
    // this checks if there is no next textArea and if there isn't, it selects
    // the first textArea index and then focus's on it, creating a nice user friendly experience
       if (nextTextArea.length === 0) {
        let firstTextArea = $(textArea).eq(0)
        firstTextArea.focus()
       } 
    } else if (event.key === 'ArrowUp'){
      event.preventDefault()
      let userInput = $(this).val();
      let timeBlockId = $(this).parent().attr('id');
      localStorage.setItem(timeBlockId, userInput);
      let currentIndex = $(textArea).index(this)
      let prevTextArea = $(textArea).eq(currentIndex - 1)
      prevTextArea.focus()
    } if (event.key === 'Enter'){
      event.preventDefault()
    }});

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

    // display's the current date in the header
    let currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  });
});