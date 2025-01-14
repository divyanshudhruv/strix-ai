# 📦 strix-ai

**📦 strix-ai** is a powerful package designed for **⚡dynamic localization**, enabling seamless updates to HTML content in different languages using **📁 JSON data**. This tool makes it simple to localize **🕸️ websites** or **🔦 applications** by dynamically injecting content based on a **✏️ structured JSON object**.

<br>

![GitHub stars](https://img.shields.io/github/stars/divyanshudhruv/strix-ai?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/divyanshudhruv/strix-ai.svg?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/divyanshudhruv/strix-ai.svg?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/divyanshudhruv/strix-ai.svg?style=for-the-badge)
![Top language](https://img.shields.io/github/languages/top/divyanshudhruv/strix-ai.svg?style=for-the-badge)

<Br>

<br>

> [!IMPORTANT]<br>
> If you encounter any issues or need assistance, please open a GitHub issue or contact the maintainer directly to ensure a quick resolution and continued support.

> [!NOTE]<br>
> This package is actively maintained, ensuring that it stays up-to-date with the latest improvements, bug fixes, and features.

<br>

## 🔦 Live

To Convert the **✏️ JSON** into multiple languages effortlessly using our **🔮 dynamic localization** tool. Access it <b>[here](https://strix-ai.vercel.app/) </b>.

<br>

## ✨ Features

- `📁 Dynamic Localization`: Easily switch content for **multiple languages**.

- `🕸️ Seamless Integration`: Updates **innerHTML** of elements within a container.

- `🚨  Error Handling`: Logs **warnings** for missing elements or containers.

- `☁️ Type-Safe Implementation`: Leverage TypeScript for **robust** and **error-free** development.<br>

<Br>

## 📦 Installation

Install the package using **`npm`**:

```bash
npm install strix-ai
```

<br>

## 🔧 Usage

### JavaScript Version<br>

#### Example<br>

Import the package and use it in your project:<br>

```javascript
const strixAdd = require("strix-ai");

const strixJSON = {
  title: "Welcome",
  subtitle: "A lightweight utility",
  buttonText: "Click Me",
  description: "This is dynamically updated content.",
};

strixAdd(strixJSON);
```

<br>

### TypeScript Version<br>

#### Example<br>

Import the package and use it in your TypeScript project:<br>

```typescript
import strixAdd from "strix-ai";

interface StrixJSON {
  title: string;
  subtitle: string;
  buttonText: string;
  description: string;
}

const strixJSON: StrixJSON = {
  title: "Welcome",
  subtitle: "A lightweight utility",
  buttonText: "Click Me",
  description: "This is dynamically updated content.",
};

strixAdd(strixJSON);
```

or

```typescript
import strixAdd from "strix-ai";

const strixJSON = {
  title: "Welcome",
  subtitle: "A lightweight utility",
  buttonText: "Click Me",
  description: "This is dynamically updated content.",
};

strixAdd(strixJSON);
```

<br>

### HTML or return()<br>

#### Example<br>

Use the following structure for HTML:<br>

> Use a parent **`<div>`** element with the **`id="useStrix"`** to integrate the JSON seamlessly.

```html
<div id="useStrix">
  <h1 id="title"></h1>
  <h2 id="subtitle"></h2>
  <button id="buttonText"></button>
  <p id="description"></p>
</div>
```

<br>

## ⚠️ Error Handling

<br>

> [!IMPORTANT]<br>
> Logs an error if the container element with ID `useStrix` is not found.<br>

> [!IMPORTANT]<br>
> Logs a warning if an element corresponding to a key in `strixJSON` is missing.<br>

<Br>

## 📋 Future Updates

<br>

- [ ] `Nested JSON`: Add support for nested JSON structures.<br>

- [ ] `Default values`: Provide default values for missing keys.<br>

- [ ] `Multilanguage integration`: Add multilingual support out of the box.<br>

- [ ] `Error handling`: Improve error messages with detailed debugging information.<br>

<br>

## 🤝 Contribution

<br>

Feel **🆓 free** to **contribute** by opening an **🔓 issue** or submitting a **🚪 pull request**. <br>

<br>

## 📄 License<br>

**`MIT`**
