import { useEffect, useState } from 'react';
import Triangles from "./comps/spawntriangles"
import About from "./comps/about"
import CareerOverview from "./comps/careeroverview"
import PastWork from "./comps/pastwork"

function App() {
  var [InMenu, SetMenu] = useState("home")
  //console.log(InMenu)

  return (
    <>
      {/* main holder for all of the pages */}
      <div className="triangles w-screen h-screen relative overflow-hidden bg-[#f0f0f0]">
        <About InMenu={InMenu} SetMenu={SetMenu} />
        <Triangles InMenu={InMenu} SetMenu={SetMenu} />
        <CareerOverview InMenu={InMenu} SetMenu={SetMenu} />
        <PastWork InMenu={InMenu} SetMenu={SetMenu} />
      </div>
    </>
  );
}

export default App;
