(function()
{
    const strength = 5;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    document.addEventListener('mousemove', function(e)
    {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2 * -strength;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2 * -strength;
    });
    function update()
    {
        // Smooth interpolation (lerp)
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        document.body.style.backgroundPosition = `calc(50% + ${currentX}px) calc(50% + ${currentY}px)`;
        requestAnimationFrame(update);
    }
    update();
})();