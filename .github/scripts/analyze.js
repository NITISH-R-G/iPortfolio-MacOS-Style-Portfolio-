import fs from 'fs';
import path from 'path';

// Helper to check file existence
const exists = (filePath) => fs.existsSync(filePath);

// Basic directory traversal to build a structure
const getStructure = (dir, depth = 0, maxDepth = 4) => {
  if (depth > maxDepth) return '...';
  let results = {};
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.git', 'dist', 'public'].includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results[file] = getStructure(filePath, depth + 1, maxDepth);
    } else {
      results[file] = 'file';
    }
  }
  return results;
};

const analyzeRepo = () => {
  console.log('Starting repository analysis...');
  const repoData = {
    timestamp: new Date().toISOString(),
    stack: {},
    architecture: {},
    structure: getStructure('.'),
  };

  // Analyze package.json
  if (exists('package.json')) {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      repoData.projectName = pkg.name || 'Unnamed Project';
      repoData.description = pkg.description || 'No description provided.';
      repoData.scripts = Object.keys(pkg.scripts || {});
      repoData.dependencies = Object.keys(pkg.dependencies || {});
      repoData.devDependencies = Object.keys(pkg.devDependencies || {});

      // Infer stack
      if (repoData.dependencies.includes('react')) repoData.stack.frontend = 'React';
      if (repoData.dependencies.includes('vite') || repoData.devDependencies.includes('vite')) repoData.stack.bundler = 'Vite';
      if (repoData.dependencies.includes('tailwindcss')) repoData.stack.styling = 'Tailwind CSS';
      if (repoData.dependencies.includes('zustand')) repoData.stack.state = 'Zustand';

    } catch (error) {
      console.error('Error parsing package.json:', error);
    }
  }

  // Analyze config files
  if (exists('vite.config.js') || exists('vite.config.ts')) repoData.architecture.buildTool = 'Vite';
  if (exists('eslint.config.js')) repoData.architecture.linter = 'ESLint';

  // Output knowledge graph
  fs.mkdirSync('.github/knowledge-graph', { recursive: true });
  fs.writeFileSync(
    '.github/knowledge-graph/repo-data.json',
    JSON.stringify(repoData, null, 2)
  );

  console.log('Analysis complete. Data written to .github/knowledge-graph/repo-data.json');
};

analyzeRepo();
