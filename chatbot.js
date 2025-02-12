document.addEventListener("DOMContentLoaded", function () {
    const msgerForm = document.querySelector(".msger-inputarea");
    const msgerInput = document.querySelector(".msger-input");
    const msgerChat = document.querySelector(".msger-chat");
    const sendBtn = document.getElementById("sendBtn");
    const clearBtn = document.getElementById("clearBtn"); // Added Clear button

    const BOT_IMG = "bot.jpg";
    const PERSON_IMG = "person.jpg";
    const BOT_NAME = "BitBot";
    const PERSON_NAME = "You";

    function clearConversation() {
        const chatContainer = document.getElementById("chatContainer");

        // Keep the default message, which is the first child of chatContainer
        const defaultMessage = chatContainer.firstElementChild;

        // Clear all other messages
        while (chatContainer.children.length > 1) {
            chatContainer.removeChild(chatContainer.children[1]);
        }
    }
      
    

    msgerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const msgText = msgerInput.value.trim().toLowerCase();
        if (!msgText) return;
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
        msgerInput.value = "";
        botResponse(msgText);
    });

    clearBtn.addEventListener("click", function () {
        clearConversation();
    });
    
    msgerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const msgText = msgerInput.value.trim().toLowerCase();
        if (!msgText) return;
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
        msgerInput.value = "";
        botResponse(msgText);
    });
  
    function appendMessage(name, img, side, text) {
        const msgHTML = `
            <div class="msg ${side}-msg">
                <div class="msg-img" style="background-image: url(${img})"></div>
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">${name}</div>
                        <div class="msg-info-time">${formatDate(new Date())}</div>
                    </div>
                    <div class="msg-text">${text}</div>
                </div>
            </div>
        `;
        msgerChat.insertAdjacentHTML("beforeend", msgHTML);
        msgerChat.scrollTop = msgerChat.scrollHeight;
    }
  
    function botResponse(userInput) {
        const input = userInput.toLowerCase();
        const response = qaDictionary[input] || qaDictionary["default"];
        appendMessage(BOT_NAME, BOT_IMG, "left", response);
    }
  
    function get(selector, root = document) {
        return root.querySelector(selector);
    }
  
    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }
  
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    recognition.addEventListener("result", function (e) {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript).join(' ');
        msgerInput.value = transcript;
        setTimeout(function () {
            sendBtn.click(); // Click the send button
        }, 3000);
    });
  
    function startVoice() {
        recognition.start();
    }
    
      const qaDictionary = {
            "hi": "Hi! How can I assist you today?",
            "hello": "Hello! How can I assist you today?",
            "hey": "Hey! How can I assist you today?",
            "how are you?": "I'm doing great! How can I assist you today?",
            "what's up?": "I'm doing great! How can I assist you today?",
            "what's your name?": "My name is BitBot. How can I assist you today?",
            
          "death on the nile movie": "Here the movie '<a style='color:yellow' href='deathonthenile.html'>Death on The Nile</a>'  Detective Hercule Poirot investigates a murder on a luxurious cruise ship, uncovering a web of deceit, jealousy and hidden motives among the passengers.",
          "kingsman movie": "Here the movie '<a style='color:yellow' href='kingsman.html'>KingsMan</a>'As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
          "moneyheist": "Here the movie  '<a style='color:yellow' href='moneyheist.html'>Money Heist</a>' To carry out the biggest heist in history, a mysterious man known as 'The Professor' recruits a band of eight robbers who have a single characteristic: nothing to lose.",
          "morbius movie": "Here the movie  '<a style='color:yellow' href='morbius.html'>Morbius</a>' Dr. Michael Morbius, a biochemist with a rare blood disorder, discovers a treatment that inadvertently turns him into a vampire. Now, he must come to terms with his new identity while facing the challenges that come with it.",
          "sonic 2 movie": "Here the movie  '<a style='color:yellow' href='sonic2.html'>Super sonic 2</a>' Sonic and Tails team up to stop the evil plans of the notorious Dr. Robotnik, who is on a mission to conquer the world with his robotic creations.",
          "the adam project movie": "Here the movie '<a style='color:yellow' href='theadamproject.html'>The Adam Project</a>' A time-traveling pilot teams up with his younger self and his late father to come to terms with his past while saving the future.",
          "uncharted movie": "Here the movie  '<a style='color:yellow' href='uncharted.html'>Uncharted</a>'   Nathan Drake, a young treasure hunter, embarks on a perilous journey to uncover the secrets of a lost city while facing numerous challenges and adversaries.",
            
            "tell me about Jurassic Park": "Jurassic Park is a science fiction adventure film directed by Steven Spielberg. It was released in 1993 and is based on the novel by Michael Crichton. The movie is known for its groundbreaking use of CGI and animatronics to bring dinosaurs to life.",
            "recommend a good action movie": "I recommend watching'<a style='color:white' href='guy.html'>THE GUY</a>' It's a high-octane action film directed by George Miller.",
            "who is the actor in 'The Dark Knight'?": "Christian Bale played the role of Batman in 'The Dark Knight.'",
            "give me a list of top 10 movies of all time": "Some of the top-rated movies of all time include 'The Shawshank Redemption,' 'The Godfather,' 'The Dark Knight,' 'Pulp Fiction,' and 'The Lord of the Rings: The Return of the King,' among others.",
            "what's your favorite movie?": "I'm just a bot, so I don't have personal preferences, but I can help you find information about your favorite movies!",
            "tell me a fun fact about 'Star Wars'": "A fun fact about 'Star Wars' is that the iconic sound of a lightsaber was created by combining the hum of an old television and the buzz of a film projector motor.",
            "how can I watch the latest movies online legally?": "You can watch the latest movies legally through various streaming platforms like Netflix, Amazon Prime Video, Hulu, and Disney+. You can also rent or purchase movies on platforms like Google Play Movies and iTunes.",
            "tell me about 'The Lord of the Rings' trilogy": "The 'Lord of the Rings' trilogy is an epic fantasy film series directed by Peter Jackson, based on the novels by J.R.R. Tolkien. It consists of three films: 'The Fellowship of the Ring,' 'The Two Towers,' and 'The Return of the King.' The series follows the journey to destroy the One Ring and save Middle-earth.",
            "recommend a romantic movie": "If you're looking for a romantic movie, consider 'The Notebook,' a heartwarming love story directed by Nick Cassavetes.",
            "who directed 'Inception'?": "Christopher Nolan directed the mind-bending science fiction film 'Inception.'",
            "list some classic movies from the 1950s": "Classic movies from the 1950s include 'Casablanca,' 'Gone with the Wind,' 'Singin' in the Rain,' 'Rear Window,' and '12 Angry Men,' among others.",
            "what's the highest-grossing movie of all time?": "As of my knowledge cutoff date in 2022, 'Avatar' and 'Avengers: Endgame' were among the highest-grossing movies of all time, but it may have changed since then.",
            "tell me an interesting fact about 'The Matrix'": "An interesting fact about 'The Matrix' is that the iconic bullet-dodging scene was created by using a camera rig that spun around Keanu Reeves while he remained stationary.",
            "where can I watch classic black and white movies online?": "You can find classic black and white movies on streaming platforms like Turner Classic Movies (TCM), the Criterion Channel, and on some movies available on Amazon Prime Video and other platforms.",
            "what are the best sci-fi movies of all time?": "Some of the best sci-fi movies of all time include 'Blade Runner,' '2001: A Space Odyssey,' 'The Matrix,' 'E.T. the Extra-Terrestrial,' and 'Alien.'",
            "recommend a family-friendly animated movie": "I recommend 'Toy Story.' It's a heartwarming animated film suitable for the whole family.",
            "who won the Academy Award for Best Director in 2021?": "In 2021, Chloé Zhao won the Academy Award for Best Director for her work on 'Nomadland.'",
            "list some famous movie quotes": "Famous movie quotes include 'Here's looking at you, kid' from 'Casablanca,' 'May the Force be with you' from 'Star Wars,' and 'There's no place like home' from 'The Wizard of Oz.'",
            "tell me about the James Bond movie series": "The James Bond movie series is a long-running spy film franchise featuring the character James Bond, created by Ian Fleming. It includes iconic films like 'Goldfinger,' 'Skyfall,' and 'Casino Royale.'",
            "what is the highest-rated movie on Rotten Tomatoes?": "As of my knowledge cutoff date in 2022, 'Parasite' was one of the highest-rated movies on Rotten Tomatoes. However, ratings may have changed since then.",
            "who starred in 'Forrest Gump'?": "Tom Hanks starred in the title role of 'Forrest Gump.'",
            "where can I watch classic horror movies online?": "You can find classic horror movies on platforms like Shudder, Amazon Prime Video, and Hulu, which offer a variety of horror films from different eras.",
            "tell me about South Indian cinema": "South Indian cinema, also known as Tollywood (Telugu), Kollywood (Tamil), Mollywood (Malayalam), and Sandalwood (Kannada), is a major film industry in India. It produces a wide range of films, including action-packed Telugu movies, emotional Tamil dramas, and vibrant Malayalam and Kannada films. South Indian cinema has a rich cultural heritage and a dedicated fan base.",
            "Recommend a popular Telugu movie": "You might enjoy 'Baahubali: The Beginning,' a Telugu epic film directed by S.S. Rajamouli known for its grandeur and visual effects.",
            "Who is a famous actor in Tamil cinema?": "Rajinikanth and Kamal Haasan are two of the most renowned actors in Tamil cinema, known for their iconic roles and contributions to the industry.",
            "Tell me about the Malayalam film industry": "The Malayalam film industry, based in Kerala, is known for producing quality films with strong storytelling. It has given rise to talented actors, directors, and scriptwriters, and is appreciated for its realistic and socially relevant films.",
            "Recommend a classic Kannada movie": "Consider watching 'Bangarada Manushya,' a classic Kannada film directed by Siddalingaiah that remains a favorite among Kannada film enthusiasts.",
            "What are the popular South Indian film awards?": "Some of the popular South Indian film awards include the Nandi Awards (Telugu), the Filmfare Awards South, the Kerala State Film Awards (Malayalam), and the Karnataka State Film Awards (Kannada).",
            "Tell me a fun fact about South Indian cinema": "A fun fact is that the Telugu film industry, Tollywood, produces the largest number of films in India annually, surpassing even Bollywood in terms of film output.",
            "Tell me about Rajinikanth": "Rajinikanth, often referred to as 'Thalaiva,' is one of the most iconic actors in Indian cinema, particularly in Tamil cinema. He's known for his charismatic style, unique dialog delivery, and a massive fan following. His contributions to cinema are immense.",
            "Recommend a recent Malayalam movie": "You might enjoy 'Drishyam 2,' a critically acclaimed Malayalam thriller film directed by Jeethu Joseph.",
            "Who is the 'Mahanati' of Telugu cinema?": "Savitri, often called the 'Mahanati' (Great Actress) of Telugu cinema, was a legendary actress known for her versatile roles and captivating performances.",
            "Tell me about the impact of South Indian cinema on Indian cinema": "South Indian cinema has had a significant impact on Indian cinema as a whole, with many South Indian films being remade in other Indian languages. The industry is also known for pushing the boundaries in terms of storytelling, technology, and creativity.",
            "Recommend a Kannada movie with great music": "Consider watching 'Mungaru Male,' a Kannada romantic drama known for its melodious music composed by Mano Murthy.",
            "What are some popular Telugu film genres?": "Telugu cinema covers a wide range of genres, including action, family drama, romantic comedies, and historical epics. It's known for its mass entertainers and a mix of commercial and art-house films.",
            "Tell me an interesting fact about South Indian film music": "An interesting fact is that South Indian film music, particularly in Tamil and Telugu cinema, has a dedicated fan base and has given rise to many famous composers and playback singers, making it a crucial part of the cinematic experience.",    
            "Recommend a recent Tamil movie": "You might enjoy 'Soorarai Pottru,' a Tamil biographical drama film directed by Sudha Kongara.",
            "Who is the 'Lady Superstar' of Tamil cinema?": "Nayanthara, often called the 'Lady Superstar' of Tamil cinema, is a popular actress known for her strong performances and versatility.",
            "tell me about the movie 'The Godfather'": "The Godfather is a 1972 American crime film directed by Francis Ford Coppola. It stars Marlon Brando and Al Pacino as the leaders of a fictional New York crime family. The film is based on the novel of the same name by Mario Puzo.",
            "default": "Sorry! I can't help you."        
      };
    });
  