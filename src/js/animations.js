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