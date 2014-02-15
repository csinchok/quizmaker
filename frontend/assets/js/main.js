var quiz = $("#quiz"),
	q = quiz.find("li:not(.goBack)"), // questions
	a = q.find("dd"), // answers
	gB = quiz.find(".goBack a"); // go back

gB.each(function(index){
	$(this).click( function(e){
		var $this = $(this),
			p = $(this).parent(); // get goBack parent question
		e.preventDefault();
		console.log('you clicked "go back"');
	});
});

a.each(function(index){
	$(this).click( function(){
		var $this = $(this),
			a = $this.parent().find("dd"); // get other answers
		console.log(a); // show answers in console for now
	});
});