import anime from 'animejs'
import React from 'react'
import wait from "./wait"
import { useEffect, useState, useMemo } from 'react'

import morb from "../imag/morbius.jpg"
import parnet from "../imag/parnets.png"
import tree from "../imag/Wise_Mystical_Tree.jpg"

var cancelkeys = ["ArrowDown", "S"]
var movers = { "ArrowRight": 1, "ArrowLeft": -1, "a": -1, "d": 1 }

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function PastWork({ InMenu, SetMenu }) {
    let [listpos, setpos] = useState(1)
    let [menuchanged, setmc] = useState(false)
    var worklist = [
        [1, "Sales Template", tree, "https://github.com/B1gChungus/saletemp"],
        [2, "Tours Website", tree, "https://github.com/B1gChungus/tours"],
        [3, "Project Manager", parnet, "https://github.com/B1gChungus/taskmngr-server"],
        [4, "Previous Crapstone", parnet, "https://github.com/B1gChungus/Crapstone"],
        [5, "Calculator", morb, "https://github.com/B1gChungus/calculator-project"]
    ]

    let currentanims = []

    wait().then(() => {
        for (let a = 1; a <= worklist.length; a++) {
            currentanims[a] = anime({
                targets: document.getElementById("projcard" + a),
                scale: 1.1,
                duration: 2000,
                easing: "easeInOutSine", loop: true, direction: "alternate",
                autoplay: listpos == a ? true : false
            })
        }
        if (menuchanged === false && InMenu === "PastWork") {
            anime({ targets: document.getElementById("thedots"), opacity: 0, duration: 0 })
            anime({ targets: document.getElementById("thedots"), opacity: 1, duration: 1000 })

            anime({
                targets: document.getElementById("workholder"), scale: 0,
                rotate: "360deg", duration: 0
            })
            anime({
                targets: document.getElementById("workholder"), scale: {
                    value: 1,
                    duration: 1000,
                },
                rotate: {
                    value: "0deg",
                    delay: 200,
                    duration: 800,
                },
                easing: "easeInOutQuad",
            })
        }
    })

    useEffect(() => {
        function a(v) {
            v = v.key
            console.log(v)
            if (cancelkeys.indexOf(v) !== -1 && InMenu === "PastWork") {
                // tween out funnies
                anime({ targets: document.getElementById("thedots"), opacity: 0, duration: 1000 })

                anime({
                    targets: document.getElementById("workholder"),
                    scale: {
                        value: 0,
                        duration: 1000,
                    },
                    rotate: {
                        value: "360deg",
                        delay: 200,
                        duration: 800,
                    },
                    easing: "easeInOutQuad",
                    complete: function () {
                        wait(1).then(() => {
                            setmc(false)
                        })
                    }
                })
            }
            //console.log("hio squidward", movers[v], InMenu)
            if (movers[v] !== undefined && InMenu === "PastWork") {
                // move the menu using setstate
                // tween out funnies
                currentanims.forEach(v => {
                    v.pause()
                })

                anime({
                    targets: document.getElementById("projcard" + listpos),
                    scale: 1,
                    duration: 500,
                    easing: "easeInOutSine"
                })

                var newfunny = listpos + movers[v]
                setmc(true)
                setpos(clamp(newfunny, 1, worklist.length))
            }
            if (v == "Enter" && InMenu === "PastWork") {
                window.location.href = worklist[listpos][3]
            }
        }

        document.addEventListener("keyup", a)
        return function () {
            document.removeEventListener("keyup", a)
        }
    }, [InMenu, listpos])

    return InMenu === "PastWork" &&
        <div className="z-30 text-white absolute w-full h-full">
            <div id="thedots" className="absolute w-[100vw] flex gap-2 justify-center mt-[95vh] h-[20px]">
                {worklist.map(v => {
                    var pos = v[0]; var fill = "#066E2D"
                    if (pos === listpos) { fill = "#00461B" }
                    return <svg height={pos === listpos ? "50px" : "20px"} width="20" className="" key={pos}>
                        <circle cx="10" cy="10" r="10" stroke="" strokeWidth="3" fill={fill} />
                    </svg>
                })}
            </div>
            <div id="workholder" className="bg-gradient-to-b from-[#1C4D20] to-[#286B2D] m-auto mt-[7.5rem] gap-3 w-[60rem] h-[37rem] drop-shadow-2xl p-4 flex justify-center items-center bg-red-200">
                {worklist.map(v => {
                    var pos = v[0];

                    return <div key={pos} id={"projcard" + pos} className="bg-[#0B260E] w-[15rem] h-[15rem] rounded-md drop-shadow-md">
                        <h1 className="w-full h-[2rem] my-[1rem] text-center font-bold">{v[1]}</h1>
                        <img className='m-auto h-[50%] w-[80%] object-contain' src={v[2]} alt="l"></img>
                    </div>
                })}
            </div>
            {/* <svg height="600" width="600" className="absolute left-[33vw] top-[75vh]">
                <circle cx="250" cy="250" r="250" stroke="" stroke-width="3" fill="rgb(200,200,200)" />
            </svg> */}

        </div>
        || <div></div>
    // probably a gray background with the thangalangs in it
}

export default PastWork