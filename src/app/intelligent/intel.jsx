"use client";
import questions from "@/dataapp/dataapp";
import { useState } from "react";
import { useRef } from "react";

export default function Intelligent() {
    const [index, setIndex] = useState(0);  
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null)); //Array is an contructer with .fill()method  
    const [ans, setAns] = useState(""); 
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [score, setScore] = useState(0); 
    let scroll = useRef(null);

    const nextQuestion = () => {
       
        if (selectedAnswers[index] === questions[index].correctanswer) {
            setScore((prevScore) => prevScore + 1);  
        }

        setIndex((prevIndex) => (prevIndex + 1 <= questions.length ? prevIndex + 1 : prevIndex));
        setAns("");  
        setCorrectAnswer(""); 
    };

    const prevQuestion = () => {
        setIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex));

    };

    const Scrollview = () => {
        if (scroll.current) {
            setTimeout(() => {
                scroll.current.scrollIntoView({ behavior: 'smooth' });
            }, 0); 
        }
    };

    const Finish = () => {
        return (
            <>
                <h1 className="text-center">You have completed the quiz!</h1>
                <h2 className="text-success">Your Score out of {questions.length} Questions: {score}</h2>
                <h2 className="text-success">Each Question have 1 Mark</h2>  
                <button onClick={() => {
                    setIndex(0);
                    setScore(0);  
                    setSelectedAnswers(Array(questions.length).fill(null));
                    Scrollview();  
                }} style={{color: "green"}}>
                    Try Again
                </button>
            </>
        );
    };
    if (index >= questions.length) {
        return <>{Finish()}</>;
    }
    function correctans(key) {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = key;  // Error: Cannot Directly Update the State, Used Another Array
        setSelectedAnswers(updatedAnswers);   
        if (key === questions[index].correctanswer) {
            setAns("Your answer is Correct");
            setCorrectAnswer(questions[index].correctanswer);
        } else {
            setAns("Your answer is Incorrect");
            setCorrectAnswer(questions[index].correctanswer);  // Stored in Else (in case of incorrect answer)
        }
        Scrollview();
    }
    const question = questions[index];  
    return (
        <>
            <div className="container mt-4">
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{`Question ${question.number}: ${question.statement}`}</h5>
                        <div className="form-group">
                            {Object.entries(question.options).map(([key, value]) => (
                                <div className="form-check" key={key}>
                                    <label
                                        className={`form-check-label ${selectedAnswers[index] === key ? 'selected' : ''}`}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = 'lightgreen')}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = '')}
                                        onClick={() => correctans(key)}
                                        style={{
                                            backgroundColor: selectedAnswers[index] === key ? 'lightblue' : 'transparent',
                                            color: key === correctAnswer ? 'red' : 'black',
                                        }}>
                                        {`${key}: ${value}`}                                        
                                        {key == correctAnswer && (
                                            <span style={{ color: 'red', marginLeft: '5px' }}>✔️</span>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div ref = {scroll}>
                        <h1>{ans}</h1>
                        {correctAnswer && (
                            <h2 style={{ color: 'red' }}>
                                Correct Answer: {correctAnswer}
                            </h2>)}
                            </div>
                        <hr />
                        <button className="btn btn-primary mx-6" onClick={prevQuestion}>Previous</button>
                        <button className="btn btn-primary" disabled = {selectedAnswers[index] === null} onClick={nextQuestion}>Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
