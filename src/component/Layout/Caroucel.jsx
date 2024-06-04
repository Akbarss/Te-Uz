import ArrowBackIosIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const defaultCardStyles = {
  margin: "8px",
  borderRadius: "15px",
  width: "100%", // Width set to 100%
  height: "auto", // Height set to 90vh
  position: "relative", // Position relative for containing the buttons
  maxWidth: "lg",
};

const styles = {
  cardCarousel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: "100%",
  },
  buttonStyles: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: "1", // Ensure buttons are on top of the image
  },
};

const CardCarousel = ({ cards, title, maxCardsToShow }) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextCard = () => {
    const nextIndex = startIndex + 1 >= cards.length - maxCardsToShow ? 0 : startIndex + 1;
    setStartIndex(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = startIndex === 0 ? cards.length - maxCardsToShow : startIndex - 1;
    setStartIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextCard();
    }, 5000); // Advance every 5 seconds

    return () => clearInterval(interval);
  }, [startIndex, cards.length, maxCardsToShow]);

  return (
    <div style={styles.cardCarousel}>
      <div style={styles.cardContainer}>
        {cards.slice(startIndex, startIndex + maxCardsToShow).map((card, index) => (
          <div key={index} className="active" style={{ ...defaultCardStyles }}>
            <img src={card.imageUrl} alt={card.title} style={{ ...defaultCardStyles }} />
          </div>
        ))}
        <Button style={{ ...styles.buttonStyles, left: "0" }} onClick={prevCard}>
          <ArrowBackIosIcon />
        </Button>
        <Button
          style={{ ...styles.buttonStyles, right: "0" }}
          onClick={nextCard}
          disabled={startIndex + maxCardsToShow >= cards.length}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

const cards = [
  {
    title: "Card 1",
    description: "Description for Card 1",
    imageUrl: "https://images.uzum.uz/co0o1jf2u18gghclhubg/main_page_banner.jpg",
  },
  {
    title: "Card 2",
    description: "Description for Card 2",
    imageUrl: "https://images.uzum.uz/cod58fp79c1bjs1ajr60/main_page_banner.jpg",
  },
  {
    title: "Card 3",
    description: "Description for Card 3",
    imageUrl: "https://images.uzum.uz/cp1mtmfj2e4ghqnr99p0/main_page_banner.jpg",
  },
  {
    title: "Card 4",
    description: "Description for Card 4",
    imageUrl: "https://images.uzum.uz/cot30tc0u44tu6doiflg/main_page_banner.jpg",
  },
];

const Caroucel = () => {
  return (
    <div>
      <CardCarousel cards={cards} title="Cards" maxCardsToShow={1} />
    </div>
  );
};

export default Caroucel;
