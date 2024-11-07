// Course1.js: Conservation Course React Component
import React, { useState } from 'react';
import './1.css';

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

    return (
        <div className="conservation-course">
            <h1>Conservation Course</h1>

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
        </div>
    );
}

export default ConservationCourse;
