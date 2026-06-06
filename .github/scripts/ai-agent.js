import fs from 'fs';
import { execSync } from 'child_process';
import OpenAI from 'openai';

const runAgent = async () => {
  console.log('Starting AI Agent Review...');

  const token = process.env.OPENAI_API_KEY;
  if (!token) {
    console.warn('No OPENAI_API_KEY found. Skipping AI-generated summaries. Assuming manual fallback.');
    return;
  }

  const eventName = process.env.EVENT_NAME;
  const prNumber = process.env.PR_NUMBER;

  if (eventName !== 'pull_request') {
    console.log('Not a pull request. Exiting AI Agent.');
    return;
  }

  try {
    // Get diff stats for the current branch against main (assuming fetching is done)
    const diffStat = execSync('git diff --stat origin/main').toString();

    const prompt = `Review the following diff stats for a Pull Request and summarize the potential architectural impact, identifying if documentation updates are needed.

Diff stats:
${diffStat}
`;

    const openai = new OpenAI({ apiKey: token });
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a repository AI maintainer." }, { role: "user", content: prompt }],
      max_tokens: 300,
    });

    const summary = response.choices[0].message.content;

    console.log('AI Review Complete. Summary:');
    console.log(summary);

    // In a real scenario, we'd post this back to the PR via GitHub API.
    // We will save it locally as an artifact for now.
    const dir = '.github/knowledge-graph';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`${dir}/ai-pr-review.md`, summary);

  } catch (error) {
    console.error('Error running AI Agent:', error);
  }
};

runAgent();
