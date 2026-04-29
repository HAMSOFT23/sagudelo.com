(function()
{
    const strength = 5; // max pixel shift
    document.addEventListener('mousemove', function(e)
    {
        // Normalize cursor position to -1 to 1 range
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        // Calculate offset (inverted so background moves opposite to cursor)
        const offsetX = x * strength;
        const offsetY = y * strength;
        // Apply to background-position
        document.body.style.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
    });
})();