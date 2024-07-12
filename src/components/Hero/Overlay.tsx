import React from "react";
import { useState, useEffect } from "react";


// type unitTypes = {
//   imperial:boolean,
//   metric:boolean

// }

const Overlay: React.FC = () => {
  const [imperial, setImperial] = useState<boolean>(true);
  const [metric, setMetric] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>("kg");
  const [height, setHeight] = useState<string>("m");
  const [heightValue, setHeightValue] = useState<string | number>("");
  const [weightValue, setWeightValue] = useState<string | number>("");
  const [bmiValue, setBmiValue] = useState<number>(0);
  const [displayData, setDisplayData] = useState<string>("enter a value");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckboxChange = (checkboxNumber: number) => {
    if (checkboxNumber === 1) {
      setImperial(true);
      setMetric(false); // Uncheck the other checkbox
    } else if (checkboxNumber === 2) {
      setMetric(true);
      setImperial(false); // Uncheck the other checkbox
    }
  };

  useEffect(() => {
    if (imperial && !metric) {
      setWeight("kg");
      setHeight("m");
    } else if (!imperial && metric) {
      setWeight("lb");
      setHeight("in");
    }
  }, [imperial, metric]);

  const calculateBmi = (x: any, y: any) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(imperial);

      if (imperial === true) {
        setBmiValue(x / (y * y));
      } else {
        setBmiValue((x * 703) / (y * y));
      }
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (bmiValue < 18.5) {
      setDisplayData(
        `Your BMI is ${bmiValue.toFixed(
          1
        )}${weight}/${height}^2, which means you're underweight. Try to increase your calorie intake with nutrient-rich foods and don't forget to include more protein, carbohydrates and healthy fats to your diet.`
      );
    } else if (bmiValue > 18.5 && bmiValue < 24.5) {
      setDisplayData(
        `Awesome! Your BMI is ${bmiValue.toFixed(
          1
        )}${weight}/${height}^2, which means you're healthy. Keep up the good work and stay fit!`
      );
    } else {
      setDisplayData(
        `Your BMI is ${bmiValue.toFixed(
          1
        )}${weight}/${height}^2, meaning you're in the "Overweight" category. make sure to eat more vegetables and fruits, while inculcating the habit of regular excercise, Good luck!`
      );
    }
  }, [bmiValue]);
  console.log(bmiValue);
  console.log(displayData);

  const clearFields = () => {
    setDisplayData("");
    setBmiValue(0);
    setHeightValue("");
    setWeightValue("");
    setImperial(true);
    setMetric(false);
  };

  return (
    <>
      <main>
        <div className="h-[3rem] font-manrope flex flex-col items-center justify-center mx-1 my-auto gap-8 min-h-screen bg-[white] overflow-y-scroll">
          <div className="bg-[#7dcfeb] flex items-center justify-center rounded-[5rem] p-[2rem] text-white h-[30%] w-[90%] ">
            {
              isLoading ? <h2 className="mx-0 my-auto text-center">Generating Result.....</h2> :  <h2 className="text-center">
              {bmiValue === 0
                ? "Welcome to BMI calculator!!, Choose your preferred unit and input your details to get started."
                : displayData}
            </h2>
            }
           
          </div>
          <div className="flex z-20 text-center gap-6">
            <div className="flex flex-col shadow-lg rounded-lg text-[1rem] bg-[rgb(248,246,246)] py-6">
              <h2 className="font-bold text-[1.5rem]">
                Enter your details below
              </h2>
              <div className="flex items-center justify-evenly ">
                <div className="flex p-5 items-center justify-center gap-3">
                  <input
                    type="radio"
                    value="imperial"
                    name="Option 1"
                    checked={imperial}
                    onChange={() => handleCheckboxChange(1)}
                  />
                  <h2>Metric</h2>
                </div>
                <div className="flex p-5 items-center justify-center gap-3">
                  <input
                    type="radio"
                    value="metric"
                    name="Option 2"
                    checked={metric}
                    onChange={() => handleCheckboxChange(2)}
                  />
                  <h2>Imperial</h2>
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col p-5 items-start justify-between ">
                    <label htmlFor="">Height</label>
                    <div className="grid grid-cols-[1fr,4rem] gap-2">
                      <input
                        type="number"
                        value={heightValue}
                        onChange={(e) => setHeightValue(e.target.value)}
                        className="h-[2.8rem] px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500"
                      />
                      <input
                        readOnly
                        type="text"
                        value={height}
                        className="h-[2.8rem] px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-5 items-start justify-between">
                    <label htmlFor="">Weight</label>
                    <div className="grid grid-cols-[1fr,4rem] gap-2">
                      <input
                        type="number"
                        className="h-[2.8rem] px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500"
                        value={weightValue}
                        onChange={(e) => setWeightValue(e.target.value)}
                      />
                      <input
                        readOnly
                        type="text"
                        value={weight}
                        className="h-[2.8rem] px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-2 flex gap-3 items-center justify-center">
                  <button
                  disabled={
                   !weightValue && !heightValue ? true : false
                  }
                    onClick={() => calculateBmi(weightValue, heightValue)}
                    className="p-2 bg-[#0060ba] text-[white] rounded-md"
                  >
                    Submit data
                  </button>
                  <button
                    onClick={clearFields}
                    className="p-2 bg-[#0060ba] text-[white] rounded-md"
                  >
                    Clear Fields
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Overlay;
