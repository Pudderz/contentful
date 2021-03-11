import React, {useState, useEffect} from 'react'

export const Loader = ({time=5, onComplete, active}) => {
  
    const [loader, setLoader] = useState(0);

    const handleComplete=()=>{
        onComplete();
    }

    

    const changeLoader=(time, toShow)=>{
      let value = 0;
        if(active && toShow){

            const interval = setInterval(()=>{
              if(active && toShow && value < 300){

                setLoader(++value);
                // changeLoader(time,value, true);
              }else{
                // changeLoader(time,value, false);
                clearInterval(interval);
              }
            },time*1000/300)


            return interval;
            // handleComplete();
   
        }else{
          setLoader(0);
        }
        
    }
    const startLoader = async () => {
    let value=0;
      setLoader(0);
      changeLoader(time, active);
    };
  
    useEffect(() => {
      if (active === true) {
        startLoader();
      } else {
        setLoader(0);
      }
      return () => {
        setLoader(0);
        
      };
    }, [active]);




    return (
        <div
        className="loader"
        style={{
          width:  `${loader}px`,
          height: "3px",
          backgroundColor: "white",
          position:'absolute',
          bottom:'0',
          left:'0'
        }}
      ></div>
    )
}
