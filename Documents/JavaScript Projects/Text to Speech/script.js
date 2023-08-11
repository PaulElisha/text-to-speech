const textarea = document.querySelector('textarea');
const btn = document.querySelector('button');
let isSpeaking = true;

const textToSpeech = (e) => {
    e.preventDefault();
    checkInputLength();
}

const checkInputLength = () => {
    const textValue = textarea.value;
    const synth = speechSynthesis;

    if (!synth.speaking) {
        const uttterance = new SpeechSynthesisUtterance(textValue);
        synth.speak(uttterance);
    }

    if (textValue.length > 50) {
        if (synth.speaking && isSpeaking) {
            btn.innerText = 'PAUSE';
            synth.resume();
            isSpeaking = false;
        } else {
            btn.innerText = 'RESUME';
            synth.pause();
            isSpeaking = true;           
        }
    } else {
        isSpeaking = false;
        btn.innerText = 'Convert Text to Speech';
    }
    setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
            isSpeaking = true;
            btn.innerText = 'Convert Text to Speech';
        }
    });
}

btn.addEventListener('click', textToSpeech);