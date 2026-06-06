import { execSync } from 'child_process';
import fs from 'fs';

const generateDiagrams = () => {
  console.log('Generating repository architecture diagrams...');

  const diagramsDir = '.github/diagrams';
  if (!fs.existsSync(diagramsDir)) {
    fs.mkdirSync(diagramsDir, { recursive: true });
  }

  // Ensure src directory exists before running madge
  if (!fs.existsSync('src')) {
    console.log('No src directory found, skipping component dependency graph.');
    return;
  }

  try {
    // Generate an SVG diagram for dependencies (interactive/clickable by nature of SVGs if opened in browser)
    console.log('Running madge to generate dependency SVG...');
    execSync('npx madge --image .github/diagrams/dependencies.svg src', { stdio: 'inherit' });

    // Also, generate a JSON representation of dependencies to parse for a Mermaid diagram
    console.log('Generating dependency JSON...');
    execSync('npx madge --json src > .github/diagrams/dependencies.json', { stdio: 'inherit' });

    // Generate a simple Mermaid diagram
    const depData = JSON.parse(fs.readFileSync('.github/diagrams/dependencies.json', 'utf8'));
    let mermaid = '```mermaid\ngraph TD;\n';
    let edgesAdded = 0;

    for (const [module, deps] of Object.entries(depData)) {
      if (deps.length === 0) continue;
      // Clean module names for mermaid
      const cleanMod = module.replace(/[^a-zA-Z0-9]/g, '_');
      for (const dep of deps) {
        const cleanDep = dep.replace(/[^a-zA-Z0-9]/g, '_');
        mermaid += `    ${cleanMod}["${module}"] --> ${cleanDep}["${dep}"];\n`;
        edgesAdded++;
      }
    }

    if (edgesAdded === 0) {
      mermaid += '    NoDependencies["No Internal Dependencies Found"];\n';
    }

    mermaid += '```\n';

    fs.writeFileSync('.github/diagrams/architecture.mermaid.md', mermaid);
    console.log('Diagrams generated successfully.');

  } catch (error) {
    console.error('Error generating diagrams:', error.message);
  }
};

generateDiagrams();
