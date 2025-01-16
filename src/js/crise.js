import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//affiche le texte #crise quand #start est à 30% du haut de la fenêtre
export function start() {
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
export function counter() {
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
export function end() {
    gsap.to("#timer", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step6",
            start: "center 90%",
            end: "center 40%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress > 0.8) {
                    gsap.to("#timer", { opacity: 0 });
                } else {
                    gsap.to("#timer", { opacity: 1 });
                }
            },
        }
    });

    gsap.to("#pizzas", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step6",
            start: "top 5%",
            end: "bottom center",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onEnter: () => gsap.to("#pizzas", { opacity: 1, duration: 0.5 }),
            onLeave: () => gsap.to("#pizzas", { opacity: 0, duration: 0.5 }),
            onEnterBack: () => gsap.to("#pizzas", { opacity: 1, duration: 0.5 }),
            onLeaveBack: () => gsap.to("#pizzas", { opacity: 0, duration: 0.5 })
        }
    });
}

export function habitude() {
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

export function paroles(querySelectorValue, triggerValue) {
    const paroles = document.querySelectorAll(querySelectorValue);

    paroles.forEach((parole, index) => {
        gsap.set(parole, {
            opacity: 0,
        });

        // ScrollTrigger individuel pour chaque parole
        ScrollTrigger.create({
            trigger: triggerValue,
            start: `top+=${index * 200}px 40%`, // Décalage progressif du déclenchement
            end: `top+=${(index + 1) * 350}px center`,
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onEnter: () => gsap.to(parole, { opacity: 1, duration: 0.5 }),
            onLeave: () => gsap.to(parole, { opacity: 0, duration: 0.5 }),
            onEnterBack: () => gsap.to(parole, { opacity: 1, duration: 0.5 }),
            onLeaveBack: () => gsap.to(parole, { opacity: 0, duration: 0.5 })
        });
    });
}

export function laReponse() {
    gsap.to("#reponse", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step5",
            start: "center 50%",
            end: "bottom 80%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.2) {
                    gsap.to("#reponse", { opacity: 0 });
                } else {
                    gsap.to("#reponse", { opacity: progress });
                }
            },
        }
    });
}