import anime from 'animejs'
import React from 'react'
import wait from "./wait"

import morb from "../imag/morbius.jpg"
import parnet from "../imag/parnets.png"
import tree from "../imag/Wise_Mystical_Tree.jpg"
import { useEffect } from 'react'

var cancelkeys = ["ArrowDown", "S"]

function About({ InMenu, SetMenu }) {
    wait().then(() => {
        // when you first open the about section
        if (InMenu === "About") {
            anime({
                targets: document.getElementById("sq1"),
                left: "-350px",
                duration: 1000,
                easing: "easeInOutQuad",
                complete: function () {

                }
            })
            anime({
                targets: document.getElementById("sq2"),
                left: "900px",
                duration: 1000,
                easing: "easeInOutSine",
                complete: function () {

                }
            })
        }
    })

    //console.log(InMenu, "funny")
    useEffect(() => {
        function a(v) {
            v = v.key
            console.log(InMenu)
            // closes menu
            if (cancelkeys.indexOf(v) !== -1 && InMenu === "About") {
                // tween out funnies
                anime({ targets: document.getElementById("sq1"), left: "-1200px", duration: 1000, easing: "easeInOutQuad", })
                anime({ targets: document.getElementById("sq2"), left: "1900px", duration: 1000, easing: "easeInOutSine", })

                wait(1).then(() => {
                    // for (var i = 0; i <= 4; i++) {
                    //     anime({
                    //         targets: document.getElementById("triangle" + i),
                    //         scale: 1,
                    //         opacity: 1,
                    //         duration: 1000,
                    //         easing: "easeInOutSine",
                    //     })
                    // }
                    //SetMenu("home")
                })
            }
        }

        document.addEventListener("keyup", a)
        return function () {
            document.removeEventListener("keyup", a)
        }
    }, [InMenu])

    // images for the square icons
    var nuhuh = [morb, parnet, morb, parnet]
    var nuhuh2 = [morb, parnet, morb, parnet]
    var i = 0

    return InMenu === "About" &&
        <div className="z-30 text-white absolute">
            <div className="bg-gradient-to-b from-[#1C4D20] to-[#286B2D] absolute w-[60vw] h-[115vh] rotate-[130deg] -left-[1200px] -top-[150px] p-5" id="sq1">
                <div className="bg-[#0B260E] w-[10rem] h-[10rem] -rotate-[90deg] inline-block m-3 float-left overflow-hidden">
                    <img src={tree} alt="what" className="w-full h-full -rotate-[40deg]"></img>
                </div>
                {nuhuh.map(funny =>
                    <div className="bg-[#0B260E] w-[6rem] h-[6rem] -rotate-[90deg] inline-block m-3 p-2 overflow-hidden" key={++i}>
                        <img src={funny} alt="what" className="w-full h-full -rotate-[40deg]"></img>
                    </div>
                )}

                <div className="w-[10rem] h-[3rem] absolute rotate-[180deg] left-[13rem] top-[8.5rem] text-2xl font-['Courier_New']">
                    EXPERIENCE
                </div>
            </div>

            <div className="bg-gradient-to-b from-[#1C4D20] to-[#286B2D] absolute w-[65vw] h-[115vh] rotate-[310deg] left-[1900px] top-[0px] p-5" id="sq2">
                <div className="bg-[#0B260E] w-[10rem] h-[10rem] -rotate-[90deg] inline-block m-3 float-left overflow-hidden">
                    <img src={tree} alt="what" className="w-full h-full rotate-[140deg]"></img>
                </div>
                {nuhuh2.map(funny =>
                    <div className="bg-[#0B260E] w-[6rem] h-[6rem] -rotate-[90deg] inline-block m-3 p-2 overflow-hidden" key={++i}>
                        <img src={funny} alt="what" className="w-full h-full rotate-[140deg]"></img>
                    </div>
                )}

                <div className="w-[10rem] h-[3rem] absolute rotate-[0deg] left-[13.2rem] top-[9rem] text-2xl font-['Courier_New']">
                    CONTACTS
                </div>
            </div>
        </div>
        || <div></div>
    // probably a gray background with the thangalangs in it
}

export default About