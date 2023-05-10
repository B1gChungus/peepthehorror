import React from 'react'
import { useMemo, useEffect } from 'react'
//import { findDOMNode } from 'react-dom';
import wait from "./wait"
import anime from "animejs"

function Spawntriangles({ InMenu, SetMenu }) {
    var children = []
    var cancelkeys = ["ArrowDown", "S"]

    function geny() { // generate y axis position, returns numbers only 10 higher/lower than other numbers
        var funnies = []
        var y
        for (var i = 0; i <= 4; i++) {
            function what() {
                y = Math.random() * 80 + 5
                return funnies.every((v) => {
                    //console.log(v)
                    return Math.abs(y - v) > 10
                })
            }

            var passed = what()
            while (!passed) {
                passed = what()
            }
            //console.log("added", y)
            funnies.push(y)
        }
        return funnies
    }

    var triangley = useMemo(geny, [])
    var autoplay = useMemo(() => { return [true, true, true, true, true] }, [])
    var trianglemovers = useMemo(() => { return [] }, [])

    var trianglelinks = [
        { Name: "About", Image: "" },
        { Name: "CareerOverview", Image: "" },
        { Name: "PastWork", Image: "" },
        { Name: "About", Image: "" },
        { Name: "About", Image: "" },
    ]

    useEffect(() => {
        function a(v) {
            if (InMenu !== "home" && cancelkeys.indexOf(v.key) !== -1) {
                // tween out funnies
                wait(1).then(() => {
                    for (var i = 0; i <= 4; i++) {
                        anime({
                            targets: document.getElementById("triangle" + i),
                            scale: 1,
                            opacity: 1,
                            duration: 1000,
                            easing: "easeInOutSine",
                            complete: function () {
                                SetMenu("home")
                            }
                        })
                    }
                    for (var a in trianglemovers) {
                        autoplay[a] = true
                        //trianglemovers[a].play()
                    }
                })
            }
        }

        document.addEventListener("keyup", a)
        return function () {
            document.removeEventListener("keyup", a)
        }
    }, [InMenu])

    function AddTriangle(i) {
        // tailwind does not support random values for classnames (get better loser)
        //ANIMATE TRIANGLES TO THE RIGHT
        var triname = "triangle" + i
        var node, animate
        var triang = <div key={i} className={`absolute -left-[120px] hover:scale-100 hover:z-10`} id={`${triname}`} style={{ top: `${triangley[i]}%` }}>
            <svg height="120" width="120" className="hover:scale-150 transition-transform ease-out duration-100">
                <polygon points="0,120 60,0 120,120" style={{ fill: "rgb(25,25,25)" }} />
            </svg>
        </div>
        children[i] = triang

        wait(0).then(() => {
            node = document.getElementById(triname)
            if (!trianglemovers[i]) {
                animate = anime({
                    targets: node,
                    translateX: "108vw",
                    rotate: "360deg",
                    duration: 12000,
                    loop: true,
                    autoplay: autoplay[i] && true || false,
                    easing: "linear",
                    delay: i * 2500,
                    loopComplete: function (anis) {
                        //geny(i, triangley[i])
                    }
                })
                trianglemovers.push(animate)
            } else {
                animate = trianglemovers[i]
                if (autoplay[i]) {
                    animate.play()
                }
            }

            //wait(i * 2.5).then(() => { // my custom wait function yippee!!!!!!

            node.addEventListener("click", function () { // pause all anis on click
                if (autoplay[i] == false) {
                    return
                }
                for (var a in trianglemovers) {
                    trianglemovers[a].pause()
                    autoplay[a] = false

                    var n = document.getElementById("triangle" + a)
                    if (n !== node) {
                        anime({
                            targets: n,
                            opacity: 0,
                            duration: 500,
                            easing: "easeInOutQuad",
                        })
                    }
                }

                // move el triangle to center and expander
                anime({
                    targets: node,
                    scale: 40,
                    rotate: "0deg",
                    translateX: "52vw",
                    //top: "40vh",
                    duration: 1000,
                    easing: "easeInOutQuad",
                    complete: function () {
                        console.log(trianglelinks[i].Name)
                        SetMenu(trianglelinks[i].Name)
                    }
                })
            })
        })
    }
    for (var i = 0; i <= 4; i++) {
        geny(i)
        AddTriangle(i)
    }
    //wait(1).then(() => { spawntriangles(InMenu) });
    return children
}

export default Spawntriangles