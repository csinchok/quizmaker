// QuizMaker

function QuizMaker() {
    this.questions = []; // questions are ordered
    this.results = {};
}

QuizMaker.prototype.addResult = function(id, title, description, image) {
    var result = {
        "id": id,
        "title": title,
        "description": description,
        "image": image
    };
    this.results[id] = result;
}

QuizMaker.prototype.addQuestion = function(text, image) {
    var question = {
        "question": text,
        "image": image,
        "answers": []
    };
    var qid = this.questions.length;
    this.questions.push(question);
    return qid;
}

QuizMaker.prototype.addAnswer = function(questionId, text, results) {
    var answer = {
        "answer": text,
        "results": results
    }
    this.questions[questionId].answers.push(answer);
}

QuizMaker.prototype.getData = function() {
    // output data suitable for QuizTaker
    return {
        "results": this.results,
        "questions": this.questions
    }
}

// QuizTaker

function QuizTaker(data) {
    this.data = data;
    this.restart();
    return this;
}

QuizTaker.prototype.restart = function() {
    this.userAnswerResults = {};
    this.result = null;
}

QuizTaker.prototype.giveAnswer = function(questionId, answerId) {
    // accumulate the potential results of this answer
    var question = this.data.questions[questionId];
    var answer = question.answers[answerId];
    this.userAnswerResults[questionId] = answer.results;
}

QuizTaker.prototype.determineResult = function() {
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

// Example

var qm = new QuizMaker();
qm.addResult("normal", "You are sorta normal!", "Yep, normal.", "http://someimage.jpg");
qm.addResult("murderer", "You're a murderer!", "Please lie face-down and wait for the police to arrive.", "http://someimage.jpg");

var qid = qm.addQuestion("What's the deal with airline food?", "someimage.jpg");
qm.addAnswer(qid, "Peanuts", ["normal"]);
qm.addAnswer(qid, "Theft and murder is the only answer", ["murderer"]);

qid = qm.addQuestion("How many murders have you committed?", "someimage.jpg");
qm.addAnswer(qid, "Enough.", ["murderer"]);
qm.addAnswer(qid, "What's a murder?", ["murderer"]);
qm.addAnswer(qid, "Murder is not ok.", ["normal"]);

var qt = new QuizTaker(qm.getData());
qt.giveAnswer(0, 1);
qt.giveAnswer(1, 0);
qt.determineResult();

// Example data
// var testData = {
//     "results": {
//         "resultId0": {
//             "title": "You're a result",
//             "description": "Some longer text about this result",
//             "image": "http://something.something",
//         },
//         "resultId1": {
//             "title": "Turns out you're a criminal.",
//             "description": "Please lie face-down and wait for the police to arrive.",
//             "image": "http://something.something",
//         }
//     },
//     "questions": [
//         {
//             "question": "What's the deal with airline food?",
//             "image": "http://foobar.com/foo.jpg",
//             "answers": [
//                 {
//                     "answer": "Peanuts.",
//                     "results": [
//                         "resultId0",
//                     ]
//                 },
//                 {
//                     "answer": "The answer is to steal and kill.",
//                     "results": [
//                         "resultId1",
//                     ]
//                 }
//             ]
//         },
//         {
//             "question": "How many murders have you committed?",
//             "image": "http://foobar.com/foo.jpg",
//             "answers": [
//                 {
//                     "answer": "Enough.",
//                     "results": [
//                         "resultId1",
//                     ]
//                 },
//                 {
//                     "answer": "What's a murder?",
//                     "results": [
//                         "resultId0",
//                     ]
//                 }
//             ]
//         }
//     ]
// }