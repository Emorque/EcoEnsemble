/* Navbar buttons */
const darkModeButton = document.querySelector("#darkMode-button");
const slowMoButton = document.querySelector("#slowmo-button");

/* Button that scrolls to the top */
const topButton = document.getElementById("top-button");

/* Elements of the starting header */
let header_text = document.getElementById("head_text");
let header_bg = document.getElementById("head_bg");
let foliage = document.getElementById("foliage");

let rates = {
  bg: 0.05,
  foliage: 0.1,
  text: 1
}

/* Starting header Scrolling Animation */
const handleScroll = () => {
  let scrollDistance = window.scrollY;

  header_bg.style.top = scrollDistance * rates.bg + 'px';
  foliage.style.top = scrollDistance * rates.foliage + 'px';
  header_text.style.top = scrollDistance * rates.text + 'px';
}

window.addEventListener('scroll', handleScroll)

/* All elements that will have a sliding animation (left and up) */
let revealableContainers = document.querySelectorAll('.revealable');
let revealableContainersLeft = document.querySelectorAll('.revealable-left');

/* Additional Elements that require slow-down functionality */
let animation_p = document.querySelectorAll('.fade');

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

/* Up Scrolling Animation */
const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');  /* adds the active class to the revealableContainer's classlist */
    } else {
      revealableContainers[i].classList.remove('active');   /* remove the active class to the revealableContainer's classlist */
    }
  }
}

/* Left Scrolling Animation */
const revealLeft = () => {
  for (let i = 0; i < revealableContainersLeft.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainersLeft[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainersLeft[i].classList.add('activeSide');
    } else {
      revealableContainersLeft[i].classList.remove('activeSide');
    }
  }
}

/* Reduce Motion function to slow down animations */
const reduceMotion = () => {
  animation.revealDistance = 70;
  animation.transitionDuration = '3s';
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.revealDistance = animation.revealDistance;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
  }

  for (let i = 0; i < revealableContainersLeft.length; i++){
    revealableContainersLeft[i].style.revealDistance = animation.revealDistance;
    revealableContainersLeft[i].style.transitionDuration = animation.transitionDuration;
  }

  for (let i = 0; i < animation_p.length; i++){
    animation_p[i].style.transitionDuration = animation.transitionDuration;
  }
}

slowMoButton.addEventListener('click', reduceMotion);

/* Petition Elements */
const signNowButton = document.querySelector('#sign-now-button')
const sigList = document.querySelector('#sigs');

let count = 3;

/* Function to add user's input data to the signature list */
const addSignature = (person) => {
  const request = `🖊️ ${person.name} from ${person.homeCity} supports this.`;

  const p = document.createElement('p');
  p.innerText = request;
  p.className = 'p2';
  sigList.appendChild(p);

  const oldCount = document.querySelector('#counter');
  oldCount.remove();

  count = count + 1;
  const sigCount = document.createElement('p');
  sigCount.setAttribute('id', 'counter');
  sigCount.className = 'p2';
  const countText = "🖊️ " + count + " people have signed this petition and support this cause.";
  sigCount.innerText = countText;
  sigList.appendChild(sigCount);

  /* Calls the celebration function (toggleModel) */
  toggleModel(person);
}

/* Function to validate the user's input data */
const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  const email = document.getElementById("email");

  let person = { /* Grabs input data */
    name: petitionInputs[0].value,
    homeCity: petitionInputs[1].value,
    email: petitionInputs[2].value
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
      if (!email.value.includes('.com')) { /* Checks if the email is valid */
        containsErrors = true;
        email.classList.add('error');
        console.log("Hey! You clicked me!");
      }
      else {
        email.classList.remove('error');
      }
    }
  }

  if (containsErrors == false) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

/* Function first calls validateForm -> addSignature -> toggleModel */
signNowButton.addEventListener('click', validateForm);

/* Function to toggle the modal (celebration) */
const toggleModel = (person) => {
  let modal = document.querySelector('#thanks-modal');
  let modalContent = document.querySelector('#thanks-modal-content');
  modal.style.display = "flex";

  modalContent.textContent = `Thank you so much ${person.name}! Earth is getting love from ${person.homeCity}!`;

  setTimeout(() => {
    modal.style.display = "none";
  }, 4000) /*Model will display for 4 seconds before closing */
}

/* Function to scroll to the top of the page */
const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

topButton.addEventListener('click', goToTop);

/* Function to close the modal early if the user wants to close before the timer ends */
let modalCloseButton = document.getElementById("modal-close-button");
const closeModal = () => {
  let modal = document.querySelector('#thanks-modal');
  modal.style.display = "none"
}

modalCloseButton.addEventListener('click', closeModal);

/* Function to toggle dark mode */
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

darkModeButton.addEventListener('click', toggleDarkMode);

/* Scrolling animation are called here */
window.addEventListener('scroll', reveal);
window.addEventListener('scroll', revealLeft);