const email = "samuel.agudelo534@gmail.com";
let currentState = 0;

function toggleEmail()
{
    const state0 = document.getElementById("email-state-0");
    const state1 = document.getElementById("email-state-1");
    const state2 = document.getElementById("email-state-2");
    const container = document.getElementById("email-container");

    if (currentState === 0)
    {
        state0.style.display = "none";
        state1.style.display = "inline";
        state1.style.backgroundColor = "var(--foreground)";
        state1.style.color = "var(--background)";
        state1.style.padding = "0 4px";
        currentState = 1;
    }
    else if (currentState === 1)
    {
        state1.style.display = "none";
        state2.style.display = "inline";
        state2.style.backgroundColor = "var(--foreground)";
        state2.style.color = "var(--background)";
        state2.style.padding = "0 4px";
        currentState = 2;

        navigator.clipboard.writeText(email);

        setTimeout(function()
        {
            state2.style.display = "none";
            state0.style.display = "block";
            container.style.backgroundColor = "transparent";
            container.style.color = "";
            container.style.padding = "0";
            currentState = 0;
        }, 3000);
    }
}
