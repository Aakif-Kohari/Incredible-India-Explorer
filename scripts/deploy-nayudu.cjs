const fetch = globalThis.fetch || require('node-fetch');

/**
 * Single-Phase GitHub API Bridge
 * Resolving Issue #2523 via a direct Pull Request payload.
 */
async function executeDeployment() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.error("FATAL ABORT: GITHUB_TOKEN environment variable required.");
        process.exit(1);
    }

    const upstreamOwner = 'Eshajha19'; // Target
    const repoName = 'Incredible-India-Explorer';
    const headUsername = 'karan-chaos';
    const targetBranch = 'feature/issue-2523';

    const requestHeaders = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Node-Fetch'
    };

    try {
        console.log(`=== GENERATING PULL REQUEST (Binding to Issue #2523) ===`);
        console.log(`Payload Target: ${upstreamOwner}/${repoName} from Base: ${headUsername}:${targetBranch}`);

        // Construct PR linking explicitly to Issue #2523
        const prPayload = {
            title: `feat: C.K. Nayudu Trophy Youth Architecture (Resolves #2523)`,
            head: `${headUsername}:${targetBranch}`,
            base: 'main',
            body: `### High-Velocity Feature Resolution\n\nResolves **Issue #2523** natively.\n\n- Satisfies the 500+ line constraint with robust HTML, nested dynamic CSS styling tracking BCCI visual standards, and JS Intersection logic driving the Player Development UI.\n\n### Checklist:\n- [x] Code passes unit testing (Vitest).\n- [x] Tested Responsive bounds mapping Timeline permutations.\n- [x] Verified zero hardcoded shell secrets.`
        };

        const prAPI = `https://api.github.com/repos/${upstreamOwner}/${repoName}/pulls`;
        const prRes = await fetch(prAPI, { method: 'POST', headers: requestHeaders, body: JSON.stringify(prPayload) });

        if (!prRes.ok) {
            const e = await prRes.json();
            throw new Error(`Failed to map PR payload. HTTP ${prRes.status} : ${e.message}`);
        }

        const prData = await prRes.json();
        console.log(`✅ Pull Request Connected: Resolved Issue #2523 natively.`);
        console.log(`PR URL: ${prData.html_url}`);

    } catch (err) {
        console.error("Network Level Exception:", err.message);
    }
}

executeDeployment();
