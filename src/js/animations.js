import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import scrollama from "scrollama";
import { select } from "d3-selection";
import { start, counter, habitude, laReponse, end, paroles } from "./crise";

gsap.registerPlugin(ScrollTrigger);

export function playCar() {
	gsap.to("#car", {
		ease: "power1.in", // Fonction d'easing pour un mouvement doux
		//duration: 1, // Durée de l'animation
		scrollTrigger: {
			trigger: "#intro", // Déclencheur pour l'animation
			start: "top top", // Début de l'animation lorsque le haut de l'élément déclencheur atteint le haut de la fenêtre
			end: "bottom 20%", // Fin de l'animation lorsque l'élément déclencheur atteint le bas de la fenêtre
			toggleActions: "restart pause reverse pause",
			scrub: true, // Faites en sorte que l'animation se synchronise avec le défilement
			onUpdate: self => {
				const progress = self.progress;
				let xPosition = 120 - progress * 500;
				let yPosition = progress * 600 - 160;
				if (progress < 0.2 || progress > 0.95) {
					gsap.to("#car", { opacity: 0 });
				} else {
					gsap.to("#car", { opacity: 1 });
					if (progress > 0.25) {
						gsap.set("#car", { x: xPosition, y: yPosition });
					}
				}
			},
		}
	});
}

const scrolly = select("#fix");
const figure = scrolly.select("figure");
const article = scrolly.select("article");
const step = document.querySelectorAll(".step");
// initialize the scrollama
const scroller = scrollama();

export function initScroll() {
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
                <p class="parole1" style="top: 70px;left: 150px;">Appelez les <span>secours</span> !</p>
                <p class="parole1">Mon Dieu ! Que lui arrive-t-il ?</p>
                <p class="parole1" style="top: 400px;left: 50px;">Mais <span>faites quelque chose</span> !</p>
                <p class="parole1"></p>
            `)
            paroles('.parole1', '#step2');
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
                <p class="parole" style="top: 70px; left: -250px;">Oh mon Dieu ! Faites quelque chose !</p>
                <p class="parole" style="top: 400px;left: -100px;">C'est <span>inhumain</span> de le regarder sans agir !</p>
                `);
            paroles('.parole', '#step4');
            break;
        case 4:
            figure.html(`
                <img src="assets/img/sol.jpg" alt="Personne au sol">
			<div>
				<p class="high">Alors qu’il hurle de douleur, vous <span>rassurez</span> les autres clients en leur disant que tout est <span>sous contrôle</span>.</p>
				<p id="reponse" class="parole">Pas besoin d’ambulance...</p>
			</div>
            `);
            laReponse();
            break;
        case 5:
            figure.html(`
                <p class="higher"><span>30 minutes</span> plus tard, Tom finit par reprendre pieds. Il est fatigué. </p>
			    <p class="high" id="pizzas">Toute la famille rentre, un carton de pizza sous le bras.</p>
            `);
            end();
            break;
        default:
            break;
    }
}
