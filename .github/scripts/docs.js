import fs from 'fs';

const generateReadme = () => {
  console.log('Generating updated README.md...');

  let repoData = {};
  try {
    repoData = JSON.parse(fs.readFileSync('.github/knowledge-graph/repo-data.json', 'utf8'));
  } catch {
    console.error('Could not load repo-data.json, skipping docs generation.');
    return;
  }

  let mermaidDiagram = '';
  try {
    mermaidDiagram = fs.readFileSync('.github/diagrams/architecture.mermaid.md', 'utf8');
  } catch {
    console.log('No mermaid diagram found, skipping that section.');
  }

  const stackDetails = Object.entries(repoData.stack || {})
    .map(([key, value]) => `- **${key.charAt(0).toUpperCase() + key.slice(1)}**: ${value}`)
    .join('\n');

  const readmeContent = `
# ${repoData.projectName || 'Repository'}

![CI Status](https://github.com/github/repo/actions/workflows/ci-cd.yml/badge.svg)
![Auto Docs](https://github.com/github/repo/actions/workflows/auto-docs.yml/badge.svg)

## Project Overview
${repoData.description || 'This project is automatically analyzed and documented.'}

## Technology Stack
${stackDetails || 'No stack details detected.'}

## System Architecture

### Dependency Graph
${mermaidDiagram ? mermaidDiagram : '*Diagram will be generated on next run.*'}

*(Interactive SVG maps are available in \`.github/diagrams/\`)*

## Repository Structure
\`\`\`json
${JSON.stringify(repoData.structure || {}, null, 2)}
\`\`\`

## Setup Instructions

1. Clone the repository
2. Run \`npm install\` (or \`npm ci\`)
3. Run \`npm run dev\` (or relevant script)

### Available Scripts
${(repoData.scripts || []).map(s => `- \`npm run ${s}\``).join('\n')}

## Deployment
Pushing to the \`main\` branch will automatically run tests, linting, and regenerate documentation.

## Contribution Guide
Ensure your code passes tests before opening a PR. The AI Agent will review PRs for architectural changes and suggest updates.

---
*This README is auto-generated and maintained by the repository's autonomous AI documentation system.*
`;

  fs.writeFileSync('README.md', readmeContent.trim());
  console.log('README.md successfully updated.');
};

generateReadme();
