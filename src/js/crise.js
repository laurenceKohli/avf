import scrollama from "scrollama";
import { select } from "d3-selection";

const scrolly = select("#fix");
const figure = scrolly.select("figure");
const article = scrolly.select("article");
const step = document.querySelectorAll(".step");
// initialize the scrollama
const scroller = scrollama();

function handleStepEnter(response) {
    // update graphic based on step
    console.log(response.index);
    switch (response.index) {
        case 0:
            figure.html(`
                <p class="small">Votre table est située au centre de la pièce. </p>
			    <p class="high" id="crise">A peine êtes-vous installés que Tom se couche par terre et part en <span>crise</span>.</p>
            `)
            start();
            counter();
            break;
        case 1:
           figure.html(`
                <p class="parole">Appelez les <span>secours</span> !</p>
                <p class="parole">Mon Dieu ! Que lui arrive-t-il ?</p>
                <p class="parole">Mais <span>faites quelque chose</span> !</p>
            `)
            break;
        case 2:
            figure.html(`
                <p id="txt" class="high hidden">Certains parents seraient paniqués mais pas vous.</p>
                <p id="habitude" class="hidden">Vous avez <span>l’habitude</span></p>
			    <p id="txt2" class="high hidden">Vous fermez les yeux, respirez et c’est reparti...</p>
            `);
            habitude();
            break;
        case 3:
            figure.html(`
                <p class="parole">Il va <span>mourir</span> !</p>
                <p class="parole">Oh mon Dieu ! Faites quelque chose !</p>
                <p class="parole">C'est <span>inhumain</span> de le regarder sans agir !</p>
                `);
            break;
        case 4:
            figure.html(`
                <img src="assets/img/sol.jpg" alt="Personne au sol">
			<div>
				<p class="high">Alors qu’il hurle de douleur, vous <span>rassurez</span> les autres clients en leur disant que tout est <span>sous contrôle</span>.</p>
				<p id="reponse" class="parole">Pas besoin d’ambulance</p>
			</div>
            `);
            break;
        case 5:
            figure.html(`
                <p class="higher"><span>30 minutes</span> plus tard, Tom finit par reprendre pieds. Il est fatigué. </p>
			    <p class="high">Toute la famille rentre, un carton de pizza sous le bras.</p>
            `);
            end();
            break;
        default:
            break;
    }
}

export function initCriseScroll() {
          // 2. setup the scroller passing options
          // 		this will also initialize trigger observations
          // 3. bind scrollama event handlers (this can be chained like below)
          scroller
              .setup({
                  step: ".step",
                  debug: true
              })
              .onStepEnter(handleStepEnter);
      }


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//affiche le texte #crise quand #start est à 30% du haut de la fenêtre
function start() {
	gsap.to("#crise", {
		ease: "power1.in", 
		scrollTrigger: {
			trigger: "#step1", 
			start: "top 10%", 
			end: "bottom 75%", 
			toggleActions: "restart pause reverse pause",
			scrub: true,
			onUpdate: self => {
				const progress = self.progress;
				if (progress < 0.2) {
					gsap.to("#crise", { opacity: 0 });
				} else {
					gsap.to("#crise", { opacity: progress });
				}
			},
		}
	});
}

/**
 * Compte le temps écoulé entre #start et #pause
 * et affiche le temps écoulé dans #timer
 */
function counter() {
	let counter = 0;
	gsap.to("#timer", {
		ease: "power1.in",
		scrollTrigger: {
			trigger: "#step1",
			start: "bottom 75%",
			endTrigger: "#step3",
			end: "top 40%",
			toggleActions: "restart pause reverse pause",
			scrub: true,
            markers: true,
			onUpdate: self => {
				const progress = self.progress;
				if (progress < 0.01) {
					gsap.to("#timer", { opacity: 0 });
				} else {
					gsap.to("#timer", { opacity: 1 });
					counter = Math.round(progress * 1000);
					document.querySelector("#timer p").innerHTML = (counter / 100).toFixed(2);
				}
                if (progress > 0.99) {
                    gsap.to("#timer", { opacity: 0 });
                }
			}
		}
	});

	gsap.to("#timer", {
		ease: "power1.in", 
		scrollTrigger: {
			trigger: "#step3", 
			start: "bottom 50%",
			endTrigger: "#step6",
			end: "center 95%",
			toggleActions: "restart pause reverse pause",
			scrub: true,
			onUpdate: self => {
				const progress = self.progress;
				if (self.progress < 0.8) {
                    gsap.to("#timer", { opacity: 1 });
					counter = Math.round(progress * 1000 + 1000);
					document.querySelector("#timer p").innerHTML = (counter / 100).toFixed(2);
				}
				else {
					counter = Math.round(progress * 2000 + 1000);
					document.querySelector("#timer p").innerHTML = (counter / 100).toFixed(2);
				}
                
                if (progress < 0.01) {
                    gsap.to("#timer", { opacity: 0 });
                }
			},
    }
	});
}

/**
 * Cache le texte #timer quand #fin est à 60% du haut de la fenêtre
 */
function end() {
	gsap.to("#timer", {
		ease: "power1.in", 
		scrollTrigger: {
			trigger: "#step6",
			start: "center 90%", 
			end: "center 60%", 
			toggleActions: "restart pause reverse pause",
			scrub: true, 
			markers: true,
			onUpdate: self => {
				const progress = self.progress;
				console.log(progress);
				if (progress > 0.8) {
					gsap.to("#timer", { opacity: 0 });
				} else {
					gsap.to("#timer", { opacity: 1 });
				}
			},
		}
	});
}

function habitude() {
    gsap.to("#txt", {
        ease: "power1.in", 
        scrollTrigger: {
            trigger: "#step3", 
            start: "top 40%", 
            end: "top 10%", 
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.2) {
                    gsap.to("#txt", { opacity: 0 });
                } else {
                    gsap.to("#txt", { opacity: progress });
                }
            },
        }
    });
    gsap.to("#habitude", {
        ease: "power1.in", 
        scrollTrigger: {
            trigger: "#step3", 
            start: "top 30%", 
            end: "center 50%", 
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.2) {
                    gsap.to("#habitude", { opacity: 0 });
                } else {
                    gsap.to("#habitude", { opacity: progress });
                    gsap.to("#habitude", { fontSize: progress * 20 + 35 + "px" });
                }
            },
        }
    });

    gsap.to("#txt2", {
        ease: "power1.in", 
        scrollTrigger: {
            trigger: "#step3", 
            start: "center 50%", 
            end: "bottom 80%", 
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.2) {
                    gsap.to("#txt2", { opacity: 0 });
                } else {
                    gsap.to("#txt2", { opacity: progress });
                }
            },
        }
    });

}