import "../styles/modern-normalizer.css"
import '../styles/style.css'
import '../styles/components/header.css'
import "..//styles/utils.css"



// query selectors 
const word = document.querySelector('.word');
const btn = document.querySelector('button');
const wordDetailsContainer = document.getElementById('word-details');

//localStorage.setItem('word', word.value);


// declarations

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

//fetchData(url)

// event listeners
btn.addEventListener('click', ()=>{
  searchWord(word.value);
  word.value = '';
    //saveToLocalstorage(word.value)
})



// functions
function searchWord(word) {
    fetchData(url + word);
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    displayData(data)
}


function saveToLocalstorage(word) {
    localStorage.setItem('word', word);
}


function displayData(data) { 


    try {

        wordDetailsContainer.innerHTML = ''
      data.forEach(entry => {
        const wordElement = document.createElement('h2');
        wordElement.textContent = entry.word;
        wordDetailsContainer.appendChild(wordElement);
      
        entry.phonetics.forEach(phonetic => {
          if (phonetic.audio) {
            const audioElement = document.createElement('audio');
            audioElement.src = phonetic.audio;
            audioElement.controls = true;
            wordDetailsContainer.appendChild(audioElement);
          }
      
          if (phonetic.text) {
            const phoneticTextElement = document.createElement('p');
            phoneticTextElement.textContent = `Phonetic: ${phonetic.text}`;
            wordDetailsContainer.appendChild(phoneticTextElement);
          }
        });
      
        entry.meanings.forEach(meaning => {
          const partOfSpeechElement = document.createElement('h3');
          partOfSpeechElement.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
          wordDetailsContainer.appendChild(partOfSpeechElement);
      
          meaning.definitions.forEach(definition => {
            const definitionElement = document.createElement('p');
            definitionElement.textContent = `Definition: ${definition.definition}`;
            wordDetailsContainer.appendChild(definitionElement);
      
            if (definition.synonyms.length > 0) {
              const synonymsElement = document.createElement('p');
              synonymsElement.textContent = `Synonyms: ${definition.synonyms.join(', ')}`;
              wordDetailsContainer.appendChild(synonymsElement);
            }
      
            if (definition.antonyms.length > 0) {
              const antonymsElement = document.createElement('p');
              antonymsElement.textContent = `Antonyms: ${definition.antonyms.join(', ')}`;
              wordDetailsContainer.appendChild(antonymsElement);
            }
      
            if (definition.example) {
              const exampleElement = document.createElement('p');
              exampleElement.textContent = `Example: ${definition.example}`;
              wordDetailsContainer.appendChild(exampleElement);
            }
          });
        });
      });

    } catch(error) {
        console.error('Error occured', error);
        wordDetailsContainer.innerHTML = `<h1>Error occured, ${error} Word not found.</h1>`
    }

    

      
  
}