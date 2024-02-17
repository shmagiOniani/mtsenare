import React, { useEffect } from "react";
import "./user-card.scss";

function UserCard() {
  const cards = document.querySelectorAll(".card");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      {
        threshold: 1,
      }
    );

    const lastCardObserver = new IntersectionObserver(entries => {
      const lastCard = entries[0]
      if(!lastCard.isIntersecting) return 
      loadNewCards()
      lastCardObserver.unobserve(lastCard.target)
      lastCardObserver.observe(document.querySelector(".card:last-child"))
    })

    lastCardObserver.observe(document.querySelector(".card:last-child"))

    cards.forEach((card) => {
      observer.observe(card);
    });

    const cardContainer = document.querySelector(".card-container")

    const loadNewCards = ()=>{
      for(let i = 0; i<10; i++){
        const card = document.createElement("div")
        card.textContent = "New Card"
        card.classList.add("card")
        observer.observe(card)
        cardContainer.append(card)
      }
    }
    return () => {};
  }, []);

  return (
    <div className="card-container">
      <div className="card">card</div>
      <div className="card">card</div>
      <div className="card">card</div>
      <div className="card">card</div>
      <div className="card">card</div>
      <div className="card">card</div>
      <div className="card">card</div>
    </div>
  );
}

export default UserCard;
