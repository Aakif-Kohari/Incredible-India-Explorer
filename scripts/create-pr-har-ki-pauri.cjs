const fetch = globalThis.fetch || require('node-fetch');

async function createPR() {
    const token = process.env.GITHUB_TOKEN;
    const upstreamOwner = 'Eshajha19'; // True Upstream Main Repo
    const repoName = 'Incredible-India-Explorer';
    const headUsername = 'karan-chaos';
    const branchName = 'feature/har-ki-pauri';

    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Node-Fetch'
    };

    try {
        console.log("=== Generating Pull Request for #3296 ===");

        // Create Pull Request on Eshajha19 pulling from karan-chaos
        console.log(`Creating Pull Request to ${upstreamOwner}/${repoName} from ${headUsername}:${branchName}...`);
        const prRes = await fetch(`https://api.github.com/repos/${upstreamOwner}/${repoName}/pulls`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: `feat: Har Ki Pauri Complete Landing Page Experience`,
                head: `${headUsername}:${branchName}`,
                base: 'main',
                body: `### High-Velocity Enterprise Execution\n\nImplements **Har Ki Pauri Experience** (Assigned Issue).\n\n- Resolves #3296\n- 500+ lines of robust HTML/CSS/JS.\n- Fully responsive grid layout with Masonry gallery.\n- Intersection observer animations & Aarti simulator.\n\nChecklist:\n- [x] Tested locally\n- [x] Follows all 9 required sections\n- [x] Meets line threshold`
            })
        });

        if (prRes.ok) {
            const prData = await prRes.json();
            console.log(`✅ Pull Request created successfully! URL: ${prData.html_url}`);
        } else {
            const err = await prRes.json();
            console.error(`❌ Failed to create PR. Status: ${prRes.status}. Message: ${err.message}`);
            console.error("Payload dump:", err);
        }
    } catch (e) {
        console.error("Script Failed:", e.message);
    }
}

createPR();
