export function setupCounter(element) {
    let counter = 0
    const setCounter = (count) => {
        counter = count
        element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
}

export function deploySimulation(btnElement, statusTextElement, statusIndicatorElement) {
    btnElement.addEventListener('click', () => {
        btnElement.disabled = true;
        btnElement.innerHTML = "Fazendo Deploy...";
        statusTextElement.innerHTML = "Fazendo Deploy...";
        statusIndicatorElement.style.backgroundColor = "#ffcc00"; // Yellow for pending
        statusIndicatorElement.style.boxShadow = "0 0 10px #ffcc00";

        setTimeout(() => {
            btnElement.innerHTML = "Deployado!";
            statusTextElement.innerHTML = "Sistema Ativo";
            statusIndicatorElement.classList.add('ativo');

            // Reset after a few seconds
            setTimeout(() => {
                btnElement.disabled = false;
                btnElement.innerHTML = "Fazer Deploy";
            }, 2000);
        }, 1500);
    });
}

export function shutdownSimulation(btnElement, statusTextElement, statusIndicatorElement) {
    btnElement.addEventListener('click', () => {
        btnElement.disabled = true;
        btnElement.innerHTML = "Desligando...";
        statusTextElement.innerHTML = "Desligando...";
        statusIndicatorElement.style.backgroundColor = "#ff4444"; // Red for danger/off
        statusIndicatorElement.style.boxShadow = "0 0 10px #ff4444";

        setTimeout(() => {
            btnElement.innerHTML = "Desligado";
            statusTextElement.innerHTML = "Sistema Offline";
            statusIndicatorElement.classList.remove('ativo');
            statusIndicatorElement.classList.add('offline');

            // Reset after a few seconds
            setTimeout(() => {
                btnElement.disabled = false;
                btnElement.innerHTML = "Desligar Sistema";
                statusTextElement.innerHTML = "Sistema Inativo";
                statusIndicatorElement.style.backgroundColor = "#555";
                statusIndicatorElement.style.boxShadow = "0 0 5px #555";
            }, 3000);
        }, 2000);
    });
}

// Initialize if we are in the browser
if (typeof document !== 'undefined') {
    const deployBtn = document.querySelector('#deployBtn');
    const shutdownBtn = document.querySelector('#shutdownBtn');
    const statusText = document.querySelector('#status-text');
    const statusIndicator = document.querySelector('#status-indicator');

    if (deployBtn && statusText && statusIndicator) {
        deploySimulation(deployBtn, statusText, statusIndicator);
    }

    if (shutdownBtn && statusText && statusIndicator) {
        shutdownSimulation(shutdownBtn, statusText, statusIndicator);
    }
}
