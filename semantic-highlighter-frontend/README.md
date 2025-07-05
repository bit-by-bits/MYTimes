# 🖍️ Semantic Highlighter Frontend

A production-ready frontend for the Semantic Highlighter app built with React, Vite, Tailwind CSS, and ShadCN UI.

## Features

- **Authentication**: Mock authentication with login/signup forms
- **Semantic Text Analysis**: Highlights definitions, examples, TODOs, and quotes in text
- **Interactive Toggles**: Switch tag types on/off to customize highlighting
- **Clean UI**: Modern, minimal design with Notion-like feel
- **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ShadCN UI** for components
- **Lucide React** for icons
- **Radix UI** for accessible primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

1. **Authentication**: Use any email/password combination to sign in (mock auth)
2. **Text Analysis**: 
   - Paste text into the input textarea
   - Click "Analyze" to highlight semantic structures
   - Use the toggle switches to show/hide different tag types
3. **Highlighting**: 
   - **Blue**: Definitions (e.g., "is defined as", "refers to")
   - **Green**: Examples (e.g., "for example", "such as")
   - **Yellow**: TODOs (e.g., "TODO:", "Fix:")
   - **Purple**: Quotes (e.g., "according to", "as stated by")

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── main/          # Main app components
│   └── ui/            # ShadCN UI components
├── contexts/          # React contexts
├── lib/               # Utility functions
├── index.css          # Global styles
└── main.tsx           # App entry point
```

## Demo Text

Try pasting this sample text to see the highlighting in action:

```
The Semantic Web is defined as a web of linked data that enables machines to understand and process information. For example, a weather app could use semantic data to provide more accurate forecasts. TODO: Add more examples of semantic web applications. According to Tim Berners-Lee, the Semantic Web represents the next evolution of the World Wide Web.
```

## Backend Integration

This frontend is designed to work with the FastAPI backend described in the PRD. The mock analysis function can be easily replaced with actual API calls to the `/analyze` endpoint.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
