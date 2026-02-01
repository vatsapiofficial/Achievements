# AI Assistant with Ant Design X

Build excellent AI interfaces and pioneer intelligent new experiences.

This project is a starter for building AI-driven interfaces using [Ant Design X](https://x.ant.design/), [Vite](https://vitejs.dev/), [React](https://reactjs.org/), and [TypeScript](https://www.typescriptlang.org/).

## Features

- **AI Chat UI**: Built with Ant Design X components (`Bubble`, `Sender`, `Welcome`).
- **Modern Tech Stack**: React 19, Vite 7, TypeScript.
- **Testing**: End-to-end testing with Playwright.
- **Developer Experience**: Prettier for code formatting.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Build

Build the application for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Testing

Run Playwright tests:

```bash
npm test
```

### Code Formatting

Format code with Prettier:

```bash
npm run format
```

## Model Context Protocol (MCP)

This project recommends using the [Chrome DevTools MCP server](https://github.com/michaelfig/chrome-devtools-mcp) for enhanced debugging and browser visibility during development.

Add the following to your MCP client configuration (e.g., Claude Desktop, Cursor):

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

### Additional Resources

- [DeepWiki MCP Registry](https://mcp.deepwiki.com/mcp)
- [GitHub Copilot MCP](https://api.githubcopilot.com/mcp/)

## License

MIT
