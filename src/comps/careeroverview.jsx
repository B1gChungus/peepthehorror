import anime from 'animejs'
import React from 'react'
import wait from "./wait"
import { useEffect, useState } from 'react'

import morb from "../imag/morbius.jpg"
import parnet from "../imag/parnets.png"
import tree from "../imag/Wise_Mystical_Tree.jpg"

var cancelkeys = ["ArrowDown", "S"]
var movers = { "ArrowRight": 1, "ArrowLeft": -1, "a": -1, "d": 1 }

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function CareerOverview({ InMenu, SetMenu }) {
    let [listpos, setpos] = useState(2)
    let [menuchanged, setmc] = useState(false)

    wait().then(() => {
        console.log(menuchanged, InMenu)
        if (menuchanged === false && InMenu === "CareerOverview") {
            anime({ targets: document.getElementById("thedots"), opacity: 0, duration: 0 })
            anime({ targets: document.getElementById("thedots"), opacity: 1, duration: 1000 })
            for (let i = 1; i <= 3; i++) {
                anime({ targets: document.getElementById("jobcard" + i), scale: 0, rotate: "360deg", duration: 0 })
                anime({
                    targets: document.getElementById("jobcard" + i),
                    scale: {
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
        }
    })

    useEffect(() => {
        function a(v) {
            v = v.key

            if (cancelkeys.indexOf(v) !== -1 && InMenu === "CareerOverview") {
                // tween out funnies
                anime({ targets: document.getElementById("thedots"), opacity: 0, duration: 1000 })
                for (let i = 1; i <= 3; i++) {
                    anime({
                        targets: document.getElementById("jobcard" + i),
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

            }
            //console.log("hio squidward", movers[v], InMenu)
            if (movers[v] !== undefined && InMenu === "CareerOverview") {
                // tween out funnies
                var newfunny = listpos + movers[v]
                //console.log("upped position", listpos, movers[v], newfunny)
                setmc(true)
                setpos(clamp(newfunny, 1, joblist.length))
            }
        }

        document.addEventListener("keyup", a)
        return function () {
            document.removeEventListener("keyup", a)
        }
    }, [InMenu, listpos])

    var joblist = [
        [1, "The Spectacular Job 1", morb, "This job has not been made yet"],
        [2, "The Spectacular Job 2", parnet, "One of the best jobs I have ever had..."],
        [3, "The Spectacular Job 3", tree, "This job has not been made yet"]
    ]

    return InMenu === "CareerOverview" &&
        <div className="z-30 text-white absolute w-full h-full">
            <div id="thedots" className="absolute w-[100vw] flex gap-2 justify-center mt-[95vh] h-[20px]">
                {joblist.map(v => {
                    var pos = v[0]; var fill = "#066E2D"
                    if (pos === listpos) { fill = "#00461B" }
                    return <svg height={pos === listpos ? "50px" : "20px"} width="20" className="" key={pos}>
                        <circle cx="10" cy="10" r="10" stroke="" strokeWidth="3" fill={fill} />
                    </svg>
                })}
            </div>
            <div className="w-full h-full">
                {joblist.map(v => {
                    var pos = v[0]; var left = "30%"; var top = "15%"; var z = 2
                    if (pos < listpos) {
                        left = (5 - 10 * (listpos - pos - 1)) + "%";
                        top = (25 + 10 * (listpos - pos - 1)) + "%";
                        z = pos

                    } else if (pos > listpos) {
                        left = (55 - 10 * (listpos - pos + 1)) + "%";
                        top = (25 - 10 * (listpos - pos + 1)) + "%";
                        z = -pos
                    }

                    wait().then(() => {
                        anime({ targets: document.getElementById("jobcard" + pos), left: left, top: top, duration: 500, easing: "easeInOutQuad", })
                    })

                    return <div key={pos} id={"jobcard" + pos} className="absolute w-[40vw] h-[60vh] bg-gradient-to-b from-[#00461B] to-[#066E2D] drop-shadow-2xl p-4" style={{ zIndex: z }}>
                        <h1 className="w-full h-[4rem] text-center text-2xl font-bold">{v[1]}</h1>
                        <img className='m-auto h-[50%] w-[80%] mb-8 object-contain' src={v[2]} alt="l"></img>
                        <h2 className="mx-4 text-xl text-center">{v[3]}</h2>
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

export default CareerOverview