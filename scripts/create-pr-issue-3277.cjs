const fetch = globalThis.fetch || require('node-fetch');

async function createPR() {
    // Using process.env to avoid push protections based on previous learning
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.error("FATAL: GITHUB_TOKEN environment variable is missing.");
        process.exit(1);
    }

    const upstreamOwner = 'Eshajha19'; // True Upstream Main Repo
    const repoName = 'Incredible-India-Explorer';
    const headUsername = 'karan-chaos';
    const branchName = 'feature/issue-3277';

    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Node-Fetch'
    };

    try {
        console.log("=== Generating Pull Request for Issue #3277 ===");
        console.log(`Targeting: ${upstreamOwner}/${repoName} from ${headUsername}:${branchName}`);

        // Create Pull Request on the main upstream repository
        const prRes = await fetch(`https://api.github.com/repos/${upstreamOwner}/${repoName}/pulls`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: `feat: Famous Ghats of India Landing Page Experience`,
                head: `${headUsername}:${branchName}`,
                base: 'main',
                body: `### High-Velocity Enterprise Execution\n\nImplements **Famous Ghats of India** (Assigned Issue).\n\n- Resolves #3277\n- Reached goal of 700+ lines.\n- Developed fully interactive Search / Filter "Ghat Explorer".\n- High quality responsive Grid layouts targeting all 10 sections.\n\nChecklist:\n- [x] Tested locally (Vitest JSDOM passing)\n- [x] Follows existing UI guidelines\n- [x] Zero secret leakage`
            })
        });

        if (prRes.ok) {
            const prData = await prRes.json();
            console.log(`✅ Pull Request created successfully! URL: ${prData.html_url}`);
        } else {
            const err = await prRes.json();
            console.error(`❌ Failed to create PR. Status: ${prRes.status}. Message: ${err.message}`);
            console.error("Check if branch was pushed successfully first.");
        }
    } catch (e) {
        console.error("Script Failed Executing Network Request:", e.message);
    }
}

createPR();
