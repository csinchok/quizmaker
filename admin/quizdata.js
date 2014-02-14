
function Quiz(data) {
    this.data = data;
    this.restart();
    return this;
}

Quiz.prototype.restart = function() {
    this.userAnswerResults = {};
    this.result = null;
}

Quiz.prototype.giveAnswer = function(questionId, answerId) {
    var question = this.data.questions[questionId];
    var answer = question.answers[answerId];
    this.userAnswerResults[questionId] = answer.results;
}

Quiz.prototype.determineResult = function() {
    // sum up all of the potential results
    var accumulator = {};
    for (var key in this.userAnswerResults) {
        var results = this.userAnswerResults[key];
        for (var i = 0; i < results.length; i++) {
            var resultId = results[i];
            if (!accumulator[resultId]) {
                accumulator[resultId] = 0;
            }
            accumulator[resultId] += 1;
        }
    }
    // find the one that occurred the most
    var topCount = 0;
    var topResultId = null;
    for (var resultId in accumulator) {
        var resultCount = accumulator[resultId];
        if (resultCount > topCount) {
            topResultId = resultId;
        }
    }
    this.result = this.data["results"][resultId];
    return this.result;
}


// Example:
var testData = {
    "results": {
        "resultId0": {
            "title": "You're a result",
            "description": "Some longer text about this result",
            "image": "http://something.something",
        },
        "resultId1": {
            "title": "Turns out you're a criminal.",
            "description": "Please lie face-down and wait for the police to arrive.",
            "image": "http://something.something",
        }
    },
    "questions": [
        {
            "question": "What's the deal with airline food?",
            "image": "http://foobar.com/foo.jpg",
            "answers": [
                {
                    "answer": "Peanuts.",
                    "results": [
                        "resultId0",
                    ]
                },
                {
                    "answer": "The answer is to steal and kill.",
                    "results": [
                        "resultId1",
                    ]
                }
            ]
        },
        {
            "question": "How many murders have you committed?",
            "image": "http://foobar.com/foo.jpg",
            "answers": [
                {
                    "answer": "Enough.",
                    "results": [
                        "resultId1",
                    ]
                },
                {
                    "answer": "What's a murder?",
                    "results": [
                        "resultId0",
                    ]
                }
            ]
        }
    ]
}

var q = new Quiz(testData);
q.giveAnswer(0, 1);
q.giveAnswer(1, 0);
q.determineResult();

