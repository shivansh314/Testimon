import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [sentimentResults, setSentimentResults] = useState([]);

  const reviews = [
    "nice product",
    "can be better",
    "The product has revolutionized how we approach our daily operations. The attention to detail and user-friendly design are unparalleled. A must-have for anyone looking to optimize efficiency.",
    "While the core functionality is excellent, I was most impressed by the customer service. They went above and beyond to resolve an issue I faced. Great experience!",
    "The integration capabilities of this product are superb. It seamlessly connects with our existing tools, saving us hours each week. Well done",
    "The analytics features provided insights we never knew we needed. This has helped our decision-making process immensely. Worth every penny.",
    "\"An excellent product with a focus on sustainability. Knowing that our purchase supports eco-friendly practices is a big plus for our company.\"",
    "The product did not live up to the hype. Several features are either broken or not user-friendly. Disappointing experience overall.",
    "Extremely slow and laggy. We spent more time troubleshooting than actually using the product. Not worth the investment.",
    "The lack of proper documentation made setup a nightmare. Had to hire an external consultant just to get it running. Wouldn’t recommend",
    "The product promises a lot but delivers very little. Customer support was unresponsive when we tried to get help.",
    "We encountered constant bugs that made the product unusable. A complete waste of time and resources",
    "The product does what it claims, but nothing more. It’s functional but lacks any standout features.",
    "Decent product for the price, but there are better alternatives in the market. It’s a middle-of-the-road option.",
    "The product is okay, but I wouldn’t recommend it for larger teams. It seems better suited for smaller setups",
    "It worked as advertised, but the design feels outdated. It’s functional but not visually appealing",
    "No major complaints, but nothing to rave about either. It gets the job done.",
    "This product has been a game-changer for our team! The seamless workflow and robust features have significantly improved our efficiency. Highly recommended.",
    "Unfortunately, this product didn’t meet our expectations. The frequent crashes and lack of updates made it difficult to rely on for critical tasks.",
    "It’s an average product. While it does what it promises, it lacks innovation or features that would make it stand out in a competitive market.\n\n",
    "GOOD",
    "Amazing product"
  ]

  useEffect(() => {
    const handleAnalyze = async () => {
      try {
        const reviewArray = reviews.map((review) => ({ review }));
        const response = await axios.post("http://127.0.0.1:5000/sentiment", reviewArray);
        const results = response.data.sentiment_results;

        setSentimentResults(results);
        
      } catch (error) {
        console.error("Error analyzing sentiment:", error);
      }
    };

    handleAnalyze();
    console.log(sentimentResults);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sentiment Analysis Dashboard</h1>
    </div>
  );
};

export default Dashboard;
