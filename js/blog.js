(function()
{
    function renderBlogList(containerId, entries)
    {
        const container = document.getElementById(containerId);
        if (!container) return;

        const sorted = entries.slice().sort(function(a, b)
        {
            return new Date(b.date) - new Date(a.date);
        });

        sorted.forEach(function(entry)
        {
            const article = document.createElement("article");
            article.className = "blog-entry";

            const time = document.createElement("time");
            time.setAttribute("datetime", entry.date);
            time.textContent = entry.date;

            const h2 = document.createElement("h2");
            const a = document.createElement("a");
            a.href = entry.url;
            a.textContent = entry.title;
            h2.appendChild(a);

            const p = document.createElement("p");
            p.textContent = entry.description;

            article.appendChild(time);
            article.appendChild(h2);
            article.appendChild(p);
            container.appendChild(article);
        });
    }

    document.addEventListener("DOMContentLoaded", function()
    {
        if (typeof blogEntries !== "undefined")
        {
            renderBlogList("blog-list", blogEntries);
        }
    });
})();
