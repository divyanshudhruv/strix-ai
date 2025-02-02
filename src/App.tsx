import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function App() {
  const [inputValue, setInputValue] = useState<string>(""); // Tracks user input
  const [formattedJson, setFormattedJson] = useState<string>(""); // Tracks formatted JSON output
  const [error, setError] = useState<string | null>(null); // Tracks errors
  const [answer, setAnswer] = useState<string>(""); // Stores the AI answer
  const [isAnswerReady, setIsAnswerReady] = useState<boolean>(false); // Tracks if answer is ready

  function removeError() {
    let f = formattedJson;
    let e = error;
    let i = isAnswerReady;
    let a = f + e + i;
    a = "removeError";
    console.log(a);
  }

  function stayTuned() {
    Swal.fire({
      title: "Stay tuned!",
      icon: "warning",
    });
    removeError();
  }

  function copyGenerated() {
    const textareaTemp = document.getElementById(
      "TempTextarea"
    ) as HTMLTextAreaElement;
    let valueOfTemp = textareaTemp.value;
    navigator.clipboard.writeText(valueOfTemp);
  }

  async function askLang() {
    const { value: lang } = await Swal.fire({
      title: "Change language",
      input: "text",
      inputLabel: "Enter the language",
      showCancelButton: true,
      inputValidator: (value) => {
        return value ? null : "You need to write something!";
      },
    });

    if (lang) {
      const globalLanguage = lang.trim();
      localStorage.setItem("gLanguage", globalLanguage);

      setTimeout(() => {
        Swal.fire({
          title: `Language changed to ${globalLanguage}`,
          timer: 1000,
          timerProgressBar: true,
        });
      }, 500);
    }
  }

  async function askBasePromptPlus() {
    const { value: prompt } = await Swal.fire({
      title: "Add an additional prompt",
      input: "text",
      inputLabel: "Enter the prompt",
      showCancelButton: true,
    });

    if (prompt) {
      const globalPrompt = prompt.trim();
      localStorage.setItem("gPrompt", globalPrompt);

      setTimeout(() => {
        Swal.fire({
          title: `Added new prompt`,
          timer: 1000,
          timerProgressBar: true,
        });
      }, 500);
    }
  }

  let basePrompt;
  let basePromptPlus;
  const askQuestion = async (prompt: string): Promise<string> => {
    try {
      let globalLanguageF = localStorage.getItem("gLanguage");
      let globalPromptF = localStorage.getItem("gPrompt");
      basePromptPlus = globalPromptF;
      basePrompt = `
      This is a JSON code. I want you to generate the same code, but translate the value of each key only into ${globalLanguageF} and keep the language simple and use easy grammar. Do not translate the key. Ensure that the translations are based on the context of programming, UI design, web development, etc. After translating, return the updated code as a .txt file with proper indentation and remove any comments. Do not include any additional text or explanations. If the input is not a valid JSON, return an error message. If the input is a valid JSON, return the translated JSON and follow the next inline prompt if present strictly.
      `;
      const result = await model.generateContent([
        basePrompt + prompt + "Use this prompt also:" + basePromptPlus,
      ]);
      localStorage.setItem("gPrompt", "");
      return result.response.text();
    } catch (error) {
      console.error("Error:", error);
      return "An error occurred while fetching the answer.";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  // Handle button click for parsing JSON and getting AI answer
  const handleButtonClick = async () => {
    try {
      adjustHeight();

      const normalizedInput = inputValue.replace(/([^\s":]+)(?=\s*:)/g, '"$1"');

      const parsedJson = JSON.parse(normalizedInput); // Will throw an error if JSON is invalid

      const loading = document.getElementById("loading") as HTMLDivElement;
      loading.style.display = "flex";

      const jsonString = JSON.stringify(parsedJson, null, 4);

      setFormattedJson(jsonString);
      setError(null);

      const fetchedAnswer = await askQuestion(jsonString);
      const trimmedAnswer = fetchedAnswer.replace(/^[^{]*|[^}]*$/g, "");

      setAnswer(trimmedAnswer);
      setIsAnswerReady(true);

      loading.style.display = "none";

      const alertConfirm = document.getElementById(
        "textGeneratedDown"
      ) as HTMLDivElement;
      alertConfirm.classList.add("active");

      setTimeout(() => {
        alertConfirm.classList.remove("active");
      }, 2000);
    } catch (error) {
      setError("Invalid JSON format. Please enter valid JSON.");
      console.error("Error parsing JSON:", error);

      const loading = document.getElementById("loading") as HTMLDivElement;
      loading.style.display = "none";
    }
  };

  const adjustHeight = () => {
    const textarea1 = document.getElementById(
      "stringInput"
    ) as HTMLTextAreaElement;
    const inputDiv = document.getElementById("input1") as HTMLDivElement;

    if (textarea1) {
      textarea1.style.height = "auto"; // Reset to auto before measuring
      textarea1.style.transition = ".3s";
      textarea1.style.height = `${textarea1.scrollHeight + 10}px`;
      inputDiv.style.transition = ".3s";
      inputDiv.style.height = `${textarea1.scrollHeight + 21.5}px`;
      inputDiv.style.paddingBottom = "10px";
      localStorage.setItem("inputHeight", textarea1.style.height);
    } else {
      inputDiv.style.minHeight = "112px";
    }
  };

  return (
    <Router>
      <div id="useStrix">
        <div className="textGeneratedDown" id="textGeneratedDown">
          <div className="icon">
            {" "}
            <i className="ri-line-check-line"></i>
          </div>
          Output generated. Copy now.
        </div>
        <textarea
          name=""
          id="TempTextarea"
          value={answer}
          style={{ display: "none" }}
          readOnly
          aria-label="Generated output"
        ></textarea>

        {/* Navigation */}
        <div className="nav" id="nav">
          <div className="left">
            <Link to="/" className="item">
              App
            </Link>
            <Link to="/playground" className="item">
              Playground
            </Link>
            <Link to="/others" className="item">
              Others
            </Link>
          </div>
          <div className="right">
            <div className="item">
              <i className="ri-line-chart-line"></i>
              <div className="dropdown" id="dropdown">
                <div className="npm">npm i strix-ai</div>
              </div>
            </div>

            <div className="item  ">
              <a
                href="https://github.com/divyanshudhruv/strix-ai/blob/main/package"
                target="_blank"
              >
                <i className="ri-time-line"></i>
                {/* <div className="dropdown" id="dropdown">
                  <div className="npm">downtime: 0 hr</div>
                </div> */}
              </a>
            </div>
            <div className="item">
              <i className="ri-menu-line"></i>
            </div>
            <div className="item profile bg">
              <i className="ri-user-line"></i> Strix User
            </div>
          </div>
        </div>

        {/* Route Definitions */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="main">
                <div className="bg-text">
                  Strix<span>Map it. Translate it.</span>
                </div>
                <div className="inputArea" id="inputArea">
                  <div className="input" id="input1">
                    <div className="loading" id="loading"></div>
                    <textarea
                      value={inputValue}
                      onChange={handleInputChange}
                      spellCheck="false"
                      onInput={adjustHeight}
                      name="string"
                      id="stringInput"
                      placeholder="Paste as JSON."
                      aria-label="Input JSON"
                    ></textarea>
                    <div className="bottomInput">
                      <div className="button-type">
                        JSON model <i className="ri-arrow-down-s-line"></i>
                      </div>
                      <div className="container-tools">
                        <div className="tool" onClick={askLang}>
                          <i className="ri-flashlight-line"></i>
                          <div className="dropdown" id="dropdown">
                            <div className="npm">Language</div>
                          </div>
                        </div>
                        <div className="tool" onClick={askBasePromptPlus}>
                          <i className="ri-toggle-line"></i>
                          <div className="dropdown" id="dropdown">
                            <div className="npm">More</div>
                          </div>
                        </div>
                        <div className="tool" onClick={copyGenerated}>
                          <i className="ri-file-text-line"></i>
                          <div className="dropdown" id="dropdown">
                            <div className="npm">Copy</div>
                          </div>
                        </div>
                        <div className="tool" onClick={stayTuned}>
                          <i className="ri-cloudy-line"></i>
                          <div className="dropdown" id="dropdown">
                            <div className="npm">Save</div>
                          </div>
                        </div>
                        <div
                          className="tool"
                          style={{ marginLeft: "10px" }}
                          id="jsonEnter"
                          onClick={handleButtonClick}
                        >
                          <i className="ri-arrow-right-line"></i>
                          <div className="dropdown" id="dropdown">
                            <div className="npm">Run</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer" style={{ marginBottom: "40px" }}>
                  Instant translations, live previews, easy uploads, and
                  seamless real-time updates.{" "}
                  <a
                    href="https://github.com/divyanshudhruv/strix-ai"
                    target="_blank"
                  >
                    <span>View More</span>
                  </a>
                </div>
              </div>
            }
          />
          <Route
            path="/playground"
            element={
              <div className="main">
                <div className="bg-text-2">
                  Playground<br></br>
                  <span>In the Lab... Testing Awesome!</span>
                </div>
              </div>
            }
          />
          <Route
            path="/others"
            element={
              <div className="main">
                <div className="bg-text-2">
                  Others<br></br>
                  <span>Magic in the Making... Hold Tight!</span>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
