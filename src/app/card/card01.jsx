"use client";
import React, { useRef } from 'react';
import { useState } from 'react';
import Intelligent from '../intelligent/intel'; 
import Knowledge from '../knowledge/know'; 

export default function Card() {
    const [currentQuiz, setCurrentQuiz] = useState(null);
    let scroll = useRef(null); //use ref give refernce of DOM element, and can directly access DOM
//we have refernce of DOM (div) , we can directly scroll to div
    const handleKnowledgeClick = () => {
        setCurrentQuiz("knowledge");
        Scrollview();
    };

    const handleIntelligenceClick = () => {
        setCurrentQuiz("intelligent");
        Scrollview();
    };

    const Scrollview = () => {
        if (scroll.current) {
            setTimeout(() => {
                scroll.current.scrollIntoView({ behavior: 'smooth' });
            }, 0); 
        }
    };

    return (
        <>
            <h1 className="text-bg-success p-4 text-center">Online Quiz Application</h1>
            <div className="container">
                <div className="row justify-content-center" style={{ height: '100vh' }}>
                    <div className="col-6 col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="card" style={{ width: "13rem" }}>
                            <img src="https://miro.medium.com/v2/resize:fit:1000/1*FBRsnCP9wE84UVW1Kkv5Yw.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Intelligence Test</h5>
                                <p className="card-text">This quiz is designed to assess your intelligence in various subjects. Challenge yourself and see how much you are intelligent!</p>
                                <button className="btn btn-primary" onClick={handleIntelligenceClick}>Click Here  to Start</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="card" style={{ width: "13rem" }}>
                            <img src="https://miro.medium.com/v2/resize:fit:1000/1*FBRsnCP9wE84UVW1Kkv5Yw.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Knowledge Test</h5>
                                <p className="card-text">This quiz is designed to assess knowledge in various subjects. Challenge yourself and see how much you know!</p>
                                <button className="btn btn-primary" onClick={handleKnowledgeClick}>Click Here to Start</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div  ref = {scroll}>
                {currentQuiz === "knowledge" && (
                    <div className="alert alert-success text-center">
                        <h2>Welcome to the Knowledge Test</h2>
                        <hr />
                        <Knowledge /> 
                    </div>
                )}
                {currentQuiz === "intelligent" && (
                    <div className="alert alert-success text-center">
                        <h2>Welcome to the Intelligence Test</h2>
                        <hr />
                        <Intelligent />
                    </div>
                    )}
                    </div>
            </div>
        </>
    );
}
