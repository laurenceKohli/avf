import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import scrollama from "scrollama";
import { select } from "d3-selection";

gsap.registerPlugin(ScrollTrigger);

const scrolly = select("#fix");
const figure = scrolly.select("#figure");
const article = scrolly.select("#article");
const step = document.querySelectorAll(".step");

const scrolly2 = select("#fix1");
const figure2 = scrolly2.select("#figure1");
const article2 = scrolly2.select("#article1");
// initialize the scrollama
const scroller = scrollama();

export function initScroll() {
    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: ".step"
        })
        .onStepEnter(handleStepEnter);
}

function handleStepEnter(response) {
    // update graphic based on step
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
                <p class="parole1" style="top: 70px;left: 40px;">Appelez les <span>secours</span> !</p>
                <p class="parole1" style="right:0px">Mon Dieu ! Que lui arrive-t-il ?</p>
                <p class="parole1" style="top: 400px;left: 20px;">Mais <span>faites quelque chose</span> !</p>
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
                <p class="parole" style="top: 70px; right: -40px;">Oh mon Dieu ! Faites quelque chose !</p>
                <p class="parole" style="top: 400px;right: -400px;">C'est <span>inhumain</span> de le regarder sans agir !</p>
                `);
            paroles('.parole', '#step4');
            break;
        case 4:
            figure.html(`
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
        case 6:
            figure2.html(`
                <h2 id="seule">Enfin <span>seule...</span></h2>
                <p class="high" id="seule1">Vous repensez à cette journée</p>
                <p class="high" id="seule2">Vous revoyez le <span>regard paniqué</span> des autres clients, vous vous rappelez les <span>critiques</span>.</p>
                <div id="scrolling-text">
                    <div id="pensees"> 
                        <p class="pensee"><span>Et si</span> on était pas sorti</p>
                        <p class="pensee">Et si j’avais demandé la <span>table au fond</span></p>
                        <p class="pensee">Et si j’avais vérifié son <span>état</span> avant notre départ</p>
                    </div>
                </div>
            `);
            solitude();
            pensees();
            break;
        case 7:
            figure2.html(`
                <h2 id="imp"><span>L'impuissance.</span></h2>
			    <p class="high" id="imp1">Elle vous gagne à nouveau et vous essayer de trouver un sens à tout cela.</p>
                <p class="high" id="imp2">C’était la première fois que vous arriviez à convaincre Tom de vous accompagner et voilà qu’il n'osera plus sortir…</p>
			    <p class="high" id="imp3"><span>à nouveau...</span></p>
            `);
            impuissance();
            break;
        case 8:
            figure2.html(`
                <h3 id="situation">Vous n’êtes pas seul.e à vivre cette situation</h3>
			    <p class="high situation" style="top: 180px; right: 0;"><span>3 personnes sur 1000</span> sont atteintes d’AVF</p>
			    <p class="high situation" style="top: 290px">Sur la population suisse cela représente plus de 8’000 personnes</p>
            `);
            situation();
            break;
        case 9:
            figure2.html(`
                <p id="citation1">" C’est toujours une <span>source de stress</span> et d'inquiétude. 
				Au fil des années nous avons trouvé une manière de gérer les crises avec notre fis, mais cela demande de <span>l’abnégation</span> et de la patience avec beaucoup d’<span>amour</span>."</p>
			    <p id="citation2">" Les passants ont des mouvements de peur ou font des <span>commentaires inadaptés</span> pour trouver des explications."</p>
            `);
            citation();
            break;
        default:
            break;
    }
}

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
            end: "bottom 80%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.2) {
                    gsap.to("#pizzas", { opacity: 0 });
                } else {
                    gsap.to("#pizzas", { opacity: progress });
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

function paroles(querySelectorValue, triggerValue) {
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

function laReponse() {
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

/**
 * Animation de la fin de l'histoire
 */
function solitude() {
    gsap.to("#seule", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step7",
            start: "top 10%",
            end: "top 0%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.01) {
                    gsap.to("#seule", { opacity: 0 });
                } else {
                    gsap.to("#seule", { opacity: progress });
                }
            },
        }
    });

    gsap.to("#seule1", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step7",
            start: "top 0%",
            end: "top -10%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#seule1", { opacity: 0 });
                } else {
                    gsap.to("#seule1", { opacity: progress });
                }
            },
        }
    });

    gsap.to("#seule2", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step7",
            start: "top -10%",
            end: "top -20%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#seule2", { opacity: 0 });
                } else {
                    gsap.to("#seule2", { opacity: progress });
                }
            },
        }
    });
}

function pensees() {
    // Sélection des éléments du texte roulant
    const scrollingText = gsap.utils.toArray('#pensees p.pensee');

    // Animation contrôlée par le défilement
    const scrollTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: "#step7",
            start: "top -20%",
            end: "bottom 50%",
            scrub: true
        }
    });

    // Animation unique pour chaque élément de texte
    scrollingText.forEach((item, i) => {
        // Position initiale (hors écran à droite)
        gsap.set(item, {
            x: window.innerWidth
        });

        // Animation vers la gauche
        scrollTimeline.to(item, {
            x: -(item.offsetWidth * 1.8), // Déplace jusqu'à ce que l'élément sorte de l'écran
            duration: 1.5,
        });
    });
}

function impuissance() {
    gsap.to("#imp", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step7",
            start: "top 10%",
            end: "top 0%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.01) {
                    gsap.to("#imp", { opacity: 0 });
                } else {
                    gsap.to("#imp", { opacity: progress });
                }
            },
        }
    });

    gsap.to("#imp1", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step8",
            start: "top 10%",
            end: "top -20%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#imp1", { opacity: 0 });
                } else {
                    gsap.to("#imp1", { opacity: progress });
                }
            },
        }
    });

    gsap.to("#imp2", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step8",
            start: "top -30%",
            end: "top -40%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#imp2", { opacity: 0 });
                } else {
                    gsap.to("#imp2", { opacity: progress });
                }
            },
        }
    });

    gsap.to("#imp3", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step8",
            start: "top -70%",
            end: "top -80%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#imp3", { opacity: 0 });
                } else {
                    gsap.to("#imp3", { opacity: progress });
                }
            },
        }
    });
}

function situation() {
    gsap.to("#situation", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step8",
            start: "top 10%",
            end: "top 0%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.01) {
                    gsap.to("#situation", { opacity: 0 });
                } else {
                    gsap.to("#situation", { opacity: progress });
                }
            },
        }
    });
    const situations = document.querySelectorAll('.situation');

    situations.forEach((sit, index) => {
        gsap.set(sit, {
            opacity: 0,
        });

        ScrollTrigger.create({
            trigger: "#step9",
            start: `top+=${index * 200}px 40%`, // Décalage progressif du déclenchement
            end: `top+=${(index + 1) * 350}px center`,
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to(sit, { opacity: 0 });
                } else {
                    gsap.to(sit, { opacity: progress });
                }
            },
        });
    });
}

function citation() {
    gsap.to("#citation1", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step10",
            start: "top 20%",
            end: "top 0%",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#citation1", { opacity: 0 });
                } else {
                    gsap.to("#citation1", { opacity: progress });
                }
            },
        }
    });

    gsap.to("#citation2", {
        ease: "power1.in",
        scrollTrigger: {
            trigger: "#step10",
            start: "top 0",
            end: "center center",
            toggleActions: "restart pause reverse pause",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                if (progress < 0.1) {
                    gsap.to("#citation2", { opacity: 0 });
                } else {
                    gsap.to("#citation2", { opacity: progress });
                }
            },
        }
    });
}