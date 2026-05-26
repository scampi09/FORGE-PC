const buttonHardWear = document.querySelector("#buttonHardWear");
    buttonHardWear.style.backgroundColor = "rgba(121, 82, 37, 0.50)";
    buttonHardWear.style.color = "rgb(255 157 47)";
    buttonHardWear.style.border = "1px solid rgba(255, 158, 47, 0.349)";
const buttonProcessors = document.querySelector("#buttonProcessors");
const buttonGrapicCards = document.querySelector("#buttonGrapicCards");
const buttonMemory = document.querySelector("#buttonMemory");
const buttonMotherboards = document.querySelector("#buttonMotherboards");
const buttonStorage = document.querySelector("#buttonStorage");
const price = document.querySelector("#price");
const priceValue = document.querySelector("#priceValue");
const buttonEnthusiast = document.querySelector("#buttonEnthusiast")
const buttonProffesional = document.querySelector("#buttonProffesional")
const buttonStudio = document.querySelector("#buttonStudio")
const buttonElite = document.querySelector("#buttonElite")



const allButtons = [
    buttonHardWear,
    buttonProcessors,
    buttonGrapicCards,
    buttonMemory,
    buttonMotherboards,
    buttonStorage
];

function resetButtons() {
    allButtons.forEach(button => {
        button.style.backgroundColor = "rgb(19, 19, 19)";
        button.style.color = "#8a8a8a";
        button.style.borderColor = "#8a8a8a";
    });
}

function activateButton(button) {
    resetButtons();

    button.style.backgroundColor = "rgba(121, 82, 37, 0.50)";
    button.style.color = "rgb(255 157 47)";
    button.style.border = "1px solid rgba(255, 158, 47, 0.349)";
}

buttonHardWear.addEventListener("click", function() {
    activateButton(buttonHardWear);
});

buttonProcessors.addEventListener("click", function() {
    activateButton(buttonProcessors);
});

buttonGrapicCards.addEventListener("click", function() {
    activateButton(buttonGrapicCards);
});

buttonMemory.addEventListener("click", function() {
    activateButton(buttonMemory);
});

buttonMotherboards.addEventListener("click", function() {
    activateButton(buttonMotherboards);
});

buttonStorage.addEventListener("click", function() {
    activateButton(buttonStorage);
});



// PRICE SLIDER 


price.addEventListener("input", function () {
  const value = Number(price.value);
  const max = Number(price.max);

  if (value === max) {
    priceValue.textContent = value.toLocaleString() + "+";
  } else {
    priceValue.textContent = value.toLocaleString();
  }

  const percent = (value / max) * 100;

  price.style.background = `linear-gradient(
    to right,
    rgb(255, 157, 47) 0%,
    rgb(255, 157, 47) ${percent}%,
    #333 ${percent}%,
    #333 100%
  )`;
});

buttonEnthusiast.addEventListener("click", function() {
    if(buttonEnthusiast.classList.contains("active")){
        buttonEnthusiast.classList.remove("active")
    }
    else{
        buttonEnthusiast.classList.add("active")  
    }
} )

buttonProffesional.addEventListener("click", function() {
    if(buttonProffesional.classList.contains("active")){
        buttonProffesional.classList.remove("active")
    }
    else{
        buttonProffesional.classList.add("active")  
    }
} ) 

buttonStudio.addEventListener("click", function() {
    if(buttonStudio.classList.contains("active")){
        buttonStudio.classList.remove("active")
    }
    else{
        buttonStudio.classList.add("active")  
    }
} ) 

buttonElite.addEventListener("click", function() {
    if(buttonElite.classList.contains("active")){
        buttonElite.classList.remove("active")
    }
    else{
        buttonElite.classList.add("active")  
    }
} ) 