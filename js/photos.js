(function()
{
    const baseImages =
    [
        "images/Above Dark(itch).png",
        "images/ascii-art.png",
        "images/Hamsioft.jpg",
        "images/wide_img.png",
        "images/Wide-acsii.png"
    ];

    const photos = [];
    for (let i = 0; i < 15; i++)
    {
        photos.push(
        {
            src: baseImages[i % baseImages.length],
            url: "https://www.instagram.com/sagudelophoto/"
        });
    }

    const canvas = document.getElementById("photo-canvas");
    if (!canvas) return;

    const items = [];
    const mouse = { x: -9999, y: -9999 };
    const REPULSION_RADIUS = 250;
    const REPULSION_STRENGTH = 0.8;
    const SPRING_STRENGTH = 0.008;
    const DAMPING = 0.96;
    const COLLISION_RADIUS = 100;
    const COLLISION_STRENGTH = 0.5;

    function createPhotoElements()
    {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const headerOffset = 120;
        const padding = 40;

        const cols = Math.ceil(Math.sqrt(photos.length * (vw / vh)));
        const rows = Math.ceil(photos.length / cols);
        const cellW = (vw - padding * 2) / cols;
        const cellH = (vh - headerOffset - padding) / rows;

        photos.forEach(function(photo, i)
        {
            const link = document.createElement("a");
            link.href = photo.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "floating-photo";

            const img = document.createElement("img");
            img.src = photo.src;
            img.alt = photo.src.split("/").pop().split(".")[0];
            link.appendChild(img);

            canvas.appendChild(link);

            const col = i % cols;
            const row = Math.floor(i / cols);
            const homeX = padding + col * cellW + (cellW / 2) - 90;
            const homeY = headerOffset + row * cellH + (cellH / 2) - 90;

            items.push(
            {
                el: link,
                img: img,
                x: homeX,
                y: homeY,
                vx: 0,
                vy: 0,
                homeX: homeX,
                homeY: homeY,
                rotation: (Math.random() - 0.5) * 6,
                driftOffset: Math.random() * Math.PI * 2,
                width: 240,
                height: 240
            });

            img.onload = function()
            {
                const rect = img.getBoundingClientRect();
                items[i].width = rect.width || 180;
                items[i].height = rect.height || 180;
            };
        });
    }

    document.addEventListener("mousemove", function(e)
    {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener("mouseleave", function()
    {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    function applyCollision(a, b)
    {
        const aCenterX = a.x + a.width / 2;
        const aCenterY = a.y + a.height / 2;
        const bCenterX = b.x + b.width / 2;
        const bCenterY = b.y + b.height / 2;

        const dx = aCenterX - bCenterX;
        const dy = aCenterY - bCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const minDist = COLLISION_RADIUS * 2;

        if (dist < minDist && dist > 0)
        {
            const force = (1 - dist / minDist) * COLLISION_STRENGTH;
            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;

            a.vx += pushX;
            a.vy += pushY;
            b.vx -= pushX;
            b.vy -= pushY;
        }
    }

    function animate()
    {
        const time = Date.now() * 0.001;

        for (let i = 0; i < items.length; i++)
        {
            for (let j = i + 1; j < items.length; j++)
            {
                applyCollision(items[i], items[j]);
            }
        }

        items.forEach(function(item)
        {
            const centerX = item.x + item.width / 2;
            const centerY = item.y + item.height / 2;

            const dx = centerX - mouse.x;
            const dy = centerY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < REPULSION_RADIUS && dist > 0)
            {
                const force = Math.pow(1 - dist / REPULSION_RADIUS, 2) * REPULSION_STRENGTH;
                item.vx += (dx / dist) * force;
                item.vy += (dy / dist) * force;
            }

            item.vx += (item.homeX - item.x) * SPRING_STRENGTH;
            item.vy += (item.homeY - item.y) * SPRING_STRENGTH;

            item.vx += Math.sin(time + item.driftOffset) * 0.02;
            item.vy += Math.cos(time + item.driftOffset) * 0.02;

            item.vx *= DAMPING;
            item.vy *= DAMPING;

            item.x += item.vx;
            item.y += item.vy;

            const vw = window.innerWidth;
            const vh = window.innerHeight;

            if (item.y < 140) item.y = 140;
            if (item.x < 10) item.x = 10;
            if (item.x > vw - item.width - 10) item.x = vw - item.width - 10;
            if (item.y > vh - item.height - 10) item.y = vh - item.height - 10;

            const rotation = item.rotation + (item.vx * 0.5);
            const hoverDist = 60;
            const isHovered = dist < hoverDist;
            const brightness = isHovered ? 1.15 : 0.9;

            item.el.style.transform = "translate(" + item.x + "px, " + item.y + "px) rotate(" + rotation + "deg)";
            item.img.style.filter = "brightness(" + brightness + ")";
        });

        requestAnimationFrame(animate);
    }

    createPhotoElements();
    animate();
})();
