// Course1.js: Conservation Course React Component
import React, { useState } from 'react';
import './1.css';
import { db } from './Firebase'; // Import Firebase
import { addDoc, collection } from 'firebase/firestore'; // Firestore methods

function ConservationCourse() {
    // State for topics, forum posts, and donations
    const [topics] = useState([
        {
            id: 1,
            title: "Introduction to Conservation",
            content: [
                "Biodiversity is essential for a balanced ecosystem, where each species plays a unique role in maintaining ecological stability. When biodiversity suffers, the environment and human life can be directly impacted. Conservation efforts aim to protect this balance by preserving various species and habitats.",
                "In this topic, you will learn about the significance of biodiversity and why conservation is vital to our survival. Understanding these ecological roles helps us appreciate the interconnectedness of all species, from the smallest insects to large mammals."
            ]
        },
        {
            id: 2,
            title: "Threats to Wildlife",
            content: [
                "Wildlife faces numerous threats, many of which are human-driven. Habitat loss due to urban expansion, deforestation, and agriculture reduces the natural environments where species thrive. Climate change also plays a significant role, altering ecosystems and making survival difficult for many species.",
                "Poaching and illegal wildlife trade are additional threats that push some species to the brink of extinction. Addressing these threats requires global cooperation and innovative solutions that protect wildlife while promoting sustainable development."
            ]
        },
        {
            id: 3,
            title: "Conservation Technologies",
            content: [
                "With advances in technology, conservation efforts have become more effective. Tools like GPS and GIS mapping are instrumental in tracking animal movements and habitats. Drones enable aerial monitoring, allowing for real-time surveillance of protected areas, which helps in identifying illegal activities like poaching.",
                "Artificial Intelligence (AI) has also revolutionized conservation by processing large datasets to predict poaching hotspots and understand animal behavior. This section covers these exciting technologies and how they help safeguard endangered species."
            ]
        },
        {
            id: 4,
            title: "Community Involvement in Conservation",
            content: [
                "Local communities are often the most valuable partners in conservation efforts. People living near protected areas have a unique perspective and can actively participate in reporting illegal activities or assisting in data collection. They also play a role in educating others and promoting sustainable practices.",
                "Programs that engage local communities in conservation have seen higher success rates. When communities are invested in preserving wildlife, they become stewards of the environment. This topic discusses how community involvement aids conservation and how individuals can make a difference."
            ]
        },
        {
            id: 5,
            title: "Case Studies in Conservation",
            content: [
                "Rwanda's Akagera National Park provides an excellent example of successful conservation. By combining technology and community involvement, Akagera has transformed from a heavily poached area to a thriving wildlife sanctuary. Drones and GPS tracking monitor wildlife while local community members contribute to anti-poaching efforts.",
                "This topic highlights various case studies like Akagera, showcasing the positive impact of well-managed conservation programs. Such stories inspire further efforts and demonstrate that with the right approach, endangered species can make a comeback."
            ]
        }
    ]);

    // Quiz state
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState({});
    const [retry, setRetry] = useState(false);

    // Quiz Questions
    const questions = [
        {
            id: 1,
            question: "What is biodiversity's main significance?",
            options: [
                "It stabilizes ecosystems.",
                "It prevents human activities.",
                "It promotes urbanization.",
                "It limits wildlife migration."
            ],
            correct: 0,
        },
        {
            id: 2,
            question: "What is the primary cause of habitat loss?",
            options: [
                "Deforestation",
                "Natural disasters",
                "Conservation efforts",
                "Overpopulation of species"
            ],
            correct: 0,
        },
        {
            id: 3,
            question: "Which technology aids in wildlife tracking?",
            options: [
                "Artificial Intelligence",
                "Drones",
                "GPS",
                "All of the above"
            ],
            correct: 3,
        },
        {
            id: 4,
            question: "Who plays a crucial role in community conservation?",
            options: [
                "Local communities",
                "Tourists",
                "Scientists only",
                "Government officials only"
            ],
            correct: 0,
        },
        {
            id: 5,
            question: "What transformed Akagera National Park?",
            options: [
                "Community involvement",
                "Technology",
                "Anti-poaching efforts",
                "All of the above"
            ],
            correct: 3,
        }
    ];

    // Handle answer selection
    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
    };

    // Submit Quiz
    const handleSubmitQuiz = async () => {
        let calculatedScore = 0;

        questions.forEach((q) => {
            if (answers[q.id] === q.correct) {
                calculatedScore += 20; // Each question is worth 20%
            }
        });

        setScore(calculatedScore);
        setQuizSubmitted(true);

        try {
            // Save the score to Firebase
            await addDoc(collection(db, "quiz_scores"), { score: calculatedScore, timestamp: new Date() });
            console.log("Score saved to Firebase!");
        } catch (error) {
            console.error("Error saving score:", error.message);
        }

        // Handle pass/fail
        if (calculatedScore >= 80) {
            alert(`Congratulations! You passed with a score of ${calculatedScore}%.`);
        } else {
            alert(`You scored ${calculatedScore}%. You need at least 80% to pass. Please repeat the course.`);
            setRetry(true); // Enable retry option
        }
    };

    // Retry Quiz
    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setQuizSubmitted(false);
        setRetry(false);

        // Optionally scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="conservation-course">
            <h1 style={{ color: 'black' }}>Conservation Course</h1>
{/* YouTube Video Link Section */}
<section className="youtube-link-section">
                <div className="youtube-link-card" onClick={() => window.open('https://www.youtube.com/watch?v=qKgRbkCkRFY', '_blank')}>
                    <img src="/kwita-izina.jpg" alt="Watch Conservation Video" className="youtube-thumbnail" />
                    <div className="overlay">
                        <span className="play-button">&#9658;</span>
                        <p>Watch Conservation Video on YouTube</p>
                    </div>
                </div>
            </section>
            {/* Course Topics Section */}
            <section className="topics-section">
                <h2>Course Topics</h2>
                {topics.map(topic => (
                    <div key={topic.id} className="topic">
                        <h3>{topic.title}</h3>
                        {topic.content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                ))}
            </section>

            {/* Quiz Section */}
            <section className="quiz-section">
                <h2>Course Quiz</h2>
                {!quizSubmitted || retry ? (
                    <form className="quiz-form" onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(); }}>
                        {questions.map((q) => (
                            <div key={q.id} className="quiz-question">
                                <p>{q.question}</p>
                                <div className="quiz-options">
                                    {q.options.map((option, index) => (
                                        <label className="quiz-option" key={index}>
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                value={index}
                                                onChange={() => handleAnswerChange(q.id, index)}
                                                style={{ display: "none" }}
                                            />
                                            <div className={`option-box ${answers[q.id] === index ? "selected" : ""}`}>
                                                {String.fromCharCode(97 + index)}
                                            </div>
                                            <div className="option-text">{option}</div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button className="submit-quiz" type="submit">Submit Quiz</button>
                    </form>
                ) : (
                    <div className="quiz-result">
                        <p>Your Score: {score}%</p>
                        {retry && (
                            <button onClick={handleRetry} className="retry-quiz">
                                Retry Quiz
                            </button>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

export default ConservationCourse;
