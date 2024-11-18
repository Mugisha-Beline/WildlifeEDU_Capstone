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

    const [forumPosts, setForumPosts] = useState([]);
    const [totalDonations, setTotalDonations] = useState(0);
    const [donationAmount, setDonationAmount] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    // State for quiz
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

    // Handle adding a new post to the forum
    const addPost = () => {
        if (username && message) {
            const newPost = { username, message, timestamp: new Date().toLocaleString() };
            setForumPosts([...forumPosts, newPost]);
            setMessage(""); // Clear message field
        } else {
            alert("Please enter both a username and message.");
        }
    };

    // Handle donation
    const handleDonation = () => {
        const amount = parseFloat(donationAmount);
        if (amount > 0) {
            setTotalDonations(totalDonations + amount);
            alert(`Thank you for your donation of $${amount}!`);
            setDonationAmount(""); // Clear donation field
        } else {
            alert("Please enter a valid donation amount.");
        }
    };

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

        if (calculatedScore >= 80) {
            alert(`Congratulations! You passed with a score of ${calculatedScore}%.`);
            try {
                await addDoc(collection(db, "quiz_scores"), { score: calculatedScore, timestamp: new Date() });
                console.log("Score saved to Firebase!");
            } catch (error) {
                console.error("Error saving score:", error.message);
            }
        } else {
            alert(`You scored ${calculatedScore}%. You need at least 80% to pass. Try again!`);
            setRetry(true);
        }
    };

    // Retry Quiz
    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setQuizSubmitted(false);
        setRetry(false);
    };

    return (
        <div className="conservation-course">
            <h1 style={{ color: 'black' }}>Conservation Course</h1>

            {/* YouTube Link Section */}
            <section className="youtube-link-section" onClick={() => window.open('https://www.youtube.com/watch?v=qKgRbkCkRFY', '_blank')}>
                <div className="youtube-link-card">
                    <img src="background.jpg" alt="Watch Conservation Video" className="youtube-thumbnail" />
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
                    <form onSubmit={(e) => e.preventDefault()}>
                        {questions.map((q) => (
                            <div key={q.id} className="quiz-question">
                                <p>{q.question}</p>
                                {q.options.map((option, index) => (
                                    <label key={index} className="quiz-option">
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            value={index}
                                            checked={answers[q.id] === index}
                                            onChange={() => handleAnswerChange(q.id, index)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ))}
                        <button onClick={handleSubmitQuiz} className="submit-quiz">
                            Submit Quiz
                        </button>
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

            {/* Community Forum Section */}
            <section className="forum-section">
                <h2>Community Forum</h2>
                <div className="forum-input">
                    <input
                        type="text"
                        placeholder="Your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={addPost}>Post</button>
                </div>
                <div className="forum-posts">
                    {forumPosts.map((post, index) => (
                        <div key={index} className="forum-post">
                            <p><strong>{post.username}</strong> ({post.timestamp})</p>
                            <p>{post.message}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Donation Section */}
            <section className="donation-section">
                <h2>Support Conservation Efforts</h2>
                <p>Total Donations: ${totalDonations.toFixed(2)}</p>
                <input
                    type="number"
                    placeholder="Donation Amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button onClick={handleDonation}>Donate</button>
            </section>
        </div>
    );
}

export default ConservationCourse;
