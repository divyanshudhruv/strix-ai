// App.tsx
import React, { useEffect } from "react";
import strixAdd from "strix-ai"; // sample package (TO BE CHANGED AFTER)

const App: React.FC = () => {
  const strixJSON = {
    title: "Welcome to Our Service",
    subtitle: "Easy language translation",
    buttonText: "Get started",
    description: "Translate without trouble and see a live preview.",
    tagline: "Your trusted partner in language services.",
    featuresTitle: "Features",
    feature1: "Real-time translation",
    feature2: "Multi-language support",
    feature3: "Easy integration",
    testimonialTitle: "What our users say",
    testimonial1: "This service has been very helpful for our team!",
    testimonial2: "The interface is simple and easy to use.",
    testimonial3: "Definitely use it for all your language translation needs.",
    contactMessage: "Contact us for more info.",
    footerNote: "© 2025 Our Service, Inc. All rights reserved.",
  };
  useEffect(() => {
    strixAdd(strixJSON); // Using the function from the JS package
  }, []);

  return (
    <div id="useStrix">
      <h1 id="title"></h1>
      <h2 id="subtitle"></h2>
      <p id="description"></p>
      <button id="buttonText"></button>

      <section>
        <h2 id="tagline"></h2>
      </section>

      <section>
        <h3 id="featuresTitle"></h3>
        <ul>
          <li id="feature1"></li>
          <li id="feature2"></li>
          <li id="feature3"></li>
        </ul>
      </section>

      <section>
        <h3 id="testimonialTitle"></h3>
        <p id="testimonial1"></p>
        <p id="testimonial2"></p>
        <p id="testimonial3"></p>
      </section>

      <section>
        <p id="contactMessage"></p>
      </section>

      <footer>
        <p id="footerNote"></p>
      </footer>
    </div>
  );
};

export default App;

//✅ Test Passed: "App.tsx" exists
