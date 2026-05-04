(function()
{
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*^';

    function randomChar()
    {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    document.addEventListener('mouseover', function(e)
    {
        const link = e.target.closest('a');
        if (!link || link.dataset.scrambleBound) return;
        if (!link.textContent.trim()) return;

        link.dataset.scrambleBound = 'true';

        link.addEventListener('mouseenter', function()
        {
            if (!this.dataset.original)
            {
                this.dataset.original = this.textContent;
            }

            const text = this.dataset.original;
            let step = 0;

            clearInterval(this._scrambleInterval);

            this._scrambleInterval = setInterval(function()
            {
                let result = '';
                for (let i = 0; i < text.length; i++)
                {
                    if (i < step)
                    {
                        result += text[i];
                    }
                    else
                    {
                        result += randomChar();
                    }
                }
                link.textContent = result;
                step++;

                if (step > text.length)
                {
                    clearInterval(link._scrambleInterval);
                    link.textContent = text;
                }
            }, 40);
        });

        link.addEventListener('mouseleave', function()
        {
            clearInterval(this._scrambleInterval);
            if (this.dataset.original)
            {
                this.textContent = this.dataset.original;
            }
        });
    });
})();
