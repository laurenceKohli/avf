import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

//affiche le texte #crise quand #start est à 30% du haut de la fenêtre
export function start() {
	gsap.to("#crise", {
		ease: "power1.in", 
		scrollTrigger: {
			trigger: "#start", 
			start: "top 30%", 
			end: "bottom bottom", 
			toggleActions: "restart pause reverse pause",
			scrub: true,
			onUpdate: self => {
				const progress = self.progress;
				if (progress < 0.2) {
					gsap.to("#crise", { opacity: 0 });
				} else {
					gsap.to("#crise", { opacity: 1 });
				}
			},
		}
	});
}

/**
 * Compte le temps écoulé entre #start et #pause
 * et affiche le temps écoulé dans #timer
 */
export function counter() {
	let counter = 0;
	gsap.to("#timer", {
		ease: "power1.in",
		scrollTrigger: {
			trigger: "#start",
			start: "top top",
			endTrigger: "#pause",
			end: "top 75%",
			toggleActions: "restart pause reverse pause",
			scrub: true,
			onUpdate: self => {
				const progress = self.progress;
				if (progress < 0.01) {
					gsap.to("#timer", { opacity: 0 });
				} else {
					gsap.to("#timer", { opacity: 1 });
					counter = Math.round(progress * 1000);
					document.querySelector("#timer p").innerHTML = (counter / 100).toFixed(2);
				}

			}
		}
	});

	gsap.to("#timer", {
		ease: "power1.in", 
		scrollTrigger: {
			trigger: "#pause", 
			start: "bottom 80%",
			endTrigger: "#fin",
			end: "center 95%",
			toggleActions: "restart pause reverse pause",
			scrub: true,
			onUpdate: self => {
				const progress = self.progress;
				if (self.progress < 0.8) {
					counter = Math.round(progress * 1000 + 1000);
					document.querySelector("#timer p").innerHTML = (counter / 100).toFixed(2);
				}
				else {
					counter = Math.round(progress * 2000 + 1000);
					document.querySelector("#timer p").innerHTML = (counter / 100).toFixed(2);
				}
			}
		}
	});
}

/**
 * Cache le texte #timer quand #fin est à 60% du haut de la fenêtre
 */
export function end() {
	gsap.to("#timer", {
		ease: "power1.in", 
		scrollTrigger: {
			trigger: "#fin",
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