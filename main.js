let toggle = document.querySelector(".toggle");
let headerMenu = document.querySelector(".header-menu");
let backBtn = document.querySelector("#back-btn");
let bookMarkBtn = document.querySelector("#bookmark-btn");
let barProggres = document.querySelector(".bar-proggres");
let selectRewardBtns = document.querySelectorAll(".select-reward");
let closeModal = document.querySelector("#close-modal");
let modal = document.querySelector(".modal");

let inputs = Array.from(document.querySelectorAll("input[name='pledge']"));
let bambooStand = document.querySelectorAll(
  "[data-id='bamboo-stand'] .pledge-backers-left span"
);
let blackEdition = document.querySelectorAll(
  "[data-id='black-edition-stand'] .pledge-backers-left span"
);
let mahoganyEdition = document.querySelectorAll(
  "[data-id='mahogany-special-edition'] .pledge-backers-left span"
);
let backed = document.querySelector(".backed span");
let backers = document.querySelector(".backers span");
let goalBackedSpan = document.querySelector(".goal-backed");

let bambooStandBackers = 0;
let blackEditionBackers = 1;
let mahoganyEditionBackers = 1;
let goalBacked = 100000;
let totalBacked = 89914;
let totalBackers = 5007;

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  headerMenu.classList.toggle("open-menu");
  if (toggle.classList.contains("open")) {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  } else {
    document.querySelector(".overlay").remove();
  }
});
backBtn.addEventListener("click", () => {
  modal.classList.add("modal-open");
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.zIndex = "999";
  document.body.appendChild(overlay);
});
bookMarkBtn.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("bookHover");
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("modal-open");
  document.querySelector(".overlay").remove();
});

inputs.forEach((inp) => {
  inp.addEventListener("change", (ev) => {
    addEnterPledge(ev.target.id);
  });
});
function addEnterPledge(inpId) {
  document.querySelectorAll(".pledge-box").forEach((el) => {
    el.classList.remove("border-color");
  });
  document.querySelectorAll(".enter-pledge").forEach((el) => {
    el.remove();
  });
  document.querySelectorAll(".line").forEach((el) => {
    el.remove();
  });
  if (inpId !== "pledge-no-reward") {
    let pledgeBox = document.querySelector(`.modal [data-id=${inpId}]`);
    pledgeBox.classList.add("border-color");
    let line = document.createElement("span");
    line.className = "line";
    let enterPledge = document.createElement("div");
    enterPledge.className = "enter-pledge";
    let label = document.createElement("label");
    label.className = "detail";
    label.setAttribute("for", "pledge-amount");
    label.append(document.createTextNode("Enter your Pledge"));
    let inpGroup = document.createElement("div");
    inpGroup.className = "inp-group";
    let div = document.createElement("div");
    let dollar = document.createElement("span");
    dollar.append(document.createTextNode("$"));
    let pledgeAmount = document.createElement("input");
    pledgeAmount.id = "pledge-amount";
    pledgeAmount.type = "number";
    pledgeAmount.min = "0";
    let pledgeContinueBtn = document.createElement("button");
    pledgeContinueBtn.className = "style-1";
    pledgeContinueBtn.classList.add("pledge-continue-btn");
    pledgeContinueBtn.setAttribute("data-btn-id", inpId);
    pledgeContinueBtn.append(document.createTextNode("Continue"));
    div.appendChild(dollar);
    div.appendChild(pledgeAmount);
    inpGroup.appendChild(div);
    inpGroup.appendChild(pledgeContinueBtn);
    enterPledge.appendChild(label);
    enterPledge.appendChild(inpGroup);
    pledgeBox.appendChild(line);
    pledgeBox.appendChild(enterPledge);
  }
}

function changeState() {
  bambooStand.forEach((el) => {
    el.innerHTML = bambooStandBackers;
  });
  blackEdition.forEach((el) => {
    el.innerHTML = blackEditionBackers;
  });
  mahoganyEdition.forEach((el) => {
    el.innerHTML = mahoganyEditionBackers;
  });
  goalBackedSpan.innerHTML = goalBacked;
  backed.innerHTML = totalBacked;
  backers.innerHTML = totalBackers;
  function disable(val, id) {
    if (val === 0) {
      document.querySelectorAll(`[data-id=${id}]`).forEach((el) => {
        el.classList.add("disabled");
      });
      document.querySelectorAll(`[data-id=${id}] button`).forEach((el) => {
        let dis = document.createAttribute("disabled");
        el.setAttributeNode(dis);
      });
    }
  }
  disable(bambooStandBackers, "bamboo-stand");
  disable(blackEditionBackers, "black-edition-stand");
  disable(mahoganyEditionBackers, "mahogany-special-edition");
  let proggres = (totalBacked / goalBacked) * 100;
  console.log(proggres);
  barProggres.style.width = `${proggres}%`;
}
changeState();

document.addEventListener("click", (ev) => {
  let id = ev.target.getAttribute("data-btn-id");
  if (ev.target.classList.contains("pledge-continue-btn")) {
    document.querySelectorAll(".error-massege").forEach((el) => {
      el.remove();
    });
    let input = document.querySelector(`.modal [data-id=${id}] #pledge-amount`);
    function inputVal(inpId, min, backerVal) {
      if (id === inpId) {
        if (backerVal > 0) {
          if (input.value) {
            if (parseFloat(input.value) >= min) {
              backerVal -= 1;
              inpId === "bamboo-stand"
                ? (bambooStandBackers = backerVal)
                : inpId === "black-edition-stand"
                ? (blackEditionBackers = backerVal)
                : inpId === "mahogany-special-edition"
                ? (mahoganyEditionBackers = backerVal)
                : "";
              totalBackers += 1;
              totalBacked += parseFloat(input.value);
              changeState();
              closeModal.click();
              document.querySelectorAll("#pledge-amount").forEach((el) => {
                el.value = "";
              });
              document.querySelector("#close-modal").click;

              let modalComplete = document.createElement("div");
              modalComplete.classList.add("modal-complete");
              let modalCompleteImg = document.createElement("img");
              modalCompleteImg.src = "images/icon-check.svg";
              let modalCompleteHeading = document.createElement("h2");
              modalCompleteHeading.appendChild(
                document.createTextNode("Thanks for your support")
              );
              let modalCompleteP = document.createElement("p");
              modalCompleteP.appendChild(
                document.createTextNode(
                  `Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
                  an email once our campaign is completed.
                  Got it!`
                )
              );
              modalCompleteP.classList.add("detail");
              let modalCompleteBtn = document.createElement("button");
              modalCompleteBtn.appendChild(document.createTextNode("Got it!"));
              modalCompleteBtn.classList.add("style-1");
              modalCompleteBtn.addEventListener("click", () => {
                modalComplete.remove();
                document.querySelector(".overlay").remove();
              });
              modalComplete.appendChild(modalCompleteImg);
              modalComplete.appendChild(modalCompleteHeading);
              modalComplete.appendChild(modalCompleteP);
              modalComplete.appendChild(modalCompleteBtn);
              document
                .querySelector(".main-content")
                .appendChild(modalComplete);
              let overlay = document.createElement("div");
              overlay.className = "overlay";
              document.body.appendChild(overlay);
              overlay.style.zIndex = "1000";
            } else {
              let box = document.querySelector(
                `.modal [data-id=${id}] .inp-group`
              );
              let minError = document.createElement("span");
              minError.appendChild(
                document.createTextNode(`min pledge is ${min}`)
              );
              minError.classList.add("error-massege");

              box.prepend(minError);
            }
          } else {
            let box = document.querySelector(
              `.modal [data-id=${id}] .inp-group`
            );
            let errorEmbty = document.createElement("span");
            errorEmbty.appendChild(
              document.createTextNode("this Can't be embty")
            );
            errorEmbty.classList.add("error-massege");
            box.prepend(errorEmbty);
          }
        }
      }
    }
    inputVal("bamboo-stand", 25, bambooStandBackers);
    inputVal("black-edition-stand", 75, blackEditionBackers);
    inputVal("mahogany-special-edition", 200, mahoganyEditionBackers);
  }
});

selectRewardBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    backBtn.click();
    let inpId = e.target.getAttribute("data-id-btn-reward");
    let input = document.querySelector(`#${inpId}`);
    let ch = document.createAttribute("checked");
    input.setAttributeNode(ch);
    addEnterPledge(inpId);
  });
});
