"use client";

import { useState } from "react";

interface FoundersCarouselProps {
  dict: any;
}

export default function FoundersCarousel({ dict }: FoundersCarouselProps) {
  const carouselData = dict?.Carousel;
  const foundersData = carouselData?.founders || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    if (foundersData.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % foundersData.length);
  };

  const prevSlide = () => {
    if (foundersData.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + foundersData.length) % foundersData.length);
  };

  const getFounderImage = (founder: any) => {
    if (founder?.image) return founder.image;

    const name = founder?.name?.toLowerCase?.() || "";

    if (name.includes("yasmine")) return "/img/founder-yasmine.jpg";
    if (name.includes("simon")) return "/img/founder-simon.jpg";

    return "/img/founder-default.jpg";
  };

  const getFounderTheme = (founder: any) => {
    const name = founder?.name?.toLowerCase?.() || "";

    if (name.includes("yasmine")) {
      return {
        badgeClass: "badge-yasmine",
        roleClass: "role-yasmine",
      };
    }

    return {
      badgeClass: "badge-simon",
      roleClass: "role-simon",
    };
  };

  return (
    <section className="founders-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            {carouselData?.tag || "✨ FONDATEURS"}
          </span>
          <h2>{carouselData?.title || "Qui sommes-nous ?"}</h2>
          <p>
            {carouselData?.subtitle ||
              "Deux profils complémentaires, une même mission."}
          </p>
        </div>

        <div className="founders-wrap">
          <div className="founders-slides">
            {foundersData.length > 0
              ? foundersData.map((founder: any, index: number) => {
                  const theme = getFounderTheme(founder);
                  const founderImage = getFounderImage(founder);
                  const founderExperience =
                    founder.exp || founder.experience || "";
                  const founderExpLabel =
                    founder.expLabel || "d'expérience";
                  const founderBio =
                    founder.bio || founder.description || "";
                  const founderPills = founder.pills || founder.tags || [];

                  return (
                    <div
                      key={index}
                      className={`founder-slide ${
                        index === activeIndex ? "is-active" : ""
                      }`}
                    >
                      <div className="founder-photo">
                        <div className="founder-photo-img">
                          <img
                            src={founderImage}
                            alt={founder.name || "Fondateur"}
                          />
                        </div>

                        <div className={`founder-badge-box ${theme.badgeClass}`}>
                          <span className="bn">{founderExperience}</span>
                          <span className="bl">{founderExpLabel}</span>
                        </div>
                      </div>

                      <div className="founder-content">
                        <div className="founder-name-row">
                          <h3>{founder.name}</h3>
                          <span className={`founder-role ${theme.roleClass}`}>
                            {founder.role}
                          </span>
                        </div>

                        <p>{founderBio}</p>

                        <div className="founder-pills">
                          {founderPills.map((tag: string) => (
                            <span key={tag} className="fpill">
                              ✅ {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          {foundersData.length > 1 && (
            <div className="founders-nav">
              <button
                className="fnav-btn"
                onClick={prevSlide}
                aria-label="Slide précédent"
              >
                ←
              </button>

              <div className="fnav-dots">
                {foundersData.map((_: any, index: number) => (
                  <button
                    key={index}
                    className={`fnav-dot ${index === activeIndex ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Aller au slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="fnav-btn"
                onClick={nextSlide}
                aria-label="Slide suivant"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}