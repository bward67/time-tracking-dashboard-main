/*
[
  {
    title: "Work",
    timeframes: {
      daily: {
        current: 5,
        previous: 7,
      },
      weekly: {
        current: 32,
        previous: 36,
      },
      monthly: {
        current: 103,
        previous: 128,
      },
    },
  },
  {
    title: "Play",
    timeframes: {
      daily: {
        current: 1,
        previous: 2,
      },
      weekly: {
        current: 10,
        previous: 8,
      },
      monthly: {
        current: 23,
        previous: 29,
      },
    },
  },
  {
    title: "Study",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 7,
      },
      monthly: {
        current: 13,
        previous: 19,
      },
    },
  },
  {
    title: "Exercise",
    timeframes: {
      daily: {
        current: 1,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 5,
      },
      monthly: {
        current: 11,
        previous: 18,
      },
    },
  },
  {
    title: "Social",
    timeframes: {
      daily: {
        current: 1,
        previous: 3,
      },
      weekly: {
        current: 5,
        previous: 10,
      },
      monthly: {
        current: 21,
        previous: 23,
      },
    },
  },
  {
    title: "Self Care",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 2,
        previous: 2,
      },
      monthly: {
        current: 7,
        previous: 11,
      },
    },
  },
]; */

//get all the btns daily, weekly and monthly and turn them into an array so that we can use the .click method on it later
const btns = Array.from(document.querySelectorAll(".btns"));
//console.log(btns);
const container = document.querySelector("div.container");
//console.log(container);

let data = [];

//this is to get the button that we are clicking on's option aka daily, weekly or monthly and then when we do to display the cards and the data from the json file on screen
function listenToButtons(item) {
  item.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateClickedButton(btn);
      const clickedOption = btn.dataset.option;
      //console.log(clickedOption); // we get daily, weekly or monthly for which ever btn we click
      //so that later when we displayCards we will grab the correct data from our dataArray which has a timeframe object with daily, weekly and monthly
      displayCards(clickedOption);
    });
  });
}

//this is to get the button that we are clicking on to turn white etc re: the .active class
function activateClickedButton(btn) {
  btns.forEach((item) => {
    //console.log(item);
    //so loop thru all the btns and for each one if it is "active" remove it
    item.classList.remove("active");
    //then for the btn we are currently clicking - add the active class so that it will turn white
    btn.classList.add("active");
  });
}

//1st we fetch the data
const loadData = async () => {
  const response = await fetch("./data.json");
  const fetchedData = await response.json();
  data = fetchedData;
  //console.log(data);
  btns[1].click();
  //so that when the screen first loads the 2nd btn
  //- the weekly btn will be selected because JS will
  //click on this button for us
};

//if we don't do this clearActivities() - each time we click a btn
//a new set of data will be added to the existing data
function clearActivities() {
  const cards = document.querySelectorAll(".card");
  console.log(cards);
  //we will create this class and div in the
  //displayCards function
  cards.forEach((item) => item.remove());
}

//this is our main function and it is a LONG ONE
const displayCards = async (clickedOption) => {
  clearActivities();

  function calcTimeframe(option) {
    if (option === "daily") {
      return "Yesterday";
    } else if (option === "weekly") {
      return "Last Week";
    } else if (option === "monthly") {
      return "Last Month";
    }
  }

  //we want to go into our data Array and grab the activites/title
  //b/c each object in the array is an activity -- work, play, study etc
  data.forEach((item) => {
    //console.log(item);
    const name = item.title;

    //BUT 1 problem is that Self Care has a space so
    //we must add a dash because we can't have space
    //in a class name - we do this:
    const itemClass = name.toLowerCase().replace(" ", "-");

    const timeframeData = item.timeframes[clickedOption];
    //we have 3 timeframes in our data array - daily, weekly, monthly
    //and then we must use the string - clickedOption which we got above
    //the daily, weekly, monthly BUT IT IS A STRING SO WE CAN'T USE dot
    //notation so we must use []

    const previousTimeframe = calcTimeframe(clickedOption);
    //so here it must say yesterday or last week or last month
    //BUT our objects in the array don't give us this so we must create it
    //so we must create a function called calcTimeframe()
    //and we pass it the clickedOption which is our daily, weekly, monthly

    //console.log(itemClass); //gives us all work, play etc with self-care
    //console.log(timeframeData); //gives us the current: 32, previous: 5 etc
    //console.log(previousTimeframe); //we get Yesterday, Last Week, Last Month

    //now we will create a new section which does not currently live
    //in our HTML
    const section = document.createElement("section");

    section.classList.add("cards", itemClass);
    //this will be appended to HTML

    const newSection = `<div class="card card-${itemClass}">
    <div class="card-bg">
          <img src="images/icon-${itemClass}.svg" alt="" />
        </div>
        <div class="card-wrap" id="work">
          <div class="title-line">
            <div class="title">${name}</div>
            <div class="svg">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                  fill="#BBC0FF"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="hours-line">
            <h2 id="current">${timeframeData.current}hrs</h2>
            <p id="previous">${timeframeData.previous}hrs</p>
          </div>
        </div> </div>`;
    section.innerHTML = newSection;
    //console.log(section); //so we get all the sections when we click the btns
    //but we don't want it here - we want to append it to renderCards()
    container.append(section);
    //above we get the container as this is where we want to append our
    //newly created section HTML
  });
}; //FINALLY the END of our displayCards() function

listenToButtons(btns);
loadData(); //Monthly is highlighted/displaying when we load or
//refresh the page
/*
//https://www.youtube.com/watch?v=5m9mgYfVRLg

//40.27

//PART 2
//https://www.youtube.com/watch?v=3A5NPM9M9-I

//20:03

//https://www.youtube.com/watch?v=l9Qw8y3LfCY
//for the JS and grid
//20:00   is the JS
*/

/*
to learn about promises etc
https://www.youtube.com/watch?v=ZYb_ZU8LNxs
*/
