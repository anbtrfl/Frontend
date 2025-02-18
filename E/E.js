async function crawl(url, depth, concurrency) {
    const visited = new Set();  
    const queue = [];  
    const results = [];  

    const getLinks = (html, baseUrl) => {
        const regex = /href="(.*?)"/g;
        const hrefs = [...html.matchAll(regex)].map(match => match[1]);

        
        return hrefs.map(href => {
            try {
                return new URL(href, baseUrl).href;
            } catch {
                return null;  
            }
        }).filter(Boolean); 
    };

    const crawlPage = async (url, currentDepth) => {
        if (currentDepth > depth || visited.has(url)) {
            return;
        }
        visited.add(url);

        try {
            const response = await fetch(url);
            const text = await response.text();

            const pageData = {
                url: url,
                depth: currentDepth,
                content: text,
                links: getLinks(text, url)
            };
            results.push(pageData);
            
            if (currentDepth >= depth) return;
            
            queue.push(...pageData.links.map(link => ({ url: link, depth: currentDepth + 1 })));
        } catch (error) {
            results.push({
                url: url,
                depth: currentDepth,
                content: null,
                links: [],
                error: `Error: ${error.message}`
            });
        }
    };

    queue.push({ url, depth: 1 });

    while (queue.length > 0) {
        const batch = queue.splice(0, concurrency);
        await Promise.all(batch.map(({ url, depth }) => crawlPage(url, depth)));
    }

    return results;
}

module.exports = crawl;
