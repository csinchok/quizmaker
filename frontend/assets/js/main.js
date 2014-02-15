var quiz = 	$('#quiz'),
	q = 	quiz.find('li:not(.goBack)'), // questions
	a = 	q.find('dd'), // answers
	gB = 	quiz.find('.goBack a'); // go back

// Go back button
gB.each(function(index){
	$(this).click( function(e){

		var $this = 	$(this),
			p = 		$(this).parent(); // goBack parent question

		e.preventDefault();
		console.log('you clicked \'go back\'');

	});
});

// On answer click
a.each(function(index){
	$(this).click( function(){

		var $this = 	$(this),
			p = 		$this.parents('li'), // parent question
			a = 		p.find('dd'); // other answers
		
		console.log($this); // log answer in console

		if ( p.next("li").length ){
			p.hide().next('li').show(); // hide question and show next
		} else {
			console.log("that was the last question") // indicate if last question
		}

	});
});