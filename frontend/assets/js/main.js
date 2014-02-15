var quiz = 	$('#quiz'),
	q = 	quiz.find('.question'), // questions
	a = 	q.find('.answer'), // answers
	gB = 	quiz.find('.goBack a'); // go back

// Go back button
gB.each(function(index){
	$(this).click( function(e){

		var $this = 	$(this),
			p = 		$(this).parents('.question'), // goBack parent question
			lQ = 		p.prev('.question');

		e.preventDefault();
		console.log(lQ);

		if ( lQ.length ){
			p.hide();
			lQ.show();
		} else {
			console.log('you clicked \'go back\'');
		}
	});
});

// On answer click
a.each(function(index){
	$(this).click( function(){

		var $this = 	$(this),
			p = 		$this.parents('.question'), // parent question
			a = 		p.find('.answer'), // other answers
			nQ = 		p.next('.question');
		
		console.log($this); // log answer in console

		if ( nQ.length ){
			p.hide();
			nQ.show(); // hide question and show next

			// Collect and save each result here

		} else {
			p.hide();
			$('#result').show();

			// Fill the result here.
		}

	});
});