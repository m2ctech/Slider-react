import React from "react";
import data from "./data";

//css
import classes from "./App.module.css";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function App() {
  const [people, setPeople] = React.useState(data);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    } else if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  React.useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className={classes.section}>
      <div className={classes.title}>
        <h2>Reviews</h2>
      </div>
      <div className={classes.center}>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = classes.nextSlide;
          if (personIndex == index) {
            position = classes.activeSlide;
          } else if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = classes.lastSlide;
          }

          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className={classes.personimg} />
              <h4>{name}</h4>
              <p className={classes.ptitle}>{title}</p>
              <p className={classes.quote}>{quote}</p>
              <FaQuoteRight className={classes.icon} />
            </article>
          );
        })}
        <button className={classes.prev} onClick={() => setIndex(index + 1)}>
          <FiChevronLeft />
        </button>
        <button className={classes.next} onClick={() => setIndex(index - 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
